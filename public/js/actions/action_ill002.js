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
		this.description = "When this unit is targeted for an attack, and if the attacker has more Mana than this unit, gain 1 Mana.";
		this.token_img = "mirrorforce";
		this.mini_img = "small_mirrorforce";

		this.is_resolved = false;
		this.can_resolve = false;
	}
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether it can be triggered
	//TRIGGER DATA is used to match the data on the chain! 
	//Nothing about this data should be about this token's effects!
	ActionILL002.prototype.getTriggerData = function(unit) {
		trigger = {
			target_a: unit.unique_id,
			action_type: this.bc.TYPE.ATTACK,
		}
		return trigger;
	}
	ActionILL002.prototype.canTrigger = function(unit) {
		var can_trigger = false;
		var data = this.getTriggerData(unit);
		var trigger_action = this.bc.chain.getTriggeringAction(data);
		var trigger_unit = this.bc.chain.getTriggeringUnit(data);
		var bool = true;
		//weird conditionals should be calculated here
		//like opponent has more mana than this unit
		/* ~~~~~~~~~~~~~~~ActionILL002~~~~~~~~~~~~~~~~ */
		if (trigger_unit != null) {
			if (unit.mana >= trigger_unit.mana) bool = false; 
		} 
		/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
		if ((trigger_action != null) && bool){
			return true;
		} else {
			return false;
		}
	}
	ActionILL002.prototype.trigger = function() {
		
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
			action_type: this.bc.TYPE.COUNTER,
		}
		return activate;	
	}
	ActionILL002.prototype.canActivate = function(unit) {
		data = this.getActivateData(unit);
		var is_prepared = (this.location == this.bc.LOCATION.UNIT);
		if ((data != null) && (is_prepared)) {
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
			action_type: this.bc.TYPE.COUNTER,
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
			action_type: this.bc.TYPE.COUNTER,
			change_mana: 1
		}
		return resolve;
	}
	ActionILL002.prototype.canResolve = function(unit) {
		data = this.getResolveData(unit);
		if ((data != null) && this.can_resolve) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	ActionILL002.prototype.resolve = function(unit) {
		var t = this.canResolve(unit)
		if (t) {
			this.is_resolved = true;
			var data = this.getResolveData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	window.ActionILL002 = ActionILL002;
} (window));