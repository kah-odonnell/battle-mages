bm.maps.TileMaker = class {
	static getTile(tileID) {
		var img0 = null; 
		var img1 = null;
		var images = [];
		var attributes = {};
		switch(tileID) {
			case "F_E0000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				attributes.isFloor = true
				break; 
			case "F_FLWR0": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				attributes.isFloor = true
				break; 
			case "F_FLWR1": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				attributes.isFloor = true
				break; 
			case "F_FLWR2": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				attributes.isFloor = true
				break; 
			case "F_FLWRR": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				attributes.isFloor = true
				break; 
			case "F_N_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_N_001": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northwall_1"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_S_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_southwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_E_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_eastwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_W_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_westwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_NE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northeast_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_NE_CV": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northeast_cv"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_NW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northwest_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_NW_CV": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_northwest_cv"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_SE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_southeast_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break; 
			case "F_SE_CV": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_southeast_cv"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break;
			case "F_SW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_southwest_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize
				break;
			case "F_SW_CV": 
				img0 = new createjs.Bitmap(bm.assets.getResult("forest_southwest_cv"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				img0.regX = bm.globals._tileSize;
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "W_E0000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_tile_0"));
				break;
			case "W_N_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_northwall_0"));
				break;
			case "W_N_001": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_northwall_1"));
				break;
			case "W_N_002": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_northwall_2"));
				break;
			case "W_S_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_southwall_0"));
				break;
			case "W_S_001": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_southwall_1"));
				break;
			case "W_S_002": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_southwall_2"));
				break;
			case "W_E_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_eastwall_0"));
				img0.ySortOffset = bm.globals._tileSize
				break;
			case "W_W_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_westwall_0"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "W_NE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_northeast_cx"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "W_NW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_northwest_cx"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "W_SE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_southeast_cx"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "W_SW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("water_southwest_cx"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_0A": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("bridge_0_A"));
				attributes.isFloor = true
				img1.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_0B": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("bridge_0_B"));
				img1.ySortOffset = bm.globals._tileSize;
				attributes.isFloor = true
				break;
			case "F_BR_1A": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_1_A"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_1B": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_1_B"));
				attributes.isFloor = true	
				break;
			case "F_BR_1C": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_1_C"));
				attributes.isFloor = true	
				break;
			case "F_BR_1D": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_1_D"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_2A": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_2_A"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_2B": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_2_B"));
				attributes.isFloor = true	
				break;
			case "F_BR_2C": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_2_C"));
				attributes.isFloor = true	
				break;
			case "F_BR_2D": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_2_D"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_3A": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_3_A"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "F_BR_3B": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_3_B"));
				attributes.isFloor = true	
				break;
			case "F_BR_3C": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_3_C"));
				attributes.isFloor = true	
				break;
			case "F_BR_3D": 
				img0 = new createjs.Bitmap(bm.assets.getResult("bridge_3_D"));
				img0.ySortOffset = bm.globals._tileSize	
				break;
			case "D_N_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_N_001": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northwall_1"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_N_002": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northwall_2"));	
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_N_003": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northwall_3"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_001": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_1"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_C_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("city"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				attributes.isFloor = true
				break;
			case "D_G_002": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_2"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_003": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_3"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_004": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_4"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_005": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_5"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				attributes.isFloor = true
				img1.ySortOffset = bm.globals._tileSize
				break;
			case "D_G_006": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_6"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				attributes.isFloor = true
				img1.ySortOffset = bm.globals._tileSize
				break;
			case "D_G_007": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_7"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_008": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_8"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_009": 
				img0 = new createjs.Bitmap(bm.assets.getResult("grasstile1"));
				img1 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_9"));
				img1.regY = img1.getBounds().height - bm.globals._tileSize;
				break;
			case "D_G_010": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_10"));	
				img0.regY = img0.getBounds().height - bm.globals._tileSize;		
				break;
			case "D_G_011": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_gate_11"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_E_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_eastwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_W_000": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_westwall_0"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_NE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northeast_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_NW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_northwest_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_SE_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_southeast_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
			case "D_SW_CX": 
				img0 = new createjs.Bitmap(bm.assets.getResult("dutch_southwest_cx"));
				img0.regY = img0.getBounds().height - bm.globals._tileSize;
				break;
		}
		var components = bm.maps.ComponentMaker.getComponents(tileID);
		if (img0) images.push(img0);
		if (img1) images.push(img1);
		if (components) {
			for (var i = 0; i < components.length; i++) {
				images.push(components[i]);
			}
		}
		var tile = new bm.maps.Tile(images, attributes, components);
		return tile;
	}
}