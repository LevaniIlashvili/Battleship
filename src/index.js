import "./style.css";
import Ship from "./factories/ship";
import GameBoard from "./factories/gameboard";

const gameboard = new GameBoard();
const ship = new Ship();
gameboard.placeShip(5, "carrier", 1, 2);
gameboard.reciveAttack(1, 2);