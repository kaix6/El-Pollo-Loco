let canvas;
let world;
let keyboard = new Keyboard();
let youWin = false;
let intervals = [];
let character = new Character();

/**
 * Initializes the game setup.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, intervals);
  character = world.character;
}

/**
 * Sets up keyboard controls.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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
});

/**
 * Sets up keyboard controls.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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
});

/**
 * Sets mobile control actions.
 * @param {string} direction - The direction of the mobile control.
 */
function moveButtonMobile(direction) {
  if (direction === "left") {
    keyboard.LEFT = true;
  } else if (direction === "right") {
    keyboard.RIGHT = true;
  } else if (direction === "up") {
    keyboard.UP = true;
  } else if (direction === "action") {
    keyboard.THROW = true;
  }
}

/**
 * Stops mobile control actions.
 * @param {string} direction - The direction of the mobile control.
 */
function stopMoveButtonMobile(direction) {
  if (direction === "left") {
    keyboard.LEFT = false;
  } else if (direction === "right") {
    keyboard.RIGHT = false;
  } else if (direction === "up") {
    keyboard.UP = false;
  } else if (direction === "action") {
    keyboard.THROW = false;
  }
}

/**
 * Adds touch event listeners to mobile control buttons.
 * @param {string} buttonId - The ID of the button.
 * @param {string} direction - The direction or action of the button.
 */
function addTouchEvents(buttonId, direction) {
  const button = document.getElementById(buttonId);
  button.addEventListener("touchstart", function () {
    moveButtonMobile(direction);
  });
  button.addEventListener("touchend", function () {
    stopMoveButtonMobile(direction);
  });
}

addTouchEvents("leftButton", "left");
addTouchEvents("rightButton", "right");
addTouchEvents("upButton", "up");
addTouchEvents("actionButton", "action");

/**
 * Toggles fullscreen mode for the given element.
 * @param {HTMLElement} element - The element to toggle fullscreen.
 */
function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

/**
 * Toggles fullscreen mode for the given element.
 * @param {HTMLElement} element - The element to toggle fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Starts the game by showing the game screen and initializing the game world.
 */
function startGame() {
  drawLevel();
  let startScreen = document.getElementById("startScreen");
  let gameScreen = document.getElementById("fullscreen");
  startScreen.classList.add("displayNone");
  gameScreen.classList.remove("displayNone");
  init();
  character.startMusic(); // Start the background music
}

/**
 * Displays the outro screen if the player has won.
 */
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

/**
 * Adjusts UI elements based on the window size.
 */
function windowSize() {
  let notice = document.getElementById("overlayPortrait");
  let navbar = document.getElementById("navbar");
  if (window.innerHeight > window.innerWidth) {
    notice.classList.remove("displayNone");
    navbar.classList.add("displayNone");
  } else {
    notice.classList.add("displayNone");
    navbar.classList.remove("displayNone");
  }
}

windowSize();

window.addEventListener("resize", windowSize);

/**
 * Navigates to the home page.
 */
function homeButton() {
  window.location.href = "index.html";
}

/**
 * Prevents context menu and touch start events on images.
 */
document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll("#ButtonsUnderGame img");
  images.forEach(function (img) {
    img.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    img.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    img.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
  });
});

/**
 * Checks if the user is on a mobile device.
 * @returns {boolean} True if the user is on a mobile device, false otherwise.
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Shows or hides mobile control buttons based on device type.
 */
function showButtonsMobile() {
  let buttonArea = document.getElementById("ButtonsUnderGame");
  let headline = document.getElementById("headline");
  let navbar = document.getElementById("infoNavbar");
  if (isMobileDevice()) {
    buttonArea.classList.remove("displayNone");
    headline.classList.add("displayNone");
    navbar.classList.add("displayNone");
  } else {
    buttonArea.classList.add("displayNone");
    headline.classList.remove("displayNone");
    navbar.classList.remove("displayNone");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showButtonsMobile();
});

/**
 * Opens the settings overlay.
 */
function openWindowSettings() {
  const overlay = document.getElementById("overlayControl");
  overlay.classList.remove("hide");
  overlay.classList.add("show");
}

/**
 * Closes the settings overlay.
 */
function closeWindowSettings() {
  const overlay = document.getElementById("overlayControl");
  overlay.classList.remove("show");
  overlay.classList.add("hide");
}

document.addEventListener('DOMContentLoaded', (event) => {
  const volumeIcon = document.getElementById('volume-icon');
  let isMuted = false;

  volumeIcon.addEventListener('click', () => {
    if (isMuted) {
      volumeIcon.src = 'img/volume-up-fill.svg';
    } else {
      volumeIcon.src = 'img/volume-mute-fill.svg';
    }
    character.toggleMute(); // Verwende die globale Instanz
    isMuted = !isMuted;
  });
});