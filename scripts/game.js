import {
  getRowState,
  getWordState,
  getWordsListState,
  saveState,
  countdown,
} from "./helpers.js";
import { validWords, words } from "./wordList.js";
import { setScore, getScore, getTimer, setTimer } from "./score.js";

let gameBoard = [];
const wl = {
  win: "Win",
  loss: "Loss",
};

let wordleSize = 5;
let currentPos = 0;
let currentRow = 0;
export let word;
let wordSubmitted = "";
let modifierKeys = ["BACKSPACE", "ENTER"];

const wordleContainer = document.getElementById("wordle");
const endGameModal = document.getElementById("complete");
const resultTitle = document.getElementById("result");
const amountOfTurns = document.getElementById("turns");
const timer = document.getElementById("timer");
const scoreSpan = document.getElementById("score");
const timeLeft = document.getElementById("timeLeft");

// const alert = document.getElementById("alert");

export class Game {
  constructor() {
    this.clean();
    this.generateNewBoard();
    if (localStorage.getItem("word")) {
      word = getWordState();
    } else {
      this.generateWord();
    }

    if (getTimer() !== null) {
      countdown(getTimer());
    } else {
      countdown(10);
    }
  }

  clean() {
    currentPos = 0;
    currentRow = 0;
    localStorage.removeItem("word");
    localStorage.removeItem("guessedWords");
    localStorage.removeItem("row");
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

    if (wordState) {
      let count = 0;
      for (let word of wordState) {
        [...word].forEach((char, i) => {
          gameBoard[count][i].textContent = char;
        });
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
    word = words[randomNum];
    // Debugging use only
    console.log(word);
  }

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
  validate(submittedWord) {
    let encodedWord = [...word];
    let encodedSubmittedWord = [...submittedWord];
    if (word == submittedWord) this.endGame(wl.win, currentRow);

    if (!validWords.includes(submittedWord)) {
      this.handleBadWord();
    } else {
      encodedSubmittedWord.forEach((char, i) => {
        if (encodedWord[i] == char) {
          gameBoard[currentRow][i].classList.add("found");
        } else if (encodedWord.includes(char)) {
          gameBoard[currentRow][i].style.backgroundColor = "orange";
        }
      });

      saveState(currentRow, wordSubmitted);
      wordSubmitted = "";
      this.nextPosition();
    }
  }

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
    setTimer(parseFloat(timer.textContent));
    timeLeft.textContent = timer.textContent;
    endGameModal.style.visibility = "visible";
  }

  // Maybe seperate functions
  nextPosition() {
    if (currentPos === 5) {
      currentPos = 0;
      currentRow++;
    } else {
      currentPos++;
    }
  }

  back() {
    wordSubmitted = wordSubmitted.slice(0, -1);
    gameBoard[currentRow][currentPos - 1].textContent = "";
    currentPos--;
  }

  listen(key) {
    if (key == "BACKSPACE" && currentPos > 0) this.back();

    if (key == "ENTER" && currentPos == wordleSize)
      this.validate(wordSubmitted);

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
