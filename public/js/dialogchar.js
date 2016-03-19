(function (window) {
	var DialogChar = function(name, initData){
		this.initialize(name, initData);
	}
	var d = DialogChar.prototype = new createjs.Container();
	d.Container_initialize = d.initialize;
	d.initialize = function(name, initData){
		this.Container_initialize();
		this.charName = name;
		this.moodRange = {};
		this.moodList = [];

		var moodData = initData["sprites"];
		for (var key in moodData) {
			this.moodRange[key] = moodData[key];
			this.moodRange[key].silentSprites = moodData[key]["silentSprites"];
			this.moodRange[key].talkingSprites = moodData[key]["talkingSprites"];
			this.moodRange[key].isAnimated = moodData[key]["isAnimated"];
			this.moodRange[key].regX = moodData[key]["regX"];
			this.moodRange[key].yOffset = moodData[key]["yOffset"];
			this.moodList.push(key);
		}
		this.activeMood = initData["mood"];
		if (initData["facing"] == "left") {
			this.scaleX = 1;
		}
		if (initData["facing"] == "right") {
			this.scaleX = -1;
		}
		this.x = initData["position"].x;
		this.y = initData["position"].y;
		this.isTalking = false;
		this.isOnstage = false;

		this.charChildren = [];

		var currentMood = this.moodRange[this.activeMood]
		for (var i = 0; i < currentMood.silentSprites.length; i++) {
			var img = new createjs.Bitmap(loader.getResult(currentMood.silentSprites[i]));
			this.charChildren.push(img);
		}
		this.regY = this.charChildren[0].getBounds().y;
		this.y += currentMood.yOffset;
		this.regX = currentMood.regX;

		this.addChild(this.charChildren[0]);
	}
	DialogChar.prototype.transition = function(transitionData) {
		for (var key in transitionData) {
			if (key == "position") {
				var x_pos = transitionData["position"].x;
				createjs.Tween.get(this, {loop: false}).to({x: x_pos},1000,createjs.Ease.getPowInOut(4));
			}
		}
	}
	DialogChar.prototype.stopTalking = function() {
		var currentMood = this.moodRange[this.activeMood]
		for (var i = 0; i < this.charChildren.length; i++) {
			this.removeChild(this.charChildren[0]);
			this.charChildren.shift();
		}
		for (var i = 0; i < currentMood.silentSprites.length; i++) {
			var img = new createjs.Bitmap(currentMood.silentSprites[i]);
			this.charChildren.push(img);		
		}
		this.addChild(this.charChildren[0]);
	}
	DialogChar.prototype.startTalking = function() {
		var currentMood = this.moodRange[this.activeMood]
		for (var i = 0; i < this.charChildren.length; i++) {
			this.removeChild(this.charChildren[0]);
			this.charChildren.shift();
		}
		for (var i = 0; i < currentMood.talkingSprites.length; i++) {
			var img = new createjs.Bitmap(currentMood.talkingSprites[i]);
			this.charChildren.push(img);		
		}
	}
	DialogChar.prototype.tick = function() {
		if (this.charChildren.length > 1) {
			for (var i = 0; i < this.charChildren.length; i++) {
				this.addChild(this.charChildren[i]);
				if (i == 0) {
					this.removeChild(this.charChildren[this.charChildren.length - 1]);
				} else {
					this.removeChild(this.charChildren[i-1]);
				}
			}			
		}
	}
	window.DialogChar = DialogChar;
} (window));		