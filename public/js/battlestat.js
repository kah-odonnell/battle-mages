(function (window) {
	var BattleStat = function(unit, stat_type) {
		this.initialize(unit, stat_type);
	}
	var bb = BattleStat.prototype = new createjs.Container();
	bb.Container_initialize = bb.initialize;
	bb.initialize = function(unit, stat_type){
		this.Container_initialize();
		var action = unit;
		this.bc = level.activebattle.battleController;
		if (stat_type == "health") {
			var icon = new createjs.Bitmap(loader.getResult("health_icon"));
			var string = unit.getCurrentHealth();
			var text1 = new createjs.Text(string, "26px crazycreation", "#000000");	
			text1.x = icon.getBounds().width/2 - text1.getBounds().width/2;
			text1.y = icon.getBounds().height + 4;
			/*
			var text_container = new createjs.Container();
			for (var i = 0; i < 16; i++) {
				var text1 = new createjs.Text(string, "22px crazycreation", "#000000");			
				var color = "#FFFFFF";
				text1.shadow = new createjs.Shadow(color, 0, 0, 4);
				text_container.addChild(nametext1);
			}
			*/
			this.addChild(icon);
			this.addChild(text1);
		}
		if (stat_type == "attack") {
			var icon = new createjs.Bitmap(loader.getResult("attack_icon"));
			var string = unit.getCurrentAttack();
			var text1 = new createjs.Text(string, "26px crazycreation", "#000000");	
			text1.x = icon.getBounds().width/2 - text1.getBounds().width/2;
			text1.y = icon.getBounds().height + 4;
			/*
			var text_container = new createjs.Container();
			for (var i = 0; i < 16; i++) {
				var text1 = new createjs.Text(string, "22px crazycreation", "#000000");			
				var color = "#FFFFFF";
				text1.shadow = new createjs.Shadow(color, 0, 0, 4);
				text_container.addChild(nametext1);
			}
			*/
			this.addChild(icon);
			this.addChild(text1);
		}
		if (stat_type == "defense") {
			var icon = new createjs.Bitmap(loader.getResult("defense_icon"));
			var string = unit.getCurrentDefense();
			var text1 = new createjs.Text(string, "26px crazycreation", "#000000");	
			text1.x = icon.getBounds().width/2 - text1.getBounds().width/2;
			text1.y = icon.getBounds().height + 4;
			/*
			var text_container = new createjs.Container();
			for (var i = 0; i < 16; i++) {
				var text1 = new createjs.Text(string, "22px crazycreation", "#000000");			
				var color = "#FFFFFF";
				text1.shadow = new createjs.Shadow(color, 0, 0, 4);
				text_container.addChild(nametext1);
			}
			*/
			this.addChild(icon);
			this.addChild(text1);
		}
		this.setBounds(0,0,50,this.getBounds().height);
	}
	BattleStat.prototype.destroyButton = function() {
		this.removeAllChildren();
	}
	BattleStat.prototype.tick = function() {

	}
	window.BattleStat = BattleStat;
} (window));		
