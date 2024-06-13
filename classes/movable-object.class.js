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

  moveRight() {
    console.log("Moving Right");
  }
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // 0,3px werden 60 x in der Sekunde abgezogen
    }, 1000 / 60); // 60FPS
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 0 % 6; // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, ...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
