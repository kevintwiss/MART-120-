var escaping = false;

class Player{
  constructor(){
    this.x = canvas.width/2 - canvas.width/40/2;
    this.y = canvas.height - canvas.width/40*2;
    this.w = canvas.width/40;
    this.h = canvas.width/40;
    this.xvel = 0;
    this.yvel = 0;
  }

  draw(){
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  move(){
    if(!escaping)
    {
      this.x += this.xvel;
      this.y += this.yvel;

      if(this.x + this.w >= canvas.width) this.x = canvas.width - this.w;
      if(this.y + this.h >= canvas.height) this.y = canvas.height - this.h;

      if(this.x <= 0) this.x = 0;
      if(this.y <= 0){
        if(this.x >= exit.x-exitW/2 && this.x+this.w < exit.x+exitW/2) escaping = true;
        else this.y = 0;
      }
    }
  }

  escape(){
    if(escaping)
    {
      if(this.y >= -this.h) this.y-=0.5;
      else {
        WinProcess();
      }
    }
  }
}
