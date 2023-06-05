import { Game } from "./game.js";

const wordleSize = 5;
const grid = [];
let currentRow = 0;
let currentLetter = 0;

const game = new Game();
game.generateWord();
let row = game.getRow();
let letter = game.getLetter();
let boardSize = game.getBoardSize();

document.addEventListener("keypress", function (e) {
  const key = e.key.toUpperCase();

  game.listen(key);
});
