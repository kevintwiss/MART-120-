var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// OBSTACLE CLASS
class Obstacle{
  constructor(){
    this.r = Math.floor(Math.random()*(canvas.width/20 - canvas.width/45) + canvas.width/45);
    this.x = Math.floor(Math.random()*(canvas.width - canvas.width/30));
    this.y = Math.floor(Math.random()*(canvas.height - canvas.width/30));
    this.xvel = Math.floor(Math.random()*(8 + 8)) - 8;
    this.yvel = Math.floor(Math.random()*(8 + 8)) - 8;
    this.color = 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';
  }
}
// CREATING OBSTACLES
var obstacle1 = new Obstacle();
var obstacle2 = new Obstacle();
var nonmovingPositions = [];

// PLAYER OBJECT AND VARIABLES
var escaping = false;
const pl = {
  x: canvas.width/2 - canvas.width/40/2,
  y: canvas.height - canvas.width/40*2,
  w: canvas.width/40,
  h: canvas.width/40,
  xvel: 0,
  yvel: 0
};

// EXIT OBJECT AND VARIABLES
var exitW = window.innerWidth/10;
const exit = {
  x: Math.floor(Math.random()*((window.innerWidth - exitW/2) - exitW/2)+exitW/2),
  y: 0
};
var countdown = 0;

// EVENTS, EVENT LISTENERS
window.addEventListener('keydown',this.pressed,false);

function pressed(e) {
    if(!escaping)
    {
      let code = e.keyCode;

      switch (code) {
          case 37: pl.xvel = -5; break; //Left key
          case 38: pl.yvel = -5; break; //Up key
          case 39: pl.xvel = 5; break; //Right key
          case 40: pl.yvel = 5; break; //Down key
      }
    }
}

window.addEventListener('keyup',this.released,false);

function released(e){
  if(!escaping)
  {
    let code = e.keyCode;

    switch (code) {
        case 37: if(pl.xvel < 0) pl.xvel = 0; break; //Left key
        case 38: if(pl.yvel < 0) pl.yvel = 0; break; //Up key
        case 39: if(pl.xvel > 0) pl.xvel = 0; break; //Right key
        case 40: if(pl.yvel > 0) pl.yvel = 0; break; //Down key
    }
  }
}

window.addEventListener('click',this.clicked,false);

function clicked(e){
  if(!escaping)
  {
    nonmovingPositions.push({x: e.pageX, y: e.pageY});
  }
}


// Updating, maths, physics
function update(){
  //PLAYER MOVEMENT
  if(!escaping)
  {
    //Move
    pl.x += pl.xvel;
    pl.y += pl.yvel;
    //Player can't go outside the canvas
    if(pl.x + pl.w >= canvas.width) pl.x = canvas.width - pl.w;
    if(pl.y + pl.h >= canvas.height) pl.y = canvas.height - pl.h;
    if(pl.x <= 0) pl.x = 0;
    if(pl.y <= 0){
      // If he entered the exit
      if(pl.x >= exit.x-exitW/2 && pl.x+pl.w < exit.x+exitW/2) escaping = true;
      else pl.y = 0;
    }
  }
  else // If he escaped
  {
    if(pl.y >= -pl.h) pl.y-=0.5; // Escaping animation
  }

  // OBSTACLES MOVEMENT
  // Obstacle 1
  obstacle1.x += obstacle1.xvel;
  obstacle1.y += obstacle1.yvel;

  if(obstacle1.x > canvas.width && obstacle1.xvel > 0) obstacle1.x = -obstacle1.r;
  if(obstacle1.y > canvas.height && obstacle1.yvel > 0) obstacle1.y = -obstacle1.r;

  if(obstacle1.x + obstacle1.r < 0 && obstacle1.xvel < 0) obstacle1.x = canvas.width;
  if(obstacle1.y + obstacle1.r < 0 && obstacle1.yvel < 0) obstacle1.y = canvas.height;

  // Obstacle 2
  obstacle2.x += obstacle2.xvel;
  obstacle2.y += obstacle2.yvel;

  if(obstacle2.x > canvas.width && obstacle2.xvel > 0) obstacle2.x = -obstacle2.r;
  if(obstacle2.y > canvas.height && obstacle2.yvel > 0) obstacle2.y = -obstacle2.r;

  if(obstacle2.x + obstacle2.r < 0 && obstacle2.xvel < 0) obstacle2.x = canvas.width;
  if(obstacle2.y + obstacle2.r < 0 && obstacle2.yvel < 0) obstacle2.y = canvas.height;
}

// Rendering, drawing
function render(){
  //BACKGROUND DISPLAY
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.restore();

  //PLAYER DISPLAY
  ctx.save();
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = 5;
  ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);
  ctx.restore();

  // OBSTACLES DISPLAY
  // Obstacle 1
  ctx.save();
  ctx.fillStyle = obstacle1.color;
  ctx.fillRect(obstacle1.x, obstacle1.y, obstacle1.r, obstacle1.r);
  // Obstacle 2
  ctx.fillStyle = obstacle2.color;
  ctx.fillRect(obstacle2.x, obstacle2.y, obstacle2.r, obstacle2.r);
  // Non moving obstacles
  ctx.fillStyle = 'red';
  for(i = 0; i < nonmovingPositions.length; i++)
  {
    ctx.fillRect(nonmovingPositions[i].x - canvas.width/35/2, nonmovingPositions[i].y - canvas.width/35/2, canvas.width/35, canvas.width/35);
  }
  ctx.restore();

  // WIN TEXT DISPLAY
  if(escaping)
  {
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.font = '100px Zen Dots';
    ctx.textAlign = 'center';
    ctx.fillText("You Win!", canvas.width/2, canvas.height/2);
    ctx.restore();

    //5 seconds (approximately) countdown until the restart
    countdown++;
    if(countdown >= 60 * 5)
    {
      countdown = 0;

      //Restart the game
      escaping = false;
      pl.x = canvas.width/2 - canvas.width/40/2;
      pl.y = canvas.height - canvas.width/40*2;
      pl.xvel = 0;
      pl.yvel = 0;
    }
  }

  //EXIT DISPLAY
  if(exit.x+exitW/2 >= canvas.width) exit.x = canvas.width-exitW/2;
  if(exit.x-exitW/2 <= 0) exit.x = exitW/2;

  ctx.save();
  ctx.lineWidth = 7;
  ctx.strokeStyle = 'green';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = 'green';
  ctx.beginPath();
  ctx.moveTo(exit.x-exitW/2, exit.y);
  ctx.lineTo(exit.x+exitW/2, exit.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.arc(exit.x-exitW/2 , exit.y-exitW/30/2, exitW/30, 0, 2 * Math.PI);
  ctx.arc(exit.x+exitW/2 , exit.y-exitW/30/2, exitW/30, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

// Not for changes, game looped with frames
function gameLoop(){
  update();
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
