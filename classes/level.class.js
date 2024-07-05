/**
 * Class representing a game level.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 719 * 3;

  /**
   * Create a level.
   * @param {Array} enemies - The enemies in the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} coins - The coins in the level.
   * @param {Array} bottles - The bottles in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }

  /**
   * Add a throwable object (bottle) to the level.
   * @param {Object} bottle - The bottle to be added.
   */
  addThrowableObject(bottle) {
    this.bottles.push(bottle);
  }

  /**
   * Remove a throwable object (bottle) from the level.
   * @param {Object} bottle - The bottle to be removed.
   */
  removeThrowableObject(bottle) {
    const index = this.bottles.indexOf(bottle);
    if (index > -1) {
      this.bottles.splice(index, 1);
    }
  }
}
