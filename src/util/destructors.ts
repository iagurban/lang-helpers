export class Destructors {
  readonly queue: (() => unknown)[] = [];

  put(fn: () => unknown) {
    this.queue.push(fn);
  }

  clear() {
    this.queue.splice(0, this.queue.length);
  }

  readonly fire = () => {
    for (const fn of this.queue) {
      fn();
    }
    this.clear();
  };
}
