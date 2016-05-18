//http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/
var Key = {
  _pressed: {},
  _wasPressed : {},
  
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE : 32,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    this._wasPressed[event.keyCode] = true;
    delete this._pressed[event.keyCode];    
  }
  
};
        
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

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

var Player = {
  x : 0,
  y : 0,
  width : 55,
  height : 20,
  aceleration : 4,
  firing : false,
  balas : [],
  frecuence : 5 
}

Player.draw = function(context) {    
  context.beginPath();                              
  //alas
  context.moveTo(Player.x, 5 + Player.y);         
  context.lineTo(25 + Player.x, 20 + Player.y);  
  context.lineTo(55 + Player.x, 5 + Player.y);  
  context.lineTo(25 + Player.x, 10 + Player.y);  
  context.lineTo(Player.x, 5 + Player.y);
  
  //propulsor
  context.moveTo(15 + Player.x, 7 + Player.y);
  context.lineTo(25 + Player.x, 0 + Player.y);
  context.lineTo(38 + Player.x, 7 + Player.y);
  
  //arm left
  context.moveTo(14 + Player.x, 14 + Player.y);
  context.lineTo(14 + Player.x, 20 + Player.y);
  context.lineTo(19 + Player.x, 20 + Player.y);
  context.lineTo(19 + Player.x, 17 + Player.y);
  
  //arm right
  context.moveTo(32 + Player.x, 17 + Player.y);
  context.lineTo(32 + Player.x, 20 + Player.y);
  context.lineTo(37 + Player.x, 20 + Player.y);
  context.lineTo(37 + Player.x, 14 + Player.y);
  
  context.stroke()   
  //context.fill();
};

Player.moveLeft = function() {
  if (Player.x > 0) Player.x -= Player.aceleration;
};

Player.moveRight = function() {  
  if (Player.x < Game.width - Player.width) Player.x += Player.aceleration;
};

Player.moveUp = function() {
  if (Player.y > 0) Player.y -= Player.aceleration;
};

Player.moveDown = function() {
  if (Player.y < Game.height - Player.height) Player.y += Player.aceleration;
};

Player.dispara = function(){
  
  //if (Game.player.balas.length % Player.frecuence == 0){
    Game.player.balas.push(new Bala());
  //} 
  
  this.firing = true;
}

Player.cancelDispara = function(){
  this.firing = false;
  console.log("cancel firing");
}

Player.update = function() {  
  if (Key.isDown(Key.UP)) this.moveUp();
  if (Key.isDown(Key.LEFT)) this.moveLeft();
  if (Key.isDown(Key.DOWN)) this.moveDown();
  if (Key.isDown(Key.RIGHT)) this.moveRight();
  if (Key.isDown(Key.SPACE)) this.dispara();
  
};

function Bala() {
  this.x = Player.x;
  this.y = Player.y + 20;
  this.width = 5;
  this.height = Game.height - Player.y;
  this.aceleration = 1; //1-5
  this.distanceArm = 15;
  this.count = 0;
  this.distance = 10;
  this.separator = 45;
};

Bala.prototype.draw = function(context) {    
    
  context.beginPath()
  // shot left
  context.moveTo(this.x + this.distanceArm, this.y + this.count );
  context.lineTo(this.x + this.distanceArm, this.height + this.y - this.separator + this.count )
  
  // shot right
  context.moveTo(this.x + Player.width - this.width - this.distanceArm, this.y + this.count);
  context.lineTo(this.x + Player.width - this.width - this.distanceArm, this.height + this.y - this.separator + this.count)
  
  context.stroke()  

};

Bala.prototype.update = function(){    
  this.y += this.distance;
  this.height = 50 ;  
  if (Game.height >= this.height + this.y - this.separator + this.count - this.distance){    
    this.count += this.aceleration;

    var last = Game.player.balas.length - 1;
        
    if (Game.player.balas[last].y + this.height - this.separator + this.count >=  Game.height){
      Player.cancelDispara();
    }

  }else{
    delete this;
  }
};

window.onload = Game.start;