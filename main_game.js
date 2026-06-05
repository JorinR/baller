// get canvas 2D context object
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const info = document.querySelector("p");

const GLOBALS = {
  up: false,
  down: false,
  left: false,
  right: false
};

const PROPS = [];

/* Our main character sprite */

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;
    this.speed = 10;
  }
  render() {
    const { up, down, left, right } = GLOBALS;
    if (up) this.y -= this.speed;
    if (down) this.y += this.speed;
    if (left) this.x -= this.speed;
    if (right) this.x += this.speed;

    let { x, y, radius } = this;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

const CHARS = [];
let player = new Player(window.innerWidth / 2, window.innerHeight / 2);
CHARS.push(player);

// function for applying any initial settings
function init() {
  // apply a fullscreen fit
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /*  window.onresize = () =>
    alert(
      "Please avoid resizing screen as it may break the example's functionality, please press rerun the embed."
    ); */

  // register event listeners to store key actions and keycodes inside of GLOBALS, so that they can be accessed by sprites that need them.

  window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 38:
        GLOBALS.up = true;
        break;
      case 40:
        GLOBALS.down = true;
        break;
      case 37:
        GLOBALS.left = true;
        break;
      case 39:
        GLOBALS.right = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 38:
        GLOBALS.up = false;
        break;
      case 40:
        GLOBALS.down = false;
        break;
      case 37:
        GLOBALS.left = false;
        break;
      case 39:
        GLOBALS.right = false;
    }
  });
}

// function for rendering background elements
function renderBackground() {}

// function for rendering prop objects in PROPS
function renderProps() {}

// function for rendering character objects in CHARS
function renderCharacters() {
  for (let i of CHARS) {
    i.render();
  }
}

// function for rendering onscreen controls
function renderControls() {}

// main function to be run for rendering frames
function startFrames() {
  // erase entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // render each type of entity in order, relative to layers
  renderBackground();
  renderProps();
  renderCharacters();
  renderControls();

  // rerun function (call next frame)
  window.requestAnimationFrame(startFrames);
}

function startScreen() {
  // render start screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "white";
  ctx.font = "bold 80px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Baller", canvas.width / 2, canvas.height / 2 - 80);
  
  ctx.font = "30px Arial";
  ctx.fillText("Click to play", canvas.width / 2, canvas.height / 2 + 80);
  
  // add click listener to start the game
  window.addEventListener("click", () => {
    startFrames();
  }, { once: true });
}

init(); // initialize game settings
startScreen(); // start running screens (if you have any)

