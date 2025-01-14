"use strict";

const submissionBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const guessMessageElement = document.getElementById("guess-message");
const currentGuessElement = document.getElementById("current-guess");
const guessHistoryElement = document.getElementById("guess-history");
const guessInput = document.getElementById("guess-input");
const computerGuessElement = document.getElementById("computer-guess");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let computerNumber = getRandomNumber(1, 50);
let guessHistory = [];
let attemptsLeft = 3;

submissionBtn.addEventListener("click", () => {
  const playerGuess = parseInt(guessInput.value);

  if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 50) {
    guessMessageElement.textContent = "Please enter a valid number between 1 and 50.";
    return;
  }
  guessHistory.push(playerGuess);
  currentGuessElement.textContent = playerGuess;
  guessHistoryElement.textContent = guessHistory.join(", ");

  if (playerGuess === computerNumber) {
    guessMessageElement.textContent = "Congratulations! You won! You guessed the correct number!";
    revealAndHideComputerNumber();
    endGame();
  } else {
    attemptsLeft -= 1;
    if (playerGuess < computerNumber) {
      guessMessageElement.textContent = "Too low!";
    } else {
      guessMessageElement.textContent = "Too high!";
    }

    if (attemptsLeft === 0) {
      guessMessageElement.textContent = "Game over! You've lost and used all your attempts.";
      revealAndHideComputerNumber();
      endGame();
    } else {
      guessMessageElement.textContent += ` You have ${attemptsLeft} attempts left.`;
      revealAndHideComputerNumber();
      computerNumber = getRandomNumber(1, 50); // Generate a new number for the computer's guess
    }
  }
});

restartBtn.addEventListener("click", () => {
  computerNumber = getRandomNumber(1, 50);
  guessHistory = [];
  attemptsLeft = 3;
  
  guessMessageElement.textContent = "";
  currentGuessElement.textContent = "";
  computerGuessElement.textContent = "";
  guessHistoryElement.textContent = "";
  guessInput.value = ""; 

  submissionBtn.disabled = false; 
  restartBtn.disabled = true;
});

function endGame() {
  submissionBtn.disabled = true; 
  restartBtn.disabled = false;
}

function revealAndHideComputerNumber() {
  computerGuessElement.textContent = computerNumber;
  setTimeout(() => {
    computerGuessElement.textContent = "";
  }, 1000); // 1-second delay
}
