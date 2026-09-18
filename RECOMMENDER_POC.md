# Recommender POC: Game Master AI

## 1. Objective
The purpose of this PoC is to validate whether an open-source model accessed via a high-speed inference API can reliably act as a "Game Master". We need to prove that the system is:
1. **Fast:** Capable of returning recommendations in near real-time.
2. **Accurate (Hallucination-free):** Only recommending games that actually exist in the cafe's catalog.
3. **Structured:** Returning data in a strict JSON format that our frontend can parse and display without errors.

## 2. Architecture & Technology Stack
**Decision: Create a Dedicated Backend (BE)**
To ensure maximum security (hiding API keys) and scalability, we will create a dedicated Backend (using Next.js API Routes, e.g., `/api/recommend`) to handle all ML interactions. The frontend will never communicate with the ML API directly.

- **API Provider:** [Groq](https://groq.com/) - Chosen because their LPU (Language Processing Unit) architecture provides the fastest inference speeds currently available.
- **Model:** `llama3-8b-8192` (Meta Llama 3 8B) - An open-source model that is lightweight, incredibly fast, and excellent at following strict formatting instructions.
- **PoC Implementation:** Native Node.js `fetch` running via a developer script (`scripts/poc-groq.js`) to simulate the future BE logic.

## 3. Prompt Engineering Strategy

To ensure the model behaves predictably as a backend service, we apply three layers of Prompt Engineering:

### A. Persona & Constraints (System Prompt)
The AI is given a strict persona and boundaries:
> *"You are the Game Master AI for Poly Board Games Cafe. Your job is to recommend exactly ONE board game from our catalog based on the user's request. You MUST ONLY recommend a game that exists in the provided catalog below."*

### B. Catalog Injection (RAG Concept)
Instead of relying on the AI's internal memory (which could lead to hallucinating games we don't own), we inject a subset of our actual catalog directly into the prompt. 
*Example Data Injected:*
- Sushi Go Party! (Players: 2-8, Difficulty: Medium, Tags: Card, Family)
- Azul (Players: 2-4, Difficulty: Easy, Tags: Abstract Strategy, Family)
- Ticket to Ride Europe (Players: 2-5, Difficulty: Medium, Tags: Family, Trains)

### C. JSON Enforcement
To ensure the frontend can parse the response, we force the AI to reply in raw JSON without any markdown formatting. We achieve this by:
1. Providing an exact schema template in the prompt.
2. Utilizing Groq's `response_format: { type: "json_object" }` feature at the API level.

**Expected Output Schema:**
```json
{
  "recommended_game": "Azul",
  "reason": "Azul is a beautiful, relaxing abstract strategy game perfectly designed for 2 players.",
  "tagline": "Draft beautiful tiles without leaving yourself a messy floor.",
  "overview": "Take all tiles of one color from a factory display and place them into a pattern line...",
  "steps": [
    "Take every tile of one color from a factory.",
    "Place them into one matching pattern line.",
    "Move completed lines to the wall and score."
  ]
}
```

## 4. ML Flow

This is how `pages/api/recommend.js` actually resolves a guest's query, as implemented today. The design favors *avoiding* an LLM call whenever the answer can be produced deterministically, and only asks the model to reason when there's genuinely a recommendation to make.

```text
Guest query (POST /api/recommend)
        │
        ▼
Validate query (non-empty, ≤300 chars) ──fail──▶ 400 error
        │ ok
        ▼
Path 1: does the query already NAME a real catalog game?
 (word-boundary match against every game name, longest first)
        │
        ├── yes ──▶ look up game + its guide directly from data/games.js
        │            no LLM call — zero cost, zero hallucination risk
        │            ▼
        │           200 { kind: "instructions", game, guide }
        │
        └── no
             ▼
        Path 2: treat it as a recommendation request
             │
             ▼
        Build prompt:
          - system prompt = persona + rules + full catalog injected as text
          - detect Indonesian-language markers → instruct model to reply
            in guest's language
          - user message = the guest's raw query
             ▼
        Call Groq (openai/gpt-oss-20b), JSON-mode, 15s timeout
        retried once on transient failure (not on 429 rate-limit)
             │
             ▼
        Does pick.recommended_game exactly match a catalog name?
             │
             ├── yes ──▶ 200 { kind: "recommendation", game, reason, guide }
             │
             └── no ──▶ re-prompt the model once more:
                          "that name isn't in the catalog — pick again,
                           or return {recommended_game: null, clarify: ...}"
                              │
                              ▼
                        second match against catalog?
                              │
                              ├── yes ──▶ 200 { kind: "recommendation", ... }
                              │
                              └── no ──▶ 200 { kind: "re_ask", message }
                                          (model's own clarifying question,
                                           or a generic fallback)
             ▼
        Any network/API error at any point ──▶ 502 error
```

Key properties this flow is designed to guarantee:

- **No hallucinated games ever reach the guest.** Every model output is checked against the real catalog before being trusted; a mismatch triggers a correction turn instead of being returned as-is.
- **Deterministic answers skip the model entirely.** If the guest already names a real game, the response comes straight from `data/games.js` — faster, free, and can't be wrong.
- **Graceful degradation, not dead ends.** Two failed attempts to get a valid game name resolve to a clarifying question rather than an error, keeping the guest in the conversation.

## 5. Test Scenarios

The script (`scripts/poc-groq.js`) executes two distinct test cases to prove the model's reasoning capabilities before we integrate this logic into our new Backend API:

1. **Test Case 1 (Large Group / Party):**
   - *Query:* "We are a group of 7 friends looking for a game that involves lying and bluffing."
   - *Expected Behavior:* The AI should filter out games that don't support 7 players (e.g., Azul) and select a bluffing game (e.g., Cash 'n Guns or Avalon).

2. **Test Case 2 (Couples / Chill):**
   - *Query:* "I want a relaxing game for just me and my partner. We like abstract puzzles."
   - *Expected Behavior:* The AI must recognize the 2-player constraint and the abstract preference, likely recommending Azul.

## 6. Cost Estimation (Groq API)

Groq provides extremely competitive pricing for the **Llama 3 8B** model, and also offers a generous **Free Tier** for developers. If you scale beyond the free tier, here is a simple estimation based on Pay-As-You-Go pricing (approx. $0.05 per 1M Input Tokens, $0.08 per 1M Output Tokens):

### Per-Request Breakdown:
- **Input Tokens (Prompt + 102 Games Catalog):** ~800 tokens
- **Output Tokens (JSON Response):** ~200 tokens
- **Cost per request:** `(800 / 1,000,000 * $0.05) + (200 / 1,000,000 * $0.08)` ≈ **$0.000056**

### Scaling Up:
- **1,000 recommendations:** ~$0.05 (Sekitar Rp 800)
- **10,000 recommendations:** ~$0.56 (Sekitar Rp 9.000)

**Conclusion:** Biaya operasional ML Backend ini nyaris gratis dan sangat aman untuk digunakan di production tanpa perlu khawatir *budget overrun*.
