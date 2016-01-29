(function (window) {
	var ActionILL004 = function(battleController, owner) {
		this.bc = battleController;
		this.initialize(owner);
	}
	var a = ActionILL004.prototype = new BattleControllerAction();
	a.initialize = function(owner) {
		this.owner = owner;
		this.unique_id = null; //set by BattleController;
		this.chain = this.bc.chain;

		this.catalog_id = "ILL004";
		this.name = "Arcane Chain";
		this.attribute = this.bc.ATTRIBUTE.ILLUSIONIST;
		this.type = this.bc.TYPE.SKILL;
		this.cost_mana = 0;
		this.description = "Gain 1 Mana.";
		this.token_img = "arcanechain";
		this.mini_img = "small_arcanechain";

		this.is_resolved = false; 
		this.can_resolve = true;
	}
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether it can be triggered
	ActionILL004.prototype.getTriggerData = function() {
		return null;
	}
	ActionILL004.prototype.canTrigger = function() {
		return false;
	}
	ActionILL004.prototype.trigger = function() {
		
	}
	/* ~~~~~~~~~ ACTIVATE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter and it has been triggered, 
	//and it has been selected by the player (if activation is voluntary),
	//this data will be sent to the chain where it is processed
	ActionILL004.prototype.getActivateData = function() {
		return null;
	}
	ActionILL004.prototype.canActivate = function() {
		return false;
	}
	ActionILL004.prototype.activate = function() {
		
	}
	/* ~~~~~~~~~ USE or PREPARE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is clicked and dragged to a compatible unit, 
	//this data will be sent to the chain where it is processed
	//if this Action Token is a counter, this data should never be given to opponent
	ActionILL004.prototype.getUseData = function(unit) {
		use = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.USE,
			action_type: this.type,
		}
		return use;
	}
	/* ~~~~~~~~~ RESOLVE ~~~~~~~~~~~~ */
	//if this Action Token is currently being resolved on the chain, 
	//this Action Token's eventData (or ACTIVATE if counter) is replaced by this data. 
	//The changed chain is rebroadcast so additional counters can be triggered
	ActionILL004.prototype.getResolveData = function(unit) {
		use = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			change_mana: 1,
		}
		return use;
	}
	window.ActionILL004 = ActionILL004;
} (window));