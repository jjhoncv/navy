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