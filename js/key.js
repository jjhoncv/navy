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