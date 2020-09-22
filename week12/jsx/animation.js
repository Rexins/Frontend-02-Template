const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start-time')

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
  }

  start() {
    this[TICK] = () => {
      let now = Date.now()
      for (let animation of this[ANIMATIONS]) {
        let t = now - this[START_TIME].get(animation)
        if (t < 0)
          continue;
        if (t > animation.duration)
          this[ANIMATIONS].delete(animation)
        animation.receive(Math.min(t, animation.duration))
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  pause() {
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {}

  reset() {}

  add(animation, startTime = Date.now()) {
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, timeFunction) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.timeFunction = timeFunction
  }

  receive(time) {
    let range = this.endValue - this.startValue
    this.object[this.property] = this.startValue + range * time / this.duration
  }
}
