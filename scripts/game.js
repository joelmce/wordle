import { validWords } from "./wordList.js";

const grid = [];
const bannedKeys = ["CONTROL", "SHIFT", "ESCAPE", "TAB"];

let wordleSize = 5;
let currentPosition = 0;
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
  setLetter(key) {
    switch (key) {
      case "":
        grid[currentRow][currentPosition].textContent = "";
      default:
        grid[currentRow][currentPosition].textContent = key;
    }
  }

  // Clean the variable, prepare for new submission
  newWord() {
    wordSubmitted = "";
  }

  /**
   * Handles the submission check. Loops through users submitted word
   * and then checks:
   * a) if the character is in the right spot & letter exists in word
   * b) if the character is in the wrong spot & letter exists in word
   * @param {*} submittedWord
   */
  validateWord(submittedWord) {
    console.log(submittedWord);
    let encodedWord = [...word];
    let encodedSubmittedWord = [...submittedWord];

    if (!validWords.includes(submittedWord))
      throw new Error("Word doesn't exist");

    this.newWord();

    encodedSubmittedWord.forEach((value, index) => {
      if (word == submittedWord) this.endGame(currentRow);
      if (encodedWord[index] == value) {
        grid[currentRow][index].classList.add("found");
      } else if (encodedWord.includes(value)) {
        grid[currentRow][index].style.backgroundColor = "orange";
      }
    });
  }

  endGame(turns) {
    console.log("You won in " + turns + " guesses!");
  }

  /**
   * Everytime a user presses a key, we want to handle it
   *
   * @param {*} key
   */
  listen(key) {
    /* Only allow whitelisted keys */
    if (!bannedKeys.includes(key)) {
      /**
       * If the user presses enter AND the row has been completed (5th letter)
       */
      if (key == "ENTER" && currentPosition == 5) {
        console.log(
          "Current Row: " +
            currentRow +
            ". Current Position: " +
            currentPosition +
            ". Key pressed: " +
            key
        );
        /* Submit the word the user typed out */
        this.validateWord(wordSubmitted);
        currentRow++;
        currentPosition = 0;
      } else {
        /**
         * We assume that the user is entering a non-modifier key, so
         * we first set the positions letter as the key entered.
         * TODO: Maybe some more validations? i.e disallow modifiers
         */
        this.setLetter(key);

        /* Append key to the submitted word */
        wordSubmitted += key;

        /* Increment the position */
        currentPosition++;
      }

      /**
       * If the user presses backspace WHILST the position is within the grid boundaries, then go back
       */
      if (key == "BACKSPACE" && currentPosition > 0 && currentPosition <= 5) {
        /* Set the letter and this position nothing */
        this.setLetter("");
        currentPosition--;
      }

      /* End the game is user has exhausted every row */
      if (currentRow == 4) this.endGame(5);
    }
  }
}
