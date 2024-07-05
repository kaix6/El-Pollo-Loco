class Coins extends MovableObject {
  IMAGES_WALKING = ["img-neu/coins/c1.png", "img-neu/coins/c2.png"];

  constructor() {
    super().loadImage("img-neu/coins/c1.png");

    this.x = 700 + Math.random() * 719 * 3 - 700;
    this.y = 280 - Math.random() * 150;
    this.height = 40;
    this.width = 40;

    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}
