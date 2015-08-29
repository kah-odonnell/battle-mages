(function (window) {
	var Battle = function Battle(player, initiator){
		this.initiator = initiator;
		var battleStage = new BattleStage();
		var turnPlayer = null;
		var battlePlayer = new BattlePlayer(player);
		var battleNPC = new BattleNPC(initiator);
		this.initialize = function() {
			this.battleStage = battleStage;
			var g = this;
			setTimeout(function() {
				g.battleStage.fadeToBlack();
				level.addChild(g.battleStage);
			}, 1000);
		}
		this.battleStart = function() {
			battleStage.buildRockPaperScissors();
		}
		this.changeDisplay = function() {
			battleStage.changeDisplay(battlePlayer, battleNPC);
		}
		this.doRockPaperScissors = function(choice) {
			var outcome = null
			console.log(choice)
			turnPlayer = battlePlayer;
			this.doEvokeStep();
		}
		this.doEvokeStep = function() {
			if (turnPlayer == battlePlayer) battleStage.buildEvokePane();
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