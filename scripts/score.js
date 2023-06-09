export function setScore(score) {
  if (getScore().score()) {
    let previousScore = getScore().score();
    previousScore += score;
    localStorage.setItem("score", previousScore);
  } else {
    localStorage.setItem("score", score);
  }
}

export function getScore() {
  function score() {
    return JSON.parse(localStorage.getItem("score"));
  }

  return { score };
}

export function getTimer() {
  return JSON.parse(localStorage.getItem("timer"));
}

export function setTimer(time) {
  localStorage.setItem("timer", JSON.stringify(time));
}
