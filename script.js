var character = document.querySelector(".character");
var map = document.querySelector(".map");

// Set character start coordinates
var x = 1;
var y = 1;

// Movement speed
var speed = 1;

// Hold user directions
var heldDirections = [];

// Set up possible directions and equate to keys
var directions = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

var keys = {
  ArrowUp: directions.up,
  ArrowDown: directions.down,
  ArrowLeft: directions.left,
  ArrowRight: directions.right,
};

// Change direction
function placeCharacter() {
  // pixel size
  var pixelSize = 4;

  // Get initial press and allocate movement
  var heldDirection = heldDirections[0];

  if (heldDirection) {
    if (heldDirection === directions.up) {
      y -= speed;
    }
    if (heldDirection === directions.down) {
      y += speed;
    }
    if (heldDirection === directions.left) {
      x -= speed;
    }
    if (heldDirection === directions.right) {
      x += speed;
    }

    // Direct sprite
    character.setAttribute("facing", heldDirection);

    // Is walking
    character.setAttribute("walking", "true");

  } else {
    character.setAttribute("walking", "false");

  }

  // Move camera
  var camera_left = pixelSize * 66;
  var camera_top = pixelSize * 42;

  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${
    -y * pixelSize + camera_top
  }px, 0 )`;
  character.style.transform = `translate3d( ${x * pixelSize}px, ${
    y * pixelSize
  }px, 0 )`;
}

// Game loop
function step() {
  placeCharacter();
  window.requestAnimationFrame(function () {
    step();
  });
}

step();

// Listen for key press => move in direction
document.addEventListener("keydown", function (event) {
  var move = keys[event.key];
  if (move && heldDirections.indexOf(move) === -1) {
    heldDirections.unshift(move);
  }
});

// Listen for key up => stop movement
document.addEventListener("keyup", function (event) {
  var move = keys[event.key];
  var index = heldDirections.indexOf(move);
  if (index > -1) {
    heldDirections.splice(index, 1);
  }
});
