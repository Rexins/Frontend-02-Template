<<<<<<< HEAD
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
=======
import { Timeline, Animation } from './animation'
import { ease, easeIn } from './cubic-bezier'

const line = new Timeline()

line.add(new Animation(document.querySelector('.square').style, 'transform', 0, 500, 2000, 0, ease, (val) => `translateX(${val}px)`))

line.start()


document.querySelector('.pauseBtn').addEventListener('click', function() {
  line.pause()
})
document.querySelector('.resumeBtn').addEventListener('click', function() {
  line.resume()
})
>>>>>>> 8ec6f6d26e54f23a77126950d148142b222589c4
