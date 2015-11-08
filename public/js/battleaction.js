(function (window) {
	var BattleAction = function(libraryId, actionData, owner){
		this.initialize(libraryId, actionData, owner);
	}
	var pp = BattleAction.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(libraryId, actionData, owner){
		this.Container_initialize();
		this.libraryId = libraryId;
		this.actionName = actionData["name"];
		this.actionMana = actionData["mana"];
		this.actionAttribute = actionData["attribute"];
		this.actionType = actionData["type"];
		this.actionDesc = actionData["description"];
		this.tokenImageName = actionData["img"];
		this.miniImageName = actionData["mini_img"];
		this.owner = owner;
	}
	BattleAction.prototype.getLibraryId = function() {
		return this.libraryId;
	}
	BattleAction.prototype.tick = function() {

	}
	window.BattleAction = BattleAction;
} (window));	