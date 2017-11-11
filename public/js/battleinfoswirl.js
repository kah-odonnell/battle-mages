(function (window) {
	var BattleInfoSwirl = function(battleController, player_npc) {
		this.initialize(battleController, player_npc);
	}
	var bu = BattleInfoSwirl.prototype = new createjs.Container();
	bu.Container_initialize = bu.initialize;
	bu.initialize = function(battleController, player_npc) {
		this.Container_initialize();
		this.bc = battleController;
		var swirl = new createjs.Bitmap(loader.getResult("infoswirl"));
		var name = player_npc.name;
		var name_container = new createjs.Container();
		for (var i = 0; i < 16; i++) {
			var nametext1 = new createjs.Text(name, "22px crazycreation", "#000000");			
			var color = "#FFFFFF";
			nametext1.shadow = new createjs.Shadow(color, 0, 0, 4);
			name_container.addChild(nametext1);
		}
		if (player_npc.owner == "blue") {
			this.owner = "blue";
			swirl.x = 0;
			swirl.y = 0;
			name_container.x = 10;
			name_container.y = 0;
		} else {
			this.owner = "red";
			swirl.scaleX = -1;
			swirl.x = canvas.width;
			swirl.y = 0;
			name_container.x = canvas.width - name_container.getBounds().width - 10;
			name_container.y = 0;
		}
		this.swirl = swirl;
		this.name_container = name_container;
		this.counter_container = new createjs.Container();
		this.uniticons = [];
		this.counter_icons = [];
		this.num_units = 0;
		this.num_counters = 0;
		this.addChild(this.swirl);
		var bounds = name_container.getBounds();
		name_container.cache(bounds.x - 20, bounds.y - 20, bounds.width + 20, bounds.height + 40)
		this.addChild(this.name_container);
		this.addChild(this.counter_container)
		this.addUnits();
	}
	BattleInfoSwirl.prototype.addUnits = function() {
		var units = this.bc.getAllUnits(this.owner, false);
		this.num_units = units.length;
		for (var i = 0; i < units.length; i++) {
			var uniticon = new createjs.Bitmap(loader.getResult("unit"));
			var w = uniticon.getBounds().width;
			if (this.owner == "blue") {
				uniticon.x = this.swirl.getBounds().width - 40 - i*(w + 2);
			} else {
				uniticon.x = canvas.width - (this.swirl.getBounds().width - 22 - i*(w + 2));
			}
			uniticon.y += 2;
			this.uniticons.push(uniticon);
			this.addChild(this.uniticons[i]);
		}
	}
	BattleInfoSwirl.prototype.destroyUnit = function() {
		var old_icon = this.uniticons[this.num_units - 1];
		var old_x = old_icon.x;
		var old_y = old_icon.y;
		this.removeChild(old_icon);
		var image = new createjs.Bitmap(loader.getResult("unit"));
		image.x = old_x;
		image.y = old_y;
		var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height);
		this.addChild(image);
		this.num_units--;

	}
	BattleInfoSwirl.prototype.addCounter = function() {
		var counter = new createjs.Bitmap(loader.getResult("counter"));
		var w = counter.getBounds().width;
		if (this.owner == "blue") {
			counter.x = 22 + this.num_counters*(w + 2);
		} else {
			counter.x = canvas.width - (40 + this.num_counters*(w + 2));
		}
		counter.y = 28;
		this.counter_container.addChildAt(counter, this.num_counters);
		this.num_counters++;
	}
	BattleInfoSwirl.prototype.removeCounter = function() {
		this.num_counters--;
		this.counter_container.removeChildAt(this.num_counters);
	}
	BattleInfoSwirl.prototype.tick = function() {

	}
	window.BattleInfoSwirl = BattleInfoSwirl;
} (window));	

