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

function moveButtonMobile(direction) {
  if (direction === 'left') {
      keyboard.LEFT = true;
  } else if (direction === 'right') {
      keyboard.RIGHT = true;
  } else if (direction === 'up') {
      keyboard.UP = true;
  } else if (direction === 'action') {
      keyboard.ACTION = true;
  }
  console.log(keyboard);
}

function stopMoveButtonMobile(direction) {
  if (direction === 'left') {
      keyboard.LEFT = false;
  } else if (direction === 'right') {
      keyboard.RIGHT = false;
  } else if (direction === 'up') {
      keyboard.UP = false;
  } else if (direction === 'action') {
      keyboard.ACTION = false;
  }
  console.log(keyboard);
}

function addTouchEvents(buttonId, direction) {
  const button = document.getElementById(buttonId);
  button.addEventListener('touchstart', function() {
      moveButtonMobile(direction);
  });
  button.addEventListener('touchend', function() {
      stopMoveButtonMobile(direction);
  });
}

addTouchEvents('leftButton', 'left');
        addTouchEvents('rightButton', 'right');
        addTouchEvents('upButton', 'up');
        addTouchEvents('actionButton', 'action');

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
  let screen = document.getElementById("backgroundOutro");
  let img = document.getElementById("outroScreen");
  if (youWin === true) {
    screen.classList.remove("displayNone");
    img.classList.remove("displayNone");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }
}

function windowSize() {
  let notice = document.getElementById('overlayPortrait');
  let navbar = document.getElementById('navbar');
  if (window.innerHeight > window.innerWidth) {
notice.classList.remove('displayNone')
navbar.classList.add('displayNone')
  } else {
    notice.classList.add('displayNone')
    navbar.classList.remove('displayNone')
  }
}

windowSize();

window.addEventListener('resize', windowSize);

function homeButton() {
  window.location.href = "index.html";
}
