let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);


console.log('My Character is', world.character);
}   


window.addEventListener('keydown', (event) => {

  if (event.code == 'ArrowRight' || event.code == 'KeyD') {
    keyboard.RIGHT = true;
  }
  if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
    keyboard.LEFT = true;
  }
  if (event.code == 'Space' || event.code == 'KeyW' || event.code == 'ArrowUp') {
    keyboard.UP = true;
  }
  // console.log(event);
})

window.addEventListener('keyup', (event) => {

  if (event.code == 'ArrowRight' || event.code == 'KeyD') {
    keyboard.RIGHT = false;
  }
  if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
    keyboard.LEFT = false;
  }
  if (event.code == 'Space' || event.code == 'KeyW' || event.code == 'ArrowUp') {
    keyboard.UP = false;
  }
  // console.log(event);
})