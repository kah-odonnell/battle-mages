(function (window) {
	var BattleControllerAction = function() {
		this.LOCATION = {
			DECK: {string: "Deck"},
			HAND: {string: "Hand"},
			UNIT: {string: "Unit"},
			CHAIN: {string: "Chain"},
		}
	};
	//Negate the effects of this action. 
	//Prevents the BattleControllerChain from resolving this action.
	//probably pointless to call after this action has been resolved...
	BattleControllerAction.prototype.negate = function() {
		this.can_resolve = false;
		return true;
	}
	///////////////////////// BattleControllerChain Interaction /////////////////////////
	/* ~~~~~~~~~ TRIGGER (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter, and it is currently 'prepared' (in use) by a unit,
	//this data will be compared to the data on the chain to determine whether it can be triggered
	BattleControllerAction.prototype.getTriggerData = function() {
		return null;
	}
	BattleControllerAction.prototype.canTrigger = function() {
		return false;
	}
	BattleControllerAction.prototype.trigger = function() {
		
	}
	/* ~~~~~~~~~ ACTIVATE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is a counter and it has been triggered, 
	//and it has been selected by the player for activation (if activation is voluntary),
	//this data will be sent to the chain
	BattleControllerAction.prototype.getActivateData = function() {
		return null;
	}
	BattleControllerAction.prototype.canActivate = function() {
		return false;
	}
	BattleControllerAction.prototype.activate = function() {
		
	}
	/* ~~~~~~~~~ USE or PREPARE (counters) ~~~~~~~~~~~~ */
	//if this Action Token is clicked and dragged to a compatible unit, 
	//this data will be sent to the chain after the necessary variables have been defined
	//if this Action Token is a counter, the data sent to chain will be non-specific
	BattleControllerAction.prototype.getUseData = function(unit) {
		return null;
	}
	BattleControllerAction.prototype.canUse = function(unit) {
		data = this.getUseData(unit);
		if (data != null) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAction.prototype.use = function(unit) {
		var t = this.canUse(unit)
		if (t) {
			this.is_resolved = false;
			this.resolve_failed = false;
			var data = this.getUseData(unit);
			this.bc.chain.finalizeData(data);
		}		
	}
	/* ~~~~~~~~~ RESOLVE ~~~~~~~~~~~~ */
	//if this Action Token's useData (activateData if Counter) is currently on the chain
	//add this resolve data to the chain.
	//The changed chain is rebroadcast so additional counters can be triggered
	BattleControllerAction.prototype.getResolveData = function(unit) {
		return null;
	}
	BattleControllerAction.prototype.canResolve = function(unit) {
		data = this.getResolveData(unit);
		if ((data != null) && this.can_resolve) {
			return this.bc.chain.isPossible(data);
		} else {
			return false;
		}
	}
	BattleControllerAction.prototype.resolve = function(unit) {
		var t = this.canResolve(unit)
		if (t) {
			this.is_resolved = true;
			this.resolve_failed = false;
			var data = this.getResolveData(unit);
			this.bc.chain.finalizeData(data);
		}
	}
	///////////////////////// END OF BattleControllerChain Interaction /////////////////////////


	//each Token in a battle is given a unique id created at random
	BattleControllerAction.prototype.createUniqueId = function() {
		var id = "";
		var chars = "0123456789abcdefghijklmnopqrstuvwxyz"
		var unique = false
		while (unique == false) {
			id = "";
			for (var i = 0; i < chars.length; i++) {
				var j = Math.floor(Math.random() * (chars.length - 1))
				id = id + chars[j];
			}
			if (this.bc.getTokenByUniqueId(id) === null) {
				unique = true;
			}
		}
		this.unique_id = id;	
	}
	BattleControllerAction.prototype.makeGraphic = function() {
		var card_image_name = this.card_img_name;
		var card_frame_name = this.frame_img_name;
		var attribute_image_name = this.attributes[0].attribute_icon_id;
		var whole_token = new createjs.Container();
		var token_art = new createjs.Bitmap(loader.getResult(card_image_name)); 
		var frame_art = new createjs.Bitmap(loader.getResult(card_frame_name)); 
		var attribute_art = new createjs.Bitmap(loader.getResult(attribute_image_name)); 
		var imgs = [token_art, frame_art];
		for (var i = 0; i < imgs.length; i++) {
			var bounds = imgs[i].getBounds();
			imgs[i].regX = bounds.width/2;
			imgs[i].regY = bounds.height/2;
			whole_token.addChild(imgs[i]);
		}
		whole_token.addChild(attribute_art);
		var total_bounds = whole_token.getBounds();
		whole_token.regX -= total_bounds.width/2;
		whole_token.regY -= total_bounds.height/2;
		whole_token.mouseChildren = false;
		return whole_token;
	}
	BattleControllerAction.prototype.getGraphic = function() {
		return this.whole_token_img;
	}
	window.BattleControllerAction = BattleControllerAction;
} (window));