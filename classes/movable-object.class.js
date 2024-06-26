class MovableObject extends DrawableObject {
  speed = 0.3;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  energy_coins = 0;
  energy_bottles = 0;
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
    if (this instanceof ThrowableObject) {
      return this.y < 340;
    } else {
      return this.y < 200;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.hurt_sound.play();
      this.hurt_sound.volume = 0.1;
      setTimeout(() => {
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
      }, 1000);
      this.lastHit = new Date().getTime();
    }
  }

  collectCoins() {
    this.energy_coins += 10;

    if (this.energy_coins < 0) {
      this.energy_coins = 0;
    } else {
      this.coins_sound.play();
      this.coins_sound.volume = 0.1;
      setTimeout(() => {
        this.coins_sound.pause();
        this.coins_sound.currentTime = 0;
      }, 1000);
    }
  }

  collectBottles() {
    this.energy_bottles += 10;

    if (this.energy_bottles < 0) {
      this.energy_bottles = 0;
    } else {
      this.bottles_sound.play();
      this.bottles_sound.volume = 0.1;
      setTimeout(() => {
        this.bottles_sound.pause();
        this.bottles_sound.currentTime = 0; // Setzt den Sound zurück zum Start
      }, 1000);
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
    this.walking_sound.volume = 0.05;
  }
  moveLeftCharacter() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.walking_sound.play();
    this.walking_sound.volume = 0.05;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); // 60FPS
  }

  jump() {
    this.speedY = 25;
    this.walking_sound.pause();
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  isJumpingOn(mo) {
    return (
      this.speedY < 0 && // Überprüft, ob der Charakter fällt
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }
}
