(function (window) {
	var Unit002 = function(battleController, player) {
		this.bc = battleController;
		this.initialize(player);
	};
	var u = Unit002.prototype = new BattleControllerUnit();
	u.initialize = function(player) {
		this.owner = player;
		this.unique_id = null;
		this.catalog_id = "U002";
		this.name = "Pyraprimsa";
		this.title = "";
		this.attributes = [
			this.bc.ATTRIBUTE.ILLUSION_MAGIC, this.bc.ATTRIBUTE.DISRUPTION
		];
		this.type = this.bc.TYPE.UNIT;

		//stat calculation
		this.level = 5;
		this.base_stat_health = 90;
		this.base_stat_attack = 50;
		this.base_stat_defense = 120;
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
		this.is_player = false;

		//graphical data
		var scale = 2;
		var sprite_data = new createjs.SpriteSheet({
			"images": [loader.getResult("pyraprisma_sprite")],
			"frames": {
				"width": 60*scale, 
				"height": 60*scale, 
				"count": 32, 
				"regX": 35*scale, 
				"regY": 60*scale
			},
			"animations": {
				"idle": [0, 29, true, .5], 
			},
			"framerate": 24
		});
		var sprite = new createjs.Sprite(sprite_data);
		this.sprite_data = sprite_data;
		this.guiUnit = new BattleUnitGui(sprite, player, this);

		// this.token_img = "token_pyraprisma";
		// this.small_token_img = "small_pyraprisma";
		this.card_img_name = "pyraprisma_icon";
		this.mini_img_name = "small_pyraprisma";
		this.frame_img_name = "frame_unit";
		this.card_img = this.makeGraphic();
		this.mini_img = new createjs.Bitmap(loader.getResult(this.mini_img_name)); 
	}
	Unit002.prototype.getSummonData = function(location) {
		summon = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.NORMAL_SUMMON,
			action_type: this.type,
			summon_location: location,
		}
		return summon;
	}
	Unit002.prototype.getResolveSummonData = function(location) {
		resolve = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			summon_location: location,
		}
		return resolve;
	}
	window.Unit002 = Unit002;
} (window));