bm.Globals = class {
	constructor() {
		this._loadManifest = [
			{"src":"../imgs/sprites/player.png"}, //"id":"player"
			{"src":"../imgs/tiles/forest/components/redflower.png"},
			{"src":"../imgs/tiles/forest/components/blueflower.png"},
			{"src":"../imgs/tiles/forest/components/whiteflower.png"},
		]

		this._uiScale = 2;
		this._pixelScale = 1;
		this._canvasScale = 4;

		this._tileSize = 20;

		this._FPS = 60;

		this._debugMode = false;

		this._canvasWidth = window.innerWidth;
		this._canvasHeight = window.innerHeight;

		this._fontSize = {
			big: 33,
			normal: 24,
			small: 18
		}
	}

	completeLoadManifest() {
		this.addTilesToManifest();
	}

	addTilesToManifest() {
		var tileData = bm.gamedata.tiledata.tileIdDictionary;
		var tileIDs = Object.keys(tileData)
		for (var i = 0; i < tileIDs.length; i++) {
			var tileID = tileIDs[i];
			this._loadManifest.push({"src": tileData[tileID].imagePath});
		}
	}

	refreshGlobals() {
	}

	setLoadManifestIDs() {
		for (var i = 0; i < this._loadManifest.length; i++) {
			var src = this._loadManifest[i].src
			this._loadManifest[i].id = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
		}
	}
}
