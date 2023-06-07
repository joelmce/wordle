import { validWords } from "./wordList.js";

const grid = [];

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
   * Handles the submission check. Loops through users submitted word
   * and then checks:
   * a) if the character is in the right spot & letter exists in word
   * b) if the character is in the wrong spot & letter exists in word
   * @param {*} submittedWord
   */
  validate(submittedWord) {
    let encodedWord = [...word];
    let encodedSubmittedWord = [...submittedWord];
    console.log("Validating");

    if (!validWords.includes(submittedWord)) console.log("Not a word");

    encodedSubmittedWord.forEach((c, i) => {
      if (word == submittedWord) this.endGame(true, currentRow);

      console.log(c);
      console.log(encodedWord.includes(c));
      if (encodedWord[i] == c) {
        grid[currentRow][i].classList.add("found");
      } else if (encodedWord.includes(c)) {
        grid[currentRow][i].style.backgroundColor = "orange";
      }
    });
  }

  endGame(wl, turns) {
    console.log("You won in " + turns + " guesses!");
  }

  isLast(pos) {
    return pos == wordleSize ? true : false;
  }

  /**
   * Everytime a user presses a key, we want to handle it
   *
   * @param {*} key
   */
  listen(key) {
    if (currentRow > -1 && currentRow <= 5) {
      if (currentPosition > -1 && currentPosition <= 5) {
        if (key === "ENTER") {
          if (this.isLast(currentPosition)) {
            this.validate(wordSubmitted);
            currentPosition = 0;
            currentRow++;
            wordSubmitted = "";
          }
        } else if (key === "BACKSPACE") {
          grid[currentRow][currentPosition - 1].textContent = "";
          currentPosition--;
        } else {
          if (currentPosition > 4) {
            console.log("Out of bounds");
          } else {
            grid[currentRow][currentPosition].textContent = key;
            wordSubmitted += key;
            currentPosition++;
          }
        }
      }
    }
  }
}
