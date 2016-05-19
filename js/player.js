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