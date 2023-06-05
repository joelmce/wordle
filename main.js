import { Game } from "./game.js";

const wordleSize = 5;
const grid = [];
let currentRow = 0;
let currentLetter = 0;

const game = new Game();
game.generateWord();

console.log("Version: 1.1.0");

/**
 * Keypress event is depreciated, using keydown instead.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
 */
document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();

  game.listen(key);
});
