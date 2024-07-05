/**
 * Class representing the status bar for bottles in the game.
 */
class StatusBarBottles extends DrawableObject {
  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage_bottles = 0;

  /**
   * Creates a new status bar for bottles.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 10;
    this.y = 95;
    this.width = 250;
    this.height = 70;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of bottles and updates the image accordingly.
   * @param {number} percentageBottles - The percentage of bottles.
   */
  setPercentage(percentageBottles) {
    this.percentage_bottles = percentageBottles;
    let pathBottles = this.IMAGES_BOTTLES[this.resolveImageIndexBottles()];
    this.img = this.imageCache[pathBottles];
  }

  /**
   * Resolves the image index based on the current percentage of bottles.
   * @returns {number} The index of the image to be used.
   */

  resolveImageIndexBottles() {
    if (this.percentage_bottles == 100) {
      return 5;
    } else if (this.percentage_bottles >= 80) {
      return 4;
    } else if (this.percentage_bottles >= 60) {
      return 3;
    } else if (this.percentage_bottles >= 40) {
      return 2;
    } else if (this.percentage_bottles >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
