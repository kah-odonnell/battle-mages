(function (window) {
	var BattleUnitGui = function(img_name, owner, bcunit) {
		this.initialize(img_name, owner, bcunit);
	}
	var bu = BattleUnitGui.prototype = new createjs.Container();
	bu.Container_initialize = bu.initialize;
	bu.initialize = function(img_name, owner, bcunit) {
		this.Container_initialize();
		this.bcunit = bcunit;
		this.img_name = img_name;
		this.num_tokens_active = 0;
		this.active_tokens = [];
		this.active_token_imgs = [];
		this.spot = level.activebattle.battleStage.SPOT.NONE;
		this.marker_on = false;
		this.marker_id = 0;

		this.image = new createjs.Bitmap(loader.getResult(img_name));
		this.addChild(this.image);
		this.image.on("click", function(event) {
			level.activebattle.battleStage.newInfoPane("unit_stats", bcunit)
		});
		this.regX = this.image.getBounds().width/2;
		this.regY = this.image.getBounds().height;

		this.status_pane = new createjs.Container();
		this.healthbar = new createjs.Bitmap(loader.getResult("healthbar"));
		this.healthempty = new createjs.Bitmap(loader.getResult("healthempty"));
		this.updateStatusPane();

		this.status_pane.addChild(this.healthbar);
		this.status_pane.addChild(this.healthempty);
		this.addChild(this.status_pane);

		this.owner = owner;
		if (owner == "red") this.scaleX = -1;
	}
	BattleUnitGui.prototype.tick = function() {

	}
	//useToken creates a mini token image infront of a unit
	//the x position of this token depends on how many tokens are in use by this unit
	BattleUnitGui.prototype.useToken = function(action) {
		var token = new createjs.Bitmap(loader.getResult(action.mini_img));
		var bounds = token.getBounds();
		this.active_tokens.push(action);
		this.active_token_imgs.push(token);
		token.x = 75;
		token.y = this.image.getBounds().height/2 - bounds.height/2;
		token.x += this.num_tokens_active * 10;
		if (this.owner == "red") {
			token.x += bounds.width;
			token.scaleX = -1;
		}
		token.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
		this.num_tokens_active++;
		this.addChild(token);
	}
	BattleUnitGui.prototype.resolveToken = function(action) {
		var l = this.active_tokens.indexOf(action);
		var old_img = this.active_token_imgs[l];
		var token = this.active_tokens[l];
		var coords = {x: old_img.x, y: old_img.y};
		this.active_tokens.slice(l, 1);
		this.active_token_imgs.slice(l, 1);
		this.removeChild(old_img);
		var imagename = token.mini_img;
		var image = new createjs.Bitmap(loader.getResult(imagename));
		var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.active_token_imgs.push(image);
		this.active_tokens.push(token);
		this.addChild(image);
		image.x = coords.x;
		image.y = coords.y;
		if (this.owner == "red") {
			image.x += bounds.width;
			image.scaleX = -1;
		}
		image.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
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
		this.image.uncache();
		this.removeChild(this.image);
		var image = new createjs.Bitmap(loader.getResult(this.img_name));
		var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.image = image;
		this.addChildAt(this.image, 0);
	}
	BattleUnitGui.prototype.highlight = function() {
		this.image.uncache();
		this.removeChild(this.image);
		var image = new createjs.Bitmap(loader.getResult(this.img_name));
		var matrix = new createjs.ColorMatrix().adjustSaturation(0);
		image.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var bounds = image.getBounds();
		image.cache(bounds.x, bounds.y, bounds.width, bounds.height)
		this.image = image;
		this.addChildAt(this.image, 0);
	}
	BattleUnitGui.prototype.unGrey = function() {
		this.removeChild(this.image);
		var image = new createjs.Bitmap(loader.getResult(this.img_name));
		this.image = image;
		var g = this;
		this.image.on("click", function(event) {
			level.activebattle.battleStage.newInfoPane("unit_stats", g.bcunit)
		});
		this.addChildAt(this.image, 0);
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
			var image_b = this.image.getBounds();
			this.marker.x = this.image.x + image_b.width/2 - marker_b.width/2 + 5;
			this.marker.y = this.image.y + image_b.height + 25; 
			this.marker.alpha = 0;
			var g = this;
			var new_y = g.image.y + image_b.height - 25;
			createjs.Tween.get(this.marker).to({alpha:1},300);
			createjs.Tween.get(this.marker).to({y:new_y},300).call(
				function() {
					g.markerUp(id)
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
		if (this.marker_on && (id == this.marker_id)) {
			var image_b = this.image.getBounds();
			var g = this;
			var new_y = g.image.y + image_b.height;
			createjs.Tween.get(this.marker).to({y:new_y},500).call(
				function() {
					g.markerDown(id)
				}
			);
		}
	}
	BattleUnitGui.prototype.markerDown = function(id) {
		if (this.marker_on && (id == this.marker_id)) {
			var image_b = this.image.getBounds();
			var g = this;
			var new_y = g.image.y + image_b.height - 25;
			createjs.Tween.get(this.marker).to({y:new_y},500).call(
				function() {
					g.markerUp(id)
				}
			);
		}
	}
	window.BattleUnitGui = BattleUnitGui;
} (window));	