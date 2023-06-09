import {
  getRowState,
  getWordState,
  getWordsListState,
  saveState,
  countdown,
} from "./helpers.js";
import { validWords, words } from "./wordList.js";
import { setScore, getScore } from "./score.js";

let gameBoard = [];
const wl = {
  win: "Win",
  loss: "Loss",
};

let wordleSize = 5;
let currentPos = 0;
let currentRow = 0;
let wordSubmitted = "";
let modifierKeys = ["BACKSPACE", "ENTER"];

const wordleContainer = document.getElementById("wordle");
const endGameModal = document.getElementById("complete");
const resultTitle = document.getElementById("result");
const amountOfTurns = document.getElementById("turns");
const timer = document.getElementById("timer");
const scoreSpan = document.getElementById("score");
const timeLeft = document.getElementById("timeLeft");

export class Game {
  constructor(reset) {
    if (reset) {
      this.clean();
      this.newGame();
    } else {
      this.newGame();
    }
  }

  /**
   * New game.
   */
  newGame() {
    this.word = getWordState() || this.generateWord();
    console.log("Generated word at constructor: ", this.word);
    this.generateNewBoard();

    currentPos = 0;
    countdown();
  }

  /**
   * Reset the game state
   */
  clean() {
    currentPos = 0;
    currentRow = 0;

    localStorage.removeItem("word");
    localStorage.removeItem("guessedWords");
    localStorage.removeItem("row");

    countdown(true);
    endGameModal.style.visibility = "hidden";
  }

  /**
   * Generates a new board
   */
  generateNewBoard() {
    const wordState = getWordsListState();
    const rowState = getRowState();
    // Generate the rows
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("div");
      row.className = "row";
      row.id = i;

      // We create a 2D array that reflects what the page is producing
      gameBoard[i] = [];

      // Generate the boxes. Create wordleSize boxes
      for (let j = 0; j < wordleSize; j++) {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter");

        // Purely to assist with identifying block positions from the HTML page
        letterBox.id = "box-" + i + "-" + j;

        row.appendChild(letterBox);
        gameBoard[i][j] = letterBox;
      }
      wordleContainer.appendChild(row);
    }

    // If there is a cached session, then we want to run this
    if (wordState) {
      let count = 0;

      // Iterate through all the words the user has guessed
      for (let word of wordState) {
        [...word].forEach((char, i) => {
          gameBoard[count][i].textContent = char;
        });

        // We will revalidate each of those words
        this.validate(word, count);
        count++;
      }
      currentRow = rowState + 1;
    }
  }

  /**
   * Generate a random word, then assign it to global variable
   */
  generateWord() {
    const randomNum = Math.floor(Math.random() * words.length);
    return words[randomNum];
    // Debugging use only
    console.log(this.word);
  }

  /**
   * Animate the row with a small, concise animation
   */
  handleBadWord() {
    gameBoard[currentRow].forEach((element) => {
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
  validate(submittedWord, turnState) {
    const encodedWord = [...this.word]; // ['P', 'L', 'A', 'N', 'E']
    const encodedSubmittedWord = [...submittedWord];
    if (this.word == submittedWord) this.endGame(wl.win, currentRow);

    if (!validWords.includes(submittedWord)) {
      this.handleBadWord();
    } else {
      encodedSubmittedWord.forEach((char, i) => {
        if (encodedWord[i] == char) {
          gameBoard[turnState][i].classList.add("found");
        } else if (encodedWord.includes(char)) {
          gameBoard[turnState][i].style.backgroundColor = "orange"; // @todo make classlist add
        }
      });
      if (wordSubmitted != "") {
        saveState(this.word, turnState, wordSubmitted);
      }
      wordSubmitted = "";
      this.nextPosition();
    }
  }

  /**
   * End the game
   * @param {*} result
   * @param {*} turns
   */
  endGame(result, turns) {
    if (result == "Win") {
      setScore(turns + 100);
    }

    if (result == "Loss") {
      setScore(turns - 100);
    }
    resultTitle.textContent = `You have ${
      result === "Win" ? "won! " : "lost. "
    }`;
    amountOfTurns.textContent = `${
      turns == 0 ? turns + 1 + " turn" : turns + 1 + " turns"
    }`;

    scoreSpan.textContent = getScore().score();

    timeLeft.textContent = timer.textContent;
    endGameModal.style.visibility = "visible";
  }

  /**
   * Increment the players position in the grid
   */
  nextPosition() {
    if (currentPos === 5) {
      currentPos = 0;
      currentRow++;
    } else {
      currentPos++;
    }
  }

  /**
   * Go back one spot in the grid, and then make textContent blank
   */
  back() {
    wordSubmitted = wordSubmitted.slice(0, -1);
    gameBoard[currentRow][currentPos - 1].textContent = "";
    currentPos--;
  }

  /**
   * Function is called upon every time a user is interacting
   * with their keyboard
   *
   * Handles most of the primary functions such as checking keys
   * and handling if a player should be winning or going to next row.
   * @param {*} key
   */
  listen(key) {
    if (key == "BACKSPACE" && currentPos > 0) this.back();

    if (key == "ENTER" && currentPos == wordleSize)
      this.validate(wordSubmitted, currentRow);

    if (currentRow == 6) this.endGame(wl.loss, currentRow);

    if (currentPos != 5) {
      if (!modifierKeys.includes(key)) {
        gameBoard[currentRow][currentPos].textContent = key;
        wordSubmitted += key;
        this.nextPosition();
      }
    }
  }
}
