const suits = ['S', 'H', 'D', 'C'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];
let playerCards = [];
let bot1Cards = [];
let bot2Cards = [];
let communityCards = [];
let pot = 0;
let playerBet = 0;

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${rank}${suit}`);
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function getCardImage(card) {
  return `cards/${card}.png`;
}

function renderCards(cards, containerId, reveal = true) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  cards.forEach(card => {
    const img = document.createElement('img');
    img.className = 'card-img';
    img.src = reveal ? getCardImage(card) : 'cards/back.png';
    container.appendChild(img);
  });
}

async function dealCardsAnimated() {
  renderCards([], 'player-cards');
  renderCards([], 'bot1-cards');
  renderCards([], 'bot2-cards');
  renderCards([], 'community-cards');

  // Deal 2 cards each with delay
  for (let i = 0; i < 2; i++) {
    playerCards.push(deck.pop());
    renderCards(playerCards, 'player-cards');

    await delay(400);
    bot1Cards.push(deck.pop());
    renderCards(bot1Cards, 'bot1-cards', false);

    await delay(400);
    bot2Cards.push(deck.pop());
    renderCards(bot2Cards, 'bot2-cards', false);

    await delay(400);
  }

  // Deal community cards
  for (let i = 0; i < 5; i++) {
    communityCards.push(deck.pop());
    renderCards(communityCards.slice(0, i + 1), 'community-cards');
    await delay(500);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function placeBet() {
  const betAmount = 50;
  playerBet += betAmount;
  pot += betAmount * 3; // You + bots
  document.getElementById('pot').textContent = pot;
  document.getElementById('player-bet').textContent = playerBet;
}

async function startNewGame() {
  playerCards = [];
  bot1Cards = [];
  bot2Cards = [];
  communityCards = [];
  pot = 0;
  playerBet = 0;
  document.getElementById('pot').textContent = 0;
  document.getElementById('player-bet').textContent = 0;
  createDeck();
  shuffleDeck();
  await dealCardsAnimated();
}

window.onload = () => {
  startNewGame();
};

