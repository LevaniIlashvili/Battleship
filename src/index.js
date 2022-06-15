/* eslint-disable no-param-reassign */
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

// render board when game starts for placing ships
function renderShipPlaceBoard() {
  for (let i = 0; i < 10; i += 1) {
    const x = document.createElement("div");
    x.classList.add("place-x");
    x.style.width = "350px";
    x.style.height = "35px";
    const board = document.querySelector(".modal-board");
    board.appendChild(x);
    for (let j = 0; j < 10; j += 1) {
      const y = document.createElement("div");
      y.classList.add("place-y");
      y.setAttribute("id", `${0 + i},${0 + j}`);
      y.style.width = "35px";
      y.style.height = "35px";
      x.appendChild(y);
    }
  }
}

renderShipPlaceBoard();

const ships = document.querySelectorAll(".ship");
const squares = document.querySelectorAll(".place-y");
ships.forEach((ship) => {
  // remove ship when dragged
  ship.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  // rotate ship when dblclicked
  ship.addEventListener("dblclick", () => {
    if (!ship.classList.contains("vertical")) {
      ship.style.flexDirection = "column";
      ship.classList.remove("horizontal");
      ship.classList.add("vertical");
      if (ship.id === "carrier") {
        ship.style.height = "175px";
        ship.style.width = "35px";
      } else if (ship.id === "battleship") {
        ship.style.height = "140px";
        ship.style.width = "35px";
      } else if (ship.id === "cruiser" || ship.id === "submarine") {
        ship.style.height = "105px";
        ship.style.width = "35px";
      } else if (ship.id === "destroyer") {
        ship.style.height = "70px";
        ship.style.width = "35px";
      }
    } else if (ship.classList.contains("vertical")) {
      ship.style.flexDirection = "row";
      ship.classList.remove("vertical");
      ship.classList.add("horizontal");
      if (ship.id === "carrier") {
        ship.style.height = "35px";
        ship.style.width = "175px";
      } else if (ship.id === "battleship") {
        ship.style.height = "35px";
        ship.style.width = "140px";
      } else if (ship.id === "cruiser" || ship.id === "submarine") {
        ship.style.height = "35px";
        ship.style.width = "105px";
      } else if (ship.id === "destroyer") {
        ship.style.height = "35px";
        ship.style.width = "70  px";
      }
    }
  });
});

