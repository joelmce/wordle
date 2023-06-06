import { validWords } from "./wordList.js";
import { GameState } from "./handleGameState.js";
const grid = [];

let wordleSize = 5;
let currentLetter = 0;
let currentRow = 0;
let word;
let wordSubmitted = "";
let gameState;

const wordleContainer = document.getElementById("wordle");

export class Game {
  constructor() {
    this.generateBoard();
    gameState = GameState.GAME_INPROGRESS;
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
        letterBox.classList.add("letter");

        // Purely to assist with identifying block positions from the HTML page
        letterBox.id = "box-" + i + "-" + j;

        row.appendChild(letterBox);
        grid[i][j] = letterBox;
      }
      wordleContainer.appendChild(row);
    }
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

  getState() {
    return gameState;
  }

  /**
   * Handles the submission check. Loops through users submitted word
   * and then checks:
   * a) if the character is in the right spot & letter exists in word
   * b) if the character is in the wrong spot & letter exists in word
   * @param {*} submittedWord
   */
  submitWord(submittedWord) {
    let encodedWord = [...word];
    let encodedSubmittedWord = [...submittedWord];

    encodedSubmittedWord.forEach((value, index) => {
      // console.log("Value: " + value + ". Index: " + index);
      if (word == submittedWord) {
        this.endGame(currentRow);
      }
      if (encodedWord[index] == value) {
        grid[currentRow - 1][index].classList.add("found");
      } else if (encodedWord.includes(value)) {
        grid[currentRow - 1][index].style.backgroundColor = "orange";
      } else {
        console.log("Error");
      }
    });
  }

  endGame(turns) {
    console.log("You won in " + turns + " guesses!");
    gameState = GameState.GAME_END;
  }

  /**
   * Handles preliminary game logic around letter entry, specifically
   * with validating the input, backspacing, tracking which part of the grid
   * the user is up to.
   *
   * @param {*} key
   */
  listen(key) {
    for (
      currentRow;
      currentRow <= wordleSize && gameState != GameState.GAME_END;
      currentRow
    ) {
      for (currentLetter; currentLetter <= wordleSize; currentLetter) {
        if (currentLetter == 5) {
          if (key == "ENTER") {
            currentRow++;
            currentLetter = 0;
            this.submitWord(wordSubmitted);
            this.newWord();
            console.log(gameState);
            break;
          } else {
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
      if (currentRow == 5) {
        this.endGame(5);
        break;
      }
      break;
    }
  }
}
