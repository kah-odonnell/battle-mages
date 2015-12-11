(function (window) {
	var BattleAI = function BattleAI(bc) {
		var evoking_satisfied = false;
		var action_satisfied = false;
		var counter_satisfied = false;
		var bc = bc;
		this.evokeRandom = function() {
			var units = bc.getAllUnits("red", false);
			var active_units = bc.getActiveUnits("red", false);
			var numtoadd = Math.floor(Math.random() * units.length);
			var canEvoke = true;
			for (var i = 0; i < active_units.length; i++) {
				if (units[numtoadd] == active_units[i]) {
					canEvoke = false;
				}
			}
			if (canEvoke) {
				bc.evoke(units[numtoadd]);
			} else {
				this.evokeRandom();
			}
		}
		this.doEvokingStageAI = function() {
			var active = bc.getActiveUnits("red", false);
			if (active.length == 0) {
				this.evokeRandom();
			} else if (active.length == 1) {
				this.evokeRandom();
			} else {
				evoking_satisfied = true;
			}

			if (!evoking_satisfied) {
			
			} else {
				evoking_satisfied = false;
				bc.setBattleStage(bc.STAGE.ACTION);						
			}
		}
		this.doActionStageAI = function() {
			action_satisfied = true;

			if (!action_satisfied) {
				
			} else {
				action_satisfied = false;
				bc.setBattleStage(bc.STAGE.END);
			}
		}
		this.selectCounters = function() {
			counter_satisfied = false;
			var counters = bc.chain.getTriggeredCounters("red")
			counter_satisfied = true;

			if (!counter_satisfied) {
				bc.red_done = false;
				bc.awaitInput("counter", "red");
			} else {
				counter_satisfied = false;
				bc.red_done = true;
				bc.awaitInput("counter", "red");
			}
		}
		//selectTarget("target_a", bc.chain.TARGET.OPPONENT_ALL, data)
		this.selectTarget = function(tag, spec, data) {
			var user_unit_id = data.unit_unique_id;
			var target_user_id = "kdhf892u48jcnsjkf8933g3g";
			bc.chain.short_term[user_unit_id][tag] = target_user_id;
			bc.red_done = true;
			bc.chain.finalizeData(data);
		}
	}
	window.BattleAI = BattleAI;
} (window));