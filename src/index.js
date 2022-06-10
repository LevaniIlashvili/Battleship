import "./style.css";
import GameBoard from "./factories/gameboard";
import Player from "./factories/player";

function renderGameBoard(player) {
  for (let i = 0; i < 10; i += 1) {
    const x = document.createElement("div");
    x.classList.add("x");
    x.style.width = "350px";
    x.style.height = "35px";
    const board = document.querySelector(`.${player}`);
    board.appendChild(x);
    for (let j = 0; j < 10; j += 1) {
      const y = document.createElement("div");
      y.classList.add("y");
      y.classList.add(`${player}`);
      y.setAttribute("id", `${player}${0 + i},${0 + j}`);
      y.style.width = "35px";
      y.style.height = "35px";
      x.appendChild(y);
    }
  }
}

// create boards
renderGameBoard("player");
renderGameBoard("computer");

const playerGameboard = new GameBoard();
// place ships on player board
playerGameboard.placeShip(5, "carrier", 1, 2, playerGameboard.board, "horizontal");
playerGameboard.placeShip(4, "battleship", 4, 5, playerGameboard.board, "horizontal");
playerGameboard.placeShip(3, "cruiser", 7, 7, playerGameboard.board, "horizontal");
playerGameboard.placeShip(3, "submarine", 5, 3, playerGameboard.board, "vertical");
playerGameboard.placeShip(2, "destroyer", 8, 5, playerGameboard.board, "vertical");
// color each ship gray
playerGameboard.board.forEach((x) => {
  x.forEach((y) => {
    if (y.length) {
      const ship = document.getElementById(`player${playerGameboard.board.indexOf(x)},${x.indexOf(y)}`);
      ship.style.backgroundColor = "rgb(163, 163, 163)";
    }
  });
});

// attacking computer board
const computerGameboard = new GameBoard();
computerGameboard.randomizeComputerBoard();

function computerAttack() {
  let player = new Player();

  let playerSquare = playerGameboard.board[player.x][player.y];
  let playerDomSquare = document.getElementById(`player${player.x},${player.y}`);
  // if its ship and ship isnt hit
  if (!playerSquare.includes("miss") && playerSquare.length && !playerSquare[0].hit.find((hitF) => hitF.includes(player.x) && hitF.includes(player.y))) {
    playerDomSquare.style.backgroundColor = "rgb(255, 133, 133)";
    player.computerRandomAttack(playerGameboard.board);
    // if its emtpty
  } else if (!playerSquare.includes("miss") && !playerSquare.length) {
    playerDomSquare.style.backgroundColor = "rgb(133, 255, 179)";
    player.computerRandomAttack(playerGameboard.board);
    // if square has miss in it or ship is hit
  } else {
    let expression;
    // if its ship, expression to pass in while loop.returns array if ship is hit and wont pass loop
    if (playerSquare[0] !== "miss") {
      expression = playerSquare[0].hit.find((hitF) => hitF.includes(player.x)
      && hitF.includes(player.y));
    }
    // if its not empty and has miss in it or ship is hit will generate new coordinates
    while ((playerSquare.length && playerSquare.includes("miss")) || (playerSquare.length && expression)) {
      // new coordinates
      player = new Player();
      playerSquare = playerGameboard.board[player.x][player.y];
      // update expression for loop to check again
      if (!playerSquare.includes("miss") && playerSquare.length) {
        // eslint-disable-next-line no-loop-func
        expression = playerSquare[0].hit.find((hitF) => hitF.includes(player.x)
        && hitF.includes(player.y));
      }
      console.log(expression);
    }
    playerDomSquare = document.getElementById(`player${player.x},${player.y}`);
    // change color to red if its ship
    if (!playerSquare.includes("miss") && playerSquare.length) {
      playerDomSquare.style.backgroundColor = "rgb(255, 133, 133)";
      player.computerRandomAttack(playerGameboard.board);
    // change color to green if its missed
    } else if (!playerSquare.includes("miss") && !playerSquare.length) {
      playerDomSquare.style.backgroundColor = "rgb(133, 255, 179)";
      player.computerRandomAttack(playerGameboard.board);
    }
  }
  console.log(playerGameboard.board);
}

