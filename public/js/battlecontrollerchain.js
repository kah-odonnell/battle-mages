(function (window) {
	//a singleton, responsible for making changes to the chain,
	//processing events on the chain, and determining the legality of action tokens
	//
	//initialized by BattleController()
	//
	//this is the only class that should change a unit's health,
	//inflict conditions, or compile lists of targets/counters/etc
	var BattleControllerChain = function(bc) {
		this.TARGET = {
			ALL: {string: ""},
			OPPONENT_ALL: {string: ""},
			OPPONENT_UNITS: {string: ""},
			OPPONENT_MINIONS: {string: ""},
			OWNER_ALL: {string: ""},
			OWNER_UNITS: {string: ""},
			OWNER_MINIONS: {string: ""},
		}
		this.EFFECT = {
			USE: {string: ""},
			RESOLVE: {string: ""},
			PREPARE: {string: ""},
			ACTIVATE: {string: ""},
			TRIGGER: {string: ""},
		}
		this.bc = bc;
		this.initialize();
	};
	//new token effects must be added to this function
	BattleControllerChain.prototype.isPossible = function(data) {
		var unit = this.bc.getTokenByUniqueId(data.unit_unique_id);
		var action = this.bc.getTokenByUniqueId(data.action_unique_id);
		if (unit.attributes.indexOf(action.attribute) == -1) {
			return false;
		}
		if ("change_mana" in data) {
			var effective_cost = data["change_mana"]
			if (unit.getMana() + effective_cost < 0) {
				return false;
			}
		}
		if ("target_a" in data) {
			if (this.getPossibleTargets(data["target_a"], unit.owner).length < 1) {
				return false;
			}
		}
		return true;
	}
	//called by A) BattleControllerAction.use()/.activate()
	// or B) BattleButton/BattleAI
	// or C) this.resolveChain();
	//
	//new token effects must be added to this function
	BattleControllerChain.prototype.finalizeData = function(data) {
		this.bc.is_resolving = true;
		var action_id = data.action_unique_id;
		var unit_id = data.unit_unique_id;
		var unit = this.bc.getTokenByUniqueId(unit_id);
		var owner = unit.owner;
		var action = this.bc.getTokenByUniqueId(action_id);
		var memory = this.short_term[action_id];
		if (!memory) {
			this.short_term[action_id] = {};
			memory = this.short_term[action_id];
		}
		//if a "target_a" is requested, it's either already in memory
		//or we need to let the player add it to memory and run this function
		if ("target_a" in data) {
			var tag = "target_a";
			if (!(tag in memory)) {
				var spec = data[tag] //this.TARGET.OPPONENT_ALL
				if (owner == "blue") this.bc.red_done = true;
				else this.bc.red_done = false;
				if (owner == "red") this.bc.blue_done = true;
				else this.bc.blue_done = false;
				this.bc.awaitInputTarget(owner, tag, spec, data)
				return true;
			} else {
				data[tag] = memory[tag]
			}
		}
		this.addToChain(data)
	}
	//gives/takes mana from units, inflicts damage, etc.
	//new token effects must be added to this function
	BattleControllerChain.prototype.processData = function(data) {
		var action_id = data.action_unique_id;
		var unit_id = data.unit_unique_id;
		var unit = this.bc.getTokenByUniqueId(unit_id);
		var owner = unit.owner;
		var action = this.bc.getTokenByUniqueId(action_id);
		this.bc.removeFromHand(action);
		var memory = this.short_term[action_id];
		if ("change_mana" in data) {
			unit.changeMana(data["change_mana"]);
		}
		if ("attack_damage" in data) {
			var tag = data["attack_damage"].main;
			var power = data["attack_damage"].main_power;
			var id = data[tag]
			var main_unit = this.bc.getTokenByUniqueId(id);
			unit.attack(main_unit, power);
		}
		if ("action_type" in data) {
			var is_prep_counter = (
				(data.action_type == this.bc.TYPE.COUNTER) && 
				(data.action_effect_type == this.EFFECT.USE)
			);
			var is_activate_counter = (
				(data.action_type == this.bc.TYPE.COUNTER) && 
				(data.action_effect_type == this.EFFECT.ACTIVATE)
			);
			var is_use_action = (
				(data.action_type != this.bc.TYPE.COUNTER) && 
				(data.action_effect_type == this.EFFECT.USE)
			);
			var is_resolve_action = (
				(data.action_effect_type == this.EFFECT.RESOLVE)
			);
			if (is_prep_counter) {
				unit.addCounter(action);
				action.location = this.bc.LOCATION.UNIT;
			}
			if (is_use_action || is_activate_counter) {
				unit.guiUnit.useToken(action);
				action.location = this.bc.LOCATION.CHAIN;
			}
			if (is_resolve_action) {
				unit.guiUnit.resolveToken(action);
				action.location = this.bc.LOCATION.DECK;
			}
			if (is_resolve_action && (action.type == this.bc.TYPE.COUNTER)) {
				unit.removeCounter(action);
			}
		}
		this.bc.resetActionPane();
	}
	BattleControllerChain.prototype.initialize = function() {
		this.chain = [];
		//short_term is set by BattleButton or BattleAI
		//BattleButton or BattleAI set red/blue_done true then call finalizeData()
		this.short_term = {
		//	i39029x2824csdw42: {
		//		target_a: kn289cma9e8u28323
		//	}
		};
	}
	BattleControllerChain.prototype.getTriggeringAction = function(trigger_data) {
		for (var i = this.chain.length - 1; i >= 0; i--) {
			var action_data = this.chain[i];
			var match = true;
			for (var trigger_evt in trigger_data) {
				if (!(trigger_evt in action_data)) {
					match = false;
				}
				else if (trigger_data[trigger_evt] != action_data[trigger_evt]) {
					match = false;
				}
			}
			if (match) {
				var action = this.bc.getTokenByUniqueId(this.chain[i].action_unique_id);				
				return action;
			}
		}
		return null;
	}
	/*
	trigger_data = {
		target_a: unit.unique_id,
		action_type: this.bc.TYPE.ATTACK,
	}
	*/
	BattleControllerChain.prototype.getTriggeringUnit = function(trigger_data) {
		for (var i = this.chain.length - 1; i >= 0; i--) {
			var action_data = this.chain[i];
			var match = true;
			for (var trigger_evt in trigger_data) {
				if (!(trigger_evt in action_data)) {
					match = false;
				}
				else if (trigger_data[trigger_evt] != action_data[trigger_evt]) {
					match = false;
				}
			}
			if (match) {
				var unit = this.bc.getTokenByUniqueId(this.chain[i].unit_unique_id);				
				return unit;
			}
		}
		return null;
	}
	BattleControllerChain.prototype.cleanShortTermData = function() {
		this.short_term = {};
	}
	//adds finalized data to the chain
	//called by this.resolveChain() -> this.finalizeData()
	//or BattleControllerAction.use()/.activate() -> this.finalizeData(),
	//but only after the data has all the input it needs to process
	BattleControllerChain.prototype.addToChain = function(data) {
		this.chain.push(data);
		this.processData(data);
		var action = this.bc.getTokenByUniqueId(data.action_unique_id);
		//determine whether we should wait for inputs
		var red_l = this.getTriggeredCounters("red").length;
		var blue_l = this.getTriggeredCounters("blue").length;
		if (red_l < 1) this.bc.red_done = true;
		else this.bc.red_done = false;
		if (blue_l < 1) this.bc.blue_done = true;
		else this.bc.blue_done = false;
		//determine user of action
		var owner = this.bc.getTokenByUniqueId(data.unit_unique_id).owner;
		//put game in a awaiting-input FSM state
		//input by the opponent of the owner of this unit is prioritized
		this.bc.awaitInputCounter(owner);
	}
	//returns a list of dictionaries
	//each dictionary represents the effect each Action Token currently has on the chain
	//unresolved tokens return their getUseData() (from chain, after data is finalized)
	//resolved tokens return their getResolveData() (from chain, after data is finalized)
	BattleControllerChain.prototype.getChain = function() {
		return this.chain;
	}
	//replaces data of the most recently added but unresolved item on the chain
	//with its finalized getResolveData() data
	//
	//called by BattleController.doEvokingStage/doActionStage()
	//finds the most recently added data (whose action is_resolved = false), removes it
	//and runs this.finalizeData(action.getResolveData(unit))
	//if everything on the chain is resolved, wipe it and short_term
	BattleControllerChain.prototype.resolveChain = function() {
		var can_clear = true;
		for (var i = this.chain.length - 1; i >= 0; i--) {
			var mr_data = this.chain[i];
			var mr_action_id = this.chain[i].action_unique_id;
			var mr_unit_id = this.chain[i].unit_unique_id;
			var mr_action = this.bc.getTokenByUniqueId(mr_action_id);
			var mr_unit;
			if (!(mr_action.is_resolved) && (mr_action.can_resolve)) {
				can_clear = false;
				mr_unit = this.bc.getTokenByUniqueId(mr_unit_id);
				mr_action.resolve(mr_unit);
				return true;
			} else {

			}
		}
		if (can_clear) {
			this.chain = [];
			this.short_term = {};
			this.bc.doActionStage();
		}
	}
	BattleControllerChain.prototype.makeDone = function(red_blue) {
		if (red_blue == "red") this.bc.red_done = true;
		else if (red_blue == "blue") this.bc.blue_done = true;
	}
	BattleControllerChain.prototype.getTriggeredCounters = function(red_blue) {
		var t_counters = [];
		var units = this.bc.getActiveUnits(red_blue, true);
		for (var i = 0; i < units.length; i++) {
			var unit = units[i];
			for (var j = 0; j < unit.counters.length; j++) {
				var counter = unit.counters[j];
				if (counter.canActivate(unit) && counter.canTrigger(unit)) {
					t_counters.push(counter);
				}
			}
		}
		return t_counters;
	}
	BattleControllerChain.prototype.getCounterUnit = function(red_blue, action) {
		var counters = [];
		var units = this.bc.getActiveUnits(red_blue, true);
		for (var i = 0; i < units.length; i++) {
			var unit = units[i];
			for (var j = 0; j < unit.counters.length; j++) {
				var counter = unit.counters[j];
				if (counter == action) {
					return unit;
				}
			}
		}
		return null;		
	}	
	BattleControllerChain.prototype.getPossibleTargets = function(target, owner) {
		var side;
		var list;
		if (target == this.TARGET.OPPONENT_ALL) {
			if (owner == "red") side = "blue";
			else if (owner == "blue") side = "red"
			else console.log("invalid owner");

			list = this.bc.getActiveUnits(side, true);
			return list;
		}
		else if (target == this.TARGET.OPPONENT_UNITS) {
			if (owner == "red") side = "blue";
			else if (owner == "blue") side = "red"
			else console.log("invalid owner");

			list = this.bc.getActiveUnits(side, false);
			return list;			
		}
		else if (target == this.TARGET.OPPONENT_MINIONS) {
			if (owner == "red") side = "blue";
			else if (owner == "blue") side = "red"
			else console.log("invalid owner");

			list_all = this.bc.getActiveUnits(side, true);
			list_minions = []
			for (var i = 0; i < list_all.length; i++) {
				if (list_all[i].is_minion) list_minions.push(list_all[i]);
			}
			return list_minions;			
		}
		if (target == this.TARGET.OWNER_ALL) {
			side = owner;

			list = this.bc.getActiveUnits(side, true);
			return list;
		}
		else if (target == this.TARGET.OWNER_UNITS) {
			side = owner;

			list = this.bc.getActiveUnits(side, false);
			return list;			
		}
		else if (target == this.TARGET.OWNER_MINIONS) {
			side = owner;

			list_all = this.bc.getActiveUnits(side, true);
			list_minions = []
			for (var i = 0; i < list_all.length; i++) {
				if (list_all[i].is_minion) list_minions.push(list_all[i]);
			}
			return list_minions;			
		}
		return [];
	}
	window.BattleControllerChain = BattleControllerChain;
} (window));