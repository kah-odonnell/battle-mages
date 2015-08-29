(function (window) {
	var BattleStage = function(){
		this.initialize();
	}
	var t = BattleStage.prototype = new createjs.Container();
	t.Container_initialize = t.initialize;
	t.initialize = function(){
		this.generalPane = false;
		this.targetingPane = null;
		this.evokingPane = null;
		this.counterPane = null;
		this.intelPane = null;
		this.mouseoverPane = null;
		this.timelinePane = null;
		this.rockPaperScissorsPane = null;
	}
	BattleStage.prototype.changeDisplay = function(player, npc) {
		var background = new createjs.Bitmap(loader.getResult("battlebkgd1"));
		var index = this.getChildIndex(this.curtain);
		this.addChildAt(background, index);
		this.addChildAt(player, index + 1);
		this.addChildAt(npc, index + 2);
	}
	BattleStage.prototype.fadeToBlack = function() {
		var color = '#000000'
		var curtain = new createjs.Shape();
		curtain.graphics.beginFill(color).drawRect(0, 0, canvas.width, canvas.height);
		curtain.alpha = 0;
		this.curtain = curtain;
		this.addChild(this.curtain);	
		createjs.Tween.get(this.curtain).to({alpha:1},1000).call(
			function() {
				var thisStage = level.activebattle.battleStage;
				thisStage.fadeIn();
			}
		);

	}
	BattleStage.prototype.fadeIn = function() {
		level.activebattle.changeDisplay();
		createjs.Tween.get(this.curtain).to({alpha:0},1000).call(
			function() {
				var thisStage = level.activebattle.battleStage;
				thisStage.removeChild(this.curtain);
				level.activebattle.battleStart();
			}
		);
	}
	BattleStage.prototype.buildRockPaperScissors = function() {
		this.rockPaperScissorsPane = new createjs.Container();

		var color = '#808080'
		var bordercolor = '#000000'

		var paneBody = new createjs.Container();
		//Create all the buttons this prompt will have, store side-by-side in buttonContainer
		this.rockPaperScissorsPane.buttons = [];
		this.rockPaperScissorsPane.buttons.push(new BattleButton(true, "rock"));
		this.rockPaperScissorsPane.buttons.push(new BattleButton(true, "paper"));
		this.rockPaperScissorsPane.buttons.push(new BattleButton(true, "scissors"));
		this.rockPaperScissorsPane.hasButtons = true;
		var buttonContainer = new createjs.Container();
		for (var i = 0; i < this.rockPaperScissorsPane.buttons.length; i++) {
			var bcWidth = 0;
			var currentButton = this.rockPaperScissorsPane.buttons[i];
			if (buttonContainer.getBounds() != null) bcWidth = buttonContainer.getBounds().width + 8;
			currentButton.x = bcWidth;
			buttonContainer.addChild(currentButton);
		}
		buttonContainer.x = canvas.width/2 - buttonContainer.getBounds().width/2;

		//Create the background to go behind buttonContainer
		var paneBodyBox = new createjs.Shape();
		paneBodyBox.graphics.beginStroke(bordercolor);
		paneBodyBox.graphics.setStrokeStyle(2);
		paneBodyBox.graphics.beginFill(color).drawRect(0, 0, canvas.width, buttonContainer.getBounds().height);

		//Add these to create the body of the pane
		paneBody.addChild(paneBodyBox);
		paneBody.addChild(buttonContainer);

		//Assign a tick function to become what will be generalPane.tick()
		//Required by BattleButton to detect mouseover
		this.rockPaperScissorsPane.tick = function() {
			var p = level.activebattle.battleStage;
			var buttons = p.rockPaperScissorsPane.buttons;
			for (var i = 0; i < buttons.length; i++){
				buttons[i].tick();
			}
		}


		var paneHead = new createjs.Container();
		// Create the title text to be displayed on this pane
		var paneHeadText = level.activebattle.initiator.formalname + " wants to fight!"
		paneHeadText = new createjs.Text(paneHeadText, "26px crazycreation", "#000000");
		paneHeadText.y = 3;
		paneHeadText.x = canvas.width/2 - paneHeadText.getBounds().width/2;

		// Create the background to go behind the text
		var paneHeadBox = new createjs.Shape();
		paneHeadBox.graphics.beginStroke(bordercolor);
		paneHeadBox.graphics.setStrokeStyle(2);
		paneHeadBox.graphics.beginFill(color).drawRect(0, 0, canvas.width, 32);
		paneHeadBox.y = 0;

		//Add these to create the head of the pane
		paneHead.addChild(paneHeadBox);
		paneHead.addChild(paneHeadText);

		paneHead.y = 64;
		paneBody.y = paneHead.y + 45;
		/*
		var paneY = this.rockPaperScissorsPane.y;
		paneBodyBox.scaleY = 0;
		paneBodyBox.alpha = 0;
		createjs.Tween.get(paneBodyBox).to({scaleY:1}, 240);
		createjs.Tween.get(paneBodyBox).to({alpha:1}, 120);
		createjs.Tween.get(paneBodyBox).to({y: (paneY - paneHeight/2)}, 240);
		*/

		this.addChild(paneHead);
		this.addChild(paneBody);
		this.generalPane = this.rockPaperScissorsPane;
	}
	BattleStage.prototype.destroyGeneralPane = function() {

	}
	BattleStage.prototype.tick = function() {
		if (this.generalPane.hasButtons == true) this.generalPane.tick();
	}
	window.BattleStage = BattleStage;
} (window));		
