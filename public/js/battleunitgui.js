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

		if (owner == "red") this.scaleX = -1;
	}
	BattleUnitGui.prototype.tick = function() {

	}
	//this game is getting out of hand, fast. anyway...
	//useToken creates a mini token image infront of a unit
	//the x position of this token depends on how many tokens are in use by this unit
	BattleUnitGui.prototype.useToken = function(action) {
		var token = new createjs.Bitmap(loader.getResult(action.mini_img));
		this.active_tokens.push(action);
		this.active_token_imgs.push(token);
		this.addChild(token);
		token.x = 75;
		token.y = this.getBounds().height/2 - token.getBounds().height/2;
		token.x += this.num_tokens_active * 10;
		token.on("click", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
		this.num_tokens_active++;
	}
	BattleUnitGui.prototype.resolveToken = function(action) {
		var l = this.active_tokens.indexOf(action);
		var img = this.active_token_imgs[l];
		var token = this.active_tokens[l];
		var coords = {x: img.x, y: img.y};
		this.active_tokens.slice(l, 1);
		this.active_token_imgs.slice(l, 1);
		this.removeChild(img);
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
		image.on("click", function(evt) {
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
	window.BattleUnitGui = BattleUnitGui;
} (window));	