import { validWords } from "./wordList.js";
const wordleContainer = document.getElementById("wordle");

const wordleSize = 5;
const letterBoxes = [];
let word;

randomWord();

function randomWord() {
  const randomNum = Math.floor(Math.random() * validWords.length);
  word = validWords[randomNum];
  console.log(word);
}

for (let i = 0; i < wordleSize; i++) {
  const row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < wordleSize; j++) {
    const letterBox = document.createElement("div");
    letterBox.className = "letter";
    letterBox.id = "box-" + i + "-" + j;

    row.appendChild(letterBox);
    letterBoxes.push(letterBox);
  }
  wordleContainer.appendChild(row);
}

document.addEventListener("keypress", function (e) {
  const key = e.key.toUpperCase();
  for (const box of letterBoxes) {
    if (box.textContent === "") {
      if (word.includes(key)) {
        box.classList.add("found");
      } else {
        box.classList.add("not-found");
      }
      box.textContent = key;

      break;
    }
  }
});
