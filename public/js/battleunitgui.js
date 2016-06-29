(function (window) {
	var BattleUnitGui = function(sprite, owner, bcunit) {
		this.initialize(sprite, owner, bcunit);
	}
	var bu = BattleUnitGui.prototype = new createjs.Container();
	bu.Container_initialize = bu.initialize;
	bu.initialize = function(sprite, owner, bcunit) {
		this.Container_initialize();
		this.bcunit = bcunit;
		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];
		this.location = level.activebattle.battleStage.LOCATION.NONE;
		this.marker_on = false;
		this.marker_id = 0;

		this.sprite = sprite;
		this.sprite.gotoAndPlay("idle");
		this.addChild(this.sprite);
		this.sprite.on("mouseover", function(event) {
			level.activebattle.battleStage.newInfoPane("unit_info", bcunit)
		});

		this.status_pane = new createjs.Container();
		this.healthbar = new createjs.Bitmap(loader.getResult("healthbar"));
		this.healthempty = new createjs.Bitmap(loader.getResult("healthempty"));
		this.updateStatusPane();

		this.status_pane.addChild(this.healthbar);
		this.status_pane.addChild(this.healthempty);
		this.status_pane.x = 0 - 50;
		this.status_pane.y = 0 - 100;
		this.addChild(this.status_pane);

		this.owner = owner;
		if (owner == "red") this.scaleX = -1;
	}
	BattleUnitGui.prototype.tick = function() {

	}
	BattleUnitGui.prototype.setLocation = function(location) {
		if (this.owner == "blue") {
			this.x = location.BLUE.x;
			this.y = location.BLUE.y;
		} else {
			this.x = location.RED.x;
			this.y = location.RED.y;
		}
	}
	BattleUnitGui.prototype.removeAllTokens = function() {
		for (var i = 0; i < this.active_token_imgs.length; i++) {
			this.removeChild(this.active_token_imgs[i]);
		}
		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];
	}
	BattleUnitGui.prototype.updateStatusPane = function() {
		var percent = this.bcunit.current_health/this.bcunit.raw_max_health;
		this.healthempty.scaleX = 1 - percent;

		this.status_pane.removeChild(this.manabox);
		this.manabox = new createjs.Container();
		for (var i = 0; i < this.bcunit.mana; i++) {
			var mana = new createjs.Bitmap(loader.getResult("mana"));
			mana.x = 20*i;
			mana.y = 8;
			this.manabox.addChild(mana);
		}
		this.status_pane.addChild(this.manabox);
	}
	BattleUnitGui.prototype.greyOut = function() {
		this.sprite.uncache();
		this.sprite.stop();
		var image = this.sprite;
		var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height);
		this.sprite = image;
	}
	BattleUnitGui.prototype.highlight = function() {
		this.sprite.uncache();
		var image = this.sprite;
		var matrix = new createjs.ColorMatrix().adjustSaturation(0);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.sprite = image;
	}
	BattleUnitGui.prototype.unGrey = function() {
		this.sprite.uncache();
		this.sprite.play();
	}
	BattleUnitGui.prototype.markerOn = function() {
		if (!this.marker_on) {
			this.marker_on = true;
			this.marker_id++;
			var id = this.marker_id;
			var marker_container = new createjs.Container();
			for (var i = 0; i < 6; i++) {
				var new_marker = new createjs.Bitmap(loader.getResult("marker"));
				var color = "#FFFFFF";
				new_marker.shadow = new createjs.Shadow(color, 0, 0, 4);
				marker_container.addChild(new_marker);
			}		
			this.marker = marker_container;	
			var marker_b = this.marker.getBounds();
			this.marker.regX = marker_b.width/2;
			this.marker.x = this.sprite.x;
			this.marker.y = this.sprite.y + 25; 
			this.marker.alpha = 0;
			var ui_unit = this;
			var new_y = ui_unit.sprite.y - 25;
			createjs.Tween.get(this.marker).to({alpha:1},300);
			createjs.Tween.get(this.marker).to({y:new_y},300).call(
				function() {
					ui_unit.markerUp(id)
				}
			);
			this.addChild(this.marker);
		}
	}
	BattleUnitGui.prototype.markerOff = function() {
		if (this.marker_on) {
			this.marker_on = false;
			this.removeChild(this.marker);
		}

	}
	BattleUnitGui.prototype.markerUp = function(id) {
		var ui_unit = this;
		if (this.marker_on && (id == this.marker_id)) {
			var new_y = this.sprite.y + 15;
			createjs.Tween.get(this.marker).to({y:new_y},500).call(
				function() {
					ui_unit.markerDown(id)
				}
			);
		}
	}
	BattleUnitGui.prototype.markerDown = function(id) {
		var ui_unit = this;
		if (ui_unit.marker_on && (id == ui_unit.marker_id)) {
			var new_y = this.sprite.y - 15;
			createjs.Tween.get(this.marker).to({y:new_y},500).call(
				function() {
					ui_unit.markerUp(id)
				}
			);
		}
	}
	window.BattleUnitGui = BattleUnitGui;
} (window));	