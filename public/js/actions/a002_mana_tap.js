(function (window) {
	var Action002 = function(battleController, owner) {
		this.bc = battleController;
		this.initialize(owner);
	}
	var a = Action002.prototype = new BattleControllerAction();
	a.initialize = function(owner) {
		this.owner = owner;
		this.unique_id = null; //set by BattleController;
		this.chain = this.bc.chain;

		this.catalog_id = "A002";
		this.name = "Mana Tap";
		this.attributes = [this.bc.ATTRIBUTE.ILLUSION_MAGIC];
		this.type = this.bc.TYPE.COUNTER;
		this.cost_mana = 0;
		this.description = "When this unit is targeted for an Attack, gain 2 Mana if the attacking unit has more Mana than this unit.";
		
		this.card_img_name = "manatap";
		this.mini_img_name = "small_manatap";
		this.frame_img_name = "frame_counter";
		this.card_img = this.makeGraphic();
		this.mini_img = new createjs.Bitmap(loader.getResult(this.mini_img_name)); 

		this.is_resolved = false; //false for all Action Tokens, set_true by resolve()
		this.can_resolve = false; //false only for counters, set true by activate()
		this.resolve_failed = false; //false for all, set true by resolveChain()
	}
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether this counter can be triggered
	//arg "unit" is the unit to whom this counter belongs, not the unit triggering the counter.
	Action002.prototype.getTriggerData = function(unit) {
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
	Action002.prototype.meetsConditions = function(unit) {
		var data = this.getTriggerData(unit);
		var trigger_data = this.bc.chain.getTriggeringDatasets(data);
		if (trigger_data.length == 0 || unit == null) {
			return false;
		}
		//conditionals should be calculated below
		//i.e., opponent has more mana than this unit
		var trigger_action = this.bc.getTokenByUniqueId(trigger_data[0].action_unique_id)
		var trigger_unit = this.bc.getTokenByUniqueId(trigger_data[0].unit_unique_id)
		var bool = true;
		if (unit.mana >= trigger_unit.mana) bool = false; 
		return bool;
	}
	Action002.prototype.canTrigger = function(unit) {
		if (this.meetsConditions(unit)){
			return true;
		} else {
			return false;
		}
	}
	Action002.prototype.trigger = function() {
		//not used
	}
	/* ~~~~~~~~~ ACTIVATE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter and it has been triggered, 
	//and it has been selected by the player (if activation is voluntary),
	//this data will be sent to the chain where it is processed
	//things like a variable mana cost will be paid here
	Action002.prototype.getActivateData = function(unit) {
		activate = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.ACTIVATE,
			action_type: this.type,
			response_to: null
		}
		return activate;	
	}
	Action002.prototype.canActivate = function(unit) {
		data = this.getActivateData(unit);
		var is_prepared = (this.location == this.bc.LOCATION.UNIT);
		if ((data != null) && (is_prepared) && (this.meetsConditions(unit))) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	Action002.prototype.activate = function(unit) {
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
	Action002.prototype.getUseData = function(unit) {
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
	Action002.prototype.getResolveData = function(unit) {
		var short_term = this.bc.chain.short_term[this.unique_id];
		resolve = {
			unit_unique_id: unit.unique_id,
			action_unique_id: this.unique_id,
			action_effect_type: this.bc.chain.EFFECT.RESOLVE,
			action_type: this.type,
			change_mana: 2,
		}
		return resolve;
	}
	Action002.prototype.canResolve = function(unit) {
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
	window.Action002 = Action002;
} (window));