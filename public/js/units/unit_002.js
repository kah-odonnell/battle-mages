(function (window) {
	var Unit002 = function(battleController, player) {
		this.bc = battleController;
		this.initialize(player);
	};
	var u = Unit002.prototype = new BattleControllerUnit();
	u.initialize = function(player) {
		this.owner = player;
		this.unique_id = null; //set by BattleController;
		this.catalog_id = "002";
		this.name = "Ao";
		this.title = "the Arcane Avatar";
		this.attributes = [this.bc.ATTRIBUTE.ELEMENTALIST];
		this.level = 5;
		this.base_stat_health = 95;
		this.base_stat_attack = 90;
		this.base_stat_defense = 95;
		this.base_stat_luck = 60;
		this.unit_img = "ao";
		this.token_img = "token_ao";

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
		this.guiUnit = new BattleUnitGui(this.unit_img, player, this);
	}
	window.Unit002 = Unit002;
} (window));