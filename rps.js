// Playing a round of RPS against a computer who picks his choice random
// Create array of "Rock", "Paper" & "Scissor"
// Create a function that randomly picks one value out of the array
// Ask the user for input (case insensitve)
// Create a String that declares the winner like "You win! Paper beats Rock" if the player wins, else "You lose! Paper beats Rock"

// function for creating a number between 0 and 2 (min and max size of array)

//// GLOBAL VARIABLES ////
const choices = ["Rock", "Paper", "Scissors"];
let win;
let lose;
const results = document.querySelector("#results h2");
let playerCount = 0;
let computerCount = 0;
let playerChoice = "";
let currentScore = document.createElement("p");
const scoreboard = document.querySelector("#main p");
const buttons = Array.from(document.querySelectorAll(".choice"));

function randomNumber() {
  const min = 0;
  const max = 3;
  let rndNumber = Math.floor(Math.random() * max + min);
  return rndNumber;
}

// Function for generating a random choice
function computerPlay() {
  return choices[randomNumber()];
}

// EventListeners on all buttons to assign a value to playerChoice and start a game
const rock = document.querySelector("#rock");
rock.addEventListener("click", () => {
  playerChoice = "Rock";
  rock.classList.add("press");
  game(playerChoice);
});

const paper = document.querySelector("#paper");
paper.addEventListener("click", () => {
  playerChoice = "Paper";
  paper.classList.add("press");
  game(playerChoice);
});

const scissors = document.querySelector("#scissors");
scissors.addEventListener("click", () => {
  playerChoice = "Scissors";
  scissors.classList.add("press");
  game(playerChoice);
});

//TRANSITIONREMOVER
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("press");
}

// GAME
function game(playerInput) {
  // revert to normal after animation
  buttons.forEach((button) =>
    button.addEventListener("transitionend", removeTransition)
  );
  let interimResult = playRound(playerInput, computerPlay());
  results.textContent = interimResult;

  if (interimResult === win) {
    playerCount++;
  } else if (interimResult === lose) {
    computerCount++;
  }

  // update scoreboard
  scoreboard.textContent = `PLAYER ${playerCount} VS COMPUTER   ${computerCount}`;

  if (playerCount >= 5 || computerCount >= 5) {
    if (playerCount > computerCount) {
      results.textContent = "YOU WIN!";
    } else {
      results.textContent = "YOU LOSE!";
    }

    playerCount = 0;
    computerCount = 0;
  }
}

function playRound(playerSelection, computerSelection) {
  // result strings
  win = `You won this round! ${playerSelection} beats ${computerSelection}`;
  lose = `You lost this round! ${computerSelection} beats ${playerSelection}`;
  // 0 == rock, 1 == paper, 2 == scissors
  switch (true) {
    case playerSelection === computerSelection:
      return "You made the same choice.";

    // if player chooses rock -> check if computer chose paper
    case playerSelection === choices[0]:
      if (computerSelection === choices[1]) {
        return lose;
      } else {
        return win;
      }
    // if player chooses paper -> check if computer chose scissors
    case playerSelection === choices[1]:
      if (computerSelection === choices[2]) {
        return lose;
      } else {
        return win;
      }
    // if player chosses scissors -> check if computer chose rock
    case playerSelection === choices[2]:
      if (computerSelection === choices[0]) {
        return lose;
      } else {
        return win;
      }
  }
}
