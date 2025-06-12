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

function createCardImg(cardName, animated = true) {
  const img = document.createElement("img");
  img.src = `cards/png/${cardName}.png`;
  img.className = "card";
  if (animated) {
    img.style.transform = "scale(0)";
    setTimeout(() => {
      img.style.transform = "scale(1)";
    }, 50);
  }
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
    }, delay + i * 400);
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

  // Deal cards with delay to simulate animation
  dealHand("player-1", playerHand, 0);
  dealHand("bot-1", bot1, 800);
  dealHand("bot-2", bot2, 1600);
  dealHand("bot-3", bot3, 2400);

  // Community cards
  setTimeout(() => {
    dealCommunity(flop);
  }, 3400);
  setTimeout(() => {
    dealCommunity([turn], 4700);
  }, 4700);
  setTimeout(() => {
    dealCommunity([river], 5500);
  }, 5500);
}



