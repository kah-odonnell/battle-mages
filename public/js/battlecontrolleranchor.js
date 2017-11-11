(function (window) {
	var BattleControllerAnchor = function() {
		this.LOCATION = {
			DECK: {string: "Deck"},
			HAND: {string: "Hand"},
			UNIT: {string: "Unit"},
			CHAIN: {string: "Chain"},
		}
	};
	BattleControllerAnchor.prototype.negate = function() {
		this.can_resolve = false;
		return true;
	}
	///////////////////////// BattleControllerChain Interaction /////////////////////////
	/* ~~~~~~~~~ TRIGGER ~~~~~~~~~~~~ */
	//this data will be compared to the data on the chain to determine whether it can be triggered
	BattleControllerAnchor.prototype.getTriggerData = function() {
		return null;
	}
	BattleControllerAnchor.prototype.canTrigger = function() {
		return false;
	}
	BattleControllerAnchor.prototype.trigger = function() {
		
	}
	/* ~~~~~~~~~ ACTIVATE ~~~~~~~~~~~~ */
	//if this anchor responds to triggers like a counter,
	//this data is sent to the chain before the resolve data
	BattleControllerAnchor.prototype.getActivateData = function() {
		return null;
	}
	BattleControllerAnchor.prototype.canActivate = function() {
		return false;
	}
	BattleControllerAnchor.prototype.activate = function() {
		
	}
	/* ~~~~~~~~~ FINISH ~~~~~~~~~~~~ */
	//sent to the chain when this anchor expires or is removed
	BattleControllerAnchor.prototype.getFinishData = function() {
		return null;
	}
	BattleControllerAnchor.prototype.canFinish = function() {
		return false;
	}
	BattleControllerAnchor.prototype.finish = function() {
		
	}
	/* ~~~~~~~~~ APPLY ~~~~~~~~~~~~ */
	//this data will be sent to the chain as a way of creating the anchor
	//and defining the necessary variables
	BattleControllerAnchor.prototype.getApplyData = function(unit) {
		return null;
	}
	BattleControllerAnchor.prototype.canApply = function(unit) {
		data = this.getApplyData(unit);
		if (data != null) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAnchor.prototype.apply = function(unit) {
		var t = this.canUse(unit)
		if (t) {
			this.is_resolved = false;
			this.resolve_failed = false;
			var data = this.getApplyData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	/* ~~~~~~~~~ RESOLVE ~~~~~~~~~~~~ */
	//if this anchor's activateData is currently on the chain
	//add this resolve data to the chain.
	//The changed chain is rebroadcast so additional counters can be triggered
	BattleControllerAnchor.prototype.getResolveData = function(unit) {
		return null;
	}
	BattleControllerAnchor.prototype.canResolve = function(unit) {
		data = this.getResolveData(unit);
		if ((data != null) && this.can_resolve) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAnchor.prototype.resolve = function(unit) {
		var t = this.canResolve(unit)
		if (t) {
			this.is_resolved = true;
			this.resolve_failed = false;
			var data = this.getResolveData(unit);
			this.bc.chain.finalizeData(data);
		}
	}
	///////////////////////// END OF BattleControllerChain Interaction /////////////////////////
	//each Token in a battle is given a unique id created at random
	BattleControllerAnchor.prototype.createUniqueId = function() {
		var id = "";
		var chars = "0123456789!@#$%&*"
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
	window.BattleControllerAnchor = BattleControllerAnchor;
} (window));