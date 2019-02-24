module.exports = class BaseOut {
  constructor(proc) {
    this.stream = proc.stream || process.stdout;
  }

  get notTTY() {
    return !this.stream.isTTY;
  }

  write(buffer, cb) {
    return this.stream.write(buffer, cb);
  }

  clearLine(dir) {
    if (this.notTTY) {
      return null;
    }
    this.stream.clearLine(dir);
  }

  cursorTo(x, y) {
    if (this.notTTY) {
      return null;
    }
    this.stream.cursorTo(x, y);
  }

};
