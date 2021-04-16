var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var pl = new Player();
var obstacle1 = new Obstacle(true);
var obstacle2 = new Obstacle(true);
var obstacle3 = new Obstacle(true);
var obstacle4 = new Obstacle(true);
var obstacle5 = new Obstacle(true);

// Updating, maths, physics
function update(){
  pl.move();
  pl.escape();

  obstacle1.move();
  obstacle2.move();
  obstacle3.move();
  obstacle4.move();
  obstacle5.move();
}

// Rendering, drawing
function render(){
  Background();
  pl.draw();

  obstacle1.draw();
  obstacle2.draw();
  obstacle3.draw();
  obstacle4.draw();
  obstacle5.draw();
  Borders();
  WinProcess();
  exit.draw();
}

// Not for changes, game looped with frames
function gameLoop(){
  update();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
