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
	BattleControllerUnit.prototype.attack = function(target, power) {
		var final_unit_attack = this.raw_attack*(1+.5*this.stage_attack);
		var final_target_defense = target.raw_defense*(1+.5*target.stage_defense);
		var random = 1;
		var damage = ((2*this.level+10)/250)*(final_unit_attack/final_target_defense)*(power*100)*random;
		target.current_health -= damage;
		if (target.current_health <= 0) this.bc.destroy(target);
	}
	BattleControllerUnit.prototype.setCurrentHealth = function() {
		var health = Math.floor(2*this.base_stat_health*(this.level/100)) + this.level + 10;
		return health;
	}
	BattleControllerUnit.prototype.setCurrentAttack = function() {
		var attack = Math.floor(2*this.base_stat_attack*(this.level/100)) + 5;
		return attack;
	}
	BattleControllerUnit.prototype.setCurrentDefense = function() {
		var defense = Math.floor(2*this.base_stat_defense*(this.level/100)) + 5;
		return defense;
	}
	BattleControllerUnit.prototype.setCurrentLuck = function() {
		var luck = Math.floor(2*this.base_stat_luck*(this.level/100)) + 5;
		return luck;
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