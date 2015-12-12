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
		this.bc = bc;
		this.initialize();
	};
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
	//called by A) BattleControllerAction.use()/.activate()
	// or B) BattleButton/BattleAI
	// or C) this.resolveChain();
	//
	//new token effects must be added to this function
	BattleControllerChain.prototype.finalizeData = function(data) {
		var action_id = data.action_unique_id;
		var unit_id = data.unit_unique_id;
		var unit = this.bc.getTokenByUniqueId(unit_id);
		var owner = unit.owner;
		var action = this.bc.getTokenByUniqueId(action_id);
		var memory = this.short_term[action_id];
		if (!memory) {
			this.short_term = {};
			this.short_term[action_id] = {};
			memory = this.short_term[action_id];
		}
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
		if ("cost_mana" in data) {
			var tag = "target_a";
			unit.mana -= data["cost_mana"];
		}
		if ("attack_damage" in data) {
			var tag = data["attack_damage"].main;
			var power = data["attack_damage"].main_power;
			var id = data[tag]
			var main_unit = this.bc.getTokenByUniqueId(id);
			unit.attack(main_unit, power);
		}
		this.bc.resetActionPane();
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
		var opponent = this.bc.getOtherPlayer(owner);
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
		for (var i = 0; i < this.chain.length; i++) {
			var mr_action_id = this.chain[this.chain.length - 1 - i].action_unique_id;
			var mr_unit_id = this.chain[this.chain.length - 1 - i].unit_unique_id;
			var mr_action = this.bc.getTokenByUniqueId(mr_action_id);
			var mr_unit;
			if (!(mr_action.is_resolved)) {
				mr_unit = this.bc.getTokenByUniqueId(mr_unit_id);
				var incomplete_data = mr_action.getResolveData(mr_unit);
				mr_action.is_resolved = true;
				this.finalizeData(incomplete_data);
				return true;
			} else {

			}
		}
		this.chain = [];
		this.short_term = {};
	}
	//new token effects must be added to this function
	BattleControllerChain.prototype.isPossible = function(data) {
		var unit = this.bc.getTokenByUniqueId(data.unit_unique_id);
		var action = this.bc.getTokenByUniqueId(data.action_unique_id);
		if (unit.attributes.indexOf(action.attribute) == -1) {
			return false;
		}
		if ("cost_mana" in data) {
			var effective_cost = data["cost_mana"]
			if (unit.getMana() < effective_cost) {
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
	BattleControllerChain.prototype.makeDone = function(red_blue) {
		if (red_blue == "red") this.bc.red_done = true;
		else if (red_blue == "blue") this.bc.blue_done = true;
	}
	BattleControllerChain.prototype.getTriggeredCounters = function(red_blue) {
		return [];
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