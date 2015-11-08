(function (window) {
	var BattlePlayer = function(player){
		this.initialize(player);
	}
	var pp = BattlePlayer.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(player){
		this.Container_initialize();
		this.battlename = "Morgan";
		this.library = player2library;
		this.actions = this.buildActions(this.library["actions"]);
		this.units = this.buildUnits(this.library["units"]);

		this.activeUnits = [];
		this.hand = [];
		this.heldTokens = [];

		this.makeSprites();
		this.setIdle();
		this.x = 100;
		this.y = 175;
		this.scaleX = -1;
	}
	BattlePlayer.prototype.evoke = function(unit) {
		
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
	BattlePlayer.prototype.buildUnits = function(unitList) {
		var units = []
		for (var i = 0; i < unitList.length; i++) {
			var unitNo = unitList[i];
			var newUnit = new BattleUnit(unitNo, unitCatalog[unitNo], this);
			units.push(newUnit);
		}
		return units;
	}
	BattlePlayer.prototype.buildActions = function(actionList) {
		var actions = [];
		for (var i = 0; i < actionList.length; i++) {
			var libraryId = i;
			var actionNo = actionList[i];
			var actionData = actionCatalog[actionNo];
			var newAction = new BattleAction(libraryId, actionData, this);
			actions.push(newAction);
		}
		return actions;
	}
	BattlePlayer.prototype.newHand = function() {
		while (this.getHand().length < 7) {
			var numtoadd = Math.floor(Math.random() * this.actions.length);
			var tokentoadd = this.getActionFromId(numtoadd);
			var canAdd = true;
			for (var j = 0; j < this.getHand().length; j++) {
				if (this.getHand()[j].libraryId == tokentoadd.libraryId) {
					canAdd = false;
				}
			}
			if (canAdd) {
				console.log("adding " + tokentoadd.libraryId)
				this.hand.push(tokentoadd)
			}
		}
		return this.hand;
	}
	BattlePlayer.prototype.getActionFromId = function(id) {
		for (var i = 0; i < this.actions.length; i++) {
			if (id == this.actions[i].getLibraryId()) {
				return this.actions[i];
			}
		}
	}
	BattlePlayer.prototype.getHand = function() {
		return this.hand;
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