let canvas;
let world;
let keyboard = new Keyboard();
let youWin = false;
let intervals = [];

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, intervals);
}

window.addEventListener("keydown", (event) => {
  if (event.code == "ArrowRight" || event.code == "KeyD") {
    keyboard.RIGHT = true;
  }
  if (event.code == "ArrowLeft" || event.code == "KeyA") {
    keyboard.LEFT = true;
  }
  if (
    event.code == "Space" ||
    event.code == "KeyW" ||
    event.code == "ArrowUp"
  ) {
    keyboard.UP = true;
  }
  if (event.code == "KeyF") {
    keyboard.THROW = true;
  }
  // console.log(event);
});

window.addEventListener("keyup", (event) => {
  if (event.code == "ArrowRight" || event.code == "KeyD") {
    keyboard.RIGHT = false;
  }
  if (event.code == "ArrowLeft" || event.code == "KeyA") {
    keyboard.LEFT = false;
  }
  if (
    event.code == "Space" ||
    event.code == "KeyW" ||
    event.code == "ArrowUp"
  ) {
    keyboard.UP = false;
  }
  if (event.code == "KeyF") {
    keyboard.THROW = false;
  }
  // console.log(event);
});

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function startGame() {
  drawLevel();
  let startScreen = document.getElementById("startScreen");
  let gameScreen = document.getElementById("fullscreen");
  startScreen.classList.add("displayNone");
  gameScreen.classList.remove("displayNone");
  init();
}

function outroScreen() {
  let screen = document.getElementById('backgroundOutro');
  let img = document.getElementById('outroScreen');
  if (youWin === true) {
    screen.classList.remove('displayNone');
    img.classList.remove('displayNone');
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }}
