(function (window) {
	var Player001 = function(battleController, player) {
		this.bc = battleController;
		this.initialize(player);
	};
	var u = Player001.prototype = new BattleControllerUnit();
	u.initialize = function(player) {
		this.owner = player;
		this.unique_id = null;
		this.catalog_id = "P001";
		this.name = "Audrey";
		this.title = "";
		this.attributes = [
			this.bc.ATTRIBUTE.ILLUSION_MAGIC, this.bc.ATTRIBUTE.SWORDSMANSHIP, this.bc.ATTRIBUTE.COMBAT_SUPPORT
		];
		this.type = this.bc.TYPE.UNIT;

		//stat calculation
		this.level = 5;
		this.base_stat_health = 75;
		this.base_stat_attack = 85;
		this.base_stat_defense = 80;
		this.base_stat_luck = 60;

		this.raw_max_health = this.setCurrentHealth();
		this.current_health = this.raw_max_health;
		this.raw_attack = this.setCurrentAttack();
		this.raw_defense = this.setCurrentDefense();
		this.raw_luck = this.setCurrentLuck();

		this.stage_health = 0;
		this.stage_attack = 0;
		this.stage_defense = 0;
		this.stage_luck = 0;

		//battlechain & battlecontroller data
		this.mana = 0;
		this.counters = [];
		this.is_minion = false;
		this.is_active = false;
		this.is_resolved = false;
		this.can_resolve = true;
		//is_player - true for summoners, false for plain old units
		this.is_player = true;
		//has_normal_summoned - true when a monster has been summoned this turn
		this.has_normal_summoned = false;

		//graphical data
		var scale = 2;
		var sprite_data = new createjs.SpriteSheet({
			"images": [loader.getResult("audreyparserrokah")],
			"frames": {
				"width": 50*scale, 
				"height": 46*scale, 
				"count": 41, 
				"regX": 30*scale, 
				"regY": 46*scale
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idle": [0, 4, true, .05], 
				"idleUp": [30, 30, true, .05], 
				"idleDown": [15, 19, true, .05], 
				"runSide": [5, 13, true, 1],
				"runUp": [31, 40, true, 1.5],
				"runDown": [20, 29, true, 1.5]
			},
			"framerate": 10
		});
		var sprite = new createjs.Sprite(sprite_data);
		this.sprite_data = sprite_data;
		this.guiUnit = new BattleUnitGui(sprite, player, this);
		this.card_img_name = "audrey_icon";
		this.mini_img_name = "small_audrey";
		this.frame_img_name = "frame_mage";
		this.card_img = this.makeGraphic();
		this.mini_img = new createjs.Bitmap(loader.getResult(this.mini_img_name)); 

		// initial positioning data
		if (this.owner == "blue") {
			this.guiUnit.x = 55;
			this.guiUnit.y = 175;
			this.guiUnit.sprite.scaleX = -1;
		} else {
			this.guiUnit.x = canvas.width - 55;
			this.guiUnit.y = 175;
			this.guiUnit.sprite.scaleX = -1;
		}
		this.is_moving = false;
		this.destinationX = this.guiUnit.x;
		this.destinationY = this.guiUnit.y;
		this.setIdle();
	}
	Player001.prototype.setIdle = function() {
		var anim = "idle";
		if (this.currentAnimation != anim) {
			this.guiUnit.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	Player001.prototype.setRun = function() {
		var anim = "runSide";
		if (this.currentAnimation != anim) {
			this.guiUnit.sprite.gotoAndPlay(anim);
			this.currentAnimation = anim;
		}
	}
	Player001.prototype.getSummonData = function(location) {
		summon = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.SPECIAL_SUMMON,
			action_type: this.type,
			summon_location: location,
		}
		return summon;
	}
	Player001.prototype.getResolveSummonData = function(location) {
		resolve = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			summon_location: location,
		}
		return resolve;
	}
	Player001.prototype.stepForward = function(location) {
		this.setRun();
		this.is_moving = true;
		this.is_moving_forward = true;
		this.is_moving_backward = false;
		if (this.owner == "blue") {
			this.destinationX = location.BLUE.x + 10;
			this.destinationY = location.BLUE.y;
		} else {
			this.destinationX = location.RED.x - 10;
			this.destinationY = location.RED.y;			
		}
	}
	Player001.prototype.stepBackward = function(location) {
		this.setRun();
		this.guiUnit.scaleX *= -1;
		this.is_moving = true;
		this.is_moving_forward = false;
		this.is_moving_backward = true;
		if (this.owner == "blue") {
			this.destinationX = 75;
			this.destinationY = 175;
		} else {
			this.destinationX = canvas.width - 75;
			this.destinationY = 175;			
		}
	}
	Player001.prototype.tick = function() {
		var is_moving_x = true;
		var is_moving_y = true;
		if ((this.guiUnit.x > this.destinationX - 5) && (this.guiUnit.x < this.destinationX + 5)) {
			//this is fine
			if (this.is_moving) {
				is_moving_x = false;
				if (this.is_moving_backward) {
					this.is_moving_backward = false;
					this.guiUnit.scaleX *= -1;
				}
			}
		}
		else if (this.guiUnit.x < this.destinationX + 5) {
			this.guiUnit.x++;
		}
		else if (this.guiUnit.x > this.destinationX - 5) {
			this.guiUnit.x--;
		}
		if ((this.guiUnit.y > this.destinationY - 5) && (this.guiUnit.y < this.destinationY + 5)) {
			if (this.is_moving) {
				is_moving_y = false;
			}
		}
		else if (this.guiUnit.y < this.destinationY + 5) {
			this.guiUnit.y++;
		}
		else if (this.guiUnit.y > this.destinationY - 5) {
			this.guiUnit.y--;
		}
		if ((!is_moving_x) && (!is_moving_y)) {
			this.setIdle();
		}
	}
	window.Player001 = Player001;
} (window));