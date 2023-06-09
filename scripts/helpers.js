import { word } from "./game.js";
const timerDiv = document.getElementById("timer");
let guessedWords = [];

export function countdown(timeRemaining) {
  let timer = new Date().getTime() + timeRemaining * 60 * 1000;

  const count = setInterval(function () {
    let now = new Date().getTime();

    let distance = timer - now;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDiv.textContent = minutes + ":" + seconds;
  }, 1000);
}

export function saveState(row, guessedWord) {
  guessedWords.push(guessedWord);
  if (!localStorage.getItem("guessedWords")) {
    localStorage.setItem("guessedWords", JSON.stringify(guessedWords));
    localStorage.setItem("row", JSON.stringify(row));
  } else {
    const tempList = JSON.parse(localStorage.getItem("guessedWords"));
    tempList.push(guessedWord);
    localStorage.setItem("guessedWords", JSON.stringify(tempList));
    localStorage.setItem("row", JSON.stringify(row));
  }
  localStorage.setItem("word", word);
}

export function getWordsListState() {
  const guessedWords = JSON.parse(localStorage.getItem("guessedWords"));
  return guessedWords;
}

export function getRowState() {
  const row = JSON.parse(localStorage.getItem("row"));
  return row;
}

export function getWordState() {
  return localStorage.getItem("word");
}
