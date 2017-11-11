(function (window) {
	var BattleButton = function(clickable, type, unit, memory_id, data){
		this.initialize(clickable, type, unit, memory_id, data);
		this.STAGE = {
			RPS: {string: "RPS"},
			START: {string: "Start"},
			EVOKING: {string: "Evoking"},
			ACTION: {string: "Action"},
			END: {string: "End"},
		}
	}
	var bb = BattleButton.prototype = new createjs.Container();
	bb.Container_initialize = bb.initialize;
	bb.initialize = function(clickable, type, unit, memory_id, data){
		this.Container_initialize();
		var action = unit;
		this.bc = level.activebattle.battleController;
		this.clickable = clickable;
		this.buttonType = type;
		//initialize bitmap and add filters
		if (type == "rock") this.initRockButton();
		else if (type == "paper") this.initPaperButton();
		else if (type == "scissors") this.initScissorsButton();
		else if (type == "continue") this.initContinueButton();
		else if (type == "unit_summon") this.initUnitButton(unit);
		else if (type == "unitrevoke") this.initUnitButton(unit);
		else if (type == "action_info") this.initActionInfoButton(unit);
		else if (type == "action_hand") this.initActionHandButton(unit);
		else if (type == "counter_activate") this.initActionInfoButton(unit);
		else if (type == "unit_token") this.initUnitTokenButton(unit);
		else if (type == "unit_target") this.initUnitTokenButton(unit);
		this.addChild(this.buttonChild);
		// assign mouseevents to each different type of button
		if (type == "rock" || type == "paper" || type == "scissors") {
			this.on("click", function(event) {
				this.bc.doRockPaperScissors(type);
			});
		}
		if (type == "unit_summon") {
			this.setUnitSummonEvents(unit);
		}
		if (type == "continue") {
			this.on("click", function(event) {
				if (this.bc.getBattleStage() == "Evoking") {
					this.bc.setBattleStage(this.bc.STAGE.ACTION);
				}
				else if (this.bc.getBattleStage() == "Action") {
					this.bc.setBattleStage(this.bc.STAGE.END);
				}
			});
		}
		if (type == "action_info") {

		}
		//action token buttons, in the hand, are click and draggable
		if (type == "action_hand") {
			this.setActionHandEvents(action);
		}
		if (type == "unit_token") {

		}
		if (type == "unit_target") {
			//in this case, unit is the target
			this.setTargetButtonEvents(unit, memory_id, data);
		}
		if (type == "counter_activate") {
			this.setCounterActivateEvents(action);
		}
	}
	BattleButton.prototype.setUnitSummonEvents = function(unit) {
		var g = this;
		var buttonBounds = null;
		var best_ghost = null;
		this.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("unit_info", unit);
		});
		if (!unit.canSummon() || this.bc.is_resolving) {

		} else {
			if ((this.bc.turnPlayer == "blue") && (this.bc.getBattleStage() == "Evoking")) {
				this.on("mousedown", function(evt) {
					//remove the bitmap represented by this class, and add it to battleStage
					//that way, we can use the native mouseX and mouseY values, without
					//having to translate into a different set of coordinates. 
					evt.currentTarget.removeChild(this.buttonChild);
					level.activebattle.battleStage.addChild(this.buttonChild);	
					this.buttonChild.scaleX = .8;
					this.buttonChild.scaleY = .8;
					buttonBounds = evt.currentTarget.buttonChild.getBounds()
					evt.currentTarget.buttonChild.x = mouseX - buttonBounds.height/2;
					evt.currentTarget.buttonChild.y = mouseY - buttonBounds.width/2;

					//reveal UnitGhosts at available tiles
					level.activebattle.battleController.gui.makeSummoningGhosts("blue", unit)
				});
				this.buttonChild.on("pressmove", function(evt) {
					//on mouse movement, update the bitmap's x and y
					//the bitmap is a child of battleStage here
					evt.currentTarget.x = mouseX - buttonBounds.height/2;
					evt.currentTarget.y = mouseY - buttonBounds.width/2;

					//if token is held over a unit shadow, that shadow should light up
					var ghosts = level.activebattle.battleController.gui.getSummoningGhosts("blue");
					var bounds = {width: 100, height: 100};
					var best_dist = 999999999;
					var has_unit = false;
					for (var i = 0; i < ghosts.length; i++) {
						var ghostX = ghosts[i].x - bounds.width/2;
						var ghostY = ghosts[i].y - bounds.height;
						var centerX = ghostX + bounds.width/2;
						var centerY = ghostY + bounds.height/2;
						var inX = ((ghostX < mouseX) && (mouseX < (ghostX + bounds.width))); 
						var inY = ((ghostY < mouseY) && (mouseY < (ghostY + bounds.height))); 
						if (inX && inY) {
							has_unit = true;
							var d = distanceFormula(centerX, mouseX, centerY, mouseY);
							if (d < best_dist) {					
								best_ghost = ghosts[i];
								best_dist = d;
								g.summoning_location = best_ghost.location;
								g.summoning_unit = unit;
							} 
						} 
					}
					for (var i = 0; i < ghosts.length; i++) {
						if (ghosts[i] != best_ghost) {
							ghosts[i].greyOut();
						} else {
							ghosts[i].unGrey();
						}
					}
					if (best_ghost != null) {
						if (!has_unit) {
							best_ghost.greyOut();
							best_ghost = null;
						}
					}
				});
				this.buttonChild.on("pressup", function(evt) {
					if (best_ghost != null) {
						g.bc.chain.prepareSummon(g.summoning_unit, g.summoning_location);
					} else {

					}

					level.activebattle.battleController.gui.removeSummoningGhosts();
					//remove the bitmap from battleStage and add it to this object
					evt.currentTarget.x = 0;
					evt.currentTarget.y = 0;
					level.activebattle.battleStage.removeChild(evt.currentTarget);
					g.addChild(evt.currentTarget);	
					evt.currentTarget.scaleX = 1;
					evt.currentTarget.scaleY = 1;
				});	
			}
		}
	}
	BattleButton.prototype.setActionHandEvents = function(action) {
		if (this.bc.is_resolving || (this.bc.turnPlayer == "red") || (this.bc.getBattleStage() != "Action")) {
			var g = this;
			this.on("mouseover", function(evt) {
				//update the info pane with info about this Action
				level.activebattle.battleStage.newInfoPane("action_hand_info", action);
			});
		} else {
			var g = this;
			this.on("mouseover", function(evt) {
				//update the info pane with info about this Action
				level.activebattle.battleStage.newInfoPane("action_hand_info", action);
			})
			this.on("mousedown", function(evt) {
				//remove the bitmap represented by this class, and add it to battleStage
				//that way, we can use the native mouseX and mouseY values, without
				//having to translate into a different set of coordinates. 
				evt.currentTarget.removeChild(this.buttonChild);
				level.activebattle.battleStage.addChild(this.buttonChild);		
				this.buttonChild.scaleX = .8;
				this.buttonChild.scaleY = .8;
				var buttonBounds = evt.currentTarget.buttonChild.getBounds()
				evt.currentTarget.buttonChild.x = mouseX - buttonBounds.height/2;
				evt.currentTarget.buttonChild.y = mouseY - buttonBounds.width/2;
				//grey out units that can't use this Action
				//turn on the marker of those that can
				var units = g.bc.getActiveUnits("blue", true);
				for (var i = 0; i < units.length; i++) {
					if (!action.canUse(units[i])) units[i].guiUnit.greyOut();
					else units[i].guiUnit.markerOn();
				}
				action.location = g.bc.LOCATION.DRAG;
			});
			this.buttonChild.on("pressmove", function(evt) {
				//on mouse movement, update the bitmap's x and y
				//the bitmap is a child of battleStage here
				var buttonBounds = evt.currentTarget.getBounds()
				evt.currentTarget.x = mouseX - buttonBounds.height/2;
				evt.currentTarget.y = mouseY - buttonBounds.width/2;
			});
			this.buttonChild.on("pressup", function(evt) {
				//on release, check if the Action token is being held over a unit
				//if so, use it on the unit closest to the mouse release coords
				var units = level.activebattle.battleController.getActiveUnits("blue", true);
				var hits = []
				var best_unit = null;
				var best_dist = 999999999;
				for (var i = 0; i < units.length; i++) {
					var bounds = units[i].guiUnit.getBounds();
					var unitX = units[i].guiUnit.x - bounds.width/2;
					var unitY = units[i].guiUnit.y - bounds.height;
					var centerX = unitX + bounds.width/2;
					var centerY = unitY + bounds.height/2;
					var inX = ((unitX < mouseX) && (mouseX < (unitX + bounds.width))); 
					var inY = ((unitY < mouseY) && (mouseY < (unitY + bounds.height))); 
					if (inX && inY) {
						var d = distanceFormula(centerX, mouseX, centerY, mouseY);
						if (d < best_dist) {
							best_unit = units[i];
							best_dist = d;
						}
					}
				}
				if (best_unit != null) {
					g.bc.chain.prepareUse(action, best_unit);
				} else {
					action.location = g.bc.LOCATION.HAND;
				}
				//remove the bitmap from battleStage and add it to this object
				evt.currentTarget.x = 0;
				evt.currentTarget.y = 0;
				level.activebattle.battleStage.removeChild(evt.currentTarget);
				g.addChild(evt.currentTarget);	
				evt.currentTarget.scaleX = 1;
				evt.currentTarget.scaleY = 1;
				//ungrey everything
				var units = g.bc.getActiveUnits("blue", true);
				for (var i = 0; i < units.length; i++) {
					units[i].guiUnit.unGrey();
					units[i].guiUnit.markerOff();
				}	
			});	
		}						
	}
	BattleButton.prototype.setTargetButtonEvents = function(unit, memory_id, data) {
		var g = this;
		this.buttonChild.on("mouseover", function(evt) {
			//update the info pane with info about this Action
			level.activebattle.battleStage.newInfoPane("unit_info", unit);
			unit.guiUnit.markerOn("target");
		})
		this.buttonChild.on("mouseout", function(evt) {
			unit.guiUnit.markerOff();
		})
		this.buttonChild.on("click", function(event) {
			unit.guiUnit.markerOff();
			level.activebattle.battleStage.newInfoPane("unit_info", unit)
			var user_unit_id = data.unit_unique_id;
			var action_id = data.action_unique_id;
			var target_user_id = unit.unique_id;
			g.bc.chain.short_term[action_id].select_target[memory_id] = target_user_id;
			g.bc.blue_done = true;
			g.bc.chain.finalizeData(data);
		});
	}
	BattleButton.prototype.setCounterActivateEvents = function(action) {
		var g = this;
		this.buttonChild.on("mouseover", function(evt) {
			//update the info pane with info about this Action
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
			var unit_c = g.bc.chain.getCounterUnit("blue", action);
			if (unit_c) unit_c.guiUnit.markerOn();
		})
		this.buttonChild.on("mouseout", function(evt) {
			//update the info pane with info about this Action
			var unit_c = g.bc.chain.getCounterUnit("blue", action);
			if (unit_c) unit_c.guiUnit.markerOff();
		})
		this.buttonChild.on("click", function(event) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
			var unit_c = g.bc.chain.getCounterUnit("blue", action);
			unit_c.guiUnit.markerOff();
			g.bc.chain.prepareActivate(action, unit_c);
		});
	}
	BattleButton.prototype.initUnitTokenButton = function(bcunit) {
		this.buttonChild = bcunit.makeGraphic();
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
	BattleButton.prototype.initUnitButton = function(bcunit) {
		if (!bcunit.canSummon() || this.bc.is_resolving) {
			var image = bcunit.makeGraphic();
			var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
			image.filters = [
			    new createjs.ColorMatrixFilter(matrix)
			];
			var bounds = image.getBounds();
			image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
			this.buttonChild = image;
		} else {
			this.buttonChild = bcunit.makeGraphic();
		}
	}
	BattleButton.prototype.initActionHandButton = function(action) {
		if (this.bc.is_resolving || (this.bc.turnPlayer == "red") || (this.bc.getBattleStage() != "Action")) {
			var image = action.makeGraphic();
			var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
			image.filters = [
			    new createjs.ColorMatrixFilter(matrix)
			];
			var bounds = image.getBounds();
			image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
			this.buttonChild = image;
		} else {
			this.buttonChild = action.makeGraphic();
		}
	}
	BattleButton.prototype.initActionInfoButton = function(action) {
		var image = action.makeGraphic();
		var matrix = new createjs.ColorMatrix().adjustSaturation(0);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.buttonChild = image;
	}
	BattleButton.prototype.initContinueButton = function() {
		this.buttonChild = new createjs.Bitmap(loader.getResult("cancelbutton"));
	}
	BattleButton.prototype.destroyButton = function() {
		this.removeAllChildren();
	}
	BattleButton.prototype.tick = function() {

	}
	window.BattleButton = BattleButton;
} (window));		
