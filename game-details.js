/**
 * Migration note: this data is intentionally UI-agnostic. In Next.js, rename this
 * file to game-details.ts, export `gameDetails`, and type it as
 * `Record<string, GameDetail>`.
 *
 * @typedef {Object} GameDetail
 * @property {string} duration
 * @property {string} tagline
 * @property {string} overview
 * @property {string[]} steps
 * @property {string} tip
 * @property {{src?: string, cardSrc?: string, modalSrc?: string, alt: string}} image
 * @property {{label: string, url: string}} source
 */

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
    tip: "Watch what is disappearing around the table. A great set is only useful if its remaining cards can still reach you.",
    image: {
      cardSrc: "images/games/sushi-go-party-card-v2.webp",
      modalSrc: "images/games/sushi-go-party-hero-v2.webp",
      alt: "Sushi Go Party board game arranged in a colorful paper studio"
    },
    source: { label: "Gamewright", url: "https://gamewright.com/product/Sushi-Go-Party" }
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
    tip: "Your reputation matters. A believable bluff now can make a real shot much stronger later.",
    image: { src: "images/games/cash-n-guns.jpg", alt: "Cash 'n Guns Second Edition board game box" },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/cash-n-guns-2nd-edition" }
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
    tip: "Before taking a color, check what your choice will push into the center for the next player.",
    image: {
      cardSrc: "images/games/azul-card-v2.webp",
      modalSrc: "images/games/azul-hero-v2.webp",
      alt: "Azul board game box and tiles in a Portuguese tile-inspired paper studio"
    },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/azul" }
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
    tip: "A safe clue for two words is often better than a clever clue for four that also points toward the assassin.",
    image: { src: "images/games/codenames.avif", alt: "Codenames board game promotional artwork" },
    source: { label: "Czech Games Edition", url: "https://codenamesgame.com/" }
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
    tip: "A camel buried in a stack can suddenly leap forward when the camel beneath it moves.",
    image: { src: "images/games/camel-up.jpg", alt: "Camel Up board game box" },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/camel-up" }
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
    tip: "Do not chase every animal. Two or three compatible scoring plans usually build a stronger landscape.",
    image: { src: "images/games/cascadia.png", alt: "Cascadia board game box and components" },
    source: { label: "Alderac Entertainment Group", url: "https://www.alderac.com/cascadia/" }
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
    tip: "Treat immediate danger, but remember that curing diseases wins the game. Use each role's special ability deliberately.",
    image: {
      cardSrc: "images/games/pandemic-card-v2.webp",
      modalSrc: "images/games/pandemic-hero-v2.webp",
      alt: "Pandemic board game box and pieces on a dark world-route backdrop"
    },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/pandemic" }
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
    tip: "A known kitten near the top of the deck turns every skip and attack card into valuable protection.",
    image: { src: "images/games/exploding-kittens.png", alt: "Exploding Kittens original edition game box" },
    source: { label: "Exploding Kittens", url: "https://www.explodingkittens.com/products/exploding-kittens-original-edition" }
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
    tip: "Cheap cards are useful only when they support what you plan to buy next. Build toward colors the nobles reward.",
    image: { src: "images/games/splendor.jpg", alt: "Splendor board game box" },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/splendor" }
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
    tip: "Secure narrow links early. Stations can rescue a blocked ticket, but unused stations are worth points.",
    image: { src: "images/games/ticket-to-ride-europe.jpg", alt: "Ticket to Ride Europe board game box" },
    source: { label: "Asmodee official store", url: "https://store.asmodee.com/products/ticket-to-ride-europe-1" }
  }
};

window.POLY_GAME_DETAILS = Object.freeze(gameDetails);
