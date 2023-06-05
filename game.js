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

  generateBoard() {
    for (let i = 0; i < wordleSize; i++) {
      const row = document.createElement("div");
      row.className = "row";
      row.id = i;

      grid[i] = [];

      for (let j = 0; j < wordleSize; j++) {
        const letterBox = document.createElement("div");
        letterBox.className = "letter";
        letterBox.id = "box-" + i + "-" + j;

        row.appendChild(letterBox);
        grid[i][j] = letterBox;
      }
      wordleContainer.appendChild(row);
    }
    console.log(grid);
  }

  generateWord() {
    const randomNum = Math.floor(Math.random() * validWords.length);
    word = validWords[randomNum];
    console.log(word);
  }

  checkWord(input) {}

  newWord() {
    wordSubmitted = "";
  }

  getRow() {
    return currentRow;
  }

  getLetter() {
    return currentLetter;
  }

  getBoardSize() {
    return wordleSize;
  }

  nextRow() {
    currentRow++;
  }

  nextLetter() {
    currentLetter++;
  }

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
        } else {
          if (grid[currentRow][currentLetter].textContent === "") {
            if (
              word.includes(key) &&
              grid[currentRow].indexOf(grid[currentRow][currentLetter]) ==
                word.indexOf(key)
            ) {
              grid[currentRow][currentLetter].classList.add("found");
            } else if (
              word.includes(key) &&
              grid[currentRow].indexOf(grid[currentRow][currentLetter]) !=
                word.indexOf(key)
            ) {
              grid[currentRow][currentLetter].classList.add(
                "found-wrong-position"
              );
            } else {
              grid[currentRow][currentLetter].classList.add("not-found");
            }
            grid[currentRow][currentLetter].textContent = key;
            wordSubmitted += key;
            currentLetter++;
            break;
          }
        }
      }
      break;
    }
  }
}
