(function (window) {
	var Battle = function Battle(player, initiator){
		this.initiator = initiator;
		var battleStage = new BattleStage();
		var turnPlayer = null;
		var battlePlayer = new BattlePlayer(player);
		var battleNPC = new BattleNPC(initiator);
		this.initialize = function() {
			this.battleStage = battleStage;
			this.battleController = new BattleController(battleStage);
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
		this.encounterStart = function() {

		}
		this.changeDisplay = function() {
			battleStage.changeDisplay(battlePlayer, battleNPC);
		}
		this.tick = function() {
			battleStage.tick();
		}
		this.initEndDialog = function() {
			initiator.isBeaten = true;
			initiator.setIdle();
			map.alarm = false;
			level.activebattle = null;
		 	level.addDialog(initiator.battleEndDialog)	
		}
	}
	window.Battle = Battle;
} (window));		