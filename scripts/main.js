import { Game } from "./game.js";
import { Modal } from "./modal.js";
const gameType = document.getElementById("changeType");

const wordleSize = 5;
const grid = [];
let currentRow = 0;
let currentLetter = 0;

const game = new Game();
game.generateWord();
game.startGame();

console.log("Version: 1.1.0");

/**
 * Keypress event is depreciated, using keydown instead.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
 */
document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();

  game.listen(key);
});

gameType.addEventListener("click", function () {
  const modal = Modal(gameType.id);
  modal.open();
});
