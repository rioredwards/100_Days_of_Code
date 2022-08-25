const SPEED = .02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.paddleElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.paddleElem.style.setProperty("--y", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
  }

  update(delta, keyPressed, groundRect) {
    const paddleRect = this.rect();

    if (keyPressed.includes('d')) {
      this.x += SPEED * delta;
    }

    if (keyPressed.includes('a')) {
      this.x -= SPEED * delta;
    }

    if (keyPressed.includes('w')) {
      this.y -= SPEED * delta;
    }

    if (keyPressed.includes('s')) {
      if (paddleRect.bottom <= groundRect.top) {
        this.y += SPEED * delta;
      }
    }
  }
}
