/* eslint-disable */
import Ship from "./ship";
import GameBoard from "./gameboard";

test("input 5 contains 5", () => {
  const ship = new Ship();
  expect(ship.hitF(5, 2)[0]).toContain(5);
  expect(ship.hitF(8, 2)[1]).toContain(8);
});

test("test if ship  is sunk", () => {
  const ship = new Ship(5, "carrier");
  ship.hitF(1, 1);
  ship.hitF(1, 2);
  ship.hitF(1, 3);
  ship.hitF(1, 4);
  ship.hitF(1, 5);
  expect(ship.isSunk()).toBeTruthy();
});

test("test if carrier is placed", () => {
  const gameboard = new GameBoard();
  gameboard.placeShip(5, "carrier", 1, 2);
  expect(gameboard.board[1][2].length).toBeTruthy();
  expect(gameboard.board[1][3].length).toBeTruthy();
  expect(gameboard.board[1][4].length).toBeTruthy();
  expect(gameboard.board[1][5].length).toBeTruthy();
  expect(gameboard.board[1][6].length).toBeTruthy();
});

test("reciveAttack 3, 5 checks board to  contain miss", () => {
  const gameboard = new GameBoard();
  gameboard.reciveAttack(3, 5);
  expect(gameboard.board[3][5]).toContain("miss");
});

test("test if ship is hit", () => {
  const gameboard = new GameBoard();
  gameboard.placeShip(5, "carrier", 1, 2);
  gameboard.reciveAttack(1, 2);
  expect(gameboard.board[1][2][0].hit[0]).toContain(1);
});

test("if ship is sunk", () => {
  const gameboard = new GameBoard();
  gameboard.placeShip(5, "carrier", 1, 2);
  gameboard.reciveAttack(1, 2);
  gameboard.reciveAttack(1, 3);
  gameboard.reciveAttack(1, 4);
  gameboard.reciveAttack(1, 5);
  gameboard.reciveAttack(1, 6);
});
