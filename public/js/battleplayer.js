(function (window) {
	var BattlePlayer = function(player){
		this.initialize(player);
	}
	var pp = BattlePlayer.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(player){
		this.Container_initialize();
		this.battlename = "Audrey";

		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];
		
		this.makeSprites();
		this.setIdle();
		this.x = 75;
		this.y = 175;
		this.scaleX = -1;
		this.is_player = true;
	}
	BattlePlayer.prototype.tick = function() {

	}
	BattlePlayer.prototype.makeSprites = function() {
		var scale = 2;
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("audreyparserrokah")],
			"frames": {
				"width": 50*scale, 
				"height": 46*scale, 
				"count": 41, 
				"regX": 28*scale, 
				"regY": 46*scale
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idleSide": [0, 4, true, .05], 
				"idleUp": [30, 30, true, .05], 
				"idleDown": [15, 19, true, .05], 
				"runSide": [5, 13, true, 1],
				"runUp": [31, 40, true, 1.5],
				"runDown": [20, 29, true, 1.5]
			},
			"framerate": 10
		});
		this.sprite = new createjs.Sprite(data);
		this.addChild(this.sprite);
	}
	BattlePlayer.prototype.setIdle = function() {
		var anim = "idleSide";
		if (this.currentAnimation != anim) {
			this.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	BattlePlayer.prototype.setRun = function() {
		var anim = "runSide";
		if (this.currentAnimation != anim) {
			this.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	window.BattlePlayer = BattlePlayer;
} (window));	