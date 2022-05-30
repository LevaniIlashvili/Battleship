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
  this.placeShip = (length, name, x, y) => {
    const ship = new Ship(length, name);
    if (name === "carrier") {
      this.board[x][y].push(ship);
      this.board[x][y + 1].push(ship);
      this.board[x][y + 2].push(ship);
      this.board[x][y + 3].push(ship);
      this.board[x][y + 4].push(ship);
      console.log(this.board);
    } else if (name === "battleship") {
      this.board[x][y].push(ship);
      this.board[x][y + 1].push(ship);
      this.board[x][y + 2].push(ship);
      this.board[x][y + 3].push(ship);
    } else if (name === "cruiser" || name === "submarine") {
      this.board[x][y].push(ship);
      this.board[x][y + 1].push(ship);
      this.board[x][y + 2].push(ship);
    } else if (name === "destroyer") {
      this.board[x][y].push(ship);
      this.board[x][y + 1].push(ship);
    }
    return this.board;
  };
  this.reciveAttack = (x, y) => {
    // checks if ship is there
    if (!this.board[x][y].includes("miss") && this.board[x][y].length) {
      this.board[x][y][0].hitF(x, y);
      console.log(this.board[x][y]);
      // checks if position is empty
    } else if (!this.board[x][y].length) {
      this.board[x][y].push("miss");
    }
    return this.board;
  };
}
