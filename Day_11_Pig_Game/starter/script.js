'use strict';

// DOM Elements
const elBtnRoll = document.querySelector(`.btn--roll`);
const elBtnReset = document.querySelector(`.btn--new`);
const elBtnHold = document.querySelector(`.btn--hold`);
const elDice = document.querySelector(`.dice`);
const elPlayerOne = document.querySelector(`.player--0`);
const elPlayerTwo = document.querySelector(`.player--1`);
let elActivePlayer = elPlayerOne;

// Variables
let rollValue = 0;
let activePlayer = 1;
let activePlayerCurrScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;

const resetGame = function () {
  elActivePlayer.classList.remove(`player--winner`);
  if (activePlayer === 2) {
    elActivePlayer.querySelector(`.name`).textContent = `Player 2`;
    switchPlayer();
  }
  else {
    elActivePlayer.querySelector(`.name`).textContent = `Player 1`;
  }
  rollValue = 0;
  activePlayer = 1;
  activePlayerCurrScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  elPlayerOne.querySelector(`.current-score`).textContent = 0;
  elPlayerTwo.querySelector(`.current-score`).textContent = 0;
  elBtnRoll.addEventListener(`click`, rollDice);
  elBtnHold.addEventListener(`click`, holdScore);
}

const switchPlayer = function () {
  activePlayer = (activePlayer == 1) ? 2 : 1;
  elActivePlayer.classList.remove(`player--active`);
  elActivePlayer = (activePlayer == 2) ? elPlayerTwo : elPlayerOne;
  elActivePlayer.classList.add(`player--active`);
};

const rollDice = function () {
  rollValue = Math.trunc(Math.random() * 6) + 1;
  console.log(`rollValue: ${rollValue}`);
  elDice.src = `./dice-${rollValue}.png`;
  if (rollValue === 1) {
    activePlayerCurrScore = 0;
    elActivePlayer.querySelector(`.current-score`).textContent = activePlayerCurrScore;
    switchPlayer();
    console.log(
      `Active Player: ${activePlayer} 
      Current Player: ${elActivePlayer}`);
  }
  else {
    activePlayerCurrScore += rollValue;
    elActivePlayer.querySelector(`.current-score`).textContent = activePlayerCurrScore;
  }
};

const holdScore = function () {
  if (activePlayer == 1) {
    playerOneTotalScore += activePlayerCurrScore;
    document.querySelector(`#score--0`).textContent = playerOneTotalScore;
    if (playerOneTotalScore >= 100) {
      gameWon();
    }
    else {
      activePlayerCurrScore = 0;
      switchPlayer();
    }
  }
  else {
    playerTwoTotalScore += activePlayerCurrScore;
    document.querySelector(`#score--1`).textContent = playerTwoTotalScore;
    if (playerTwoTotalScore >= 100) {
      gameWon();
    }
    else {
      activePlayerCurrScore = 0;
      switchPlayer();
    }
  }
};

const gameWon = function () {
  elActivePlayer.querySelector(`.name`).textContent = `Winner 🐖`;
  elActivePlayer.classList.add(`player--winner`);
  elBtnRoll.removeEventListener(`click`, rollDice);
  elBtnHold.removeEventListener(`click`, holdScore);
}

resetGame();
elBtnRoll.addEventListener(`click`, rollDice);
elBtnHold.addEventListener(`click`, holdScore);
elBtnReset.addEventListener(`click`, resetGame);
