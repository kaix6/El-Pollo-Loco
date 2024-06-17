class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 719 * 3;

  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }

  addThrowableObject(bottle) {
    this.bottles.push(bottle);
  }

  removeThrowableObject(bottle) {
    const index = this.bottles.indexOf(bottle);
    if (index > -1) {
      this.bottles.splice(index, 1);
    }
  }
}
