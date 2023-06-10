/**
 * @todo - Change function names to something more appropriate
 *       - Maybe cache functions can be seperated into different
 *         file.
 */

const timerDiv = document.getElementById("timer");

let guessedWords = [];

/**
 * Inspired & resourced from Stackoverflow answer:
 * https://stackoverflow.com/a/58742956
 *
 * Mainly seeked assistance with the maths side of the equation,
 * rather than the logic.
 * @param {Date} timeRemaining a float or int will return whole number.
 * Must convert the @param timeRemaining to a new Date.
 */
export function countdown(timeRemaining) {
  let timer = new Date().getTime() + timeRemaining * 60 * 1000;

  const count = setInterval(function () {
    let now = new Date().getTime();

    let distance = timer - now;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDiv.textContent = minutes + ":" + seconds;
  }, 1000); // Second decrement
}

/**
 * Will save the following variables to localStorage:
 * 1. The words they have guessed;
 * 2. The row they are up to (turns)
 * 3. The word selected by the game.
 * @param {String} row
 * @param {String} guessedWord
 */
export function saveState(word, row, guessedWord) {
  // Push their word to a global variable that we can manipulate
  guessedWords.push(guessedWord);

  // Checks to see if item is in cache
  if (!localStorage.getItem("guessedWords")) {
    // Does not exist.
    localStorage.setItem("guessedWords", JSON.stringify(guessedWords));
    localStorage.setItem("row", JSON.stringify(row));
  } else {
    // Does exist.
    // Create a temporary list to add to previous state, then push.
    const tempList = JSON.parse(localStorage.getItem("guessedWords"));
    tempList.push(guessedWord);

    // Override previous list with the new temporary list.
    localStorage.setItem("guessedWords", JSON.stringify(tempList));

    // We don't care about previous row stored, so override!
    localStorage.setItem("row", JSON.stringify(row));
  }

  // Set the word to local storage, finally!
  localStorage.setItem("word", word);
}

/**
 * @returns a list of words the user has guessed.
 */
export function getWordsListState() {
  const guessedWords = JSON.parse(localStorage.getItem("guessedWords"));
  return guessedWords;
}

/**
 *
 * @returns {Number} of the current row their game is up to.
 */
export function getRowState() {
  const row = JSON.parse(localStorage.getItem("row"));
  return row;
}

/**
 * @returns the game word
 */
export function getWordState() {
  return localStorage.getItem("word");
}
