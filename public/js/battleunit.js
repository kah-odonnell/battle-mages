(function (window) {
	var BattleUnit = function(player){
		this.initialize(player);
	}
	var pp = BattleUnit.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(player){
		this.Container_initialize();
	}
	BattleUnit.prototype.evoke = function() {
		
	}
	BattleUnit.prototype.tick = function() {

	}
	window.BattleUnit = BattleUnit;
} (window));	