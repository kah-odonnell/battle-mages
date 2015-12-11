(function (window) {
	//a singleton, responsible for the flow of battle (setBattleStage),
	//constructing each players deck, waiting for user/ai input, 
	//providing a means to manipulate BattleStage, and consistent access to
	//enumerated types that are referenced by several different classes
	//
	//initialized by Battle()
	//
	//BattleController is the only class, other than BattleUnitGui, 
	//allowed to manipulate BattleStage
	//
	var BattleController = function(battleStage) {
		this.STAGE = {
			RPS: {string: "RPS"},
			START: {string: "Start"},
			EVOKING: {string: "Evoking"},
			ACTION: {string: "Action"},
			END: {string: "End"},
		}
		this.ATTRIBUTE = {
			ILLUSIONIST: {string: "Illusionist"},
			ELEMENTALIST: {string: "Elementalist"},
			NECROMANCER: {string: "Necromancer"},
			KNIGHT: {string: "Knight"},
			VAGRANT: {string: "Vagrant"},
			CONSTRUCT: {string: "Construct"},
			ABERRATION: {string: "Aberration"},
		}
		this.TYPE = {
			ATTACK: {string: "Attack"},
			SKILL: {string: "Skill"},
			COUNTER: {string: "Counter"},
		}
		this.gui = battleStage;
		this.gui.bc = this;
		this.initialize();
	};
	BattleController.prototype.initialize = function() {
		var blueDeckJSON = player1library;
		var redDeckJSON = player2library;

		this.blueUnits = this.setUnits(blueDeckJSON.units, "blue");
		this.redUnits = this.setUnits(redDeckJSON.units, "red");

		this.blueActions = this.setActions(blueDeckJSON.actions, "blue");
		this.redActions = this.setActions(redDeckJSON.actions, "red");

		this.blue_done = false;
		this.red_done = false;

		this.createUniqueIds();

		this.blueHand = this.newBlueHand();
		this.redHand = this.newRedHand();
		this.chain = new BattleControllerChain(this);

		this.ai = new BattleAI(this);
		this.setBattleStage(this.STAGE.RPS);
	}
	BattleController.prototype.updateStage = function() {
		var units = this.getAllUnits("all", true);
		for (var i = 0; i < units.length; i++) {
			units[i].guiUnit.updateStatusPane();
		}
	}
	BattleController.prototype.increaseAllMana = function() {
		if (this.turnPlayer == "blue") {
			var units = this.getAllUnits("blue", false);
			for (var i = 0; i < units.length; i++) {
				if (units[i].is_active) {
					units[i].increaseMana(1);
				}
			}			
		} else {
			var units = this.getAllUnits("red", false);
			for (var i = 0; i < units.length; i++) {
				if (units[i].is_active) {
					units[i].increaseMana(1);
				}
			}				
		}
	}
	BattleController.prototype.createUniqueIds = function() {
		var collection = this.blueUnits;
		for (var i = 0; i < collection.length; i++) {
			collection[i].createUniqueId();
		}
		collection = this.redUnits;
		for (var i = 0; i < collection.length; i++) {
			collection[i].createUniqueId();
		}
		collection = this.blueActions;
		for (var i = 0; i < collection.length; i++) {
			collection[i].createUniqueId();
		}
		collection = this.redActions;
		for (var i = 0; i < collection.length; i++) {
			collection[i].createUniqueId();
		}		
	}
	BattleController.prototype.getTokenByUniqueId = function(id) {
		var collection = this.blueUnits;
		for (var i = 0; i < collection.length; i++) {
			var i_unit = collection[i];
			if (i_unit.unique_id == id) {
				return i_unit;
			}
		}
		collection = this.redUnits;
		for (var i = 0; i < collection.length; i++) {
			var i_unit = collection[i];
			if (i_unit.unique_id == id) {
				return i_unit;
			}
		}
		collection = this.blueActions;
		for (var i = 0; i < collection.length; i++) {
			var i_action = collection[i];
			if (i_action.unique_id == id) {
				return i_action;
			}
		}
		collection = this.redActions;
		for (var i = 0; i < collection.length; i++) {
			var i_action = collection[i];
			if (i_action.unique_id == id) {
				return i_action;
			}
		}
		return null;
	}
	BattleController.prototype.setBattleStage = function(stage) {
		//change battle stage > this.STAGE - RPS, START, EVOKING, ACTION, END
		this.currentStage = stage;
		if (stage == this.STAGE.START) {
			this.gui.newDirectionPane("Start Stage");
			this.doStartStage();
		}
		else if (stage == this.STAGE.EVOKING) {
			this.gui.newDirectionPane("Evoking Stage");
			this.doEvokingStage();
		}
		else if (stage == this.STAGE.ACTION) {
			this.gui.newDirectionPane("Action Stage");
			this.increaseAllMana();		
			this.doActionStage();
		}
		else if (stage == this.STAGE.END) {
			this.doEndStage();
		}
		this.updateStage();
		return this.currentStage.string;
	}
	BattleController.prototype.getBattleStage = function() {
		//returns a string indicating the current stage
		return this.currentStage.string;
	}
	BattleController.prototype.setUnits = function(unit_id_list, owner) {
		var units = [];
		for (var i = 0; i < unit_id_list.length; i++) {
			var unit;
			if ("001" == unit_id_list[i]) unit = new Unit001(this, owner);
			else if ("002" == unit_id_list[i]) unit = new Unit002(this, owner);
			units.push(unit);
		}
		return units;
	}
	BattleController.prototype.getAllUnits = function(red_blue_all, minions) {
		//returns list of all units
		var units = []
		if (red_blue_all == "red" || red_blue_all == "all") {
			var collection = this.redUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					units.push(collection[i]);
				} else {
					if (!collection[i].is_minion) {
						units.push(collection[i]);
					}
				}
			}
		}
		if (red_blue_all == "blue" || red_blue_all == "all") {
			var collection = this.blueUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					units.push(collection[i]);
				} else {
					if (!collection[i].is_minion) {
						units.push(collection[i]);
					}
				}
			}
		}
		return units;
	}
	BattleController.prototype.getActiveUnits = function(red_blue_all, minions) {
		//returns list of all active units and minions
		var units = []
		if (red_blue_all == "red" || red_blue_all == "all") {
			var collection = this.redUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					if (collection[i].is_active) {
						units.push(collection[i]);
					}
				} else {
					if ((collection[i].is_active) && (!collection[i].is_minion)) {
						units.push(collection[i]);
					}
				}
			}
		}
		if (red_blue_all == "blue" || red_blue_all == "all") {
			var collection = this.blueUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					if (collection[i].is_active) {
						units.push(collection[i]);
					}
				} else {
					if ((collection[i].is_active) && (!collection[i].is_minion)) {
						units.push(collection[i]);
					}
				}
			}
		}
		return units;
	}
	BattleController.prototype.setActions = function(action_id_list, owner) {
		var actions = [];
		for (var i = 0; i < action_id_list.length; i++) {
			if ("ILL001" === action_id_list[i]) {
				var action = new ActionILL001(this, owner);
				actions.push(action);
			}
		}
		return actions;
	}
	BattleController.prototype.getActionsAll = function() {
		//returns list of all tokens with a player's unique_id
	}
	BattleController.prototype.getActionsDeck = function() {
		//returns list of tokens in deck (no prep'd-counters/in-chain/in-hand)
	}
	BattleController.prototype.getHand = function(red_blue) {
		if (red_blue == "blue") {
			return this.blueHand;
		}
		else if (red_blue = "red") {
			return this.redHand;
		}
	}
	BattleController.prototype.newRedHand = function() {
		var hand = [];
		var actions = this.redActions;
		while (hand.length < 4) {
			var numtoadd = Math.floor(Math.random() * actions.length);
			var tokentoadd = actions[numtoadd];
			var canAdd = true;
			for (var j = 0; j < hand.length; j++) {
				if (hand[j] == tokentoadd) {
					canAdd = false;
				}
			}
			if (canAdd) {
				hand.push(tokentoadd)
			}
		}
		return hand;
	}
	BattleController.prototype.newBlueHand = function() {
		var hand = [];
		var actions = this.blueActions;
		while (hand.length < 4) {
			var numtoadd = Math.floor(Math.random() * actions.length);
			var tokentoadd = actions[numtoadd];
			var canAdd = true;
			for (var j = 0; j < hand.length; j++) {
				if (hand[j] == tokentoadd) {
					canAdd = false;
				}
			}
			if (canAdd) {
				hand.push(tokentoadd)
			}
		}
		return hand;
	}
	BattleController.prototype.evoke = function(bcunit) {
		if ((bcunit.owner == "blue") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("blue", false).length < 2) {
				bcunit.evoke();
				this.gui.evoke(bcunit);
				this.doEvokingStage();
			}
		}
		if ((bcunit.owner == "red") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("red", false).length < 2) {
				bcunit.evoke();
				this.gui.evoke(bcunit);
				this.doEvokingStage();
			}
		}
	}
	BattleController.prototype.revoke = function(bcunit) {
		bcunit.revoke();
		this.gui.revoke(bcunit);
		if (this.getBattleStage() == "Evoking") {
			this.doEvokingStage();
		}
	}
	BattleController.prototype.getChain = function() {

	}
	BattleController.prototype.addToChain = function() {

	}
	//resolveChain() runs BattleControllerAction.resolve() on 
	//the unresolved item most recently added to the chain
	//all counters are then pinged to react to the new getChain()
	BattleController.prototype.resolveChain = function() {

	}
	BattleController.prototype.getOtherPlayer = function(red_blue) {
		if (red_blue == "blue") return "red";
		else if (red_blue == "red") return "blue";
		else return null;
	}
	//tl;dr - awaitInput() is a finite state machine dead end
	//
	//when input is needed by the player or ai,
	//apart from the regular evoking/action input of the evoking/action stages,
	//B..C..Chain() will define which player can input (this.red/blue_done = false)
	//and call this function.
	//a button or the ai will then be able to call this function again,
	//until both red and blue have had a chance to respond or decline
	//
	//awaitInput("counter",...) is run when the chain changes (by chain.addToChain())
	//has a delay so the player can read token effects
	//ai or actionPane button will set blue/red_done = true and call awaitInput()
	//function repeats until both blue and red cannot or will not respond
	//
	//awaitInput("target",...) is run by chain.finalizeData()
	//the ai or actionPane button will then add a unit to short term memory  
	//
	//called by BattleControllerChain, BattleAI, and BattleButton
	BattleController.prototype.awaitInputCounter = function(red_blue) {
		this.acceptingInput = false;
		var bc = this;
		setTimeout(function() {
			var stage = bc.getBattleStage();
			if ((red_blue == "blue") && (bc.red_done) && (bc.blue_done)) {
				//blue did something, and no one has a response
				if (bc.chain.getChain().length == 0) {
					bc.acceptingInput = true;
					if (stage == "Evoking") {
						bc.doEvokingStage();
					}
					else if (stage == "Action") {
						bc.doActionStage()
					};
				} else {
					bc.chain.resolveChain();
				}
			}
			else if ((red_blue == "blue") && (bc.red_done) && (!bc.blue_done)) {
				//blue did something, and only blue might respond
				bc.acceptingInput = true;
				bc.gui.newActionPane("counter");
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
			else if ((red_blue == "blue") && (!bc.red_done) && (bc.blue_done)) {
				//blue did something, and only red might respond
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "blue") && (!bc.red_done) && (!bc.blue_done)) {
				//blue did something, either might respond but red has priority
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "red") && (bc.red_done) && (bc.blue_done)) {
				//red did something and noone has a response
				if (bc.chain.getChain().length == 0) {
					bc.acceptingInput = true;
					if (stage == "Evoking") {
						bc.doEvokingStage();
					}
					else if (stage == "Action") {
						bc.doActionStage()
					};
				} else {
					bc.chain.resolveChain();
				}
			}
			else if ((red_blue == "red") && (bc.red_done) && (!bc.blue_done)) {
				//red did something, and only blue might respond
				bc.acceptingInput = true;
				bc.gui.newActionPane("counter");
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
			else if ((red_blue == "red") && (!bc.red_done) && (bc.blue_done)) {
				//red did something, and only red might respond
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "red") && (!bc.red_done) && (!bc.blue_done)) {
				//red did something, either might respond but blue has priority
				bc.acceptingInput = true;
				bc.gui.newActionPane("counter");
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
		}, 500);			
	}
	//awaitInputTarget("blue", "target_a", this.chain.TARGET.OPPONENT_ALL, data)
	//BattleButton or BattleAI will save data to this.chain.short_term = {}
	//and call this.chain.finalizeData(data)
	//
	//unlike awaitInputCounter(), this function doesn't get called by
	//BattleButton() or BattleAI(). instead, they will call this.chain.finalizeData
	BattleController.prototype.awaitInputTarget = function(red_blue, tag, spec, data) {			
		this.acceptingInput = false;
		var bc = this;
		setTimeout(function() {
			var stage = bc.getBattleStage();
			if ((red_blue == "blue") && (!bc.blue_done)) {
				//blue added a skill requiring a target to the chain
				//blue must respond
				bc.acceptingInput = true;
				bc.gui.newActionPaneTarget(tag, spec, data); 
			}
			else if ((red_blue == "red") && (!bc.red_done)) {
				//red added a skill requiring a target to the chain
				//red must respond
				bc.ai.selectTarget(tag, spec, data); 
				bc.acceptingInput = true;
			}
		}, 0);			
	}
	BattleController.prototype.resetActionPane = function() {
		if (this.getBattleStage() == "Evoking") {
			this.gui.newActionPane("evoking");
			this.gui.newDirectionPane("Evoking Stage");
		}
		else if (this.getBattleStage() == "Action") {
			this.gui.newActionPane("action");
			this.gui.newDirectionPane("Action Stage");
		}
	}
	BattleController.prototype.doStartStage = function() {
		var bc = this;
		setTimeout(function() {
			bc.setBattleStage(bc.STAGE.EVOKING)
		}, 1000);
	}
	//this function is called when battlestage is set to EVOKING
	//
	//called by BattleAI repeatedly during its turn (for the delay between evokes)
	//  setBattleStage(EVOKING) \/ 
	//         doEvokingStage() ----------> ai.doEvokingStageAI()
	//             ^-- bc.evoke() <-- (!satisfied)--'     '--(satisfied) -->
	//			   ^-- bc.useCounter() ---'
	//			   ^---------etc.---------'
	//
	//it is the responsibility of BattleButton (blue's turn) or BattleAI
	//to advance the game from the Evoking Stage
	BattleController.prototype.doEvokingStage = function() {
		if (this.turnPlayer == "blue") {
			this.gui.newActionPane("evoking");
		} 
		else if (this.turnPlayer == "red") {
			var bc = this;
			setTimeout(function() {
				bc.ai.doEvokingStageAI();
			}, 500);
		}
	}
	//this function is called when battlestage is set to ACTION
	//
	//called by BattleAI repeatedly during its turn (for the delay between actions)
	//  setBattleStage(ACTION) -> 
	//        doActionStage() -----------------> ai.doActionStageAI()
	//             ^-- bc.useAction() <-- (!satisfied)--'     '--(satisfied) -->
	//			   ^-- bc.useCounter() ---'
	//			   ^---------etc.---------'
	//
	//it is the responsibility of BattleButton (blue's turn) or BattleAI
	//to advance the game from the Action Stage
	BattleController.prototype.doActionStage = function() {
		if (this.turnPlayer == "blue") {
			this.gui.newActionPane("action");
		} 
		else if (this.turnPlayer == "red") {
			var bc = this;
			setTimeout(function() {
				bc.ai.doActionStageAI();
			}, 500);
		}
	}
	BattleController.prototype.doEndStage = function() {
		this.gui.newDirectionPane("End Stage");
		if (this.turnPlayer == "blue") {
			this.newBlueHand();
			this.gui.newActionPane("action")
			this.turnPlayer = "red";
		}
		else {
			this.newRedHand();
			this.turnPlayer = "blue";
		}
		var bc = this;
		setTimeout(function() {
			bc.setBattleStage(bc.STAGE.START)
		}, 1000);
	}
	BattleController.prototype.doSelectTarget = function() {

	}
	BattleController.prototype.doRockPaperScissors = function(string) {
		this.blue_done = true;
		this.red_done = true;
		//if (string == "rock" || ...) {
		this.turnPlayer = "blue";

		this.newBlueHand();
		this.newRedHand();
		this.gui.newActionPane("action");
		this.setBattleStage(this.STAGE.START);
	}
	window.BattleController = BattleController;
} (window));