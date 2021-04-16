class Obstacle{
  constructor(movable, x, y){
    this.movable = (x && y) ? false : true;
    this.r =  Math.floor(Math.random()*(canvas.width/20 - canvas.width/45) + canvas.width/45);
    this.x = x ? x : Math.floor(Math.random()*(canvas.width - canvas.width/30));
    this.y = y ? y : Math.floor(Math.random()*(canvas.height - canvas.width/30));
    this.xvel = !movable ? 0 : Math.floor(Math.random()*(8 + 8)) - 8;
    this.yvel = !movable ? 0 : Math.floor(Math.random()*(8 + 8)) - 8;
    this.color = 'rgb(' + Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';
  }

  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.r, this.r);
  }

  move(){
    this.x += this.xvel;
    this.y += this.yvel;

    if(this.x > canvas.width && this.xvel > 0) this.x = -this.r;
    if(this.y > canvas.height && this.yvel > 0) this.y = -this.r;

    if(this.x + this.r < 0 && this.xvel < 0) this.x = canvas.width;
    if(this.y + this.r < 0 && this.yvel < 0) this.y = canvas.height;
  }
}
