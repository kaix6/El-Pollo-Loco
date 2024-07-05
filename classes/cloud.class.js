/**
 * Class representing a cloud.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 30;
  width = 500;
  height = 300;

  /**
   * Create a cloud.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Animate the cloud.
   */
  animate() {
    this.moveLeft();
  }
}
