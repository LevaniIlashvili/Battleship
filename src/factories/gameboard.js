import Ship from "./ship";

function createBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const x = [];
    board.push(x);
    for (let j = 0; j < 10; j += 1) {
      const y = [];
      x.push(y);
    }
  }
  return board;
}

export default function GameBoard() {
  this.board = createBoard();
  this.computerBoard = createBoard();
  this.placeShip = (length, name, x, y, board, direction) => {
    const ship = new Ship(length, name);
    if (name === "carrier") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
        board[x][y + 3].push(ship);
        board[x][y + 4].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
        board[x + 3][y].push(ship);
        board[x + 4][y].push(ship);
      }
    } else if (name === "battleship") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
        board[x][y + 3].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
        board[x + 3][y].push(ship);
      }
    } else if (name === "cruiser" || name === "submarine") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
        board[x][y + 2].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
        board[x + 2][y].push(ship);
      }
    } else if (name === "destroyer") {
      if (direction === "horizontal") {
        board[x][y].push(ship);
        board[x][y + 1].push(ship);
      } else {
        board[x][y].push(ship);
        board[x + 1][y].push(ship);
      }
    }
    return board;
  };
  this.reciveAttack = (x, y, board) => {
    // checks if ship is there
    if (!board[x][y].includes("miss") && board[x][y].length) {
      board[x][y][0].hitF(x, y);
      // checks if position is empty
    } else if (!board[x][y].length) {
      board[x][y].push("miss");
    }
    return board;
  };
  this.randomizeComputerBoard = () => {
    this.placeShip(5, "carrier", 1, 2, this.computerBoard, "horizontal");
    this.placeShip(4, "battleship", 4, 6, this.computerBoard, "horizontal");
    this.placeShip(3, "cruiser", 7, 2, this.computerBoard, "horizontal");
    this.placeShip(3, "submarine", 7, 6, this.computerBoard, "vertical");
    this.placeShip(2, "destroyer", 4, 1, this.computerBoard, "vertical");
  };
}
