/**
 * Class representing a character.
 * @extends MovableObject
 */
class Character extends MovableObject {
  IMAGES_WALKING = [
    "img-neu/walk/w21.png",
    "img-neu/walk/w22.png",
    "img-neu/walk/w23.png",
    "img-neu/walk/w24.png",
    "img-neu/walk/w25.png",
    "img-neu/walk/w26.png",
  ];
  IMAGES_IDLE = [
    "img-neu/idle/idle/i1.png",
    "img-neu/idle/idle/i2.png",
    "img-neu/idle/idle/i3.png",
    "img-neu/idle/idle/i4.png",
    "img-neu/idle/idle/i5.png",
    "img-neu/idle/idle/i6.png",
    "img-neu/idle/idle/i7.png",
    "img-neu/idle/idle/i8.png",
    "img-neu/idle/idle/i9.png",
    "img-neu/idle/idle/i10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img-neu/idle/longIdle/i11.png",
    "img-neu/idle/longIdle/i12.png",
    "img-neu/idle/longIdle/i13.png",
    "img-neu/idle/longIdle/i14.png",
    "img-neu/idle/longIdle/i15.png",
    "img-neu/idle/longIdle/i16.png",
    "img-neu/idle/longIdle/i17.png",
    "img-neu/idle/longIdle/i18.png",
    "img-neu/idle/longIdle/i19.png",
    "img-neu/idle/longIdle/i20.png",
  ];
  IMAGES_JUMPING = [
    "img-neu/jump/j31.png",
    "img-neu/jump/j32.png",
    "img-neu/jump/j33.png",
    "img-neu/jump/j34.png",
    "img-neu/jump/j35.png",
    "img-neu/jump/j36.png",
    "img-neu/jump/j37.png",
    "img-neu/jump/j38.png",
    "img-neu/jump/j39.png",
  ];
  IMAGES_DEAD = [
    "img-neu/dead/d51.png",
    "img-neu/dead/d52.png",
    "img-neu/dead/d53.png",
    "img-neu/dead/d54.png",
    "img-neu/dead/d55.png",
    "img-neu/dead/d56.png",
    "img-neu/dead/d57.png",
  ];
  IMAGES_HURT = [
    "img-neu/hurt/h41.png",
    "img-neu/hurt/h42.png",
    "img-neu/hurt/h43.png",
  ];
  IMAGES_GAMEOVER = ["img/9_intro_outro_screens/game_over/game over.png"];

  world;
  speed = 5;
  walking_sound = new Audio("audio/walk3.wav");
  hurt_sound = new Audio("audio/hurt.wav");
  coins_sound = new Audio("audio/collectCoin.wav");
  bottles_sound = new Audio("audio/bottles.wav");
  long_idle_sound = new Audio("audio/snore.wav");
  background_music = new Audio("audio/background_music.wav");
  longIdle = false;
  longIdleTimer;
  idlebutton = false;

  /**
   * Create a character.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.y = 280;
    this.height = 150;
    this.width = 100;
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_GAMEOVER);
    this.applyGravity();
    this.animate();
  }

  /**
   * Display the game over screen.
   */
  showGameOver() {
    this.loadImage(this.IMAGES_GAMEOVER[0]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }

  /**
   * Start character animations.
   */
  animate() {
    this.intervalMusic();
    intervals.push(this.intervallMusic);

    this.setIntervalId();
    intervals.push(this.intervalId);
  }

  /**
   * Play background music at intervals.
   * @returns {number} The interval ID for background music.
   */
  intervalMusic() {
    return (this.intervallMusic = setInterval(() => {
      this.background_music.play();
      this.background_music.volume = this.isMuted ? 0 : 0.5;
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
    }, 1000 / 60));
  }

  /**
   * Set interval ID for character actions.
   */
  setIntervalId() {
    this.intervalId = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.setTimeoutGameOver();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.long_idle_sound.pause();
      } else {
        this.walkAnimation();
      }
    }, 100);
  }

  /**
   * Set timeout to display the game over screen.
   */
  setTimeoutGameOver() {
    setTimeout(() => {
      this.showGameOver();
      this.world.gameOver = true;
      clearInterval(this.intervalId);
    }, 700);
  }

  /**
   * Handle character walking animation.
   */
  walkAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playWalkingAnimation();
    } else {
      if (this.idlebutton === false) {
        this.playIdleAnimation();
      }
      if (this.longIdle) {
        this.playLongIdleAnimation();
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }
  }

  /**
   * Play walking animation.
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.idlebutton = false;
    this.longIdle = false;
    clearTimeout(this.longIdleTimer);
  }

  /**
   * Play idle animation.
   */
  playIdleAnimation() {
    this.idlebutton = true;
    this.longIdleTimer = setTimeout(() => {
      this.longIdle = true;
    }, 5000);
  }

  /**
   * Play long idle animation.
   */
  playLongIdleAnimation() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.long_idle_sound.play();
    this.long_idle_sound.volume = this.isMuted ? 0 : 0.3;
  }
}
