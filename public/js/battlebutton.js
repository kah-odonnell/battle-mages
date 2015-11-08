(function (window) {
	var BattleButton = function(clickable, type, unit){
		this.initialize(clickable, type, unit);
	}
	var bb = BattleButton.prototype = new createjs.Container();
	bb.Container_initialize = bb.initialize;
	bb.initialize = function(clickable, type, unit){
		this.Container_initialize();
		this.clickable = clickable;
		this.buttonType = type;
		if (type == "rock") this.initRockButton();
		else if (type == "paper") this.initPaperButton();
		else if (type == "scissors") this.initScissorsButton();
		else if (type == "continue") this.initContinueButton();
		else if (type == "unitevoke") this.initUnitButton(unit);
		else if (type == "unitrevoke") this.initUnitButton(unit);
		else if (type == "action_info") this.initActionHandButton(unit);
		else if (type == "action_hand") this.initActionHandButton(unit);
		else if (type == "info_unit") this.initInfoUnitButton(unit);
		this.addChild(this.buttonChild);

		if (type == "rock" || type == "paper" || type == "scissors") {
			this.on("click", function(event) {
				level.activebattle.doRockPaperScissors(type);
			});
		}
		if (type == "unitevoke") {
			this.on("click", function(event) {
				level.activebattle.evoke(unit);
			});
		}
		if (type == "unitrevoke") {
			this.on("click", function(event) {
				level.activebattle.revoke(unit);
			});
		}
		if (type == "continue") {
			this.on("click", function(event) {
				if (level.activebattle.getBattleState() == "evoking") {
					level.activebattle.setBattleState("action");
				}
				else if (level.activebattle.getBattleState() == "action") {
					level.activebattle.setBattleState("evoking");
				}
			});
		}
		if (type == "action_info") {

		}
		if (type == "action_hand") {
			this.on("mousedown", function(evt) {
				level.activebattle.battleStage.newInfoPane("action_hand_info", unit);
				evt.currentTarget.removeChild(this.buttonChild);
				level.activebattle.battleStage.addChild(this.buttonChild);	
				var buttonBounds = evt.currentTarget.buttonChild.getBounds()
				evt.currentTarget.buttonChild.x = mouseX - buttonBounds.height/2;
				evt.currentTarget.buttonChild.y = mouseY - buttonBounds.width/2;	
			});
			this.buttonChild.on("pressmove", function(evt) {
				var buttonBounds = evt.currentTarget.getBounds()
				evt.currentTarget.x = mouseX - buttonBounds.height/2;
				evt.currentTarget.y = mouseY - buttonBounds.width/2;
			});
			var g = this;
			this.buttonChild.on("pressup", function(evt) {
				console.log("mouseup")
				evt.currentTarget.x = 0;
				evt.currentTarget.y = 0;
				level.activebattle.battleStage.removeChild(evt.currentTarget);
				g.addChild(evt.currentTarget);		
			});			
		}
		if (type == "info_unit") {

		}
	}
	BattleButton.prototype.initInfoUnitButton = function(unit) {
		var imagename = unit.tokenImageName;
		this.buttonChild = new createjs.Bitmap(loader.getResult(imagename));
	}
	BattleButton.prototype.initRockButton = function() {
		this.buttonChild = new createjs.Bitmap(loader.getResult("rockbutton"));
	}
	BattleButton.prototype.initPaperButton = function() {
		this.buttonChild = new createjs.Bitmap(loader.getResult("paperbutton"));
	}
	BattleButton.prototype.initScissorsButton = function() {
		this.buttonChild = new createjs.Bitmap(loader.getResult("scissorsbutton"));
	}
	BattleButton.prototype.initUnitButton = function(unit) {
		this.buttonChild = new createjs.Bitmap(loader.getResult("token_renmei"));
		var color = "#FFFFFF";
		if (this.buttonType == "unitevoke") color = "#00ff00";
		else if (this.buttonType == "unitrevoke") color = "#ff0000";
		for (var i = 0; i < 4; i++) {
			this.buttonChild.shadow = new createjs.Shadow(color, 0, 0, 16);
		}
	}
	BattleButton.prototype.initActionHandButton = function(action) {
		var imagename = action.tokenImageName;
		this.buttonChild = new createjs.Bitmap(loader.getResult(imagename));
	}
	BattleButton.prototype.initContinueButton = function() {
		this.buttonChild = new createjs.Bitmap(loader.getResult("cancelbutton"));
	}
	BattleButton.prototype.destroyButton = function() {
		this.removeAllChildren();
	}
	BattleButton.prototype.tick = function() {
		if (this.clickable) {
			if (this.buttonType == "rock") {

			}
		}
	}
	window.BattleButton = BattleButton;
} (window));		
