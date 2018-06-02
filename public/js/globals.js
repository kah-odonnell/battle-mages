bm.Globals = class {
	constructor() {
		this._loadManifest = [
			{"src":"../imgs/sprites/player.png"}, //"id":"player"
			{"src":"../imgs/tiles/forest/grasstile1.png"},
			{"src":"../imgs/tiles/forest/forest_northwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_northwall_1.png"},
			{"src":"../imgs/tiles/forest/forest_southwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_eastwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_westwall_0.png"},
			{"src":"../imgs/tiles/forest/forest_northeast_cx.png"},
			{"src":"../imgs/tiles/forest/forest_northeast_cv.png"},
			{"src":"../imgs/tiles/forest/forest_northwest_cx.png"},
			{"src":"../imgs/tiles/forest/forest_northwest_cv.png"},
			{"src":"../imgs/tiles/forest/forest_southeast_cx.png"},
			{"src":"../imgs/tiles/forest/forest_southeast_cv.png"},
			{"src":"../imgs/tiles/forest/forest_southwest_cx.png"},
			{"src":"../imgs/tiles/forest/forest_southwest_cv.png"},
			{"src":"../imgs/tiles/forest/components/redflower.png"},
			{"src":"../imgs/tiles/forest/components/blueflower.png"},
			{"src":"../imgs/tiles/forest/components/whiteflower.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_0.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_1.png"},
			{"src":"../imgs/tiles/castle_dutch/dutch_northwall_2.png"},
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
		]
		this.setLoadManifestIDs();

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

	refreshGlobals() {
	}

	setLoadManifestIDs() {
		for (var i = this._loadManifest.length - 1; i >= 0; i--) {
			var src = this._loadManifest[i].src
			this._loadManifest[i].id = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
		}
	}
}
