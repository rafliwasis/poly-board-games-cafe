(() => {
  const form = document.querySelector("#gm-form");
  if (!form) return;

  const input = document.querySelector("#gm-query");
  const submitButton = document.querySelector("#gm-submit");
  const result = document.querySelector("#gm-result");

  function difficultyLabel(code) {
    return code === "E" ? "Easy" : code === "M" ? "Medium" : "Hard";
  }

  function fact(value, label) {
    const span = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = value;
    span.append(strong, label);
    return span;
  }

  function setResult(className, children) {
    result.className = "gm-result" + (className ? ` ${className}` : "");
    result.replaceChildren(...children);
    result.hidden = false;
  }

  function showLoading() {
    const p = document.createElement("p");
    p.textContent = "The Game Master is thinking…";
    setResult("gm-result-loading", [p]);
  }

  function showMessage(text, className) {
    const p = document.createElement("p");
    p.textContent = text;
    setResult(className, [p]);
  }

  function buildGameCard({ name, reason, game, guide }) {
    const nameEl = document.createElement("h3");
    nameEl.className = "gm-card-name";
    nameEl.textContent = name;

    const children = [nameEl];

    if (reason) {
      const reasonEl = document.createElement("p");
      reasonEl.className = "gm-card-reason";
      reasonEl.textContent = reason;
      children.push(reasonEl);
    }

    if (game) {
      const facts = document.createElement("div");
      facts.className = "gm-card-facts";
      facts.append(
        fact(game.players, "Players"),
        fact(difficultyLabel(game.difficulty), "Difficulty"),
        fact(game.categories, "Tags")
      );
      children.push(facts);
    }

    if (guide) {
      const guideEl = document.createElement("div");
      guideEl.className = "gm-card-guide";
      const tagline = document.createElement("p");
      tagline.className = "gm-card-tagline";
      tagline.textContent = guide.tagline;
      const overview = document.createElement("p");
      overview.textContent = guide.overview;
      const heading = document.createElement("h4");
      heading.textContent = "How a turn works";
      const steps = document.createElement("ol");
      steps.replaceChildren(
        ...guide.steps.map((step) => {
          const li = document.createElement("li");
          li.textContent = step;
          return li;
        })
      );
      const tip = document.createElement("aside");
      tip.className = "gm-card-tip";
      const tipLabel = document.createElement("strong");
      tipLabel.textContent = "Game Master tip";
      const tipText = document.createElement("span");
      tipText.textContent = guide.tip;
      tip.append(tipLabel, tipText);
      guideEl.append(tagline, overview, heading, steps, tip);
      children.push(guideEl);
    } else {
      const noGuide = document.createElement("p");
      noGuide.className = "gm-card-noguide";
      noGuide.textContent = "Full step-by-step guide coming soon — ask your in-cafe Game Master for the rundown on this one.";
      children.push(noGuide);
    }

    return children;
  }

  function renderResponse(data) {
    if (data.kind === "instructions") {
      setResult(null, buildGameCard({ name: data.game.name, game: data.game, guide: data.guide }));
    } else if (data.kind === "recommendation") {
      setResult(null, buildGameCard({ name: data.game.name, reason: data.reason, game: data.game, guide: data.guide }));
    } else if (data.kind === "re_ask") {
      showMessage(data.message, "gm-result-reask");
    } else {
      showMessage("Something unexpected happened — try asking again.", "gm-result-error");
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    submitButton.disabled = true;
    showLoading();

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The Game Master is stumped — try again in a moment.");
      renderResponse(data);
    } catch (error) {
      showMessage(error.message, "gm-result-error");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
