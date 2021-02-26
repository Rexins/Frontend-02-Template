const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_TIME] = 0;
  }

  start() {
    this[TICK] = () => {
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
        let t = now - (this[START_TIME].get(animation) + this[PAUSE_TIME]);
        console.log(t);
        if (t < 0) continue;
        if (t > animation.duration) this[ANIMATIONS].delete(animation);
        animation.receive(Math.min(t, animation.duration));
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }

  pause() {
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    this[PAUSE_TIME] = Date.now() - this[PAUSE_START];
    this.start();
  }

  reset() {}

  add(animation, startTime = Date.now()) {
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    timeFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timeFunction = timeFunction;
    this.template = template || ((v) => v);
  }

  receive(time) {
    let range = this.endValue - this.startValue;
    console.log(
      this.template(this.startValue + (range * time) / this.duration)
    );

    this.object[this.property] = this.template(
      this.startValue + (range * time) / this.duration
    );
  }
}
