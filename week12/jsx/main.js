import { createElement } from './framework'
import { Carousel } from './carousel'
import { Timeline, Animation } from './animation'

let d = [
  "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2478654573,3194210932&fm=26&gp=0.jpg",
  "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2129630671,1306849630&fm=26&gp=0.jpg",
  "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2472778272,631440411&fm=26&gp=0.jpg",
  "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1189426794,1991844916&fm=26&gp=0.jpg"
]

let a = <Carousel src={d} />

const line = new Timeline()
line.add(new Animation({}, 'a', 100, 300, 1000, null), Date.now() + 2000)

line.start()

a.mountTo(document.body)
