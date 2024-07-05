/**
 * Class representing a small chicken enemy.
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  isDead = false;

  /**
   * Create a small chicken.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    this.x = 400 + Math.random() * 2000;
    this.y = 350;
    this.height = 75;
    this.width = 65;
    this.speed = 0.5 + Math.random() * 0.8;
    this.isDead = false;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  /**
   * Draw the small chicken on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The drawing context.
   */
  draw(ctx) {
    if (this.isDead) {
      this.img.src = this.IMAGE_DEAD;
    }
    super.draw(ctx);
  }

  /**
   * Animate the small chicken.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
    this.moveLeft();
  }
}
