
document.addEventListener("DOMContentLoaded", function () {
  const option1Button = document.getElementById("option1");
  const gameContainer = document.getElementById("game-container");
  const contentContainer = document.getElementById("content-container");
  const credit = document.getElementById("footer_credit");
  let newContainerCreated = false;

  option1Button.addEventListener("click", function () {
    // Check if the new container has already been created
    if (!newContainerCreated) {
      credit.style.marginTop = "-40px";
      gameContainer.style.padding = "4vh";
      gameContainer.style.transition = "padding 0.5s";
      // Create a new <iframe> element to load the new HTML page
      const iframe = document.createElement("iframe");

      iframe.src = "page2.html";

      iframe.style.width = "500px";
      iframe.style.height = "500px";
      iframe.style.border = "none";

      // Append the iframe to the content container
      contentContainer.appendChild(iframe);

      newContainerCreated = true;
    }
  });
});



// Tic Tac Toe Game functionality
const cells = Array.from(document.querySelectorAll(".cell"));
const resetButton = document.querySelector(".reset-button");
const playerXScore = document.querySelector("#playerXScore");
const playerOScore = document.querySelector("#playerOScore");

let currentPlayer = "X";
let gameActive = true;
let gameBoard = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const { target: cell } = e;
  const index = cells.indexOf(cell);

  if (gameBoard[index] !== "" || !gameActive) {
    return;
  }

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    endGame();
    return;
  }

  if (checkDraw()) {
    endGame(true);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const checkWin = () => {
  return winningCombinations.some(
    ([a, b, c]) =>
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
  );
};

const checkDraw = () => {
  return gameBoard.every((cell) => cell !== "");
};

const endGame = (isDraw) => {
  gameActive = false;
  if (isDraw) {
    alert("It's a draw!");
  } else {
    alert(`Player ${currentPlayer} wins!`);
    currentPlayer === "X"
      ? (playerXScore.textContent = parseInt(playerXScore.textContent) + 1)
      : (playerOScore.textContent = parseInt(playerOScore.textContent) + 1);
  }
};

const resetGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameBoard = Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
