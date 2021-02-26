<<<<<<< HEAD
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
=======
const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')
const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class Timeline {
  constructor() {
    this.state = "Inited"
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_TIME] = 0
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4
  }

  start() {
    if (!this.state !== 'Inited')
      return;
    this.state = 'started'
    this[TICK] = () => {
      let now = Date.now();
      for (let animation of this[ANIMATIONS]) {
<<<<<<< HEAD
        let t = now - (this[START_TIME].get(animation) + this[PAUSE_TIME]);
        console.log(t);
        if (t < 0) continue;
        if (t > animation.duration) this[ANIMATIONS].delete(animation);
        animation.receive(Math.min(t, animation.duration));
=======
        let t = now - (this[START_TIME].get(animation) + this[PAUSE_TIME])
        if (t < 0)
          continue;
        if (t > animation.duration)
          this[ANIMATIONS].delete(animation)
        animation.receive(Math.min(t, animation.duration))
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }

  pause() {
<<<<<<< HEAD
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    this[PAUSE_TIME] = Date.now() - this[PAUSE_START];
    this.start();
  }
=======
    if (!this.state !== 'started')
      return;
    this.state = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {
    if (!this.state !== 'paused')
      return;
    this.state = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4

  reset() {
    this.pause()
    this.state = 'Inited'
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_START] = 0
    this[TICK_HANDLER] = null
  }

  add(animation, startTime = Date.now()) {
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

export class Animation {
<<<<<<< HEAD
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
=======
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.timingFunction = timingFunction || (v => v)
    this.delay = delay
    this.template = template
  }

  receive(time) {
    let range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration)
    this.object[this.property] = this.template(this.startValue + range * progress)
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4
  }
}
