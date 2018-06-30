bm.Globals = class {
	constructor() {
		this._loadManifest = [
			{"src":"../imgs/sprites/player.png"}, //"id":"player"
			{"src":"../imgs/tiles/forest/components/redflower.png"},
			{"src":"../imgs/tiles/forest/components/blueflower.png"},
			{"src":"../imgs/tiles/forest/components/whiteflower.png"},
			{"src":"../imgs/tiles/forest/components/bluebonnet.png"},
			{"src":"../imgs/tiles/forest/components/fern.png"},
			{"src":"../imgs/tiles/forest/components/grass.png"},
			{"src":"../imgs/tiles/forest/components/grass2.png"},
			{"src":"../imgs/tiles/forest/components/grass3.png"},
			{"src":"../imgs/tiles/forest/grasstile1.png"},
			{"src":"../imgs/tiles/forest/forest_northwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_northwall_1.png"},
			{"src":"../imgs/tiles/forest/forest_southwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_eastwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_westwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_northeast_cx.png"},
			{"src":"../imgs/tiles/forest/forest_northwest_cx.png"},
			{"src":"../imgs/tiles/forest/forest_southeast_cx.png"},
			{"src":"../imgs/tiles/forest/forest_southwest_cx.png"},
			{"src":"../imgs/tiles/forest/water_tile_0.png"},
			{"src":"../imgs/tiles/forest/water_northwall_0.png"},
			{"src":"../imgs/tiles/forest/water_northwall_1.png"},
			{"src":"../imgs/tiles/forest/water_northwall_2.png"},
			{"src":"../imgs/tiles/forest/water_southwall_0.png"},
			{"src":"../imgs/tiles/forest/water_southwall_1.png"},
			{"src":"../imgs/tiles/forest/water_southwall_2.png"},
			{"src":"../imgs/tiles/forest/water_eastwall_0.png"},
			{"src":"../imgs/tiles/forest/water_westwall_0.png"},
			{"src":"../imgs/tiles/forest/water_northeast_cx.png"},
			{"src":"../imgs/tiles/forest/water_northwest_cx.png"},
			{"src":"../imgs/tiles/forest/water_southeast_cx.png"},
			{"src":"../imgs/tiles/forest/water_southwest_cx.png"},
			{"src":"../imgs/tiles/forest/bridge_0_A.png"},
			{"src":"../imgs/tiles/forest/bridge_0_B.png"},
			{"src":"../imgs/tiles/forest/bridge_1_A.png"},
			{"src":"../imgs/tiles/forest/bridge_1_B.png"},
			{"src":"../imgs/tiles/forest/bridge_1_C.png"},
			{"src":"../imgs/tiles/forest/bridge_1_D.png"},
			{"src":"../imgs/tiles/forest/bridge_2_A.png"},
			{"src":"../imgs/tiles/forest/bridge_2_B.png"},
			{"src":"../imgs/tiles/forest/bridge_2_C.png"},
			{"src":"../imgs/tiles/forest/bridge_2_D.png"},
			{"src":"../imgs/tiles/forest/bridge_3_A.png"},
			{"src":"../imgs/tiles/forest/bridge_3_B.png"},
			{"src":"../imgs/tiles/forest/bridge_3_C.png"},
			{"src":"../imgs/tiles/forest/bridge_3_D.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_0.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_1.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_2.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_3.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_0.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_1.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_2.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_3.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_4.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_5.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_6.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_7.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_8.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_9.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_10.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_gate_11.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_eastwall_0.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_westwall_0.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northeast_cx.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwest_cx.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_southeast_cx.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_southwest_cx.png"},
			{"src":"../imgs/tiles/castle_dutch/city.png"},
		]

		this._uiScale = 2;
		this._pixelScale = 1;
		this._canvasScale = 4;

		this._tileSize = 20;

		this._FPS = 60;

		this._debugMode = false;

		this._canvasWidth = window.innerWidth;
		this._canvasHeight = window.innerHeight;

		this._defaultWidth = window.innerWidth;
		this._defaultHeight = window.innerHeight;

		this._fontSize = {
			big: 33,
			normal: 24,
			small: 18
		}

		this.setLoadManifestIDs();
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
