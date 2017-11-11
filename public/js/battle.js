(function (window) {
	function Battle(player, initiator){
		this.finished = false;
		this.initiator = initiator;
		this.battlePlayer = null;
		this.battleNPC = null;
		this.initialize = function() {
			this.battleStage = new BattleStage();
			this.turnPlayer = null;
			this.battleController = new BattleController(this.battleStage);
			var g = this;
			setTimeout(function() {
				g.battleStage.fadeToBlack();
				level.addChild(g.battleStage);
			}, 1000);
		}
		this.getPlayer = function() {
			return this.battlePlayer;
		}
		this.getNPC = function() {
			return this.battleNPC;
		}
		this.encounterStart = function() {

		}
		this.changeDisplay = function() {
			this.battleStage.changeDisplay(this.battlePlayer, this.battleNPC);
		}
		this.tick = function() {
			if (!this.finished) {
				this.battleStage.tick();
				this.battleController.tick();
				this.getPlayer().bcunit.tick();
				this.getNPC().bcunit.tick();
			}
		}
		this.initEndDialog = function() {
			this.initiator.isBeaten = true;
			this.initiator.setIdle();
			map.alarm = false;
		 	level.addDialog(initiator.battleEndDialogScript);	
		 	//this.battleStage.removeAllChildren();
		 	//this.battleController.endBattle();
		 	//this.battleController = null;
		 	//this.battleStage = null;
		 	//level.activebattle = null;
		 	this.battleStage.endBattle();
		}
	}
	window.Battle = Battle;
} (window));		