export class Session {
  constructor(word, row, timeLeft, board) {
    this.word = word;
    this.row = row;
    this.timeLeft = timeLeft;
    this.board = board;
  }

  getWord() {
    return this.word;
  }

  getRow() {
    return this.row;
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  getBoard() {
    return this.board;
  }

  createSession() {
    const sessionObject = {
      word: this.word,
      row: this.row,
      timeLeft: this.timeLeft,
      board: this.board,
    };
    localStorage.setItem("gamestate", JSON.stringify(sessionObject));
  }

  getSession() {}
}
