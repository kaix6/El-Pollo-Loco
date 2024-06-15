class ThrowableObject extends MovableObject {

IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
        this.loadImages(this.IMAGES);
    }

    throw() {
this.speedY = 30;
this.applyGravity();
setInterval(() => {
    this.x += 10;
}, 25)
    }
}