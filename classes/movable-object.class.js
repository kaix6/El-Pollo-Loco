class MovableObject extends DrawableObject {
  speed = 0.3;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 200;
  }

  

  // character ist colliding chicken
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // difference in s
    return timepassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRightCharacter() {
    this.x += this.speed;
    this.otherDirection = false;
    this.walking_sound.play();
    this.walking_sound.volume = 0.1;
  }
  moveLeftCharacter() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.walking_sound.play();
    this.walking_sound.volume = 0.1;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // 0,3px werden 60 x in der Sekunde abgezogen
    }, 1000 / 60); // 60FPS
  }

  jump() {
    this.speedY = 25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
