(function (window) {
	var BattleControllerUnit = function() {

	};
	BattleControllerUnit.prototype.increaseMana = function() {
		this.mana++;
	}
	BattleControllerUnit.prototype.evoke = function() {
		this.is_active = true;
		return true;
	}
	BattleControllerUnit.prototype.revoke = function() {
		this.is_active = false;
		return true;
	}
	BattleControllerUnit.prototype.getMana = function() {
		return this.mana;
	}
	BattleControllerUnit.prototype.setCurrentHealth = function() {
		return this.base_stat_health;
	}
	BattleControllerUnit.prototype.setCurrentAttack = function() {
		return this.base_stat_attack;
	}
	BattleControllerUnit.prototype.setCurrentDefense = function() {
		return this.base_stat_defense;
	}
	BattleControllerUnit.prototype.setCurrentLuck = function() {
		return this.base_stat_luck;
	}
	BattleControllerUnit.prototype.createUniqueId = function() {
		var id = "";
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		var unique = false
		while (unique == false) {
			id = "";
			for (var i = 0; i < chars.length; i++) {
				var j = Math.floor(Math.random() * (chars.length - 1))
				id = id + chars[j];
			}
			if (this.bc.getTokenByUniqueId(id) === null) {
				unique = true;
			}
		}
		this.unique_id = id;		
	}
	window.BattleControllerUnit = BattleControllerUnit;
} (window));