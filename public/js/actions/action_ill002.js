(function (window) {
	var ActionILL002 = function(battleController, owner) {
		this.bc = battleController;
		this.initialize(owner);
	}
	var a = ActionILL002.prototype = new BattleControllerAction();
	a.initialize = function(owner) {
		this.owner = owner;
		this.unique_id = null; //set by BattleController;
		this.chain = this.bc.chain;

		this.catalog_id = "ILL002";
		this.name = "Mana Tap";
		this.attribute = this.bc.ATTRIBUTE.ILLUSIONIST;
		this.type = this.bc.TYPE.COUNTER;
		this.cost_mana = 0;
		this.description = "When this unit is targeted for an Attack, gain 2 Mana if the attacking unit has more Mana than this unit.";
		this.token_img = "manatap";
		this.mini_img = "small_manatap";

		this.is_resolved = false; //false for all Action Tokens, set_true by resolve()
		this.can_resolve = false; //false only for counters, set true by activate()
		this.resolve_failed = false; //false for all, set true by resolveChain()
	}
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether this counter can be triggered
	//arg "unit" is the unit to whom this counter belongs, not the unit triggering the counter.
	ActionILL002.prototype.getTriggerData = function(unit) {
		trigger = {
			action_type: this.bc.TYPE.ATTACK,
			select_target: {
				target_type: this.bc.chain.TARGET.OPPONENT_ALL,
				target_unique_id: unit.unique_id,
			}
		}
		return trigger;
	}
	//counters might need additional condition checking
	ActionILL002.prototype.meetsConditions = function(unit) {
		var data = this.getTriggerData(unit);
		var trigger_action = this.bc.chain.getTriggeringAction(data);
		var trigger_unit = this.bc.chain.getTriggeringUnit(data);
		var counter_unit = unit;
		if (trigger_action == null || trigger_unit == null || counter_unit == null) {
			return false;
		}
		//conditionals should be calculated below
		//i.e., opponent has more mana than this unit
		var bool = true;
		if (unit.mana >= trigger_unit.mana) bool = false; 
		return bool;
	}
	ActionILL002.prototype.canTrigger = function(unit) {
		if (this.meetsConditions(unit)){
			return true;
		} else {
			return false;
		}
	}
	ActionILL002.prototype.trigger = function() {
		//not used
	}
	/* ~~~~~~~~~ ACTIVATE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter and it has been triggered, 
	//and it has been selected by the player (if activation is voluntary),
	//this data will be sent to the chain where it is processed
	//things like a variable mana cost will be paid here
	ActionILL002.prototype.getActivateData = function(unit) {
		activate = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.ACTIVATE,
			action_type: this.type,
		}
		return activate;	
	}
	ActionILL002.prototype.canActivate = function(unit) {
		data = this.getActivateData(unit);
		var is_prepared = (this.location == this.bc.LOCATION.UNIT);
		if ((data != null) && (is_prepared) && (this.meetsConditions(unit))) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	ActionILL002.prototype.activate = function(unit) {
		var t = this.canTrigger(unit);
		var a = this.canActivate(unit);
		if (t && a) {
			this.is_resolved = false;
			this.can_resolve = true;
			this.resolve_failed = false;
			var data = this.getActivateData(unit);
			this.bc.chain.finalizeData(data);
		}				
	}
	/* ~~~~~~~~~ USE or PREPARE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is clicked and dragged to a compatible unit, 
	//this data will be sent to the chain where it is processed
	//if this Action Token is a counter, this data should never be given to opponent
	ActionILL002.prototype.getUseData = function(unit) {
		use = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.USE,
			action_type: this.type,
		}
		return use;
	}
	/*
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
			this.is_resolved = false;
			var data = this.getUseData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	*/
	/* ~~~~~~~~~ RESOLVE ~~~~~~~~~~~~ */
	//if this Action Token is currently being resolved on the chain, 
	//this Action Token's eventData (or ACTIVATE if counter) is replaced by this data. 
	//The changed chain is rebroadcast so additional counters can be triggered
	ActionILL002.prototype.getResolveData = function(unit) {
		resolve = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			change_mana: 2,
		}
		return resolve;
	}
	ActionILL002.prototype.canResolve = function(unit) {
		if (!(unit)) return false;
		var data = this.getResolveData(unit);
		if ((data != null) && this.can_resolve && (this.meetsConditions(unit)) && unit.is_active) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	/* inherited from BattleControllerAction
	BattleControllerAction.prototype.resolve = function(unit) {
		var t = this.canResolve(unit)
		if (t) {
			this.is_resolved = true;
			var data = this.getResolveData(unit);
			this.bc.chain.finalizeData(data);
		}
	}
	*/
	window.ActionILL002 = ActionILL002;
} (window));