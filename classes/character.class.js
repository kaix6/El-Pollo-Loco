class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  world;
  speed = 5;
  walking_sound = new Audio("audio/walk3.wav");
  longIdle = false;
  longIdleTimer;
  testbutton = false;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.y = 200;
    this.height = 230;
    this.width = 110;
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
    console.log(this.testbutton);
  }

  animate() {
    setInterval(() => {
      // Walk Speed
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
        clearTimeout(this.longIdleTimer);
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
        clearTimeout(this.longIdleTimer);
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      // Walk Animation
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.testbutton = false;
        this.longIdle = false;
        clearTimeout(this.longIdleTimer);
      } else {
        if (this.testbutton === false) {
          this.testbutton = true;
          this.longIdleTimer = setTimeout(() => {
            console.log("5 Sekunden sind rum");
            this.longIdle = true;
          }, 5000);
        }
      }

      if (this.longIdle) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (this.testbutton) {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100);
  }
}
