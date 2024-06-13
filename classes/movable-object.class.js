class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.3;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;



  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 200;
  }

  // loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src:"">
    this.img.src = path;
  }

  // arr = ['img/image1.png', 'img/image2.png', 'img/image3.png', ...]
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRightCharacter() {
    this.x += this.speed;
    this.otherDirection = false;
    this.walking_sound.play();
    this.walking_sound.volume = 0.1;
  }
  moveLeftCharacter() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.walking_sound.play();
    this.walking_sound.volume = 0.1;
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // 0,3px werden 60 x in der Sekunde abgezogen
    }, 1000 / 60); // 60FPS
  }

  jump() {
    this.speedY = 25;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
