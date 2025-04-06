const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");

const cardsArray = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🍓", "🥝", "🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🍓", "🥝"];

let flippedCards = [];
let lockBoard = false;
let moves = 0;
let matches = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createCard(symbol) {
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = symbol;

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = "❓";

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => flipCard(card, symbol));

  return card;
}

function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push({ card, symbol });

  if (flippedCards.length === 2) {
    moves++;
    updateScore();
    checkForMatch();
  }
}

function checkForMatch() {
  const [first, second] = flippedCards;

  if (first.symbol === second.symbol) {
    matches++;
    updateScore();
    flippedCards = [];
  } else {
    lockBoard = true;
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function updateScore() {
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = matches;
}

function initGame() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  lockBoard = false;
  moves = 0;
  matches = 0;
  updateScore();

  const shuffled = shuffle([...cardsArray]);
  shuffled.forEach(symbol => {
    const card = createCard(symbol);
    gameBoard.appendChild(card);
  });
}

restartBtn.addEventListener("click", initGame);

initGame();
