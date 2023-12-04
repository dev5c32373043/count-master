export default class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, cb) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(cb);
  }

  off(event, cb) {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event).filter(fn => fn !== cb);
    this.events.set(event, listeners);
  }

  emit(event, data) {
    if (!this.events.has(event)) return;

    this.events.get(event).forEach(cb => {
      cb(data);
    });
  }
}
