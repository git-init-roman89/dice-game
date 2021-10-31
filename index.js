let player1Turn = true;
let player1Score = 0;
let player2Score = 0;
let playersNames = ["Player 1", "Player 2"];
let gridOne = document.querySelector(".gridOne");
let gridTwo = document.querySelector(".gridTwo");
let dots = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [false, false, true, false, false, false, true, false, false],
  3: [false, false, true, false, true, false, true, false, false],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true],
  9: [false, true, false, true, false, true, false, true, false],
};

const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const player1NameEl = document.getElementById("player1Name");
const input1NameEl = document.getElementById("input-name1");
const player2NameEl = document.getElementById("player2Name");
const input2NameEl = document.getElementById("input-name2");

player1NameEl.addEventListener("submit", function (e) {
  e.preventDefault();
  let value = input1NameEl.value;
  playersNames.unshift(value);

  message.textContent = playersNames[0] + " turn";
});

player2NameEl.addEventListener("submit", function (e) {
  e.preventDefault();
  let value = input2NameEl.value;
  playersNames.push(value);
});

function playerHasWon() {
  rollBtn.style.display = "none";
  resetBtn.style.display = "block";
}

function createDice(grid) {
  for (let i = 0; i < 9; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    grid.appendChild(dot);
  }
}
createDice(gridOne);
createDice(gridTwo);

function renderDiceDots(grid, count) {
  const mask = dots[count];
  console.log(mask, count);
  let children = grid.children;
  for (let i = 0; i < children.length; ++i) {
    const dotLink = children[i];
    if (mask[i]) {
      dotLink.classList.add("dot-active");
    } else {
      dotLink.classList.remove("dot-active");
    }
  }
}

rollBtn.addEventListener("click", function () {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  if (player1Turn === true) {
    renderDiceDots(gridOne, randomNumber);
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = playersNames[0] + " turn";
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
  } else {
    renderDiceDots(gridTwo, randomNumber);
    player1Dice.classList.add("active");
    player2Dice.classList.remove("active");
    message.textContent = playersNames[1] + " turn";
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
  }

  if (player1Score > 19) {
    message.textContent = playersNames[0] + " win!";
    playerHasWon();
  } else if (player2Score > 19) {
    message.textContent = playersNames[1] + " win!";
    playerHasWon();
  }

  player1Turn = !player1Turn;
});

resetBtn.addEventListener("click", reset);

function reset() {
  message.textContent = "Please, enter your names";
  player1Score = 0;
  player1Scoreboard.textContent = player1Score;
  player2Score = 0;
  player2Scoreboard.textContent = player2Score;
  player1Turn = true;
  renderDiceDots(gridOne, 9);
  renderDiceDots(gridTwo, 9);
  player1Dice.classList.add("active");
  player2Dice.classList.remove("active");
  rollBtn.style.display = "block";
  resetBtn.style.display = "none";
}

function createDiceDot(grid, count) {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    grid.appendChild(dot);
  }
}
