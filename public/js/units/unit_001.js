(function (window) {
	var Unit001 = function(battleController, player) {
		this.bc = battleController;
		this.initialize(player);
	};
	var u = Unit001.prototype = new BattleControllerUnit();
	u.initialize = function(player) {
		this.owner = player;
		this.unique_id = null;
		this.catalog_id = "001";
		this.name = "Shiren";
		this.title = "the Veiled";
		this.attributes = [this.bc.ATTRIBUTE.ILLUSIONIST];
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

		//graphical data
		var scale = 2;
		var sprite_data = new createjs.SpriteSheet({
			"images": [loader.getResult("shiren_sprite")],
			"frames": {
				"width": 50*scale, 
				"height": 60*scale, 
				"count": 14, 
				"regX": 28*scale, 
				"regY": 60*scale
			},
			"animations": {
				"idle": [1, 11, true, .25], 
			},
			"framerate": 10
		});
		var sprite = new createjs.Sprite(sprite_data);
		this.token_img = "token_shiren";
		this.small_token_img = "small_shiren";
		this.sprite_data = sprite_data;
		this.guiUnit = new BattleUnitGui(sprite, player, this);
	}
	Unit001.prototype.getSummonData = function(location) {
		summon = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.SUMMON,
			action_type: this.type,
			summon_location: location,
		}
		return summon;
	}
	Unit001.prototype.getResolveSummonData = function(location) {
		resolve = {
			unit_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			summon_location: location,
		}
		return resolve;
	}
	window.Unit001 = Unit001;
} (window));