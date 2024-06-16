class DrawableObject {
    
img;
imageCache = {};
currentImage = 0;
x = 120;
y = 250;
height = 150;
width = 100;

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

      draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }

      drawFrame(ctx) {
        if (
          this instanceof Character ||
          this instanceof Chicken ||
          this instanceof ChickenSmall ||
          this instanceof Endboss
        ) {
          ctx.beginPath();
          ctx.lineWidth = "3";
          ctx.strokeStyle = "blue";
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        }
      }
}