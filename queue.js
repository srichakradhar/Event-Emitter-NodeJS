const { EventEmitter } = require('events');

class AysncQueue extends EventEmitter {

  constructor() {
    super();
    this.tasks = [];
    this.currentInterval = 250;
    this.processing = false;
  }

  enqueue(item) {
    this.tasks.push(item);
    this.emit("enqueued", item);
  }

  getCurrentInterval() {
    return this.currentInterval;
  }
  peek() {
    return this.tasks[0];
  }

  print() {
    return this.tasks;
  }

  start() {
    this.processing = true;
    this.currentInterval = this.tasks[0];
    setTimeout(function () {
      console.log(`Task ${this.currentInterval} processing`);
      this.tasks.shift();
    }, this.currentInterval).bind(this);
  }

  pause() {
    this.processing = false;
  }

}

exports.default = AysncQueue;