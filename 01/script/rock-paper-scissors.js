let computerMove = "";
let result = "";
let isAutoPlaying = false;
let intervalId;
const autoPlayButton = document.querySelector(".auto-play-button");
const rockbutton = document.querySelector(".js-rock-button");
const paperbutton = document.querySelector(".js-paper-button");
const scissorsbutton = document.querySelector(".js-scissors-button");
const resetButton = document.querySelector(".reset-button");
const confirmationMessage = document.querySelector(".js-confirmation-message");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    confirmation();
  } else if (event.key === "Enter") {
    event.preventDefault();
  }
});

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

  showText(playerMove);
  //store the current score
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

function confirmation() {
  confirmationMessage.innerHTML =
    'Are you sure you want to reset the score? <button class="js-confirm-button">Yes</button> <button class="js-deny-button">No</button>';
    const confirmButton = document.querySelector(".js-confirm-button");
    const denyButton = document.querySelector(".js-deny-button");
    confirmButton.addEventListener('click',()=>{
      resetScore();
    })
    denyButton.addEventListener('click',()=>{
      confirmationMessage.innerHTML = "";
    })
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  const scoreElement = document.querySelector(".js-score");
  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  //keep the updated the change while refreshing the page
  localStorage.setItem("score", JSON.stringify(score));
  confirmationMessage.innerHTML = "";
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      playGame(pickComputerMove());
    }, 1200);
    isAutoPlaying = true;
    autoPlayButton.innerHTML = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButton.innerHTML = "Auto Play";
  }
}

//add event listener to the buttons
autoPlayButton.addEventListener("click", () => {
  autoPlay();
});
rockbutton.addEventListener("click", () => {
  playGame("rock");
});
paperbutton.addEventListener("click", () => {
  playGame("paper");
});
scissorsbutton.addEventListener("click", () => {
  playGame("scissors");
});
resetButton.addEventListener("click", () => {
  confirmation();
});
/*confirmButton.addEventListener("click", () => {
  resetScore();
});
/*denyButton.addEventListener("click", () => {
  confirmationMessage.innerHTML = "";
});
*/

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
