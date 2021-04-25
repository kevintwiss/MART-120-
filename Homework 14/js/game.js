var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var pl = new Player();
var obstacles = [];

for(i = 0; i < 50; i++){
  obstacles[i] = new Obstacle(true);
}

// Updating, maths, physics
function update(){
  pl.move();
  pl.escape();

  for(i = 0; i < obstacles.length; i++){
    obstacles[i].move();
  }
}

// Rendering, drawing
function render(){
  Background();
  pl.display();

  for(i = 0; i < obstacles.length; i++){
    obstacles[i].display();
  }
  Borders();
  WinProcess();
  exit.display();
}

// Not for changes, game looped with frames
function gameLoop(){
  update();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
