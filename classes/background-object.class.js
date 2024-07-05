/**
 * Class representing a background object.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Create a background object.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
