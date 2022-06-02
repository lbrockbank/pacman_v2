var pos = 0;
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];
var direction = 0; //0 -> moving right, 1 -> moving left
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(window.innerWidth);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newImg = document.createElement("img");
  newImg.style.position = "absolute";
  newImg.src = pacArray[direction][0];
  newImg.width = 100;
  //
  // set position here
  //
  newImg.style.left = position.x;
  newImg.style.top = position.y;

  game.appendChild(newImg);

  // return details in an object
  return { position, velocity, direction, newImg };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    alternateImage(item);
    manageMovement(item);
  });

  setTimeout(update, 100);
}

function manageMovement(item) {
  item.position.x += item.velocity.x;
  item.position.y += item.velocity.y;

  item.newImg.style.left = item.position.x;
  item.newImg.style.top = item.position.y;
}

function alternateImage(item) {
  if (item.newImg.src === pacArray[item.direction][0]) {
    item.newImg.src = pacArray[item.direction][1];
  } else {
    item.newImg.src = pacArray[item.direction][0];
  }
  
  item.newImg.src = item.waka ? pacArray[item.direction][0] : pacArray[item.direction][1]
  item.waka = !item.waka;
}


function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newImg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x *= -1;

    item.direction = item.direction === 0 ? 1 : 0;
  }

  if (
    item.position.y + item.velocity.y + item.newImg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y *= -1;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}