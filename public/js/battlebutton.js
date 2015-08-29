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
		else if (unit != null) this.initUnitButton();
		this.addChild(this.buttonChild);

		if (clickable) this.on("click", function(event) {
			level.activebattle.doRockPaperScissors(type)
		})
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
