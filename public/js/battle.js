(function (window) {
	var Battle = function Battle(player, initiator){
		this.initiator = initiator;
		var battleStage = new BattleStage();
		var turnPlayer = null;
		var battlePlayer = new BattlePlayer(player);
		var battleNPC = new BattleNPC(initiator);
		var STATE = {
			RPS: {string: "RPS"},
			EVOKING: {string: "evoking"},
			ACTION: {string: "action"},
		}
		var BATTLESTATE = STATE.RPS;
		this.initialize = function() {
			this.battleStage = battleStage;
			var g = this;
			setTimeout(function() {
				g.battleStage.fadeToBlack();
				level.addChild(g.battleStage);
			}, 1000);
		}
		this.getPlayer = function() {
			return battlePlayer;
		}
		this.getNPC = function() {
			return battleNPC;
		}
		this.getBattleState = function() {
			return BATTLESTATE.string;
		}
		this.setBattleState = function(string) {
			if (string == "evoking") {
				BATTLESTATE = STATE.EVOKING;
				battleStage.newDirectionPane("Evoking Stage")
				battleStage.newActionPane("evoking");
			} 
			if (string == "action") {
				BATTLESTATE = STATE.ACTION;
				battleStage.newDirectionPane("Action Stage")
				battleStage.newActionPane("hand");
			}
		}
		this.encounterStart = function() {

		}
		this.changeDisplay = function() {
			battleStage.changeDisplay(battlePlayer, battleNPC);
		}
		this.doRockPaperScissors = function(choice) {
			var outcome = null
			console.log(choice)
			turnPlayer = battlePlayer;
			battlePlayer.newHand();
			this.setBattleState("evoking")
		}
		this.evoke = function(unit) {
			if (unit.owner == battlePlayer) {
				unit.evoke();
				battleStage.evoke(unit);
				if (BATTLESTATE == STATE.EVOKING) {
					battleStage.newActionPane("evoking");
				}
			}
			else if (unit.owner == battleNPC) {
				battleNPC.activeUnits.push(unit);
			}
		}
		this.revoke = function(unit) {
			if (unit.owner == battlePlayer) {
				unit.revoke();
				battleStage.revoke(unit);
				if (BATTLESTATE == STATE.EVOKING) {
					battleStage.newActionPane("evoking");
				}
			}
			else if (unit.owner == battleNPC) {
				battleNPC.activeUnits.push(unit);
			}
		}
		this.tick = function() {
			battleStage.tick();
			/*
			if (level.currentdialog == null) {
				initEndDialog();
			}
			*/
		}
		var initEndDialog = function() {
			initiator.isBeaten = true;
			initiator.setIdle();
			map.alarm = false;
			level.activebattle = null;
		 	level.addDialog(initiator.battleEndDialog)	
		}
	}
	window.Battle = Battle;
} (window));		