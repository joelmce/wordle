/**
 * @todo - Handle win & losses in this file?
 *       - Atleast handle if win/loss and assign scores
 *         in setScore
 *       - Convert any String params to new Dates correctly instead
 *         of externally from this file
 */

/**
 * Sets the current game scoreboard.
 * @param {Number} score
 */
export function setScore(score) {
  // Check if there is a score mapped to the game.
  if (getScore().score()) {
    // Does exist. We want to get previous score & add the difference.
    let previousScore = getScore().score();
    previousScore += score;
    localStorage.setItem("score", previousScore);
  } else {
    // Does not exist, so set new one.
    localStorage.setItem("score", score);
  }
}

/**
 * Returns the current (cached) score of the user
 */
export function getScore() {
  function score() {
    return JSON.parse(localStorage.getItem("score"));
  }

  return { score };
}

/**
 * Returns the time the user had left before closing / refreshing the window
 * @returns {Date}
 */
export function getTimer() {
  return JSON.parse(localStorage.getItem("timer"));
}

/**
 * Set the time of the users session
 * @param {Date} time
 */
export function setTimer(time) {
  localStorage.setItem("timer", JSON.stringify(time));
}
