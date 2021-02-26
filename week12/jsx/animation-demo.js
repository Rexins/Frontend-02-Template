import { Timeline, Animation } from "./animation.js";
const el = document.querySelector(".el1");
console.log(el);

const line = new Timeline();

line.add(
  new Animation(
    el.style,
    "transform",
    0,
    100,
    3000,
    null,
    (v) => `translateX(${v}px)`
  )
);

document.querySelector(".pause").addEventListener("click", () => {
  line.pause();
});
document.querySelector(".resume").addEventListener("click", () => {
  line.resume();
});

line.start();
