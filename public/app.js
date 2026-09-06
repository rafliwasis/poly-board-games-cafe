const games = [
  ["Sushi Go Party!","M","Card, Family","2-8"],["Cash 'n Guns","E","Party, Bluffing","4-8"],["Azul","E","Abstract Strategy, Family","2-4"],["Codenames","E","Party, Word Association","2-8"],["Camel Up","M","Dice, Racing, Animals","2-8"],["Yogi","M","Party, Dexterity","2-6"],["Unlock!","H","Cooperative, Puzzle, Escape Room","1-6"],["Exit","H","Cooperative, Puzzle, Escape Room","1-6"],
  ["Cascadia","M","Abstract Strategy, Animals, Puzzle","1-4"],["Unmask!","M","Deduction, Card","2-3"],["Pandemic","H","Cooperative, Medical Theme","2-4"],["Exploding Kittens","M","Card, Party, Strategy","2-5"],["Splendor","E","Card Game, Engine Building","2-4"],["Avalon","M","Social Deduction, Strategy","5-10"],["Coup","M","Card, Bluffing, Party","2-6"],["Ticket to Ride Europe","M","Family, Trains","2-5"],
  ["Saboteur","M","Card, Deduction, Party","3-10"],["Love Letter","M","Card, Deduction","2-6"],["Cookie Box","E","Action Dexterity, Family","2-4"],["UNO","E","Card, Family","2-10"],["UNO Stacko","E","Dexterity, Party","2-10"],["UNO Attack","E","Card, Party","2-10"],["Wild Twists Cards","E","Card, Party","2+"],["Team 3","E","Cooperative, Communication Limits","3"],
  ["Spot It","E","Card, Pattern Recognition","2-8"],["Costume Party Detective","E","Social Deduction, Mystery, Party","2-6"],["Decrypto","M","Party, Deduction, Communication","3-8"],["Perjuangan Jomblo","H","Card, Humor","2-4"],["Balap Kuliner","M","Thematic, Grid Movement, Family","2-4"],["Sekata","E","Word, Party","3-8"],["Wowo Wiwi","E","Card, Bluffing","2-6"],["Santai Aja Lagi","E","Card, Party, Humor","4-20"],
  ["Kata Emak","E","Party, Dexterity","2-4"],["Monopoly","M","Economic Simulation, Negotiation","2-8"],["So Clover!","E","Cooperative, Word Association, Party","3-6"],["Guess Who?","E","Deduction, Children’s","2"],["Tetra Tower","E","Dexterity, Stacking","2-4"],["Quoridor","M","Abstract Strategy","2-4"],["Pakal","E","Puzzle, Dexterity","2-4"],["Pengoloo","E","Children’s, Memory","2-4"],
  ["Catan","M","Strategy, Negotiation, City Building","3-4"],["Sequence","E","Abstract Strategy, Card","2-12"],["Dr Eureka","E","Puzzle, Dexterity, Real-time","2-4"],["Skull","M","Bluffing, Card, Party","3-6"],["The Mind","E","Card, Cooperative","2-4"],["Dixit","E","Card, Storytelling","3-8"],["Deception","M","Mystery, Deduction, Party","4-12"],["Dead of Winter","H","Cooperative, Survival, Horror","3-8"],
  ["Citadels","M","Card Game, Family Game","2-8"],["Speed Cups","E","Card Game, Family Game","2-4"],["King of Tokyo","M","Card Game, Family Game","2-6"],["Chess","E","Card Game, Family Game","2"],["Canvas","M","Card Game, Family Game","1-5"],["Snake N Ladders","E","Card Game, Family Game","2+"],["Chronicles of Crime: LDN","H","Card Game, Family Game","1-4"],["Tic Tack.O","E","Card Game, Family Game","2-4"],
  ["Don't Get Got!","E","Party, Hidden Objectives","3-8"],["Math Cat","E","Educational, Card","2-4"],["Scrabble","E","Word, Strategy","2-4"],["Katamino Tower","E","Puzzle, Cooperative","1-2"],["Bounce-Off Duel","E","Dexterity, Party","2-4"],["7 Wonders Architects","M","Civilization Building, Strategy, Card","2-7"],["Chronicles of Crime: 1400","H","Cooperative, Detective, App-driven","1-4"],["Marvel United","H","Cooperative, Superheroes","1-4"],
  ["Waterfall Park","M","Tile Placement, Family, Negotiation","2-4"],["Rummikub","E","Tile-laying, Pattern Recognition","2-4"],["Survive the Island","M","Adventure, Survival, Miniatures","2-5"],["Bang! The Dice","M","Dice, Western Theme, Card, Deduction","3-8"],["Tapple","E","Word, Party","2-8"],["Shut the Box","E","Dice, Number","1-4"],["Tongue Out!","E","Children’s, Memory","2-4"],["Paranormal Detectives","M","Deduction, Horror, Cooperative","2-6"],
  ["Secret Hitler","M","Social Deduction, Political","5-10"],["Finspan","M","Strategy, Card, Animals","1-5"],["Ticket to Ride London","E","Family, Trains","2-4"],["Fiction","E","Word, Deduction, Party","2-8"],["Dune Imperium Uprising","H","Deckbuilding, Worker Placement, Sci-fi","1-6"],["Werewolf","E","Party Game, Hidden Roles","5-20"],["The Game of Life","E","Family","2-6"],["Machi Koro","M","Luck, Engine Building, Card","2-6"],
  ["Cheating Moth","E","Card, Party","3-5"],["Cluedo","M","Strategy, Card, Deduction","2-6"],["Hedbanz","E","Guessing, Family, Party","2-6"],["UNO No Mercy","E","Card, Party","2-6"],["UNO Teams","E","Card, Team, Party","4"],["UNO Flip","E","Card, Family","1-4"],["Piles!","E","Card, Family, Fast-paced","2-8"],["Restaurant Rivals","M","Family, Strategy, Food","2-5"],
  ["Flip 7","E","Card, Push Your Luck, Party","3+"],["One Word","E","Word, Party","2-10"],["Bomb Busters","M","Cooperation, Communication, Strategy","2-5"],["Welcome To…","M","Strategy, Architecture","1-100+"],["50 Juta Sebulan","E","Card, Push Your Luck, Party","2-5"],["Monopoly App Banking","E","Negotiation, Strategy, App-driven","2-6"],["Quest","M","Social Deduction, Hidden Role, Party","4-10"],["Jinx-O","E","Family, Party","4-7"],
  ["Unstable Unicorns","M","Card, Strategy","2-8"],["Point City","E","Card Drafting, Building, Strategy","1-4"],["Monkey Palace","M","Strategy, Family","2-4"],["Popcorn","E","Bag Builder","2-4"],["Sheriff of Nottingham (2e)","M","Strategy, Party, Bluffing, Negotiation","3-6"],["That’s You!","E","Family, Party","4-8"]
].map(([name, difficulty, categories, players], index) => ({ name, difficulty, categories, players, index: index + 1 }));

