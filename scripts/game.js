import { validWords } from "./wordList.js";

const grid = [];

let wordleSize = 5;
let currentPos = 0;
let currentRow = 0;
let word;
let wordSubmitted = "";
let modifierKeys = ["BACKSPACE", "ENTER"];

const wordleContainer = document.getElementById("wordle");
// const alert = document.getElementById("alert");

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

  handleBadWord() {
    grid[currentRow].forEach((element) => {
      element.style.animation = "shake .5s";
    });
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

    if (!validWords.includes(submittedWord)) {
      this.handleBadWord();
    } else {
      encodedSubmittedWord.forEach((c, i) => {
        if (word == submittedWord) this.endGame(currentRow);

        if (encodedWord[i] == c) {
          grid[currentRow][i].classList.add("found");
        } else if (encodedWord.includes(c)) {
          grid[currentRow][i].style.backgroundColor = "orange";
        }
      });

      wordSubmitted = "";
      this.step();
    }
  }

  endGame(turns) {
    console.log("You won in " + turns + " guesses!");
  }

  step() {
    if (currentPos === 5) {
      currentPos = 0;
      currentRow++;
    } else {
      currentPos++;
    }
  }

  back() {
    wordSubmitted = wordSubmitted.slice(0, -1);
    grid[currentRow][currentPos - 1].textContent = "";
    currentPos--;
  }

  listen(key) {
    if (key == "BACKSPACE" && currentPos > 0) this.back();

    if (key == "ENTER" && currentPos == 5) this.validate(wordSubmitted);

    if (currentPos != 5) {
      if (!modifierKeys.includes(key)) {
        grid[currentRow][currentPos].textContent = key;
        wordSubmitted += key;
        this.step();
      }
    }
  }
}
