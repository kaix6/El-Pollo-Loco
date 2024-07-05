/**
 * Class representing the status bar for coins in the game.
 */
class StatusBarCoins extends DrawableObject {
  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  percentage_coins = 0;

  /**
   * Creates a new status bar for coins.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COINS);
    this.x = 10;
    this.y = 40;
    this.width = 250;
    this.height = 70;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of coins and updates the image accordingly.
   * @param {number} percentageCoins - The percentage of coins.
   */
  setPercentage(percentageCoins) {
    this.percentage_coins = percentageCoins;
    let pathCoins = this.IMAGES_COINS[this.resolveImageIndexCoins()];
    this.img = this.imageCache[pathCoins];
  }

  /**
   * Resolves the image index based on the current percentage of coins.
   * @returns {number} The index of the image to be used.
   */
  resolveImageIndexCoins() {
    if (this.percentage_coins >= 100) {
      return 5;
    } else if (this.percentage_coins >= 80) {
      return 4;
    } else if (this.percentage_coins >= 60) {
      return 3;
    } else if (this.percentage_coins >= 40) {
      return 2;
    } else if (this.percentage_coins >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
