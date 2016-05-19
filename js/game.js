var Game = {
  fps: 60,
  width: 440,
  height: 300
};

Game._onEachFrame = (function() {
  var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  if (requestAnimationFrame) {
   return function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    return function(cb) {
      setInterval(cb, 1000 / Game.fps);
    }
  }
})();

Game.start = function() {
  Game.canvas = document.createElement("canvas");
  Game.canvas.width = Game.width;
  Game.canvas.height = Game.height;
  Game.context = Game.canvas.getContext("2d");
  document.body.appendChild(Game.canvas);
  Game.player = Player;
  Game._onEachFrame(Game.run);
};

Game.run = (function() {
  var loops = 0, skipTicks = 1000 / Game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime(),
      lastGameTick;

  return function() {
    loops = 0;

    while ((new Date).getTime() > nextGameTick) {      
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }

    if (loops) {Game.draw();}
  }
})();

Game.draw = function() {
  Game.context.clearRect(0, 0, Game.width, Game.height);  
  Game.player.draw(Game.context);
  //console.log("Game.player.firing", Game.player.firing)  
  if (Game.player.firing){    
    for(i=0; i < Game.player.balas.length; i++){      
      Game.player.balas[i].draw(Game.context);      
    }    
  } 
};


Game.update = function() {  
  Game.player.update();
  if (Game.player.firing) {    
    for(i=0; i < Game.player.balas.length; i++){
      Game.player.balas[i].update();   
    }
  }
    
};