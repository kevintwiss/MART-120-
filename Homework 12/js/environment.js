function Background(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width, canvas.height);
}
function Borders(){

  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowColor = 'red';
  ctx.strokeRect(0,0,canvas.width, canvas.height);

  ctx.restore();

}

let countdown = 0;
function WinProcess(){
  if(escaping)
  {
    ctx.save();
    ctx.fillStyle = 'green';
    ctx.font = '100px Zen Dots';
    ctx.textAlign = 'center';
    ctx.fillText("You Win!", canvas.width/2, canvas.height/2);
    ctx.restore();

    countdown++;
    if(countdown >= 60 * 5)
    {
      countdown = 0;
      RestartTheGame();
    }
  }
}

function RestartTheGame(){
  escaping = false;
  pl.x = canvas.width/2 - canvas.width/40/2;
  pl.y = canvas.height - canvas.width/40*2;
  pl.xvel = 0;
  pl.yvel = 0;
}
