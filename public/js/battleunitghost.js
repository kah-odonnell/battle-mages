(function (window) {
	var BattleUnitGhost = function(owner, bcunit, location) {	
		/*
		this.LOCATION = {
			A: {
				BLUE: {
					x: 265, 
					y: 130, 
					occupied: false;
				},
				RED: {
					x: 535, 
					y: 130,
					occupied: false;
				},
			}...,
			NONE: {value: 0},
		}
		*/	
		this.initialize(owner, bcunit, location);
	}
	var bug = BattleUnitGhost.prototype = new createjs.Container();
	bug.Container_initialize = bug.initialize;
	bug.initialize = function(owner, bcunit, location) {
		this.Container_initialize();
		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];
		this.location = location;
		this.marker_on = false;
		this.is_grey = false;
		this.marker_id = 0;

		var sprite_data = bcunit.sprite_data;
		this.sprite = new createjs.Sprite(sprite_data);
		this.sprite.gotoAndStop("idle");
		this.addChild(this.sprite);

		this.owner = owner;
		if (owner == "red") {
			this.scaleX = -1; 
		} else {

		}
		if (bcunit.is_player) {
			this.scaleX *= -1;
		}
	}
	BattleUnitGhost.prototype.tick = function() {
		var bounds = {width: 100, height: 100};
		var inX = ((this.x < mouseX) && (mouseX < (this.x + bounds.width))); 
		var inY = ((this.y < mouseY) && (mouseY < (this.y + bounds.height))); 
		if (inX && inY) this.unGrey();
		else this.greyOut();
	}
	BattleUnitGhost.prototype.greyOut = function() {
		if (!this.is_grey) {
			this.is_grey = true;
			this.sprite.uncache();
			this.sprite.gotoAndStop("idle");
			var image = this.sprite;
			var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
			image.filters = [
			    new createjs.ColorMatrixFilter(matrix)
			];
			var bounds = image.getBounds();
			image.cache(bounds.x, bounds.y, bounds.width, bounds.height);
			this.sprite = image;
		}
	}
	BattleUnitGhost.prototype.highlight = function() {
		this.sprite.uncache();
		var image = this.sprite;
		var matrix = new createjs.ColorMatrix().adjustSaturation(0);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.sprite = image;
		this.sprite.gotoAndPlay("idle");
	}
	BattleUnitGhost.prototype.unGrey = function() {
		if (this.is_grey) {		
			this.is_grey = false;
			this.sprite.uncache();
			this.sprite.play();
			this.sprite.gotoAndPlay("idle");
		}
	}
	BattleUnitGhost.prototype.markerOn = function() {
		if (!this.marker_on) {
			this.marker_on = true;
			this.marker_id++;
			var id = this.marker_id;
			var marker_container = new createjs.Container();
			for (var i = 0; i < 6; i++) {
				var new_marker = new createjs.Bitmap(loader.getResult("marker_default"));
				var color = "#FFFFFF";
				new_marker.shadow = new createjs.Shadow(color, 0, 0, 4);
				marker_container.addChild(new_marker);
			}
			var b = marker_container.getBounds();
			marker_container.cache(marker_container.x - 10, marker_container.y - 10, b.width + 10, b.height + 10);
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
	BattleUnitGhost.prototype.markerOff = function() {
		if (this.marker_on) {
			this.marker_on = false;
			this.removeChild(this.marker);
		}

	}
	BattleUnitGhost.prototype.markerUp = function(id) {
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
	BattleUnitGhost.prototype.markerDown = function(id) {
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
	window.BattleUnitGhost = BattleUnitGhost;
} (window));	