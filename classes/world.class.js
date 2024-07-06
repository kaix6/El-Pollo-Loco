/**
 * Class representing the game world, managing the game state and rendering.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  intervals;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  throwableObject = [];
  throw_sound = new Audio("");
  isDead;

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  IMAGE_DEAD_BIG = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Creates a new game world instance.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard object for input handling.
   */
  constructor(canvas, keyboard, intervals) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.intervals = intervals; 
    this.character = new Character();
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Main game loop, runs periodically.
   */
  run() {
    this.intervalGameLoop = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
    intervals.push(this.intervalGameLoop);
  }

  /**
   * Handles throwing objects when the THROW key is pressed.
   */
  checkThrowObjects() {
    if (this.keyboard.THROW && this.character.energy_bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 60,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
      this.character.energy_bottles -= 10;
      this.statusBarBottles.setPercentage(this.character.energy_bottles);
    }
  }

  /**
   * Checks for collisions between objects in the game.
   */
  checkCollisions() {
    this.isDead = false;

    this.checkCollisionsEnemy();
    this.checkCollisionsBottleEndboss();
    this.checkCollisionsCoins();
    this.checkCollisionsBottle();
  }

  /**
   * Checks for collisions between the character and enemies.
   */

  checkCollisionsEnemy() {
    return this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        if (this.character.isJumpingOn(enemy) && !(enemy instanceof Endboss)) {
          enemy.img.src = this.IMAGE_DEAD_BIG;
          enemy.isDead = true;
          setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
            this.character.speedY = 0;
          }, 500);
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between throwable objects and the Endboss.
   */
  checkCollisionsBottleEndboss() {
    return this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
          enemy.hit();
          this.throwableObject = this.throwableObject.filter(
            (b) => b !== bottle
          );
        }
      });
    });
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionsCoins() {
    return (this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoins();
        this.statusBarCoins.setPercentage(this.character.energy_coins);
        return false;
      }
      return true;
    }));
  }

  /**
   * Checks for collisions between the character and bottles.
   */
  checkCollisionsBottle() {
    return (this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottles();
        this.statusBarBottles.setPercentage(this.character.energy_bottles);
        return false;
      }
      return true;
    }));
  }

  /**
   * Sets the world context for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Main draw function that continuously renders the game world.
   */

  draw() {
    if (this.gameOver) {
      this.character.draw(this.ctx);
      return;
    }
    if (this.youWin) {
      outroScreen();
      this.character.draw(this.ctx);
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawAddObjectsToMap();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws additional objects on the map, including backgrounds, clouds, enemies, etc.
   */
  drawAddObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0); // back
    // ---------- Space for fixed Objects -----------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    // ---------- Space for fixed Objects End -----------
    this.ctx.translate(this.camera_x, 0); // forwards
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the map.
   * @param {Array} objects - The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   * @param {DrawableObject} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the image flip.
   * @param {DrawableObject} mo - The object to revert.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
