bm.maps.Tile = class extends bm.ui.Container {
	constructor(tileID) {
		super();
		this.tileID = tileID
		this.setupTile();
		if (this.getBackgroundImage()) {
			this.addToContainer(this.getBackgroundImage())
		}
		this.addToContainer(this.getImage())
	}

	setupTile() {
		this.imageID;
		//this.backgroundID  = "grasstile1";
		this.isFloor = false;
		switch(this.tileID) {
			//~~~~~~~~~~ FOREST 
			case "F_E0000": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				this.isFlat = true;
				break;
			case "F_FLWR0": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				this.isFlat = true;
				this.components = bm.maps.ComponentMaker.getComponents(this.tileID);
				break;
			case "F_FLWR1": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				this.isFlat = true;
				this.components = bm.maps.ComponentMaker.getComponents(this.tileID);
				break;
			case "F_FLWR2": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				this.isFlat = true;
				this.components = bm.maps.ComponentMaker.getComponents(this.tileID);
				break;
			case "F_FLWRR": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				this.isFlat = true;
				this.components = bm.maps.ComponentMaker.getComponents(this.tileID);
				break;
			case "F_N_000": 
				this.imageID = "forest_northwall_0"
				break;
			case "F_N_001": 
				this.imageID = "forest_northwall_1"
				break;
			case "F_S_000": 
				this.imageID = "forest_southwall_0"
				break;
			case "F_E_000": 
				this.imageID = "forest_eastwall_0"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_W_000": 
				this.imageID = "forest_westwall_0"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_NE_CX": 
				this.imageID = "forest_northeast_cx"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_NE_CV": 
				this.imageID = "forest_northeast_cv"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_NW_CX": 
				this.imageID = "forest_northwest_cx"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_NW_CV": 
				this.imageID = "forest_northwest_cv"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_SE_CX": 
				this.imageID = "forest_southeast_cx"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_SE_CV": 
				this.imageID = "forest_southeast_cv"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_SW_CX": 
				this.imageID = "forest_southwest_cx"
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "F_SW_CV": 
				this.imageID = "forest_southwest_cv"
				this.ySortOffset = bm.globals._tileSize;
				break;
			//~~~~~~~~~~ DUTCH CASTLE
			case "D_N_000": 
				this.imageID = "dutch_northwall_0"
				break;
			case "D_N_001": 
				this.imageID = "dutch_northwall_1"
				break;
			case "D_N_002": 
				this.imageID = "dutch_northwall_2"
				break;
			case "D_N_003": 
				this.imageID = "dutch_northwall_3"
				break;
			case "D_G_000": 
				this.imageID = "dutch_gate_0"
				break;
			case "D_G_001": 
				this.imageID = "dutch_gate_1"
				break;
			case "D_G_002": 
				this.imageID = "dutch_gate_2"
				this.backgroundID = "grasstile1"
				break;
			case "D_G_003": 
				this.imageID = "dutch_gate_3"
				this.backgroundID = "grasstile1"
				break;
			case "D_G_004": 
				this.imageID = "dutch_gate_4"
				this.backgroundID = "grasstile1"
				this.backgroundXOffset = bm.globals._tileSize;
				break;
			case "D_G_005": 
				this.imageID = "dutch_gate_5"
				this.isFloor = true;
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "D_G_006": 
				this.imageID = "dutch_gate_6"
				this.isFloor = true;
				this.ySortOffset = bm.globals._tileSize;
				break;
			case "D_G_007": 
				this.imageID = "dutch_gate_7"
				this.backgroundID = "grasstile1"
				this.backgroundXOffset = -bm.globals._tileSize;
				break;
			case "D_G_008": 
				this.imageID = "dutch_gate_8"
				this.backgroundID = "grasstile1"
				break;
			case "D_G_009": 
				this.imageID = "dutch_gate_9"
				this.backgroundID = "grasstile1"
				break;
			case "D_G_010": 
				this.imageID = "dutch_gate_10"
				break;
			case "D_G_011": 
				this.imageID = "dutch_gate_11"
				break;
			case "D_E_000": 
				this.imageID = "dutch_eastwall_0"
				break;
			case "D_W_000": 
				this.imageID = "dutch_westwall_0"
				break;
			case "D_NE_CX": 
				this.imageID = "dutch_northeast_cx"
				break;
			case "D_NW_CX": 
				this.imageID = "dutch_northwest_cx"
				break;
			case "D_SE_CX": 
				this.imageID = "dutch_southeast_cx"
				break;
			case "D_SW_CX": 
				this.imageID = "dutch_southwest_cx"
				break;
		}
		this.image = new createjs.Bitmap(bm.assets.getResult(this.imageID))
		if (this.backgroundID) {
			this.backgroundImage = new createjs.Bitmap(bm.assets.getResult(this.backgroundID))
			if (this.backgroundXOffset) {
				this.backgroundImage.x += this.backgroundXOffset;
			}
		}
		if (!(this.isFlat)) {
			this.image.regY = this.image.getBounds().height - bm.globals._tileSize;
			if (this.image.getBounds().width >  bm.globals._tileSize) {
				this.image.regX = bm.globals._tileSize;
			}
		}
		
		if (bm.globals._debugMode) {	
			var redCircle;
			if (this.isFloor)
				redCircle = new createjs.Graphics().beginFill("red").drawCircle(0,0,1);
			else
				redCircle = new createjs.Graphics().beginFill("blue").drawCircle(0,0,3);
			var regDot = new createjs.Shape(redCircle);
			regDot.x = this.image.regX;
			regDot.y = this.image.regY;
			this.addToContainer(regDot);
		}
	}

	cacheTile() {
		var tileBounds = this.getBounds()
		if (tileBounds)
			this.cache(0,0, tileBounds.width, tileBounds.height)
	}

	getImage() {
		return this.image;
	}

	getGeometry() {
		return false;
	}

	getComponents() {
		return this.components;
	}

	getBackgroundImage() {
		return this.backgroundImage;
	}
}