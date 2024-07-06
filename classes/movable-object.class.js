/**
 * Class representing a movable object that extends a drawable object.
 */
class MovableObject extends DrawableObject {
  speed = 0.3;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  energy_coins = 0;
  energy_bottles = 0;
  lastHit = 0;
  intervals;

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this.speedY === -27) {
      this.speedY = 0;
    }
    if (this instanceof ThrowableObject) {
      return this.y < 340;
    } else {
      return this.y < 280;
    }
  }

  /**
   * Checks if the object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Reduces the energy of the object when hit and plays the hurt sound.
   */
  hit() {
    this.energy -= 5;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      if (!this.isMuted) {
        this.hurt_sound.play();
        this.hurt_sound.volume = 0.1;
        setTimeout(() => {
          this.hurt_sound.pause();
          this.hurt_sound.currentTime = 0;
        }, 1000);
      } else {
        this.hurt_sound.volume = 0.0;
      }
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases the energy coins when collected and plays the coins sound.
   */
  collectCoins() {
    this.energy_coins += 10;

    if (this.energy_coins < 0) {
      this.energy_coins = 0;
    } else {
      if (!this.isMuted) {
      this.coins_sound.play();
      this.coins_sound.volume = 0.1;
      setTimeout(() => {
        this.coins_sound.pause();
        this.coins_sound.currentTime = 0;
      }, 1000);
    } else {
      this.coins_sound.volume = 0;
    }
    }
  }

  /**
   * Increases the energy bottles when collected and plays the bottles sound.
   */
  collectBottles() {
    this.energy_bottles += 10;

    if (this.energy_bottles < 0) {
      this.energy_bottles = 0;
    } else {
      if (!this.isMuted) {
      this.bottles_sound.play();
      this.bottles_sound.volume = 0.1;
      setTimeout(() => {
        this.bottles_sound.pause();
        this.bottles_sound.currentTime = 0;
      }, 1000);}
      else {
        this.bottles_sound.volume = 0;
      }
    }
  }

  /**
   * Checks if the object is hurt.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if the object is dead, false otherwise.
   */

  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the character to the right.
   */
  moveRightCharacter() {
    this.x += this.speed;
    this.otherDirection = false;
    this.walking_sound.play();
    this.walking_sound.volume = 0.05;
  }

  /**
   * Moves the character to the left.
   */

  moveLeftCharacter() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.walking_sound.play();
    this.walking_sound.volume = 0.05;
  }

  /**
   * Continuously moves the object to the left.
   */

  moveLeft() {
    this.moveLeftIntervall = setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 25;
    this.walking_sound.pause();
  }

  /**
   * Plays an animation using the provided images.
   * @param {Array} images - The images for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if the object is jumping on another movable object.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if the object is jumping on the other object, false otherwise.
   */
  isJumpingOn(mo) {
    return (
      this.speedY < 0 &&
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }
}
