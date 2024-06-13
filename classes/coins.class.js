class Coins extends MovableObject {
  IMAGES_WALKING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");

    this.x = 700 + Math.random() * 719 * 3 - 400; // Zahl zwischen 200 und 700px
    this.y = 280 - Math.random() * 150;
    this.height = 120;
    this.width = 120;

    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}
