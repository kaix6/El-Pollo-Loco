class Chicken extends MovableObject {
  IMAGES_WALKING_CHICKEN = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700px
    this.y = 350;
    this.height = 75;
    this.width = 65;
    this.speed = 0.15 + Math.random() * 0.25;


    this.loadImages(this.IMAGES_WALKING_CHICKEN);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING_CHICKEN.length;
      let path = this.IMAGES_WALKING_CHICKEN[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 150);

    this.moveLeft();
  }
}
  