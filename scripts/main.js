import { Game } from "./game.js";

const wordleContainer = document.getElementById("wordle");
const playAgainBtn = document.getElementById("play-again");

wordleContainer.innerHTML = "";
let game = new Game();

console.log("Version: 1.3.0");

/**
 * Keypress event is depreciated, using keydown instead.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
 */
document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();
  game.listen(key);
});

playAgainBtn.addEventListener("click", function () {
  wordleContainer.innerHTML = "";
  game = new Game();
});
