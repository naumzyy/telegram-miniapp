const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "jack", "queen", "king", "ace"
];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push(`${value}_of_${suit}`);
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function createCardImg(cardName) {
  const img = document.createElement("img");
  img.src = `cards/png/${cardName}.png`;
  img.className = "card";
  return img;
}

function clearTable() {
  document.querySelectorAll(".hand, #community-cards").forEach(el => el.innerHTML = "");
}

function dealHand(playerId, cards, delay = 0) {
  const handDiv = document.querySelector(`#${playerId} .hand`);
  cards.forEach((card, i) => {
    setTimeout(() => {
      handDiv.appendChild(createCardImg(card));
    }, delay + i * 300);
  });
}

function dealCommunity(cards, delay = 0) {
  const commDiv = document.getElementById("community-cards");
  cards.forEach((card, i) => {
    setTimeout(() => {
      commDiv.appendChild(createCardImg(card));
    }, delay + i * 400);
  });
}

function startGame() {
  clearTable();
  const deck = createDeck();

  const playerHand = [deck.pop(), deck.pop()];
  const bot1 = [deck.pop(), deck.pop()];
  const bot2 = [deck.pop(), deck.pop()];
  const bot3 = [deck.pop(), deck.pop()];

  const flop = [deck.pop(), deck.pop(), deck.pop()];
  const turn = deck.pop();
  const river = deck.pop();

  // Deal cards with animation
  dealHand("player-1", playerHand);
  dealHand("bot-1", bot1, 600);
  dealHand("bot-2", bot2, 1200);
  dealHand("bot-3", bot3, 1800);

  // Deal community cards
  setTimeout(() => {
    dealCommunity(flop);
  }, 2500);
  setTimeout(() => {
    dealCommunity([turn], 3000);
  }, 3000);
  setTimeout(() => {
    dealCommunity([river], 3500);
  }, 3500);
}


