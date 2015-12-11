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
		this.name = "Ren Mei";
		this.title = "the Renowned Act";
		this.attributes = [this.bc.ATTRIBUTE.ILLUSIONIST];
		this.level = 5;
		this.base_stat_health = 95;
		this.base_stat_attack = 90;
		this.base_stat_defense = 95;
		this.base_stat_luck = 60;
		this.unit_img = "renmei";
		this.token_img = "token_renmei";

		this.mana = 0;
		this.current_max_health = this.setCurrentHealth();
		this.current_health = this.current_max_health;
		this.current_attack = this.setCurrentAttack();
		this.current_defense = this.setCurrentDefense();
		this.current_luck = this.setCurrentLuck();

		this.stage_health = 0;
		this.stage_attack = 0;
		this.stage_defense = 0;
		this.stage_luck = 0;

		this.is_minion = false;
		this.is_active = false;
		this.guiUnit = new BattleUnitGui(this.unit_img, player, this);
	}
	window.Unit001 = Unit001;
} (window));