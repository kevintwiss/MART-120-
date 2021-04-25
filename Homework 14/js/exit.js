let exitW = window.innerWidth/10;
const exit = {
  x: Math.floor(Math.random()*((window.innerWidth - exitW/2) - exitW/2)+exitW/2),
  y: 0,
  display: function(){

    if(this.x+exitW/2 >= canvas.width) this.x = canvas.width-exitW/2;
    if(this.x-exitW/2 <= 0) this.x = exitW/2;

    ctx.save();
  	ctx.lineWidth = 7;
  	ctx.strokeStyle = 'green';
  	ctx.shadowBlur = 30;
  	ctx.shadowOffsetY = 10;
  	ctx.shadowColor = 'green';
  	ctx.beginPath();
  	ctx.moveTo(this.x-exitW/2, this.y);
  	ctx.lineTo(this.x+exitW/2, this.y);
  	ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(this.x-exitW/2 , this.y-exitW/30/2, exitW/30, 0, 2 * Math.PI);
    ctx.arc(this.x+exitW/2 , this.y-exitW/30/2, exitW/30, 0, 2 * Math.PI);
    ctx.fill();
  	ctx.restore();
  }
};
