(function (window) {
	var BattlePlayer = function(player){
		this.initialize(player);
	}
	var pp = BattlePlayer.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(player){
		this.Container_initialize();
		this.battlename = "Morgan"
		this.library = player2library;
		this.actions = this.library["actions"];
		this.units = this.library["units"];

		this.makeSprites();
		this.setIdle();
		this.x = 200;
		this.y = 350;
		this.scaleX = -1;
	}
	BattlePlayer.prototype.evoke = function() {
		
	}
	BattlePlayer.prototype.tick = function() {

	}
	BattlePlayer.prototype.makeSprites = function() {
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("knight")],
			"frames": {
				"width": 100, 
				"height": 92, 
				"count": 36, 
				"regX": 46, 
				"regY": 92
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idleSide": [0, 1, "idleSide", .05], 
				"idleUp": [25, 25, "idleUp", .05], 
				"idleDown": [12, 14, "idleDown", .05], 
				"runSide": [2, 10, "runSide", 1],
				"runUp": [26, 35, "runUp", 2],
				"runDown": [15, 24, "runDown", 2]
			},
			"framerate": 10
		});
		this.idleSide = new createjs.Sprite(data, "idleSide");
		this.runSide = new createjs.Sprite(data, "runSide");
	}
	BattlePlayer.prototype.setIdle = function() {
		this.removeChild(this.runSide);
		this.addChild(this.idleSide);
	}
	BattlePlayer.prototype.setRun = function() {
		this.removeChild(this.idleSide);
		this.addChild(this.runSide);
	}
	window.BattlePlayer = BattlePlayer;
} (window));	