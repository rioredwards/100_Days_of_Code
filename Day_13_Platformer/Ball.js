const INITIAL_VELOCITY = .03;
const VELOCITY_INCREASE = .000001;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect()
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY;
    console.log(this.direction);
  }

  update(delta, paddleRect, groundRect) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const ballRect = this.rect();

    if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
      this.direction.y *= -1;
    }

    if (ballRect.bottom >= groundRect.top) {
      this.direction.y *= -1;
    }

    if (isCollision(ballRect, paddleRect, groundRect)) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(ballRect, paddleRect, groundRect) {
  return (ballRect.left <= paddleRect.right
    && ballRect.top <= paddleRect.bottom
    && ballRect.bottom >= paddleRect.top);
}
