"use strict";

const submissionBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const guessMessageElement = document.getElementById("guess-message");
const currentGuessElement = document.getElementById("current-guess");
const computerGuessElement = document.getElementById("computer-guess");
const guessHistoryElement = document.getElementById("guess-history");
const guessInput = document.getElementById("guess-input");

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
    computerGuessElement.textContent = computerNumber;
    guessHistoryElement.textContent = guessHistory.join(", ");

    if (playerGuess === computerNumber) {
      guessMessageElement.textContent = "Congratulations You Won! You guessed the correct number!";
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
        endGame();
      } else {
        guessMessageElement.textContent += ` You have ${attemptsLeft} attempts left.`;
        computerNumber = getRandomNumber(1, 50); // Generate a new number after an incorrect guess
3
      }
    }
  });

  guessMessageElement.textContent = "";
  currentGuessElement.textContent = "";
  computerGuessElement.textContent = "";
  guessHistoryElement.textContent = "";


  