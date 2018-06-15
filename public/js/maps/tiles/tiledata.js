bm.TileData = class {
	constructor() {
		this.tileIdDictionary = {
			"F_E0000": {
				imagePath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				isFlat: true,
			}, 
			"F_FLWR0": {
				imagePath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				isFlat: true,
				hasComponents: true,
			}, 
			"F_FLWR1": {
				imagePath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				isFlat: true,
				hasComponents: true,
			}, 
			"F_FLWR2": {
				imagePath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				isFlat: true,
				hasComponents: true,
			}, 
			"F_FLWRR": {
				imagePath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				isFlat: true,
				hasComponents: true,
			}, 
			"F_N_000": {
				imagePath: "../imgs/tiles/forest/forest_northwall_0.png",
			}, 
			"F_N_001": {
				imagePath: "../imgs/tiles/forest/forest_northwall_1.png",
			}, 
			"F_S_000": {
				imagePath: "../imgs/tiles/forest/forest_southwall_0.png",
			}, 
			"F_E_000": {
				imagePath: "../imgs/tiles/forest/forest_eastwall_0.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_W_000": {
				imagePath: "../imgs/tiles/forest/forest_westwall_0.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_NE_CX": {
				imagePath: "../imgs/tiles/forest/forest_northeast_cx.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_NE_CV": {
				imagePath: "../imgs/tiles/forest/forest_northeast_cv.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_NW_CX": {
				imagePath: "../imgs/tiles/forest/forest_northwest_cx.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_NW_CV": {
				imagePath: "../imgs/tiles/forest/forest_northwest_cv.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_SE_CX": {
				imagePath: "../imgs/tiles/forest/forest_southeast_cx.png",
				ySortOffset: bm.globals._tileSize,
			}, 
			"F_SE_CV": {
				imagePath: "../imgs/tiles/forest/forest_southeast_cv.png",
				ySortOffset: bm.globals._tileSize,
			},
			"F_SW_CX": {
				imagePath: "../imgs/tiles/forest/forest_southwest_cx.png",
				ySortOffset: bm.globals._tileSize,
			},
			"F_SW_CV": {
				imagePath: "../imgs/tiles/forest/forest_southwest_cv.png",
				ySortOffset: bm.globals._tileSize,	
			},
			//~~~~~~~~~~ FOREST WATER
			"W_E0000": {
				imagePath: "../imgs/tiles/forest/water_tile_0.png",
			},
			"W_N_000": {
				imagePath: "../imgs/tiles/forest/water_northwall_0.png",
			},
			"W_N_001": {
				imagePath: "../imgs/tiles/forest/water_northwall_1.png",
			},
			"W_N_002": {
				imagePath: "../imgs/tiles/forest/water_northwall_2.png",
			},
			"W_S_000": {
				imagePath: "../imgs/tiles/forest/water_southwall_0.png",
			},
			"W_S_001": {
				imagePath: "../imgs/tiles/forest/water_southwall_1.png",
			},
			"W_S_002": {
				imagePath: "../imgs/tiles/forest/water_southwall_2.png",
			},
			"W_E_000": {
				imagePath: "../imgs/tiles/forest/water_eastwall_0.png",
				ySortOffset: bm.globals._tileSize,
			},
			"W_W_000": {
				imagePath: "../imgs/tiles/forest/water_westwall_0.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"W_NE_CX": {
				imagePath: "../imgs/tiles/forest/water_northeast_cx.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"W_NW_CX": {
				imagePath: "../imgs/tiles/forest/water_northwest_cx.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"W_SE_CX": {
				imagePath: "../imgs/tiles/forest/water_southeast_cx.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"W_SW_CX": {
				imagePath: "../imgs/tiles/forest/water_southwest_cx.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_0A": {
				imagePath: "../imgs/tiles/forest/bridge_0_A.png",
				isFloor: true,
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_0B": {
				imagePath: "../imgs/tiles/forest/bridge_0_B.png",
				isFloor: true,
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
				ySortOffset: bm.globals._tileSize,
			},
			"F_BR_1A": {
				imagePath: "../imgs/tiles/forest/bridge_1_A.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_1B": {
				imagePath: "../imgs/tiles/forest/bridge_1_B.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_1C": {
				imagePath: "../imgs/tiles/forest/bridge_1_C.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_1D": {
				imagePath: "../imgs/tiles/forest/bridge_1_D.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_2A": {
				imagePath: "../imgs/tiles/forest/bridge_2_A.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_2B": {
				imagePath: "../imgs/tiles/forest/bridge_2_B.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_2C": {
				imagePath: "../imgs/tiles/forest/bridge_2_C.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_2D": {
				imagePath: "../imgs/tiles/forest/bridge_2_D.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_3A": {
				imagePath: "../imgs/tiles/forest/bridge_3_A.png",
				ySortOffset: bm.globals._tileSize,	
			},
			"F_BR_3B": {
				imagePath: "../imgs/tiles/forest/bridge_3_B.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_3C": {
				imagePath: "../imgs/tiles/forest/bridge_3_C.png",
				isFloor: true,
				isFlat: true,	
			},
			"F_BR_3D": {
				imagePath: "../imgs/tiles/forest/bridge_3_D.png",
				ySortOffset: bm.globals._tileSize,	
			},
			//~~~~~~~~~~ DUTCH CASTLE
			"D_N_000": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northwall_0.png",	
			},
			"D_N_001": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northwall_1.png",	
			},
			"D_N_002": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northwall_2.png",	
			},
			"D_N_003": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northwall_3.png",	
			},
			"D_G_000": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_0.png",
			},
			"D_G_001": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_1.png",
			},
			"D_G_002": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_2.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
			},
			"D_G_003": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_3.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
			},
			"D_G_004": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_4.png",
			},
			"D_G_005": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_5.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				ySortOffset: bm.globals._tileSize,
			},
			"D_G_006": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_6.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
				isFloor: true,
				ySortOffset: bm.globals._tileSize,
			},
			"D_G_007": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_7.png",
			},
			"D_G_008": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_8.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
			},
			"D_G_009": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_9.png",
				backgroundPath: "../imgs/tiles/forest/grasstile1.png",
			},
			"D_G_010": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_10.png",				
			},
			"D_G_011": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_gate_11.png",
			},
			"D_E_000": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_eastwall_0.png",
			},
			"D_W_000": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_westwall_0.png",
			},
			"D_NE_CX": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northeast_cx.png",
			},
			"D_NW_CX": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_northwest_cx.png",
			},
			"D_SE_CX": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_southeast_cx.png",
			},
			"D_SW_CX": {
				imagePath: "../imgs/tiles/castle_dutch/dutch_southwest_cx.png",
			},
		}
		this.addIDs();
	}
		
	addIDs() {
		var tileIDs = Object.keys(this.tileIdDictionary)
		for (var i = 0; i < tileIDs.length; i++) {
			var tileID = tileIDs[i];
			var imagePath = this.tileIdDictionary[tileID].imagePath;
			var backgroundPath = this.tileIdDictionary[tileID].backgroundPath;
			this.tileIdDictionary[tileID].imageID = imagePath.slice(imagePath.lastIndexOf("/") + 1, imagePath.lastIndexOf("."));
			if (backgroundPath) {
				this.tileIdDictionary[tileID].backgroundID = backgroundPath.slice(backgroundPath.lastIndexOf("/") + 1, backgroundPath.lastIndexOf("."));
			}
		}
	}

	addComponents() {
		var tileIDs = Object.keys(this.tileIdDictionary)
		for (var i = 0; i < tileIDs.length; i++) {
			var tileID = tileIDs[i];
			if (this.tileIdDictionary[tileID].hasComponents) {
				this.tileIdDictionary[tileID].components = bm.maps.ComponentMaker.getComponents(tileID);
			}
		}
	}
}