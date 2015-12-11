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
	BattleUnitGui.prototype.updateStatusPane = function() {
		var percent = this.bcunit.current_health/this.bcunit.current_max_health;
		this.healthempty.scaleX = 1 - percent;

		for (var i = 0; i < this.bcunit.mana; i++) {
			var mana = new createjs.Bitmap(loader.getResult("mana"));
			mana.x = 20*i;
			mana.y = 8;
			this.status_pane.addChild(mana);
		}
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