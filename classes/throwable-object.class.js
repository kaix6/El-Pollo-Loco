class ThrowableObject extends MovableObject {
  IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_HIT_GROUND = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_DELETE = [""];

  hitGround = false;
  groundHitAnimationPlayed = false;

  constructor(x, y, game, level) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;
    this.game = game; // Referenz auf das Spielobjekt
    this.level = level; // Referenz auf das Levelobjekt
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_BOTTLE_HIT_GROUND);
    this.loadImages(this.IMAGES_DELETE);
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.hitGround = false;

    this.throwInterval = setInterval(() => {
      if (this.energy_bottles >= 0) {
        this.playAnimation(this.IMAGES);
      }
      if (this.y >= 350 && !this.hitGround) {
        setTimeout(() => {
          this.hitGround = true;
          this.playGroundHitAnimation();
        }, 1200);
      }
      this.x += 10;
    }, 50);
  }

  playGroundHitAnimation() {
    if (!this.groundHitAnimationPlayed) {
      this.playAnimation(this.IMAGES_BOTTLE_HIT_GROUND);
      this.groundHitAnimationPlayed = true;
      clearInterval(this.throwInterval);
      setTimeout(() => {
        this.playAnimation(this.IMAGES_DELETE);
      }, 100);
    }
  }
}
