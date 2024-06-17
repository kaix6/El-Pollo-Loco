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
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  world;
  speed = 5;
  walking_sound = new Audio("audio/walk3.wav");
  hurt_sound = new Audio('audio/hurt.wav');
  coins_sound = new Audio('audio/collectCoin.wav');
  bottles_sound = new Audio('audio/bottles.wav');
  long_idle_sound = new Audio('audio/snore.wav');
  background_music = new Audio('audio/background_music.wav');
  longIdle = false;
  longIdleTimer;
  idlebutton = false;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.y = 200;
    this.height = 230;
    this.width = 110;
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  animate() {
    // Walk Speed
    setInterval(() => {
      this.background_music.play();
      this.background_music.volume = 0.5;
      this.background_music.loop = true;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRightCharacter();
        this.long_idle_sound.pause();
        clearTimeout(this.longIdleTimer);
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeftCharacter();
        this.long_idle_sound.pause();
        clearTimeout(this.longIdleTimer);
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.long_idle_sound.pause();
      } else {
        // Walk Animation
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
          this.idlebutton = false;
          this.longIdle = false;

          clearTimeout(this.longIdleTimer);
        } else {
          if (this.idlebutton === false) {
            this.idlebutton = true;
            this.longIdleTimer = setTimeout(() => {
              this.longIdle = true;
            }, 5000);
          }

          if (this.longIdle) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.long_idle_sound.play();
            this.long_idle_sound.volume = 0.3;
          } else {
            this.playAnimation(this.IMAGES_IDLE);
          }
        }
      }
    }, 100);
  }
}
