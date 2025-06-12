const suits = ['♠', '♥', '♣', '♦'];
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
      deck.push({ suit, rank });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCards() {
  createDeck();
  shuffleDeck();
  playerCards = [deck.pop(), deck.pop()];
  bot1Cards = [deck.pop(), deck.pop()];
  bot2Cards = [deck.pop(), deck.pop()];
  communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()];
  pot = 0;
  playerBet = 0;
  renderTable();
}

function renderCards(cards, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.textContent = `${card.rank}${card.suit}`;
    container.appendChild(div);
  });
}

function renderTable() {
  renderCards(playerCards, 'player-cards');
  renderCards([{ rank: '?', suit: '?' }, { rank: '?', suit: '?' }], 'bot1-cards');
  renderCards([{ rank: '?', suit: '?' }, { rank: '?', suit: '?' }], 'bot2-cards');
  renderCards(communityCards.slice(0, 3), 'community-cards');
  document.getElementById('pot').textContent = pot;
  document.getElementById('player-bet').textContent = playerBet;
}

function placeBet() {
  const betAmount = 50;
  playerBet += betAmount;
  pot += betAmount * 3; // You + 2 bots
  document.getElementById('pot').textContent = pot;
  document.getElementById('player-bet').textContent = playerBet;
}

function nextRound() {
  dealCards();
}

window.onload = () => {
  dealCards();
};
