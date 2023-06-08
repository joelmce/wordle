const timerDiv = document.getElementById("timer");
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