const grid = document.querySelector("#game-grid");
const search = document.querySelector("#game-search");
const playerSelect = document.querySelector("#player-count");
const difficultyFilters = document.querySelector("#difficulty-filters");
const countLabel = document.querySelector("#result-count");
const showMore = document.querySelector("#show-more");
const emptyState = document.querySelector("#empty-state");

let difficulty = "all";
let visibleCount = 16;
const accents = ["#1769c2", "#f43b36", "#33b447", "#f2b915", "#724fc4", "#f36f35"];

function playerRange(value) {
  const numbers = value.match(/\d+/g)?.map(Number) || [];
  if (!numbers.length) return [0, 999];
  return numbers.length === 1 ? [numbers[0], value.includes("+") ? 999 : numbers[0]] : [numbers[0], numbers[1]];
}

function moodFor(categories) {
  const c = categories.toLowerCase();
  if (c.includes("party") || c.includes("bluff")) return "Big laughs";
  if (c.includes("cooper") || c.includes("communication")) return "Team up";
  if (c.includes("strategy") || c.includes("building")) return "Thinky";
  if (c.includes("puzzle") || c.includes("deduction")) return "Crack it";
  if (c.includes("family") || c.includes("children")) return "Easygoing";
  return "Try something new";
}

function matchesPlayers(game, selected) {
  if (selected === "all") return true;
  const target = Number(selected);
  const [min, max] = playerRange(game.players);
  if (target === 6) return max >= 6;
  if (target === 10) return max >= 10;
  return target >= min && target <= max;
}

function filteredGames() {
  const term = search.value.trim().toLowerCase();
  return games.filter(game => {
    const textMatch = `${game.name} ${game.categories}`.toLowerCase().includes(term);
    return textMatch && (difficulty === "all" || game.difficulty === difficulty) && matchesPlayers(game, playerSelect.value);
  });
}

function gameCard(game, position) {
  const article = document.createElement("article");
  article.className = "game-card";
  article.style.setProperty("--card-accent", accents[(game.index - 1) % accents.length]);
  article.style.animationDelay = `${Math.min(position * 25, 250)}ms`;
  const mark = game.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
  article.innerHTML = `
    <div class="card-art" data-mark="${mark}">
      <span class="game-number">GAME ${String(game.index).padStart(2, "0")}</span>
      <span class="difficulty-badge ${game.difficulty}" title="${game.difficulty === "E" ? "Easy" : game.difficulty === "M" ? "Medium" : "Hard"}">${game.difficulty}</span>
    </div>
    <div class="card-copy">
      <h3>${game.name}</h3>
      <p>${game.categories}</p>
      <div class="card-meta">
        <span class="players"><span>●●</span> ${game.players} players</span>
        <span class="mood-tag">${moodFor(game.categories)}</span>
      </div>
    </div>`;
  return article;
}

function render(reset = false) {
  if (reset) visibleCount = 16;
  const matches = filteredGames();
  const visible = matches.slice(0, visibleCount);
  grid.replaceChildren(...visible.map(gameCard));
  countLabel.textContent = matches.length;
  emptyState.hidden = matches.length > 0;
  showMore.hidden = visibleCount >= matches.length;
}

difficultyFilters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  difficulty = button.dataset.filter;
  difficultyFilters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
  render(true);
});
search.addEventListener("input", () => render(true));
playerSelect.addEventListener("change", () => render(true));
showMore.addEventListener("click", () => { visibleCount += 16; render(); });

render();
