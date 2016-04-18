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
		else if (type == "unitevoke") this.initUnitButton(unit);
		else if (type == "unitrevoke") this.initUnitButton(unit);
		else if (type == "action_info") this.initActionInfoButton(unit);
		else if (type == "action_hand") this.initActionHandButton(unit);
		else if (type == "counter_activate") this.initActionInfoButton(unit);
		else if (type == "unit_token") this.initUnitTokenButton(unit);
		else if (type == "unit_target") this.initUnitTokenButton(unit);
		this.addChild(this.buttonChild);
		//assign mouseevents to each different type of button
		//rockpaperscissors buttons created on battle init
		if (type == "rock" || type == "paper" || type == "scissors") {
			this.on("click", function(event) {
				this.bc.doRockPaperScissors(type);
			});
		}
		//evoke buttons created during "blue"'s turn, during the EVOKING stage
		if (type == "unitevoke") {
			this.on("mouseover", function(event) {
				level.activebattle.battleStage.newInfoPane("unit_stats", unit);
			});
			this.on("click", function(event) {
				this.bc.evoke(unit);
			});
		}
		//revoke buttons created during "blue"'s turn, during the EVOKING stage
		if (type == "unitrevoke") {			
			this.on("mouseover", function(event) {
				level.activebattle.battleStage.newInfoPane("unit_stats", unit);
			});
			this.on("click", function(event) {
				this.bc.revoke(unit);
			});
		}
		//continue buttons advance the EVOKING and ACTION stage to the next stage
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
		//im a bit embarrased by how this turned out but... it works nicely
		if (type == "action_hand") {
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
					//ungrey everything
					var units = g.bc.getActiveUnits("blue", true);
					for (var i = 0; i < units.length; i++) {
						units[i].guiUnit.unGrey();
						units[i].guiUnit.markerOff();
					}	
				});	
			}				
		}
		if (type == "unit_token") {

		}
		if (type == "unit_target") {
			//in this case, unit is the target
			var g = this;
			this.on("mouseover", function(evt) {
				//update the info pane with info about this Action
				level.activebattle.battleStage.newInfoPane("unit_stats", unit);
				unit.guiUnit.markerOn();
			})
			this.on("mouseout", function(evt) {
				unit.guiUnit.markerOff();
			})
			this.on("click", function(event) {
				unit.guiUnit.markerOff();
				level.activebattle.battleStage.newInfoPane("unit_stats", unit)
				var user_unit_id = data.unit_unique_id;
				var action_id = data.action_unique_id;
				var target_user_id = unit.unique_id;
				g.bc.chain.short_term[action_id].select_target[memory_id] = target_user_id;
				g.bc.blue_done = true;
				g.bc.chain.finalizeData(data);
			});
		}
		if (type == "counter_activate") {
			//in this case, unit is the target
			var g = this;
			this.on("mouseover", function(evt) {
				//update the info pane with info about this Action
				level.activebattle.battleStage.newInfoPane("action_hand_info", action);
				var unit_c = g.bc.chain.getCounterUnit("blue", action);
				if (unit_c) unit_c.guiUnit.markerOn();
			})
			this.on("mouseout", function(evt) {
				//update the info pane with info about this Action
				var unit_c = g.bc.chain.getCounterUnit("blue", action);
				if (unit_c) unit_c.guiUnit.markerOff();
			})
			this.on("click", function(event) {
				level.activebattle.battleStage.newInfoPane("action_hand_info", action);
				var unit_c = g.bc.chain.getCounterUnit("blue", action);
				unit_c.guiUnit.markerOff();
				g.bc.chain.prepareActivate(action, unit_c);
			});
		}
	}
	BattleButton.prototype.initUnitTokenButton = function(bcunit) {
		var imagename = bcunit.token_img;
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
	BattleButton.prototype.initUnitButton = function(bcunit) {
		var imagename = bcunit.token_img;
		this.buttonChild = new createjs.Bitmap(loader.getResult(imagename));
		//if it's the evoking step, give tokens a glow
		if (this.bc.getBattleStage() == "Evoking") {
			var color = "#FFFFFF";
			if (this.buttonType == "unitevoke") color = "#00ff00";
			else if (this.buttonType == "unitrevoke") color = "#ff0000";
			for (var i = 0; i < 4; i++) {
				if (this.bc.getActiveUnits("blue", false).length < 2) {
					this.buttonChild.shadow = new createjs.Shadow(color, 0, 0, 16);					
				} else {
					if (this.buttonType == "unitrevoke") {
						this.buttonChild.shadow = new createjs.Shadow(color, 0, 0, 16);							
					}
				}

			}
		}
	}
	BattleButton.prototype.initActionHandButton = function(action) {
		if (this.bc.is_resolving || (this.bc.turnPlayer == "red") || (this.bc.getBattleStage() != "Action")) {
			var imagename = action.token_img;
			var image = new createjs.Bitmap(loader.getResult(imagename));
			var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
			image.filters = [
			    new createjs.ColorMatrixFilter(matrix)
			];
			var bounds = image.getBounds();
			image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
			this.buttonChild = image;
		} else {
			var imagename = action.token_img;
			this.buttonChild = new createjs.Bitmap(loader.getResult(imagename));
		}
	}
	BattleButton.prototype.initActionInfoButton = function(action) {
		var imagename = action.token_img;
		this.buttonChild = new createjs.Bitmap(loader.getResult(imagename));
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
