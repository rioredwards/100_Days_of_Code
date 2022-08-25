import Ball from "./Ball.js"
import Paddle from "./paddle.js"
import Ground from "./Ground.js"

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const playerScoreElem = document.getElementById("player-score");
const ground = new Ground(document.getElementById("ground"));

let lastTime;
let keyPressed = '';
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, playerPaddle.rect(), ground.rect());
    playerPaddle.update(delta, keyPressed, ground.rect());
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

/* Call function on specific key press */
document.addEventListener('keydown', e => {
  if (keyPressed.length < 2 && !keyPressed.includes(e.key)) {
    if (e.key === 'd') {
      keyPressed += 'd';
    }
    if (e.key === 'a') {
      keyPressed += 'a';
    }
    if (e.key === 's') {
      keyPressed += 's';
    }
    if (e.key === 'w') {
      keyPressed += 'w';
    }
    console.log('Adding Key', e.key, keyPressed);
  }
});

document.addEventListener('keyup', e => {
  if (e.key === 'd') {
    keyPressed = keyPressed.replace('d', '');
  }
  if (e.key === 'a') {
    keyPressed = keyPressed.replace('a', '');
  }
  if (e.key === 's') {
    keyPressed = keyPressed.replace('s', '');
  }
  if (e.key === 'w') {
    keyPressed = keyPressed.replace('w', '');
  }
  console.log('Removing Key', e.key, keyPressed);
});

// document.addEventListener("mousemove", e => {
//   if (playerPaddle.rect().bottom >= ground.rect().top) {
//     playerPaddle.position = e.y / window.innerHeight * 100;
//   }
// })


window.requestAnimationFrame(update);
