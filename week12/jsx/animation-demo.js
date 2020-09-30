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
