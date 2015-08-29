(function (window) {
	var ActionToken = function(){
		this.description = "";
		this.mana = 0;
		this.prototype = new Token();
		ActionToken.initialize();
	}
	ActionToken.initialize = function(){

	}
	ActionToken.tick = function() {

	}
	window.ActionToken = ActionToken;
} (window));		