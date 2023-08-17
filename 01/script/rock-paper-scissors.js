let computerMove = "";
let result = "";
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(playerMove) {
  computerMove = pickComputerMove();

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
      score.losses++;
    } else if (computerMove === "paper") {
      result = "You win.";
      score.wins++;
    } else if (computerMove === "scissors") {
      result = "Tie.";
      score.ties++;
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
      score.losses++;
    } else if (computerMove === "paper") {
      result = "Tie.";
      score.ties++;
    } else if (computerMove === "scissors") {
      result = "You lose.";
      score.losses++;
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
      score.ties++;
    } else if (computerMove === "paper") {
      result = "You lose.";
      score.losses++;
    } else if (computerMove === "scissors") {
      result = "You win.";
      score.wins++;
    }
  }

  localStorage.setItem("score", JSON.stringify(score));
}

function showText(playerMove) {
  const resultElement = document.querySelector(".result");
  const moveElement = document.querySelector(".js-moves");
  const scoreElement = document.querySelector(".js-score");
  resultElement.innerHTML = `${result}`;

  moveElement.innerHTML = `You <img src="img/${playerMove}-emoji.png" class="scissors-icon">
    <img src="img/${computerMove}-emoji.png" class="rock-icon"> Computer`;
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  const scoreElement = document.querySelector(".js-score");
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}