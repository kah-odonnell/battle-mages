(function (window) {
	var BattleStage = function(){
		this.initialize();
		this.PROMPT = {
			RPS: {value: 0},
			TARGET: {value: 0},
			EVOKE: {value: 0},
			COUNTER: {value: 0},
			INACTIVE: {value: 0},
		}
		this.CURRENTPROMPT = this.PROMPT.INACTIVE;
	}
	var t = BattleStage.prototype = new createjs.Container();
	t.Container_initialize = t.initialize;
	t.initialize = function(){
		this.curtainContainer = new createjs.Container();
		this.directionPane = new createjs.Container();
		this.actionPane = new createjs.Container();
		this.actionPaneActive = new createjs.Container();
		this.actionPaneButton = new createjs.Container();
		this.actionPaneBkgd = new createjs.Container();
		this.fieldPane = new createjs.Container();
		this.infoPane = new createjs.Container();
		this.infoPaneBkgd = new createjs.Container();
		this.infoPaneActive = new createjs.Container();
		this.infoPaneButtons = new createjs.Container();

		this.actionPane.y = 240;
		this.directionPane.y = 3;
		this.infoPane.y = this.actionPane.y + 36;

		this.addChild(this.fieldPane);
		this.addChild(this.infoPane);
		this.infoPane.addChild(this.infoPaneBkgd);
		this.infoPane.addChild(this.infoPaneActive);
		this.infoPane.addChild(this.infoPaneButtons);
		this.addChild(this.actionPane);
		this.actionPane.addChild(this.actionPaneBkgd);
		this.actionPane.addChild(this.actionPaneActive);
		this.actionPane.addChild(this.actionPaneButton);
		this.addChild(this.directionPane);
		this.addChild(this.curtainContainer);
	}
	BattleStage.prototype.changeDisplay = function(player, npc) {
		this.setUpFieldPane(player, npc);
		this.setUpDirectionPane();
		this.setUpActionPane();
		this.setUpInfoPane();
	}
	BattleStage.prototype.fadeToBlack = function() {
		var color = '#000000'
		var curtain = new createjs.Shape();
		curtain.graphics.beginFill(color).drawRect(0, 0, canvas.width, canvas.height);
		curtain.alpha = 0;
		this.curtain = curtain;
		this.curtainContainer.addChild(this.curtain);	
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
				thisStage.curtainContainer.removeChild(this.curtain);
				level.activebattle.encounterStart();
			}
		);
	}
	BattleStage.prototype.setUpDirectionPane = function() {
		var message = level.activebattle.initiator.formalname + " wants to fight!"
		this.newDirectionPane(message);
	}
	BattleStage.prototype.setUpActionPane = function() {
		var color = '#FFFFFF'
		var bordercolor = '#000000'
		var paneBodyBox = new createjs.Shape();
		paneBodyBox.graphics.beginStroke(bordercolor);
		paneBodyBox.graphics.setStrokeStyle(2);
		paneBodyBox.graphics.beginFill(color).drawRect(0, 0, canvas.width, 36);
		this.actionPaneBkgd.addChild(paneBodyBox);

		var buttonContainer = this.buildRockPaperScissors();
		buttonContainer.y -= 36;
		this.actionPaneActive.addChild(buttonContainer);
	}
	BattleStage.prototype.setUpInfoPane = function() {
		var color = '#FFFFFF'
		var bordercolor = '#000000'
		var paneBodyBox = new createjs.Shape();
		paneBodyBox.graphics.beginStroke(bordercolor);
		paneBodyBox.graphics.setStrokeStyle(2);
		paneBodyBox.graphics.beginFill(color).drawRect(0, 0, canvas.width, 200);
		this.infoPaneBkgd.addChild(paneBodyBox);
	}
	BattleStage.prototype.setUpFieldPane = function(player, npc) {
		var background = new createjs.Bitmap(loader.getResult("battlebkgd1"));
		this.fieldPane.addChild(background);
		this.fieldPane.addChild(npc);
		this.fieldPane.addChild(player);
	}
	BattleStage.prototype.newDirectionPane = function(message) {
		this.directionPane.removeAllChildren();
		var paneHead = new createjs.Container();
		// Create the title text to be displayed
		paneHeadText = new createjs.Text(message, "26px crazycreation", "#000000");
		paneHeadText.x = canvas.width/2 - paneHeadText.getBounds().width/2;		
		paneHead.addChild(paneHeadText);
		this.directionPane.addChild(paneHead);
	}
	BattleStage.prototype.newActionPane = function(type) {
		if (type == "evoking") {
			this.actionPane.removeChild(this.actionPaneActive);
			this.actionPane.removeChild(this.actionPaneButton);
			this.actionPaneActive = this.buildEvokePane();
			this.actionPaneActive.y -= 36;
			this.actionPane.addChild(this.actionPaneActive);

			if ((this.bc.turnPlayer == "blue") && (this.bc.getBattleStage() == "Evoking")) {
				var activeUnits = this.bc.getActiveUnits("blue", false);
				if (activeUnits.length > 0) {
					var continueButton = new BattleButton(true, "continue")
					continueButton.x = 700;
					continueButton.y = -18;
					this.actionPaneButton = continueButton;
					this.actionPane.addChild(this.actionPaneButton);
				}
			}
		}
		if (type == "action") {
			this.actionPane.removeChild(this.actionPaneActive);
			this.actionPane.removeChild(this.actionPaneButton);
			this.actionPaneActive = this.buildHandPane();
			this.actionPaneActive.y -= 36;
			this.actionPane.addChild(this.actionPaneActive);

			if ((this.bc.turnPlayer == "blue") && (this.bc.getBattleStage() == "Action")) {
				var activeUnits = this.bc.getActiveUnits("blue", false);
				if (activeUnits.length > 0) {
					var continueButton = new BattleButton(true, "continue")
					continueButton.x = 700;
					continueButton.y = -18;
					this.actionPaneButton = continueButton;
					this.actionPane.addChild(this.actionPaneButton);
				}
			}
		}
	}
	//called by bc.awaitInputTarget() when some data requires player to select a target
	//this function generates the buttons that:
	// 1) save a target's unique_id to a memory
	// 2) call chain.finalizeData(), which attempts to collect the inputs saved to memory
	//    if it doesnt have input for every target it needs, it calls newActionPaneTarget again 
	//
	//tag: "target_a", "target_b", etc.
	//spec: this.bc.chain.TARGET.OPPONENT_ALL
	//data: the data that must be finalized before it can be added to chain
	BattleStage.prototype.newActionPaneTarget = function(tag, spec, data) {
		if (tag == "target_a") {
			var action_id = data.action_unique_id;		
			var action = this.bc.getTokenByUniqueId(action_id);
			this.newDirectionPane("Select a Target for " + action.name);
			this.actionPane.removeChild(this.actionPaneActive);
			this.actionPane.removeChild(this.actionPaneButton);
			this.actionPaneActive = this.buildTargetPane(tag, spec, data);
			this.actionPaneActive.y -= 36;
			this.actionPane.addChild(this.actionPaneActive);
		}
	}
	BattleStage.prototype.newInfoPane = function(type, obj) {
		if (type == "unit_stats") {
			this.infoPane.removeChild(this.infoPaneActive);
			this.infoPane.removeChild(this.infoPaneButton);
			this.infoPaneActive = this.buildUnitStatsPane(obj);
			this.infoPane.addChild(this.infoPaneActive);
		}
		if (type == "action_hand_info") {
			this.infoPane.removeChild(this.infoPaneActive);
			this.infoPane.removeChild(this.infoPaneButton);
			this.infoPaneActive = this.buildActionInfoPane(obj);
			this.infoPane.addChild(this.infoPaneActive);
		}
	}
	BattleStage.prototype.buildRockPaperScissors = function() {
		var buttonContainer = new createjs.Container();
		var buttons = [];
		buttons.push(new BattleButton(true, "rock"));
		buttons.push(new BattleButton(true, "paper"));
		buttons.push(new BattleButton(true, "scissors"));
		for (var i = 0; i < buttons.length; i++) {
			var bcWidth = 0;
			var currentButton = buttons[i];
			if (buttonContainer.getBounds() != null) bcWidth = buttonContainer.getBounds().width + 8;
			currentButton.x = bcWidth;
			buttonContainer.addChild(currentButton);
		}
		buttonContainer.x = canvas.width/2 - buttonContainer.getBounds().width/2;
		return buttonContainer;
	}
	BattleStage.prototype.buildUnitStatsPane = function(unit) {
		var masterContainer = new createjs.Container();
		var uniticon = new BattleButton(true, "unit_token", unit);
		uniticon.x += 4;
		uniticon.y += 4;
		masterContainer.addChild(uniticon);

		var thumbnailbox = new createjs.Container();
		// Create the title text to be displayed
		var message = unit.name + ", " + unit.title;
		nametext = new createjs.Text(message, "32px crazycreation", "#000000");
		nametext.x = uniticon.x + uniticon.getBounds().width + 8;
		var message2 = "";
		for (var i = 0; i < unit.attributes.length; i++) {
			message2 = message2 + unit.attributes[i].string;
			if (i != unit.attributes.length - 1) {
				message2 = message2 + ", "
			}
		}
		attributetext = new createjs.Text(message2, "26px crazycreation", "#000000");
		attributetext.x = uniticon.x + uniticon.getBounds().width + 8;
		attributetext.y = nametext.y + nametext.getBounds().height;
		thumbnailbox.addChild(nametext);
		thumbnailbox.addChild(attributetext);
		thumbnailbox.y = (uniticon.getBounds().height)/2 - thumbnailbox.getBounds().height/2
		masterContainer.addChild(thumbnailbox);

		return masterContainer;
	}
	BattleStage.prototype.buildActionInfoPane = function(action) {
		var masterContainer = new createjs.Container();
		var actionicon = new BattleButton(true, "action_info", action);
		actionicon.x += 4;
		actionicon.y += 4;
		masterContainer.addChild(actionicon);

		var thumbnailbox = new createjs.Container();
		var message = action.name;
		var nametext = new createjs.Text(message, "32px crazycreation", "#000000");
		nametext.x = actionicon.x + actionicon.getBounds().width + 8;

		var message2 = action.attribute.string + " " + action.type.string;
		attributetext = new createjs.Text(message2, "26px crazycreation", "#000000");
		attributetext.x = actionicon.x + actionicon.getBounds().width + 8;
		attributetext.y = nametext.y + nametext.getBounds().height;

		thumbnailbox.addChild(nametext);
		thumbnailbox.addChild(attributetext);
		thumbnailbox.y = (actionicon.getBounds().height)/2 - thumbnailbox.getBounds().height/2;

		masterContainer.addChild(thumbnailbox);

		return masterContainer;
	}
	BattleStage.prototype.buildEvokePane = function() {
		var buttons = [];
		var playerUnits = this.bc.getAllUnits("blue", false);
		for (var i = 0; i < playerUnits.length; i++) {
			var unit = playerUnits[i]
			if (!(unit.is_active)) buttons.push(new BattleButton(true, "unitevoke", playerUnits[i]));
			else if (unit.is_active) buttons.push(new BattleButton(true, "unitrevoke", playerUnits[i]));
		}
		var buttonContainer = new createjs.Container();
		for (var i = 0; i < buttons.length; i++) {
			var bcWidth = 0;
			var currentButton = buttons[i];
			if (buttonContainer.getBounds() != null) bcWidth = buttonContainer.getBounds().width + 8;
			currentButton.x = bcWidth;
			buttonContainer.addChild(currentButton);
		}
		buttonContainer.x = canvas.width/2 - buttonContainer.getBounds().width/2;

		return buttonContainer;
	}
	BattleStage.prototype.buildHandPane = function() {
		var buttonContainer = new createjs.Container();
		var buttons = [];
		var player = level.activebattle.getPlayer();

		var hand = this.bc.getHand("blue");
		for (var i = 0; i < hand.length; i++) {
			buttons.push(new BattleButton(true, "action_hand", hand[i]));
		}
		for (var i = 0; i < buttons.length; i++) {
			var bcWidth = 0;
			var currentButton = buttons[i];
			if (buttonContainer.getBounds() != null) {
				bcWidth = buttonContainer.getBounds().width + 8;
			}
			currentButton.x = bcWidth;
			buttonContainer.addChild(currentButton);
		}
		buttonContainer.x = canvas.width/2 - buttonContainer.getBounds().width/2;
		return buttonContainer;
	}
	//buildTargetPane("target_a", this.bc.chain.TARGET.OPPONENT_ALL);
	BattleStage.prototype.buildTargetPane = function(tag, spec, data) {
		var buttonContainer = new createjs.Container();
		var buttons = [];
		var player = level.activebattle.getPlayer();

		var targets = this.bc.chain.getPossibleTargets(spec, "blue");
		for (var i = 0; i < targets.length; i++) {
			buttons.push(new BattleButton(true, "unit_target", targets[i], tag, data));
		}
		for (var i = 0; i < buttons.length; i++) {
			var bcWidth = 0;
			var currentButton = buttons[i];
			if (buttonContainer.getBounds() != null) {
				bcWidth = buttonContainer.getBounds().width + 8;
			}
			currentButton.x = bcWidth;
			buttonContainer.addChild(currentButton);
		}
		buttonContainer.x = canvas.width/2 - buttonContainer.getBounds().width/2;
		return buttonContainer;
	}
	BattleStage.prototype.evoke = function(bcunit) {
		var unit = bcunit.guiUnit;
		this.fieldPane.addChild(unit);
		this.rearrangeUnits(bcunit.owner);
	}
	BattleStage.prototype.revoke = function(bcunit) {
		var unit = bcunit.guiUnit;
		this.fieldPane.removeChild(unit);
		this.rearrangeUnits(bcunit.owner);
	}
	BattleStage.prototype.rearrangeUnits = function(red_blue) {
		var units;
		var owner;
		var spacing = 75;
		if (red_blue == "red") {
			units = this.bc.getActiveUnits("red", false);	
			owner = level.activebattle.getNPC();
			if (units.length == 1) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x - 75;
					units[i].guiUnit.y = owner.y;
				}
			}
			else if (units.length == 2) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x - (75 + spacing/2) + spacing*(i);
					units[i].guiUnit.y = owner.y - 25 + 50*(i);
				}				
			}
			else if (units.length == 3) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x - (75 + spacing) + spacing*(i);
					units[i].guiUnit.y = owner.y - 50 + 50*(i);
				}				
			}	
		} 
		else if (red_blue == "blue"){
			units = this.bc.getActiveUnits("blue", false);	
			owner = level.activebattle.getPlayer();
			if (units.length == 1) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x + 75;
					units[i].guiUnit.y = owner.y;
				}
			}
			else if (units.length == 2) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x + (75 + spacing/2) - spacing*(i);
					units[i].guiUnit.y = owner.y - 25 + 50*(i);
				}				
			}
			else if (units.length == 3) {
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.x = owner.x + (75 + spacing) - spacing*(i);
					units[i].guiUnit.y = owner.y - 50 + 50*(i);
				}				
			}
		}
		this.fieldPane.sortChildren(sortFunction);
	}
	BattleStage.prototype.tick = function() {

	}
	window.BattleStage = BattleStage;
} (window));		
