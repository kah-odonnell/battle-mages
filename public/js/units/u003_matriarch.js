(function (window) {
	var Unit003 = function(battleController, player) {
		this.bc = battleController;
		this.initialize(player);
	};
	var u = Unit003.prototype = new BattleControllerUnit();
	u.initialize = function(player) {
		this.owner = player;
		this.unique_id = null;
		this.catalog_id = "U003";
		this.name = "Ligeia";
		this.title = "the Deep Sea Matriarch";
		this.attributes = [
			this.bc.ATTRIBUTE.ILLUSION_MAGIC, this.bc.ATTRIBUTE.COERCION, this.bc.ATTRIBUTE.WATERBENDING
		];
		this.type = this.bc.TYPE.UNIT;

		//stat calculation
		this.level = 5;
		this.base_stat_health = 60;
		this.base_stat_attack = 90;
		this.base_stat_defense = 95;
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
			"images": [loader.getResult("sprite_matriarch")],
			"frames": {
				"width": 50*scale, 
				"height": 60*scale, 
				"count": 14, 
				"regX": 28*scale, 
				"regY": 60*scale
			},
			"animations": {
				"idle": [1, 6, true, .25], 
			},
			"framerate": 10
		});
		var sprite = new createjs.Sprite(sprite_data);
		this.sprite_data = sprite_data;
		this.guiUnit = new BattleUnitGui(sprite, player, this);

		// this.token_img = "token_shiren";
		// this.small_token_img = "small_shiren";
		this.card_img_name = "matriarch_icon";
		this.mini_img_name = "small_matriarch";
		this.frame_img_name = "frame_unit";
		this.card_img = this.makeGraphic();
		this.mini_img = new createjs.Bitmap(loader.getResult(this.mini_img_name)); 
	}
	Unit003.prototype.getSummonData = function(location) {
		summon = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.NORMAL_SUMMON,
			action_type: this.type,
			summon_location: location,
		}
		return summon;
	}
	Unit003.prototype.getResolveSummonData = function(location) {
		resolve = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			summon_location: location,
		}
		return resolve;
	}
	window.Unit003 = Unit003;
} (window));