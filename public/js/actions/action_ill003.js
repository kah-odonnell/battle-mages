(function (window) {
	var ActionILL003 = function(battleController, owner) {
		this.bc = battleController;
		this.initialize(owner);
	}
	var a = ActionILL003.prototype = new BattleControllerAction();
	a.initialize = function(owner) {
		this.owner = owner;
		this.unique_id = null; //set by BattleController on deck creation (setActions());
		this.chain = this.bc.chain;

		this.catalog_id = "ILL003";
		this.name = "Neurolyse";
		this.attribute = this.bc.ATTRIBUTE.ILLUSIONIST;
		this.type = this.bc.TYPE.ATTACK;
		this.cost_mana = 2;
		this.description = "Damage target opponent's unit for 1.5x power.";
		this.token_img = "neurolyse";
		this.mini_img = "small_neurolyse";

		this.is_resolved = false; //false for all Action Tokens
		this.can_resolve = true; //false only for counters, set true by activate()
		this.resolve_failed = false; //false for all, set true by resolveChain()
	}
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether it can be triggered
	ActionILL003.prototype.getTriggerData = function() {
		return null;
	}
	ActionILL003.prototype.canTrigger = function() {
		return false;
	}
	ActionILL003.prototype.trigger = function() {
		
	}
	/* ~~~~~~~~~ ACTIVATE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter and it has been triggered, 
	//and it has been selected by the player (if activation is voluntary),
	//this data will be sent to the chain where it is processed
	ActionILL003.prototype.getActivateData = function() {
		return null;
	}
	ActionILL003.prototype.canActivate = function() {
		return false;
	}
	ActionILL003.prototype.activate = function() {
		
	}
	/* ~~~~~~~~~ USE or PREPARE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is clicked and dragged to a compatible unit, 
	//this data will be sent to the chain where it is processed
	//if this Action Token is a counter, this data should not be given to opponent
	ActionILL003.prototype.getUseData = function(unit) {
		use = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.USE,
			action_type: this.type,
			change_mana: 0-this.cost_mana,
			select_target: {
				target_type: this.bc.chain.TARGET.OPPONENT_ALL,
				target_unique_id: null,
			}
		}
		return use;
	}
	/* inherited from BattleControllerAction
	BattleControllerAction.prototype.canUse = function(unit) {
		data = this.getUseData(unit);
		if (data != null) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAction.prototype.use = function(unit) {
		var t = this.canUse(unit)
		if (t) {
			var data = this.getUseData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	*/
	/* ~~~~~~~~~ RESOLVE ~~~~~~~~~~~~ */
	//if this Action Token is currently being resolved on the chain, 
	//this Action Token's eventData (or ACTIVATE if counter) is replaced by this data. 
	//The changed chain is rebroadcast so additional counters can be triggered
	ActionILL003.prototype.getResolveData = function(unit) {
		var short_term = this.bc.chain.short_term[this.unique_id];
		use = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			attack: {
				target_unique_id: short_term.select_target.target_unique_id,
				attack_power: 1.5,
			}
		}
		return use;
	}
	/* inherited from BattleControllerAction
	BattleControllerAction.prototype.canResolve = function(unit) {
		data = this.getResolveData(unit);
		if ((data != null) && this.can_resolve) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAction.prototype.resolve = function(unit) {
		var t = this.canResolve(unit)
		if (t) {
			this.is_resolved = true;
			var data = this.getResolveData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	*/
	window.ActionILL003 = ActionILL003;
} (window));