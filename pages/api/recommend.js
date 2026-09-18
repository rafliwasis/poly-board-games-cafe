const { games, gameDetails } = require("../../data/games");

const GROQ_API_URL = process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";
// llama3-8b-8192 (the PoC's original pick) was decommissioned by Groq;
// gpt-oss-20b is the closest current equivalent — fast, open-weight, and
// reliable at strict JSON-formatted instruction following.
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_QUERY_LENGTH = 300;
const REQUEST_TIMEOUT_MS = 15000;
const RE_ASK_MESSAGE = "I couldn't quite settle on one — tell me a bit more, like how many players or what kind of mood you're going for?";

function difficultyLabel(code) {
  return code === "E" ? "Easy" : code === "M" ? "Medium" : "Hard";
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Longest names first so a specific variant (e.g. "UNO No Mercy") wins over
// a shorter name it contains (e.g. "UNO"). Word-boundary matched to avoid a
// short name firing inside an unrelated word (e.g. "Coup" inside "coupon").
const gamesByNameLength = [...games].sort((a, b) => b.name.length - a.name.length);

function findMentionedGame(text) {
  const normalized = text.toLowerCase();
  return gamesByNameLength.find((game) => {
    // Lookarounds instead of \b: \b requires a word char on one side, which
    // fails right after trailing punctuation like the ")" in "(2e)" when
    // followed by a space or end of string (non-word on both sides).
    const pattern = new RegExp(`(?<![a-z0-9])${escapeRegExp(game.name.toLowerCase())}(?![a-z0-9])`);
    return pattern.test(normalized);
  });
}

function serializeGuide(detail) {
  return detail
    ? {
        tagline: detail.tagline,
        overview: detail.overview,
        steps: detail.steps,
        tip: detail.tip,
      }
    : null;
}

function buildCatalogText() {
  return games
    .map((game) => `- ${game.name} (Players: ${game.players}, Difficulty: ${difficultyLabel(game.difficulty)}, Tags: ${game.categories})`)
    .join("\n");
}

// A handful of very common Indonesian function words. Cheap and imperfect,
// but far more reliable than asking the model to infer language on its own —
// telling it directly ("the guest wrote in Indonesian") beats hoping it
// notices, which is what caused replies to slip back into English before.
const INDONESIAN_MARKERS = new Set([
  "yang", "untuk", "dengan", "saya", "kamu", "kami", "kita", "apa", "siapa",
  "main", "mau", "ingin", "dan", "atau", "tidak", "enggak", "gak", "ga",
  "nggak", "ada", "bisa", "cara", "gimana", "bagaimana", "orang", "rame",
  "ramai", "seru", "santai", "enak", "dong", "nih", "ya", "banget", "gitu",
  "ini", "itu", "udah", "sudah", "belum", "sama", "kalo", "kalau", "bareng",
  "lagi", "biar", "aja", "doang", "halo", "gue", "gua", "aku",
]);

function detectLanguageHint(text) {
  const words = text.toLowerCase().match(/[\p{L}']+/gu) || [];
  return words.some((word) => INDONESIAN_MARKERS.has(word)) ? "Indonesian" : null;
}

function buildSystemPrompt(catalogText, languageHint) {
  const languageInstruction = languageHint
    ? `The guest's message is in ${languageHint}. Write the "reason" in ${languageHint} — not English.`
    : 'Write the "reason" in the same language as the guest\'s message (default to English only if the language is genuinely unclear).';

  return [
    "You are the Game Master AI for Poly Board Games Cafe.",
    "Your job is to recommend exactly ONE board game from the catalog below based on the guest's request.",
    "You MUST ONLY recommend a game whose name appears EXACTLY as written in the catalog. Never invent a game, and never alter or abbreviate its name.",
    "Weigh the guest's player count, mood, and preferences against each game's players/difficulty/tags when they are relevant.",
    languageInstruction + " Make it sound like a direct, warm answer to them, not a restatement of the catalog tags.",
    "Reply with raw JSON only, no markdown formatting and no extra commentary, matching exactly this schema:",
    '{"recommended_game": "<exact catalog name>", "reason": "<1-2 sentence reason tailored to the guest\'s request, in their language>"}',
    "",
    "Catalog:",
    catalogText,
  ].join("\n");
}

function findGame(name) {
  if (typeof name !== "string") return undefined;
  const normalized = name.trim().toLowerCase();
  return games.find((game) => game.name.toLowerCase() === normalized);
}

function extractJson(content) {
  const trimmed = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  return JSON.parse(trimmed);
}

async function callGroq(apiKey, messages) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 1024,
        reasoning_effort: "low",
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      const error = new Error(`Groq API responded with ${response.status}: ${errorBody || response.statusText}`);
      error.status = response.status;
      throw error;
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Groq API returned no content.");
    return extractJson(content);
  } finally {
    clearTimeout(timeout);
  }
}

const TRANSIENT_RETRY_ATTEMPTS = 2;

// reasoning_effort "medium" occasionally comes back from Groq with an empty
// generation (json_validate_failed, no failed_generation body) — a transient
// hiccup, not something wrong with the prompt: an identical request retried
// immediately succeeds. Retry a couple of times before giving up.
async function callGroqResilient(apiKey, messages) {
  let lastError;
  for (let attempt = 1; attempt <= TRANSIENT_RETRY_ATTEMPTS; attempt++) {
    try {
      return await callGroq(apiKey, messages);
    } catch (error) {
      lastError = error;
      console.warn(`Groq call attempt ${attempt} failed: ${error.message}`);
      // A 429 (tokens-per-minute cap) won't clear by retrying instantly —
      // both attempts land in the same rate-limit window. Fail fast instead
      // of burning latency on a retry that's guaranteed to repeat the 429.
      if (error.status === 429) break;
    }
  }
  throw lastError;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const query = typeof req.body?.query === "string" ? req.body.query.trim() : "";
  if (!query) {
    return res.status(400).json({ error: "Tell the Game Master what you're in the mood for." });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return res.status(400).json({ error: `Keep it under ${MAX_QUERY_LENGTH} characters.` });
  }

  // Path 1: the guest already named a real game — answer directly from our
  // own verified data. No Groq call, no cost, no chance of hallucination.
  const namedGame = findMentionedGame(query);
  if (namedGame) {
    return res.status(200).json({
      kind: "instructions",
      game: {
        name: namedGame.name,
        players: namedGame.players,
        difficulty: namedGame.difficulty,
        categories: namedGame.categories,
      },
      guide: serializeGuide(gameDetails[namedGame.name]),
    });
  }

  // Path 2: no game named — treat it as a recommendation request.
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "The Game Master AI isn't configured yet — add GROQ_API_KEY to .env.local." });
  }

  const catalogText = buildCatalogText();
  const languageHint = detectLanguageHint(query);
  const messages = [
    { role: "system", content: buildSystemPrompt(catalogText, languageHint) },
    { role: "user", content: query },
  ];

  try {
    let pick = await callGroqResilient(apiKey, messages);
    let game = findGame(pick?.recommended_game);

    if (!game) {
      messages.push({ role: "assistant", content: JSON.stringify(pick) });
      messages.push({
        role: "user",
        content: [
          `"${pick?.recommended_game}" is not in the catalog. Choose exactly one name from the catalog above, copied verbatim, and reply again with the same JSON schema.`,
          'If you genuinely cannot find a fitting match, instead reply with {"recommended_game": null, "clarify": "<a short, friendly follow-up question, in the same language as the guest\'s message, asking for more detail like player count or mood>"}.',
        ].join(" "),
      });
      pick = await callGroqResilient(apiKey, messages);
      game = findGame(pick?.recommended_game);
    }

    if (!game) {
      // Two misses in a row — ask the guest for more detail instead of
      // guessing or dead-ending on an error. Prefer the model's own
      // language-matched question; it isn't asserting any game facts here,
      // so there's no hallucination risk in letting it phrase this itself.
      const clarify = typeof pick?.clarify === "string" && pick.clarify.trim() ? pick.clarify.trim() : RE_ASK_MESSAGE;
      return res.status(200).json({ kind: "re_ask", message: clarify });
    }

    return res.status(200).json({
      kind: "recommendation",
      game: {
        name: game.name,
        players: game.players,
        difficulty: game.difficulty,
        categories: game.categories,
      },
      reason: typeof pick.reason === "string" ? pick.reason : "",
      guide: serializeGuide(gameDetails[game.name]),
    });
  } catch (error) {
    console.error("recommend api error:", error);
    return res.status(502).json({ error: "The Game Master AI is unreachable right now — please try again shortly." });
  }
}
