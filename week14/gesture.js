export function dispatch(element) {
  return (type, properties) => {
    console.log(type)
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }

    element.dispatchEvent(event);
  }
}

export class Listener {
  constructor(element, recongnizer) {
    let isListeningMouse = false;
    const contexts = new Map();

    element.addEventListener("mousedown", (event) => {
      const context = Object.create(null);
      contexts.set("mouse" + (1 << event.button), context);
      recongnizer.start(event, context);
      let mousemove = (event) => {
        let button = 1;
        while (button <= event.buttons) {
          if (button & event.buttons) {
            let key;
            if (button === 2) key = 4;
            else if (button === 4) key = 2;
            else key = button;
            recongnizer.move(event, context);
          }
          button = button << 1;
        }
      };
      let mouseup = (event) => {
        let context = contexts.get("mouse" + (1 << event.button));
        recongnizer.end(event, context);
        if (event.buttons === 0) {
          isListeningMouse = false;
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
        }
      };
      if (!isListeningMouse) {
        isListeningMouse = true;
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      }
    });

    element.addEventListener("touchstart", (event) => {
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recongnizer.start(touch, context);
      }
    });

    element.addEventListener("touchmove", (event) => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        recongnizer.move(touch, context);
      }
    });

    element.addEventListener("touchend", (event) => {
      for (let touch of event.changedTouches) {
        const context = contexts.get(touch.identifier);
        recongnizer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });

    element.addEventListener("touchcancel", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recongnizer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recongnizer {
  constructor(dispatch) {
    this.dispatch = dispatch
  }

  start(point, context) {
    (context.startX = point.clientY), (context.startY = point.clientY);
    context.isPan = false;
    context.isPress = false;
    context.isTap = true;
    context.handler = setTimeout(() => {
      context.isPress = true;
      context.isPan = false;
      this.dispatch('press', {})
    }, 500);

    context.points = [{
      v: Date.now(),
      x: point.clientX,
      y: point.clientY,
    }, ];
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isPress = false;
      context.isTap = false;
      clearTimeout(context.handler);
    }

    if (context.isPan) {
      context.points.push({
        v: Date.now(),
        x: point.clientX,
        y: point.clientY,
      });
    }
  }

  end(point, context) {
    if (context.isTap) {
      this.dispatch("tap");
      clearTimeout(context.handler);
    }
    if (context.isPress) {
      this.dispatch('pressend')
    }

    context.points = context.points.filter((point) => Date.now() - point.v < 500);

    let d, v;
    if (context.points.length === 0) {
      v = 0;
      contxt.isFlick = false
    } else {
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
        (point.clientY - context.points[0].y) ** 2
      );
      v = d / (Date.now() - context.points[0].v);
      context.isFlick = true
      context.isVertical = Math.abs(point.clientY - context.startY) >= Math.abs(point.clientX - context.startX)
    }

    if (v > 1.5) {
      this.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      })
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      this.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick
      })
    }
  }

  cancel(point, context) {
    clearTimeout(context.handler);
  }
}

export function enableGesture(element) {
  new Listener(element, new Recongnizer(dispatch(element)))
}
