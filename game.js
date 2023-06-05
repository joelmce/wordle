import { validWords } from "./wordList.js";

let wordleSize = 5;
const grid = [];
let currentLetter = 0;
let currentRow = 0;
let word;
let wordSubmitted = "";

const wordleContainer = document.getElementById("wordle");

export class Game {
  constructor() {
    this.generateBoard();
  }

  /**
   * Generates a new board
   */
  generateBoard() {
    // Generate the rows
    for (let i = 0; i < wordleSize; i++) {
      const row = document.createElement("div");
      row.className = "row";
      row.id = i;

      // We create a 2D array that reflects what the page is producing
      grid[i] = [];

      // Generate the boxes. Create wordleSize boxes
      for (let j = 0; j < wordleSize; j++) {
        const letterBox = document.createElement("div");
        letterBox.className = "letter";

        // Purely to assist with identifying block positions from the HTML page
        letterBox.id = "box-" + i + "-" + j;

        row.appendChild(letterBox);
        grid[i][j] = letterBox;
      }
      wordleContainer.appendChild(row);
    }
    console.log(grid);
  }

  /**
   * Generate a random word, then assign it to global variable
   */
  generateWord() {
    const randomNum = Math.floor(Math.random() * validWords.length);
    word = validWords[randomNum];

    // Debugging use only
    console.log(word);
  }

  /**
   * This sets the word of the block they are on as the letter they inputted.
   * "" is used for backspacing.
   * Future improvement: Case for more keys to prevent modifer keys & numbers from being pressed and printed
   * @param {*} key Any key (including modifer keys)
   */
  setWord(key) {
    switch (key) {
      case "":
        grid[currentRow][currentLetter].textContent = "";
      default:
        grid[currentRow][currentLetter].textContent = key;
    }
  }

  // Clean the variable, prepare for new submission
  newWord() {
    wordSubmitted = "";
  }

  /**
   * Handles preliminary game logic around letter entry, specifically
   * with validating the input, backspacing, tracking which part of the grid
   * the user is up to.
   *
   * @param {*} key
   */
  listen(key) {
    for (currentRow; currentRow <= wordleSize; currentRow) {
      for (currentLetter; currentLetter <= wordleSize; currentLetter) {
        if (currentLetter == 5) {
          if (key == "ENTER") {
            currentRow++;
            currentLetter = 0;
            console.log(wordSubmitted);
            this.newWord();
            break;
          } else {
            console.log("Nope");
            break;
          }
        } else if (key == "BACKSPACE") {
          currentLetter--;
          this.setWord("");
          break;
        } else {
          this.setWord(key);
          wordSubmitted += key;
          currentLetter++;
          break;
        }
      }

      break;
    }
  }
}
