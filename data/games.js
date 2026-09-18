/**
 * Canonical server-side mirror of the catalog rendered by `public/app.js`
 * and the detail entries authored in `public/game-details.js`.
 *
 * These three files must be kept in sync until the Next.js/TypeScript
 * migration described in README.md consolidates them into one source
 * (see "Next.js + TypeScript handoff").
 *
 * @typedef {Object} Game
 * @property {string} name
 * @property {"E"|"M"|"H"} difficulty
 * @property {string} categories
 * @property {string} players
 *
 * @typedef {Object} GameDetail
 * @property {string} duration
 * @property {string} tagline
 * @property {string} overview
 * @property {string[]} steps
 * @property {string} tip
 */

/** @type {Game[]} */
const games = [
  ["Sushi Go Party!", "M", "Card, Family", "2-8"], ["Cash 'n Guns", "E", "Party, Bluffing", "4-8"], ["Azul", "E", "Abstract Strategy, Family", "2-4"], ["Codenames", "E", "Party, Word Association", "2-8"], ["Camel Up", "M", "Dice, Racing, Animals", "2-8"], ["Yogi", "M", "Party, Dexterity", "2-6"], ["Unlock!", "H", "Cooperative, Puzzle, Escape Room", "1-6"], ["Exit", "H", "Cooperative, Puzzle, Escape Room", "1-6"],
  ["Cascadia", "M", "Abstract Strategy, Animals, Puzzle", "1-4"], ["Unmask!", "M", "Deduction, Card", "2-3"], ["Pandemic", "H", "Cooperative, Medical Theme", "2-4"], ["Exploding Kittens", "M", "Card, Party, Strategy", "2-5"], ["Splendor", "E", "Card Game, Engine Building", "2-4"], ["Avalon", "M", "Social Deduction, Strategy", "5-10"], ["Coup", "M", "Card, Bluffing, Party", "2-6"], ["Ticket to Ride Europe", "M", "Family, Trains", "2-5"],
  ["Saboteur", "M", "Card, Deduction, Party", "3-10"], ["Love Letter", "M", "Card, Deduction", "2-6"], ["Cookie Box", "E", "Action Dexterity, Family", "2-4"], ["UNO", "E", "Card, Family", "2-10"], ["UNO Stacko", "E", "Dexterity, Party", "2-10"], ["UNO Attack", "E", "Card, Party", "2-10"], ["Wild Twists Cards", "E", "Card, Party", "2+"], ["Team 3", "E", "Cooperative, Communication Limits", "3"],
  ["Spot It", "E", "Card, Pattern Recognition", "2-8"], ["Costume Party Detective", "E", "Social Deduction, Mystery, Party", "2-6"], ["Decrypto", "M", "Party, Deduction, Communication", "3-8"], ["Perjuangan Jomblo", "H", "Card, Humor", "2-4"], ["Balap Kuliner", "M", "Thematic, Grid Movement, Family", "2-4"], ["Sekata", "E", "Word, Party", "3-8"], ["Wowo Wiwi", "E", "Card, Bluffing", "2-6"], ["Santai Aja Lagi", "E", "Card, Party, Humor", "4-20"],
  ["Kata Emak", "E", "Party, Dexterity", "2-4"], ["Monopoly", "M", "Economic Simulation, Negotiation", "2-8"], ["So Clover!", "E", "Cooperative, Word Association, Party", "3-6"], ["Guess Who?", "E", "Deduction, Children's", "2"], ["Tetra Tower", "E", "Dexterity, Stacking", "2-4"], ["Quoridor", "M", "Abstract Strategy", "2-4"], ["Pakal", "E", "Puzzle, Dexterity", "2-4"], ["Pengoloo", "E", "Children's, Memory", "2-4"],
  ["Catan", "M", "Strategy, Negotiation, City Building", "3-4"], ["Sequence", "E", "Abstract Strategy, Card", "2-12"], ["Dr Eureka", "E", "Puzzle, Dexterity, Real-time", "2-4"], ["Skull", "M", "Bluffing, Card, Party", "3-6"], ["The Mind", "E", "Card, Cooperative", "2-4"], ["Dixit", "E", "Card, Storytelling", "3-8"], ["Deception", "M", "Mystery, Deduction, Party", "4-12"], ["Dead of Winter", "H", "Cooperative, Survival, Horror", "3-8"],
  ["Citadels", "M", "Card Game, Family Game", "2-8"], ["Speed Cups", "E", "Card Game, Family Game", "2-4"], ["King of Tokyo", "M", "Card Game, Family Game", "2-6"], ["Chess", "E", "Card Game, Family Game", "2"], ["Canvas", "M", "Card Game, Family Game", "1-5"], ["Snake N Ladders", "E", "Card Game, Family Game", "2+"], ["Chronicles of Crime: LDN", "H", "Card Game, Family Game", "1-4"], ["Tic Tack.O", "E", "Card Game, Family Game", "2-4"],
  ["Don't Get Got!", "E", "Party, Hidden Objectives", "3-8"], ["Math Cat", "E", "Educational, Card", "2-4"], ["Scrabble", "E", "Word, Strategy", "2-4"], ["Katamino Tower", "E", "Puzzle, Cooperative", "1-2"], ["Bounce-Off Duel", "E", "Dexterity, Party", "2-4"], ["7 Wonders Architects", "M", "Civilization Building, Strategy, Card", "2-7"], ["Chronicles of Crime: 1400", "H", "Cooperative, Detective, App-driven", "1-4"], ["Marvel United", "H", "Cooperative, Superheroes", "1-4"],
  ["Waterfall Park", "M", "Tile Placement, Family, Negotiation", "2-4"], ["Rummikub", "E", "Tile-laying, Pattern Recognition", "2-4"], ["Survive the Island", "M", "Adventure, Survival, Miniatures", "2-5"], ["Bang! The Dice", "M", "Dice, Western Theme, Card, Deduction", "3-8"], ["Tapple", "E", "Word, Party", "2-8"], ["Shut the Box", "E", "Dice, Number", "1-4"], ["Tongue Out!", "E", "Children's, Memory", "2-4"], ["Paranormal Detectives", "M", "Deduction, Horror, Cooperative", "2-6"],
  ["Secret Hitler", "M", "Social Deduction, Political", "5-10"], ["Finspan", "M", "Strategy, Card, Animals", "1-5"], ["Ticket to Ride London", "E", "Family, Trains", "2-4"], ["Fiction", "E", "Word, Deduction, Party", "2-8"], ["Dune Imperium Uprising", "H", "Deckbuilding, Worker Placement, Sci-fi", "1-6"], ["Werewolf", "E", "Party Game, Hidden Roles", "5-20"], ["The Game of Life", "E", "Family", "2-6"], ["Machi Koro", "M", "Luck, Engine Building, Card", "2-6"],
  ["Cheating Moth", "E", "Card, Party", "3-5"], ["Cluedo", "M", "Strategy, Card, Deduction", "2-6"], ["Hedbanz", "E", "Guessing, Family, Party", "2-6"], ["UNO No Mercy", "E", "Card, Party", "2-6"], ["UNO Teams", "E", "Card, Team, Party", "4"], ["UNO Flip", "E", "Card, Family", "1-4"], ["Piles!", "E", "Card, Family, Fast-paced", "2-8"], ["Restaurant Rivals", "M", "Family, Strategy, Food", "2-5"],
  ["Flip 7", "E", "Card, Push Your Luck, Party", "3+"], ["One Word", "E", "Word, Party", "2-10"], ["Bomb Busters", "M", "Cooperation, Communication, Strategy", "2-5"], ["Welcome To…", "M", "Strategy, Architecture", "1-100+"], ["50 Juta Sebulan", "E", "Card, Push Your Luck, Party", "2-5"], ["Monopoly App Banking", "E", "Negotiation, Strategy, App-driven", "2-6"], ["Quest", "M", "Social Deduction, Hidden Role, Party", "4-10"], ["Jinx-O", "E", "Family, Party", "4-7"],
  ["Unstable Unicorns", "M", "Card, Strategy", "2-8"], ["Point City", "E", "Card Drafting, Building, Strategy", "1-4"], ["Monkey Palace", "M", "Strategy, Family", "2-4"], ["Popcorn", "E", "Bag Builder", "2-4"], ["Sheriff of Nottingham (2e)", "M", "Strategy, Party, Bluffing, Negotiation", "3-6"], ["That's You!", "E", "Family, Party", "4-8"]
].map(([name, difficulty, categories, players], index) => ({ name, difficulty, categories, players, index: index + 1 }));

