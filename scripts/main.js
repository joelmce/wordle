import { Game } from "./game.js";
import { countdown } from "./helpers.js";

const wordleContainer = document.getElementById("wordle");
const playAgainBtn = document.getElementById("play-again");
let countActive = false;

wordleContainer.innerHTML = "";
let game = new Game();

console.log("Version: 1.1.0");

   /**
   * Keypress event is depreciated, using keydown instead.
   * See more: https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event
   */
  document.addEventListener("keydown", function (e) {
    if (!countActive) countdown(10);

    countActive = true;
    const key = e.key.toUpperCase();
    game.listen(key);
     console.log("Key entered: " + key);
  });

playAgainBtn.addEventListener("click", function () {
  wordleContainer.innerHTML = "";
  game = new Game();
});
