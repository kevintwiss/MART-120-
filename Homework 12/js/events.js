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
    obstacles.push(new Obstacle(false, e.pageX, e.pageY));
  }
}
