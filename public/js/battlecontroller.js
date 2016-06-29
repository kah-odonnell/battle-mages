//a singleton, responsible for the flow of battle (setBattleStage),
//constructing each players deck, waiting for user/ai input, 
//providing a means to manipulate BattleStage,
//and consistent access to important enumerated types
//most objs created in a battle set this obj as a property
//
//initialized by Battle()
//
//BattleController is the only class, other than BattleUnitGui, 
//allowed to manipulate BattleStage
(function (window) {
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
			UNIT: {string: "Unit"},
		}
		this.LOCATION = {
			DECK: {string: "Deck"},
			HAND: {string: "Hand"},
			UNIT: {string: "Unit"},
			CHAIN: {string: "Chain"},
			DRAG: {string: "Drag"},
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

		this.blueDestroyed = [];
		this.redDestroyed = []

		this.blueActions = this.setActions(blueDeckJSON.actions, "blue");
		this.redActions = this.setActions(redDeckJSON.actions, "red");

		this.blue_done = false;
		this.red_done = false;

		//each token needs a unique idenitifier that can later be looked up
		this.createUniqueIds();

		this.blueHand = [];
		this.redHand = [];
		this.blueHand = this.newBlueHand();
		this.redHand = this.newRedHand();

		//create the chain, essentially the "effect calculator"
		this.chain = new BattleControllerChain(this);

		this.ai = new BattleAI(this);
		
		//start the battle with rock-paper-scissors
		this.setBattleStage(this.STAGE.RPS);

		//functions that need to be run with a delay will be added to this list
		//the gameloop iterates through the list
		this.master_timeline = [];
		this.master_interval = 0;
		this.tick2 = 0;

		this.ghosts = [];
	}
	BattleController.prototype.endBattle = function() {
		var units = this.getAllUnits("all", true);
		for (var i = 0; i < units.length; i++) {
			units[i].guiUnit.removeChild(units[i].guiUnit.sprite);
			units[i].guiUnit.sprite = null;
			units[i].guiUnit = null;
		}
	}
	//update health/mana bars
	BattleController.prototype.updateStage = function() {
		var units = this.getAllUnits("all", true);
		for (var i = 0; i < units.length; i++) {
			units[i].guiUnit.updateStatusPane();
		}
	}
	//increase mana at start of each Action Stage
	//may want to fold into BattleControllerChain
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
	//destroy a BattleControllerUnit and update BattleStage
	//may want to fold into BattleControllerChain
	BattleController.prototype.destroy = function(unit) {
		if (unit.owner == "red") {
			this.gui.npcSwirl.destroyUnit();
			var c = unit.counters;
			for (var j = 0; j < c.length; j++) {
				c[j].location = this.LOCATION.DECK;
				this.gui.npcSwirl.removeCounter();
			}
			var i = this.redUnits.indexOf(unit);
			this.redDestroyed.push(unit);
			this.redUnits.splice(i, 1);
			unit.is_active = false;
		}
		if (unit.owner == "blue") {
			this.gui.playerSwirl.destroyUnit();
			var c = unit.counters;
			for (var j = 0; j < c.length; j++) {
				c[j].location = this.LOCATION.DECK;
				this.gui.playerSwirl.removeCounter();
			}
			var i = this.blueUnits.indexOf(unit);
			this.blueDestroyed.push(unit);
			this.blueUnits.splice(i, 1);
			unit.is_active = false;
		}
		unit.guiUnit.location = this.gui.LOCATION.NONE;
		unit.guiUnit.removeAllChildren();
	}
	//each token needs a unique idenitifier that can later be looked up
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
	//look up token based on unique_id
	//not fastest algo but there will never be > 80 tokens per battle
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
	//change battle stage > this.STAGE - RPS, START, EVOKING, ACTION, END
	BattleController.prototype.setBattleStage = function(stage) {
		this.currentStage = stage;
		if (stage == this.STAGE.START) {
			this.gui.newDirectionPane("Start Stage", true);
			this.doStartStage();
		}
		else if (stage == this.STAGE.EVOKING) {
			this.gui.newDirectionPane("Summoning Stage", true);
			this.doEvokingStage();
		}
		else if (stage == this.STAGE.ACTION) {
			this.gui.newDirectionPane("Action Stage", true);
			this.increaseAllMana();		
			this.doActionStage();
		}
		else if (stage == this.STAGE.END) {
			this.doEndStage();
		}
		return this.currentStage.string;
	}
	//returns a string indicating the current stage
	BattleController.prototype.getBattleStage = function() {
		return this.currentStage.string;
	}
	//iterate through a player's unit_id list and initialize their Units
	BattleController.prototype.setUnits = function(unit_id_list, owner) {
		var units = [];
		for (var i = 0; i < unit_id_list.length; i++) {
			var unit;
			if ("001" == unit_id_list[i]) unit = new Unit001(this, owner);
			else if ("002" == unit_id_list[i]) unit = new Unit002(this, owner);
			else if ("003" == unit_id_list[i]) unit = new Unit003(this, owner);
			units.push(unit);
		}
		return units;
	}
	//returns list of all units belonging to red or blue or both
	//red_blue_all is a string. minions are not yet implemented
	BattleController.prototype.getAllUnits = function(red_blue_all, minions) {
		//red_blue_all = "red" || "blue" || "all"
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
	//same as getAllUnits, but only active units
	BattleController.prototype.getActiveUnits = function(red_blue_all, minions) {
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
	BattleController.prototype.getEvokeableUnits = function(red_blue_all, minions) {
		var units = []
		if (red_blue_all == "red" || red_blue_all == "all") {
			var collection = this.redUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					if (!(collection[i].is_active)) {
						units.push(collection[i]);
					}
				} else {
					if (!(collection[i].is_active) && (!collection[i].is_minion)) {
						units.push(collection[i]);
					}
				}
			}
		}
		if (red_blue_all == "blue" || red_blue_all == "all") {
			var collection = this.blueUnits;
			for (var i = 0; i < collection.length; i++) {
				if (minions == true) {
					if (!(collection[i].is_active)) {
						units.push(collection[i]);
					}
				} else {
					if (!(collection[i].is_active) && (!collection[i].is_minion)) {
						units.push(collection[i]);
					}
				}
			}
		}
		return units;
	}
	BattleController.prototype.getAvailableLocations = function(owner) {
		var locs = [];
		if (owner == "blue") {
			if (this.gui.LOCATION.A.BLUE.occupied == false) {
				locs.push(this.gui.LOCATION.A);
			}
			if (this.gui.LOCATION.B.BLUE.occupied == false) {
				locs.push(this.gui.LOCATION.B);
			}
			if (this.gui.LOCATION.C.BLUE.occupied == false) {
				locs.push(this.gui.LOCATION.C);
			}
			if (this.gui.LOCATION.D.BLUE.occupied == false) {
				locs.push(this.gui.LOCATION.D);
			}
			if (this.gui.LOCATION.E.BLUE.occupied == false) {
				locs.push(this.gui.LOCATION.E);
			}
		}
		if (owner == "red") {
			if (this.gui.LOCATION.A.RED.occupied == false) {
				locs.push(this.gui.LOCATION.A);
			}
			if (this.gui.LOCATION.B.RED.occupied == false) {
				locs.push(this.gui.LOCATION.B);
			}
			if (this.gui.LOCATION.C.RED.occupied == false) {
				locs.push(this.gui.LOCATION.C);
			}
			if (this.gui.LOCATION.D.RED.occupied == false) {
				locs.push(this.gui.LOCATION.D);
			}
			if (this.gui.LOCATION.E.RED.occupied == false) {
				locs.push(this.gui.LOCATION.E);
			}
		}
		return locs;
	}
	//remove the tokens that appear in front of BattleUnitGuis
	//after all tokens on the chain have resolved
	BattleController.prototype.clearAllGuiUnits = function() {
		var units = this.getAllUnits("all", true);
		for (var i = 0; i < units.length; i++) {
			units[i].guiUnit.removeAllTokens();
		}
	}
	//iterate through a player's action_id list and initialize Actions
	BattleController.prototype.setActions = function(action_id_list, owner) {
		var actions = [];
		for (var i = 0; i < action_id_list.length; i++) {
			var action = null;
			if ("ILL001" === action_id_list[i]) {
				action = new ActionILL001(this, owner);
			}
			if ("ILL002" === action_id_list[i]) {
				action = new ActionILL002(this, owner);
			}
			if ("ILL003" === action_id_list[i]) {
				action = new ActionILL003(this, owner);
			}
			if ("ILL004" === action_id_list[i]) {
				action = new ActionILL004(this, owner);
			}
			if ("ILL005" === action_id_list[i]) {
				action = new ActionILL005(this, owner);
			}
			if (action != null) {
				action.location = this.LOCATION.DECK;
				actions.push(action);				
			} else {
				console.log(action_id_list[i] + " is not a valid catalog id");
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
	//returns a list of tokens in hand, excluding those currently being clickanddragged
	BattleController.prototype.getHand = function(red_blue) {
		if (red_blue == "blue") {
			var newlist = [];
			var list = this.blueHand;
			for (var i = 0; i < list.length; i++) {
				if (list[i].location == this.LOCATION.HAND) {
					newlist.push(list[i]);
				}
			}
			return newlist;
		}
		else if (red_blue == "red") {
			var newlist = [];
			var list = this.redHand;
			for (var i = 0; i < list.length; i++) {
				if (list[i].location == this.LOCATION.HAND) {
					newlist.push(list[i]);
				}
			}
			return newlist;
		}
	}
	//called at red's end stage
	BattleController.prototype.newRedHand = function() {
		for (var i = 0; i < this.redHand.length; i++) {
			var token = this.redHand[i];
			token.location = this.LOCATION.DECK;
		}
		var hand = [];
		var actions = this.redActions;
		while (hand.length < 4) {
			var numtoadd = Math.floor(Math.random() * actions.length);
			var tokentoadd = actions[numtoadd];
			if (tokentoadd.location == this.LOCATION.HAND) {

			}
			else if (tokentoadd.location == this.LOCATION.DECK) {
				hand.push(tokentoadd)
				tokentoadd.location = this.LOCATION.HAND;
			}
		}
		return hand;
	}
	//called at blue's end stage
	BattleController.prototype.newBlueHand = function() {
		for (var i = 0; i < this.blueHand.length; i++) {
			var token = this.blueHand[i];
			token.location = this.LOCATION.DECK;
		}
		var hand = [];
		var actions = this.blueActions;
		while (hand.length < 4) {
			var numtoadd = Math.floor(Math.random() * actions.length);
			var tokentoadd = actions[numtoadd];
			if (tokentoadd.location == this.LOCATION.HAND) {

			}
			else if (tokentoadd.location == this.LOCATION.DECK) {
				hand.push(tokentoadd)
				tokentoadd.location = this.LOCATION.HAND;
			}
		}
		return hand;
	}
	BattleController.prototype.removeFromHand = function(action) {
		var hand = [];
		if (action.owner == "red") hand = this.redHand;
		else if (action.owner == "blue") hand = this.blueHand;	
		for (var i = 0; i < hand.length; i++) {
			var token = hand[i];
			if (token == action) {
				if (action.owner == "red") this.redHand.splice(i, 1);
				else if (action.owner == "blue") this.blueHand.splice(i, 1);
				action.location == this.LOCATION.DECK;
			}
		}
		this.gui.updateActionPane();
	}
	BattleController.prototype.resetHand = function() {
		if (this.getBattleStage() == "Evoking") this.gui.newActionPaneEvoking();
		else if (this.getBattleStage() == "Action") this.gui.newActionPaneHand();
	}
	BattleController.prototype.evoke = function(bcunit) {
		if ((bcunit.owner == "blue") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("blue", false).length < 2) {
				bcunit.evoke();
				this.gui.evoke(bcunit);
				var c = bcunit.counters;
				for (var i = 0; i < c.length; i++) {
					this.gui.playerSwirl.addCounter();
				}
				this.doEvokingStage();
			}
		}
		if ((bcunit.owner == "red") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("red", false).length < 2) {
				bcunit.evoke();
				this.gui.evoke(bcunit);
				var c = bcunit.counters;
				for (var i = 0; i < c.length; i++) {
					this.gui.npcSwirl.addCounter();
				}
				this.doEvokingStage();
			}
		}
	}
	BattleController.prototype.revoke = function(bcunit) {
		if ((bcunit.owner == "blue") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("blue", false).length > 0) {
				bcunit.revoke();
				this.gui.revoke(bcunit);
				var c = bcunit.counters;
				for (var i = 0; i < c.length; i++) {
					this.gui.playerSwirl.removeCounter();
				}
				this.doEvokingStage();
			}
		}
		if ((bcunit.owner == "red") && (this.getBattleStage() == "Evoking")) {
			if (this.getActiveUnits("red", false).length > 0) {
				bcunit.revoke();
				this.gui.revoke(bcunit);
				var c = bcunit.counters;
				for (var i = 0; i < c.length; i++) {
					this.gui.npcSwirl.removeCounter();
				}
				this.doEvokingStage();
			}
		}
	}
	BattleController.prototype.getOtherPlayer = function(red_blue) {
		if (red_blue == "blue") return "red";
		else if (red_blue == "red") return "blue";
		else return null;
	}
	//tl;dr - awaitInput<thing>() is a finite state machine dead end
	//as far as BattleController's role is concerned
	//
	//when input is needed by the player or ai,
	//BCChain() will define which player can input (<red/blue>_done = false)
	//and call this function.
	//
	//this function adds a func to the timeline that gets processed by the game loop
	//
	//a BattleButton or the BattleAI will then have to activate a counter or decline doing so,
	//or if either player cannot do anything (<red/blue>_done = true)
	//we return to the doActionStage() cycle
	BattleController.prototype.awaitInputCounter = function(red_blue) {
		this.acceptingInput = false;
		var bc = this;
		var counterSink = function() {
			var stage = bc.getBattleStage();
			if ((red_blue == "blue") && (bc.red_done) && (bc.blue_done)) {
				//blue did something, and no one has a response
				bc.acceptingInput = true;
				if (stage == "Evoking") {
					bc.doEvokingStage();
				}
				else if (stage == "Action") {
					bc.doActionStage()
				}
			}
			else if ((red_blue == "blue") && (bc.red_done) && (!bc.blue_done)) {
				//blue did something, and only blue might respond
				bc.acceptingInput = true;
				bc.gui.newActionPaneCounter();
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
			else if ((red_blue == "blue") && (!bc.red_done) && (bc.blue_done)) {
				//blue did something, and only red might respond
				bc.acceptingInput = true;
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "blue") && (!bc.red_done) && (!bc.blue_done)) {
				//blue did something, either might respond but red has priority
				bc.acceptingInput = true;
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "red") && (bc.red_done) && (bc.blue_done)) {
				//red did something and noone has a response
				bc.acceptingInput = true;
				if (stage == "Evoking") {
					bc.doEvokingStage();
				}
				else if (stage == "Action") {
					bc.doActionStage()
				}
			}
			else if ((red_blue == "red") && (bc.red_done) && (!bc.blue_done)) {
				//red did something, and only blue might respond
				bc.acceptingInput = true;
				bc.gui.newActionPaneCounter();
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
			else if ((red_blue == "red") && (!bc.red_done) && (bc.blue_done)) {
				//red did something, and only red might respond
				bc.acceptingInput = true;
				bc.ai.selectCounters();
				//ai sets red_done = true and calls awaitInput("red")
			}
			else if ((red_blue == "red") && (!bc.red_done) && (!bc.blue_done)) {
				//red did something, either might respond but blue has priority
				bc.acceptingInput = true;
				bc.gui.newActionPaneCounter();
				//hitting continue/counter button sets blue_done = true;
				//and calls awaitInput("blue")
			}
		}
		this.addToTimeline(counterSink);
	}
	//same as awaitInputCounter, but instead of selecting a counter,
	//we are selecting from a list of units
	//
	//the BattleButton or BattleAI needs to save some data to the short_term object on the chain
	// red_blue = "red" || "blue"
	// memory_id = the key in the data (see below) that needs to be set upon target selection
	// range = the player's choice of targets (OPPONENT_ALL || OWNER_MINIONS || etc)
	// data = the key/value pair of the action token we are currently selecting a target for
	BattleController.prototype.awaitInputTarget = function(red_blue, memory_id, range, data) {			
		this.acceptingInput = false;
		var bc = this;
		var targetSink = function() {
			var stage = bc.getBattleStage();
			if ((red_blue == "blue") && (!bc.blue_done)) {
				//blue added a skill requiring a target to the chain
				//blue must respond
				bc.acceptingInput = true;
				bc.gui.newActionPaneTarget(memory_id, range, data); 
			}
			else if ((red_blue == "red") && (!bc.red_done)) {
				//red added a skill requiring a target to the chain
				//red must respond
				bc.acceptingInput = true;
				bc.ai.selectTarget(memory_id, range, data); 
			}
		}
		targetSink();
	}
	BattleController.prototype.resetActionPane = function() {
		if (this.getBattleStage() == "Evoking") {
			this.gui.newActionPaneEvoking();
			this.gui.newDirectionPane("Summoning Stage", false);
		}
		else if (this.getBattleStage() == "Action") {
			this.gui.newActionPaneHand();
			this.gui.newDirectionPane("Action Stage", false);
		}
	}
	BattleController.prototype.doStartStage = function() {
		var bc = this;
		var goToEvoking = function() {
			bc.setBattleStage(bc.STAGE.EVOKING)
		}
		this.addToTimeline(goToEvoking);
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
		if (this.chain.chain.length == 0) {
			this.is_resolving = false;
			if (this.turnPlayer == "blue") {
				this.gui.newActionPaneHand();
				this.gui.newActionPaneEvoking();
			} 
			else if (this.turnPlayer == "red") {
				var bc = this;
				var aiEvoke = function() {
					bc.ai.doEvokingStageAI();
				}
				this.addToTimeline(aiEvoke);
			}
		} else {
			this.is_resolving = true;
			var bc = this;
			var resolveStep = function() {
				bc.chain.resolveChain();
			}
			this.addToTimeline(resolveStep);
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
	//adding anything to the chain, be it a resolve effect or otherwise,
	//should eventually come back to this function.
	BattleController.prototype.doActionStage = function() {
		if (this.chain.chain.length == 0) {
			this.is_resolving = false;
			this.gui.newActionPaneHand();
			if (this.turnPlayer == "blue") {

			} 
			else if (this.turnPlayer == "red") {
				var bc = this;
				var aiAction = function() {
					bc.ai.doActionStageAI();
				}
				this.addToTimeline(aiAction);
			}
			this.clearAllGuiUnits();
		} else {
			this.is_resolving = true;
			var bc = this;
			var resolveStep = function() {
				bc.chain.resolveChain();
			}
			this.addToTimeline(resolveStep);
		}
		this.gui.newActionPaneHand();
	}
	BattleController.prototype.doEndStage = function() {
		this.gui.newActionPaneHand();
		this.gui.newDirectionPane("End Stage", true);
		if (this.turnPlayer == "blue") {
			this.blueHand = this.newBlueHand();
			var bc = this;
			var goToStartRed = function() {
				bc.turnPlayer = "red";
				bc.setBattleStage(bc.STAGE.START);
			}
			this.addToTimeline(goToStartRed);
			this.gui.newActionPaneHand();
		}
		else if (this.turnPlayer == "red") {
			this.redHand = this.newRedHand();
			var bc = this;
			var goToStartBlue = function() {
				bc.turnPlayer = "blue";
				bc.setBattleStage(bc.STAGE.START);
			}
			this.addToTimeline(goToStartBlue);
			this.gui.newActionPaneHand();
		} else {
			console.log("doEndStage doesn't know whose turn it is")
		}
	}
	BattleController.prototype.doRockPaperScissors = function(string) {
		this.blue_done = true;
		this.red_done = true;
		//if (string == "rock" || ...) {
		this.turnPlayer = "blue";
		this.gui.newActionPaneHand();
		this.setBattleStage(this.STAGE.START);
	}
	BattleController.prototype.addToTimeline = function(func, tick_delay) {
		if (tick_delay === undefined) {
			var item = {func: func, delay: 45};
			this.master_timeline.push(item);
		} else {
			var item = {func: func, delay: tick_delay};
			this.master_timeline.push(item);
		}
		this.tick2 = 0;
	}
	BattleController.prototype.tick = function() {
		this.updateStage();
		var item = this.master_timeline[this.master_interval];
		if (item) {
			var delay = item.delay;
			var func = item.func;
			if (this.tick2 < delay) {
				this.tick2++;
			}
			else if (this.tick2 == delay) {
				this.tick2 = 0;
				if (this.master_interval < this.master_timeline.length) {
					if (func) func();
					else console.log("Something went wrong. BattleController attempted to call a non-function.")
					this.master_interval++;
					//if victory conditions are met, the next item in timeline ends the battle
				}
			}
		}
	}
	BattleController.prototype.decideBattleOutcome = function() {
		var red_defeated = (this.getAllUnits("red", false).length < 1);
		var blue_defeated = (this.getAllUnits("blue", false).length < 1);
		if (red_defeated && blue_defeated) {
			console.log("Draw?!");
		}
		else if (red_defeated) {
			level.activebattle.initEndDialog();
		} 
		else if (blue_defeated) {
			var color1 = "#FF0000"
			$("#lose").css("color",color1).html("You aren't supposed to lose yet!");
			init()
		}
	}
	window.BattleController = BattleController;
} (window));