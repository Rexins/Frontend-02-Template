function sleep(duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration);
  })
}

async function changeColor(duration, color) {
  console.log(`trafficLight：${color}`)
  await sleep(duration)
}

async function main() {
  while (true) {
    await changeColor(3000, 'green')
    await changeColor(2000, 'yellow')
    await changeColor(1000, 'red')
  }
}
