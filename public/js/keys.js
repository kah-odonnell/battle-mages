bm.Keys = class {
	constructor() {
		this._pressed = {}
		this.LEFT = 65
		this.UP = 87
		this.RIGHT = 68
		this.DOWN = 83
		this.SPACE = 32


		window.addEventListener('keyup', function(event) { 
			bm.keys.onKeyup(event); 
		}, false);

		window.addEventListener('keydown', function(event) { 
			event.preventDefault();  //prevents spacebar from scrolling the page
			bm.keys.onKeydown(event); 
		}, false);
		//prevents right click menu
		window.addEventListener('contextmenu', function(event) { 
			this._pressed = {}  
			event.preventDefault(); 
		}, false);
		//prevents a stuck walking issue when switching browser tabs while walking 
		window.addEventListener("focus", function( event ) {
			bm.keys._pressed = {} 
		}, true);
		window.addEventListener("blur", function( event ) {
			bm.keys._pressed = {} 
		}, true);
		//resets the canvas to the size of the window
		//prevents default canvas stretching
		window.addEventListener("resize", function( event ) {
			bm.gameInstance.resetCanvas();
			if (bm.gameInstance.mapGraph.currentMap) bm.gameInstance.mapGraph.currentMap.recenter();
		}, true);
	}
	  
	isDown(keyCode) {
	  return this._pressed[keyCode];
	}
	  
	onKeydown(event) {
	  this._pressed[event.keyCode] = true;
	}
	  
	onKeyup(event) {
	  delete this._pressed[event.keyCode];
	}
}