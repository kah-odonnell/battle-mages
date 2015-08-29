(function (window) {
	var Token = function(){
		this.name = "";
		this.ATTRIBUTE = {
			ILLUSIONIST: {value: 0},
			ELEMENTALIST: {value: 0},
			NECROMANCER: {value: 0},
			KNIGHT: {value: 0},
			VAGRANT: {value: 0},
			ABERRATION: {value: 0},
			CONSTRUCT: {value: 0},
		}
		this.initialize();
	}
	var t = Token.prototype = new createjs.Container();
	t.Container_initialize = t.initialize;
	t.initialize = function(){

	}
	Token.prototype.tick = function() {

	}
	window.Token = Token;
} (window));		