// dragging functional
squares.forEach((square) => {
  square.addEventListener("dragenter", (e) => {
    e.target.classList.add("drag-over");
    e.preventDefault();
  });
  square.addEventListener("dragover", (e) => {
    e.target.classList.add("drag-over");
    e.preventDefault();
  });
  square.addEventListener("dragleave", (e) => {
    e.target.classList.remove("drag-over");
  });
  square.addEventListener("drop", (e) => {
    e.target.classList.remove("drag-over");

    // get the draggable element
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    if (e.target.classList.value === "place-y") {
      // add ships to gameboard
      const x = parseInt(e.target.id.slice(0, 1), 10);
      const y = parseInt(e.target.id.slice(2), 10);
      // check ship direction, name and if its placed on board, not outside of it
      if (draggable.classList.contains("horizontal")) {
        if (draggable.id === "carrier" && playerGameboard.board[0][y + 4]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(5, "carrier", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "battleship" && playerGameboard.board[0][y + 3]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(4, "battleship", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "cruiser" && playerGameboard.board[0][y + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "cruiser", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "submarine" && playerGameboard.board[0][y + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "submarine", x, y, playerGameboard.board, "horizontal");
        } else if (draggable.id === "destroyer" && playerGameboard.board[0][y + 1]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(2, "destroyer", x, y, playerGameboard.board, "horizontal");
        }
      } else if (draggable.classList.contains("vertical")) {
        if (draggable.id === "carrier" && playerGameboard.board[x + 4]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(5, "carrier", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "battleship" && playerGameboard.board[x + 3]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(4, "battleship", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "cruiser" && playerGameboard.board[x + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "cruiser", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "submarine" && playerGameboard.board[x + 2]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(3, "submarine", x, y, playerGameboard.board, "vertical");
        } else if (draggable.id === "destroyer" && playerGameboard.board[x + 1]) {
          e.target.appendChild(draggable);
          playerGameboard.placeShip(2, "destroyer", x, y, playerGameboard.board, "vertical");
        }
      }
    }
  });
});

const shipsContainer = document.querySelector(".ships");
shipsContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});
shipsContainer.addEventListener("drop", (e) => {
  // get the draggable element
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  // add it to the drop target
  if (e.target.classList.value === "ships") {
    e.target.appendChild(draggable);
  }
});

// start game and color ships gray on gameboard
const start = document.querySelector(".start");
start.addEventListener("click", () => {
  if (!shipsContainer.children.length) {
    const placeShipsModal = document.querySelector(".place-ships-modal");
    placeShipsModal.style.display = "none";
    playerGameboard.board.forEach((ex) => {
      ex.forEach((ey) => {
        if (ey.length) {
          const ship = document.getElementById(`player${playerGameboard.board.indexOf(ex)},${ex.indexOf(ey)}`);
          ship.style.backgroundColor = "rgb(163, 163, 163)";
        }
      });
    });
  }
});

// attacking computer board
const computerGameboard = new GameBoard();
computerGameboard.randomizeComputerBoard();

function computerAttack() {
  // create player to generate random numbers for x and y
  let player = new Player();

  let playerSquare = playerGameboard.board[player.x][player.y];
  let playerDomSquare = document.getElementById(`player${player.x},${player.y}`);
  // if its ship and ship isnt hit
  if (!playerSquare.includes("miss") && playerSquare.length && !playerSquare[0].hit.find((hitF) => hitF[0] === player.x && hitF[1] === player.y)) {
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
      expression = playerSquare[0].hit.find((hitF) => hitF[0] === player.x
      && hitF[1] === player.y);
    }
    // if its not empty and has miss in it or ship is hit will generate new coordinates
    while ((playerSquare.length && playerSquare.includes("miss")) || (playerSquare.length && expression)) {
      // new coordinates
      player = new Player();
      console.log(player.x, player.y);
      playerSquare = playerGameboard.board[player.x][player.y];
      // update expression for loop to check again
      if (!playerSquare.includes("miss") && playerSquare.length) {
        // eslint-disable-next-line no-loop-func
        expression = playerSquare[0].hit.find((hitF) => hitF[0] === player.x
        && hitF[1] === player.y);
      }
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
}

function isGameOver(gameboard, someBoard, player) {
  const win = document.querySelector(".win");
  const modal = document.querySelector(".modal");
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
  if (carrierIsSunk && battleshipIsSunk && cruiserIsSunk && submarineIsSunk && destroyerIsSunk && modal.style.display !== "block") {
    // eslint-disable-next-line no-unused-expressions
    player === "player" ? win.textContent = "You Win" : win.textContent = "Computer Wins";
    modal.style.display = "block";
  }
}

computerGameboard.computerBoard.forEach((row) => {
  row.forEach((square) => {
    const x = computerGameboard.computerBoard.indexOf(row);
    const y = row.indexOf(square);
    const div = document.getElementById(`computer${x},${y}`);
    div.addEventListener("click", () => {
      // player attack
      // check if square is hit already and missed, check if ship is there and check if ship is hit
      if (!square.includes("miss") && square.length && !square[0].hit.find((hitF) => hitF[0] === x && hitF[1] === y)) {
        div.style.backgroundColor = "rgb(255, 133, 133";
        computerGameboard.reciveAttack(x, y, computerGameboard.computerBoard);
        console.log(computerGameboard.computerBoard);

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

// const array = [[7, 8], [7, 7]];

// console.log(array.find((hitF) => hitF.includes(7) && hitF.includes(7)));
