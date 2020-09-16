function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

function handle(color) {
  console.log(color)
}

void async function(){
  while(true) {
    handle('green')
    await sleep(10000)
    handle('yellow')
    await sleep(2000)
    handle('red')
    await sleep(5000)
  }
}()
