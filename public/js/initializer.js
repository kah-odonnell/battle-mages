var bm = {
	maps: {},
	gameInstance: {},
	globals: {},
	assets: {},
	ui: {},
	keys: {},
	utils: {},
	gamedata: {},
}

bm.Initializer = class {
	constructor() {
		bm.globals = new bm.Globals();
		bm.gamedata.tiledata = new bm.TileData();
		bm.keys = new bm.Keys();
		bm.utils = new bm.Utils();
		var game = new bm.Game();
		bm.gameInstance = game;
		bm.gameInstance.addTicker();
	}
}

bm.initialize = function() {
	var init = new bm.Initializer();
}