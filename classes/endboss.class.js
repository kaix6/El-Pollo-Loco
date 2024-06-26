class Endboss extends MovableObject {
  height = 500;
  width = 300;
  y = -35;

  hadFirstContact = false;
  isDead = false;
  hitPoints = 5;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ANGRY = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(level) {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 719 * 3 + 200;
    this.speed = 0.3 + Math.random() * 0.25;
    this.level = level; // Referenz auf das Level-Objekt speichern
    this.animate();
    this.hit();
  }

  animate() {
    let i = 0;
    this.animationInterval = setInterval(() => {
      if (i < 10 && !this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (!this.isDead) {
        this.playAnimation(this.IMAGES_ANGRY);
      }
      i++;
      if (world.character.x > 2800 && !hadFirstContact) {
        i = 0;
        hadFirstContact = true;
      }
    }, 180);
    this.moveLeft();
  }

  hit() {
    this.hitPoints -= 1;
    if (this.hitPoints <= 0) {
      this.die();
      this.isDead = true;
    }
  }

  die() {
    clearInterval(this.animationInterval); // Stoppt die Animation
    this.deathAnimationInterval = setInterval(() => {
      if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(this.deathAnimationInterval); // Stoppt die Todanimation
      this.endGame();
    }, 1000); // 1 Sekunde Verzögerung
  }

  endGame() {
    clearInterval(this.animationInterval);
    clearInterval(this.deathAnimationInterval);
    window.location.href = "index.html";
  }
}
