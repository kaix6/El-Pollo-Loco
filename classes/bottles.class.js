class Bottels extends MovableObject {
    IMAGES_BOTTLE_GROUND = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  
    constructor() {
      super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
  
      this.x = 800 + Math.random() * 719 * 3 - 700; // Zahl zwischen 200 und 700px
      this.y = 340;
      this.height = 90;
      this.width = 90;
  
      this.loadImages(this.IMAGES_BOTTLE_GROUND);
    }
  }