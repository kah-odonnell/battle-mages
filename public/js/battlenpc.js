(function (window) {
	var BattleNPC = function(npc){
		this.initialize(npc);
	}
	var pp = BattleNPC.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(npc){
		this.Container_initialize();
		this.battlename = npc.formalname;

		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];

		this.makeSprites();
		this.setIdle();
		this.x = canvas.width - 75;
		this.y = 175;
		this.is_player = false;
	}
	BattleNPC.prototype.tick = function() {

	}
	BattleNPC.prototype.makeSprites = function() {
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
		this.sprite = new createjs.Sprite(data);
		this.addChild(this.sprite);
	}
	BattleNPC.prototype.setIdle = function() {
		var anim = "idleSide";
		if (this.currentAnimation != anim) {
			this.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	BattleNPC.prototype.setRun = function() {
		var anim = "runSide";
		if (this.currentAnimation != anim) {
			this.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	window.BattleNPC = BattleNPC;
} (window));	