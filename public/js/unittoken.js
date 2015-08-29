(function (window) {
	var UnitToken = function(){
		this.prototype = new Token();
		UnitToken.initialize();
	}
	UnitToken.initialize = function(){

	}
	UnitToken.tick = function() {

	}
	window.UnitToken = UnitToken;
} (window));		