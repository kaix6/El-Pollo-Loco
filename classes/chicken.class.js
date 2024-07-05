class Chicken extends MovableObject {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD_BIG = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  draw(ctx) {
    if (this.isDead) {
      this.img.src = this.IMAGE_DEAD_BIG;
    }
    super.draw(ctx);
  }

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 400 + Math.random() * 2000;
    this.y = 350;
    this.height = 75;
    this.width = 65;
    this.speed = 0.15 + Math.random() * 0.25;
    this.isDead = false;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
    this.moveLeft();
  }
}
