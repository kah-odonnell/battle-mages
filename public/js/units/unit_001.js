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
		this.level = 5;
		this.base_stat_health = 95;
		this.base_stat_attack = 90;
		this.base_stat_defense = 95;
		this.base_stat_luck = 60;
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
		this.token_img = "token_renmei";

		this.mana = 0;
		this.counters = [];
		this.raw_max_health = this.setCurrentHealth();
		this.current_health = this.raw_max_health;
		this.raw_attack = this.setCurrentAttack();
		this.raw_defense = this.setCurrentDefense();
		this.raw_luck = this.setCurrentLuck();

		this.stage_health = 0;
		this.stage_attack = 0;
		this.stage_defense = 0;
		this.stage_luck = 0;

		this.is_minion = false;
		this.is_active = false;
		this.guiUnit = new BattleUnitGui(sprite, player, this);
	}
	window.Unit001 = Unit001;
} (window));