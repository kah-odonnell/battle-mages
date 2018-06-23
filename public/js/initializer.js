var bm = {
	maps: {},
	gameInstance: {},
	globals: {},
	assets: {},
	ui: {},
	keys: {},
	utils: {},
	gamedata: {},
	characters: {},
	core: {},
}

bm.Initializer = class {
	constructor() {
		bm.globals = new bm.Globals();
		bm.keys = new bm.Keys();
		bm.utils = new bm.Utils();
		var game = new bm.Game();
		bm.gameInstance = game;
	}
}

bm.initialize = function() {
	var init = new bm.Initializer();
}