(function (window) {
	var BattleUnit = function(unitNo, unitData, owner){
		this.initialize(unitNo, unitData, owner);
	}
	var pp = BattleUnit.prototype = new createjs.Container();
	pp.Container_initialize = pp.initialize;
	pp.initialize = function(unitNo, unitData, owner){
		this.Container_initialize();
		this.unitName = unitData["name"];
		this.unitTitle = unitData["title"];
		this.unitAttributes = unitData["attributes"];
		this.unitHealth = unitData["health"];
		this.unitAttack = unitData["attack"];
		this.unitDefense = unitData["defense"];
		this.unitLuck = unitData["luck"];
		this.tokenImageName = unitData["img_token"];
		this.unitImageName = unitData["img_battle"]
		this.unitNo = unitNo;
		this.owner = owner;

		this.unitMana = 0;
		this.healthMod = 0;
		this.attackMod = 0;
		this.defenseMod = 0;
		this.luckMod = 0;
		this.counters = [];
		this.conditions = [];
		this.boons = [];
		this.hexes = [];

		this.image = new createjs.Bitmap(loader.getResult(this.unitImageName));
		this.addChild(this.image);
		this.on("click", function(event) {
			level.activebattle.battleStage.newInfoPane("unit_stats", this)
		});
		this.regX = this.image.getBounds().width/2;
		this.regY = this.image.getBounds().height;
	}
	BattleUnit.prototype.evoke = function() {
		this.owner.activeUnits.push(this);
	}
	BattleUnit.prototype.revoke = function() {
		var newActive = [];
		var oldActive = this.owner.activeUnits;
		for (var i = 0; i < oldActive.length; i++) {
			if (oldActive[i] != this) {
				newActive.push(oldActive[i]);
			}
		}
		this.owner.activeUnits = newActive;
	}
	BattleUnit.prototype.tick = function() {

	}
	window.BattleUnit = BattleUnit;
} (window));	