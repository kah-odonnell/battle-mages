(function (window) {
	var InteractPrompt = function(InteractPromptlog, obj){
		this.initialize(InteractPromptlog, obj);
	}
	var p = InteractPrompt.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(InteractPromptLog, obj){
		this.Container_initialize();

		this.obj = obj;
		level.activeprompt = this;
		if (!(InteractPromptLog[0] === undefined)) {
			this.dialoglog = InteractPromptLog;
		}

		this.isNpc = (obj.TYPE == map.INTERACTABLE.NPC);
		this.isWalkout = (obj.TYPE == map.INTERACTABLE.WALKOUT);
		this.isDoor = (obj.TYPE == map.INTERACTABLE.DOOR);
		this.uncache(0,0, canvas.width, canvas.height);

		if (this.isNpc) this.buildNpcPrompt();
		if (this.isWalkout) this.buildWalkoutPrompt();
		if (this.isDoor) this.buildDoorPrompt();

		for (var i = 0; i < this.numChildren; i++) {
			var currentChild = this.getChildAt(i);
			var newX = canvas.width/2 - currentChild.getBounds().width/2;
			createjs.Tween.get(currentChild).to({alpha:1},200);
			createjs.Tween.get(currentChild).to({x:newX},200);
		}

		var g = this;
		setTimeout(function() {
			g.cache(0,0, canvas.width, canvas.height);
		}, 200);
		level.addChild(this);

	}
	InteractPrompt.prototype.buildNpcPrompt = function(){
		var offset1 = 20;
		var offset2 = -20;
		for (var i = 0; i < 4; i++) {
			currentY = 200;
			var objtext = new createjs.Text(this.obj.npcname, "32px crazycreation", "#000000");
			objtext.x = canvas.width/2 - objtext.getBounds().width/2 + offset1;
			objtext.y = currentY;
			objtext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			objtext.alpha = 0;
			this.addChild(objtext);

			var spacebarIcon = new createjs.Bitmap(loader.getResult("spacebarIcon"));
			spacebarIcon.x = canvas.width/2 - spacebarIcon.getBounds().width/2 + offset2;
			currentY += spacebarIcon.getBounds().height + 16;
			spacebarIcon.y = currentY;
			spacebarIcon.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			spacebarIcon.alpha = 0;
			this.addChild(spacebarIcon);

			var actiontext = new createjs.Text("Talk", "24px crazycreation", "#000000");
			actiontext.x = canvas.width/2 - actiontext.getBounds().width/2 + offset1;
			currentY += actiontext.getBounds().height + 8; 
			actiontext.y = currentY;
			actiontext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			actiontext.alpha = 0;
			this.addChild(actiontext);	
		}
	}
	InteractPrompt.prototype.buildDoorPrompt = function(){
		var offset1 = 20;
		var offset2 = -20
		for (var i = 0; i < 4; i++) {
			currentY = 200;
			var objtext = new createjs.Text(this.obj.formalname, "32px crazycreation", "#000000");
			objtext.x = canvas.width/2 - objtext.getBounds().width/2 + offset1;
			objtext.y = currentY;
			objtext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			objtext.alpha = 0;
			this.addChild(objtext);

			var spacebarIcon = new createjs.Bitmap(loader.getResult("spacebarIcon"));
			spacebarIcon.x = canvas.width/2 - spacebarIcon.getBounds().width/2 + offset2;
			currentY += spacebarIcon.getBounds().height + 16;
			spacebarIcon.y = currentY;
			spacebarIcon.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			spacebarIcon.alpha = 0;
			this.addChild(spacebarIcon);

			var actiontext = new createjs.Text("Enter", "24px crazycreation", "#000000");
			actiontext.x = canvas.width/2 - actiontext.getBounds().width/2 + offset1;
			currentY += actiontext.getBounds().height + 8; 
			actiontext.y = currentY;
			actiontext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			actiontext.alpha = 0;
			this.addChild(actiontext);	
		}
	}
	InteractPrompt.prototype.buildWalkoutPrompt = function(){
		var offset1 = 20;
		var offset2 = -20;
		for (var i = 0; i < 4; i++) {
			currentY = 200;
			var actiontext = new createjs.Text("Exit To", "24px crazycreation", "#000000");
			actiontext.x = canvas.width/2 - actiontext.getBounds().width/2 + offset1;
			actiontext.y = currentY;
			currentY += actiontext.getBounds().height + 8; 
			actiontext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			actiontext.alpha = 0;
			this.addChild(actiontext);

			var objtext = new createjs.Text(this.obj.formalname, "32px crazycreation", "#000000");
			objtext.x = canvas.width/2 - objtext.getBounds().width/2 + offset1;
			objtext.y = currentY;
			objtext.shadow = new createjs.Shadow("#FFFFFF", 0, 0, 16);
			objtext.alpha = 0;
			this.addChild(objtext);
		}
	}
	InteractPrompt.prototype.breakdown = function(){
		createjs.Tween.get(this).to({alpha:0},200).call(
			function () {
				var p = this;
				p.removeAllChildren();
				level.removeChild(p);
			});
		level.activeprompt = null;
	}
	InteractPrompt.prototype.hardBreakdown = function(){
		this.removeAllChildren();
		level.removeChild(this);
		level.activeprompt = null;
	}
	InteractPrompt.prototype.getDist = function(){
		var playerCoords = map.localToGlobal(player.x, player.y);
		var objCoords = map.localToGlobal(this.obj.x, this.obj.y);
		var c = Math.sqrt(
			Math.pow(playerCoords.x-objCoords.x,2) +
			Math.pow(playerCoords.y-objCoords.y,2)
		);
		return c;
	}
	InteractPrompt.prototype.tick = function() {
		if ((this.getDist() > 40) && !(this.isWalkout)) this.breakdown();
		if (!(map.isFacing(player,this.obj)) && (this.isWalkout)) this.isVulnerable = true;
		if (Key.isDown(Key.SPACE) && !(this.dialoglog === undefined)) {
			level.addDialog(this.dialoglog);
			this.breakdown();
		} else if (Key.isDown(Key.SPACE) && this.isDoor) {
			this.breakdown();
			var mapEventDict = {
				"mapchange": this.obj.routename
			}
			var mapEvent = new MapEvent(mapEventDict);
		}
	}
	window.InteractPrompt = InteractPrompt;
} (window));		