/** @type {Record<string, GameDetail>} */
const gameDetails = {
  "Sushi Go Party!": {
    duration: "20-30 min",
    tagline: "Build the tastiest menu, one passing hand at a time.",
    overview: "Everyone chooses one card, reveals together, then passes the rest of their hand. Different sushi score in different ways, so the best pick depends on what you have and what your neighbors may be collecting.",
    steps: [
      "Choose the menu of sushi cards for this game.",
      "Pick one card, reveal together, and pass your remaining hand.",
      "Score the round after every card is played; highest total after three rounds wins."
    ],
    tip: "Watch what is disappearing around the table. A great set is only useful if its remaining cards can still reach you."
  },
  "Cash 'n Guns": {
    duration: "30 min",
    tagline: "Split the loot, bluff your rivals, and know when to duck.",
    overview: "Players point foam pistols while fighting over a pile of loot. Some weapons are loaded and some are bluffs; staying in may win valuables, but getting hit costs you both the round and one of your limited lives.",
    steps: [
      "Study the available loot and secretly choose a loaded or blank card.",
      "Point your foam pistol, then decide whether to stay in or lie down.",
      "Resolve shots and divide the loot among everyone still standing."
    ],
    tip: "Your reputation matters. A believable bluff now can make a real shot much stronger later."
  },
  "Azul": {
    duration: "30-45 min",
    tagline: "Draft beautiful tiles without leaving yourself a messy floor.",
    overview: "Take all tiles of one color from a factory display and place them into a pattern line. Completed lines add tiles to your palace wall and score through connected rows and columns; overflow tiles cost points.",
    steps: [
      "Take every tile of one color from a factory or from the center.",
      "Place them into one matching pattern line; overflow goes to your floor.",
      "Move completed lines to the wall, score connections, and refill for the next round."
    ],
    tip: "Before taking a color, check what your choice will push into the center for the next player."
  },
  "Codenames": {
    duration: "15-30 min",
    tagline: "Connect several secret agents with one carefully chosen clue.",
    overview: "Two teams race to identify their agents in a grid of words. Each spymaster gives a one-word clue and a number, trying to connect multiple friendly words without leading the team to an opponent or the assassin.",
    steps: [
      "Spymasters study the secret key showing each word's identity.",
      "Give one word plus a number; teammates discuss and touch their guesses.",
      "Find all of your agents first, but avoid the assassin at all costs."
    ],
    tip: "A safe clue for two words is often better than a clever clue for four that also points toward the assassin."
  },
  "Camel Up": {
    duration: "30-45 min",
    tagline: "Bet on a chaotic race where camels carry one another.",
    overview: "Camels race around a desert track and stack when they share a space. On your turn, roll a camel, place a spectator tile, or bet on the leg and overall winner. Timing your bets is the heart of the game.",
    steps: [
      "Choose one action: roll, influence the track, or take a betting ticket.",
      "Move the rolled camel and every camel stacked on top of it.",
      "Score leg bets when all five colors have moved, then continue to the finish."
    ],
    tip: "A camel buried in a stack can suddenly leap forward when the camel beneath it moves."
  },
  "Cascadia": {
    duration: "30-45 min",
    tagline: "Grow connected habitats and place wildlife into smart patterns.",
    overview: "Draft one habitat tile and its paired wildlife token each turn. Add the tile to your expanding landscape, then place the animal according to its habitat. Wildlife patterns and large connected habitat corridors both score.",
    steps: [
      "Draft one available habitat-and-wildlife pair.",
      "Connect the habitat tile anywhere in your landscape.",
      "Place the wildlife, then score animal patterns and habitat corridors at the end."
    ],
    tip: "Do not chase every animal. Two or three compatible scoring plans usually build a stronger landscape."
  },
  "Pandemic": {
    duration: "45-60 min",
    tagline: "Coordinate specialists to contain outbreaks and discover four cures.",
    overview: "The team travels between cities, treats disease cubes, shares knowledge, and builds research stations. After every turn, new infections appear. Everyone wins by curing all four diseases before outbreaks or depleted supplies end the game.",
    steps: [
      "Spend four actions moving, treating disease, sharing cards, or building.",
      "Draw two player cards and resolve any epidemic that appears.",
      "Infect new cities, then plan together before the next player's turn."
    ],
    tip: "Treat immediate danger, but remember that curing diseases wins the game. Use each role's special ability deliberately."
  },
  "Exploding Kittens": {
    duration: "15 min",
    tagline: "Avoid exploding, disrupt your friends, and survive the deck.",
    overview: "Play as many action cards as you like, then normally end your turn by drawing. Drawing an Exploding Kitten knocks you out unless you spend a Defuse card and secretly return the kitten somewhere in the deck.",
    steps: [
      "Use action cards to skip, attack, peek, shuffle, or steal.",
      "End your turn by drawing unless an effect says otherwise.",
      "Defuse an explosion or leave the game; the last surviving player wins."
    ],
    tip: "A known kitten near the top of the deck turns every skip and attack card into valuable protection."
  },
  "Splendor": {
    duration: "30 min",
    tagline: "Collect gems, buy developments, and build an efficient engine.",
    overview: "Take gem tokens and spend them on development cards. Every purchased card permanently discounts later purchases, letting you reach stronger cards and attract nobles. The first player to 15 prestige triggers the final round.",
    steps: [
      "Take gem tokens, reserve a card, or buy one face-up development.",
      "Use purchased cards as permanent gem discounts on later turns.",
      "Collect prestige and meet noble requirements; reach 15 points to trigger the finish."
    ],
    tip: "Cheap cards are useful only when they support what you plan to buy next. Build toward colors the nobles reward."
  },
  "Ticket to Ride Europe": {
    duration: "30-60 min",
    tagline: "Connect European cities before rival railways block your route.",
    overview: "Collect sets of colored train cards and spend them to claim routes between cities. Destination tickets reward completed connections and penalize unfinished ones. Tunnels, ferries, and stations add tactical choices to the Europe map.",
    steps: [
      "On your turn, draw train cards, claim one route, or take destination tickets.",
      "Match a route's color and length to place your trains on the map.",
      "Complete destination connections and score routes; unfinished tickets lose points."
    ],
    tip: "Secure narrow links early. Stations can rescue a blocked ticket, but unused stations are worth points."
  }
};

module.exports = { games, gameDetails };
