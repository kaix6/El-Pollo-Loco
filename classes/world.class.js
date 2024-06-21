class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  throwableObject = [];
  throw_sound = new Audio("audio/throw.wav");
  isDead;

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  IMAGE_DEAD_BIG = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      // this.checkEnemyJumpCollision();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW && this.character.energy_bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 60,
        this.character.y + 100
      );

      this.throwableObject.push(bottle);
      this.throw_sound.play();
      this.throw_sound.volume = 0.1;
      this.character.energy_bottles -= 10;
      this.statusBarBottles.setPercentage(this.character.energy_bottles);
    }
  }

  checkCollisions() {
    this.isDead = false;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        if (this.character.isJumpingOn(enemy)) {
          enemy.img.src = this.IMAGE_DEAD_BIG;
          enemy.isDead = true; // Markiere den Feind als tot
          setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((e) => e !== enemy)
            this.character.speedY = 0;
          }, 500); // Entferne den Feind nach 0.5 Sekunden
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });

    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoins();
        this.statusBarCoins.setPercentage(this.character.energy_coins);
        return false; // Münze wird entfernt
      }
      return true; // Münze bleibt
    });

    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottles();
        this.statusBarBottles.setPercentage(this.character.energy_bottles);
        return false; // Flasche wird entfernt
      }
      return true; // Flasche bleibt
    });
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

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
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    // bild spiegeln
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  // checkEnemyJumpCollision() {
  //   this.level.enemies.forEach((enemy) => {
  //     if (this.character.isJumpingOn(enemy) && !enemy.isDead) {
  //       enemy.img.src = this.IMAGE_DEAD_BIG;
  //       enemy.isDead = true; // Markiere den Feind als tot
  //       setTimeout(() => {
  //         this.level.enemies = this.level.enemies.filter(e => e !== enemy);
  //       }, 500); // Entferne den Feind nach 0.5 Sekunden
  //     }
  //   });
  // }
}