function isGameOver(gameboard, someBoard, player) {
  let carrierIsSunk;
  let battleshipIsSunk;
  let cruiserIsSunk;
  let submarineIsSunk;
  let destroyerIsSunk;
  const board = `${[someBoard]}`;
  gameboard[board].forEach((row) => {
    row.forEach((square) => {
      if (square.length && !square.includes("miss")) {
        if (square[0].name === "carrier" && square[0].isSunk() === true) {
          carrierIsSunk = true;
        } else if (square[0].name === "battleship" && square[0].isSunk() === true) {
          battleshipIsSunk = true;
        } else if (square[0].name === "cruiser" && square[0].isSunk() === true) {
          cruiserIsSunk = true;
        } else if (square[0].name === "submarine" && square[0].isSunk() === true) {
          submarineIsSunk = true;
        } else if (square[0].name === "destroyer" && square[0].isSunk() === true) {
          destroyerIsSunk = true;
        }
      }
    });
  });
  if (carrierIsSunk && battleshipIsSunk && cruiserIsSunk && submarineIsSunk && destroyerIsSunk) {
    const win = document.querySelector(".win");
    const modal = document.querySelector(".modal");
    // eslint-disable-next-line no-unused-expressions
    player === "player" ? win.textContent = "You Win" : win.textContent = "Computer Wins";
    modal.style.display = "block";
  }
}

computerGameboard.computerBoard.forEach((row) => {
  row.forEach((square) => {
    // delete later, colors each ship gray for me too see and debug more easily
    if (square.length) {
      const ship = document.getElementById(`computer${computerGameboard.computerBoard.indexOf(row)},${row.indexOf(square)}`);
      ship.style.backgroundColor = "rgb(163, 163, 163)";
    }
    const x = computerGameboard.computerBoard.indexOf(row);
    const y = row.indexOf(square);
    const div = document.getElementById(`computer${x},${y}`);
    div.addEventListener("click", () => {
      // player attack
      // check if square is hit already and missed, check if ship is there and check if ship is hit
      if (!square.includes("miss") && square.length && !square[0].hit.find((hitF) => hitF.includes(x) && hitF.includes(y))) {
        div.style.backgroundColor = "rgb(255, 133, 133";
        computerGameboard.reciveAttack(x, y, computerGameboard.computerBoard);

        isGameOver(computerGameboard, "computerBoard", "player");

        // changes ship color to gray if it's sunk
        if (square[0].isSunk()) {
          // search for ship's other squares to change color. square[0] only targets one square
          computerGameboard.computerBoard.forEach((xRow) => {
            xRow.forEach((ySquare) => {
              // check if square has ship
              if (!ySquare.includes("miss") && ySquare.length) {
                // check if ship is sunk
                if (ySquare[0].isSunk()) {
                  const ship = document.getElementById(`computer${computerGameboard.computerBoard.indexOf(xRow)},${xRow.indexOf(ySquare)}`);
                  ship.style.backgroundColor = "rgb(163, 163, 163)";
                }
              }
            });
          });
        }
        // computer attack right after user attacks
        computerAttack();

        isGameOver(playerGameboard, "board", "computer");

        // check if square wasnt hit and missed and if ship isnt there
      } else if (!square.includes("miss") && !square.length) {
        // change color to green
        div.style.backgroundColor = "rgb(133, 255, 179)";
        computerGameboard.reciveAttack(x, y, computerGameboard.computerBoard);

        isGameOver(computerGameboard, "computerBoard", "player");

        // computer attack right after user attacks
        computerAttack();

        isGameOver(playerGameboard, "board", "computer");
      }
    });
  });
});

const playAgain = document.querySelector(".play-again");

playAgain.addEventListener("click", () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
});
