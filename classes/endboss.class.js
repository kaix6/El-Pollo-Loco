class Endboss extends MovableObject {
  height = 500;
  width = 300;
  y = -35;

  hadFirstContact = false;
  isDead = false;

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

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRY);
    this.x = 719 * 3 + 200;
    this.speed = 0.3 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
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
}
