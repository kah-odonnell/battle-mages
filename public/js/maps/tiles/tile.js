bm.maps.Tile = class extends bm.ui.Container {
	constructor(tileID) {
		super();
		this.tileID = tileID
		this.setupTile();
		//this.addToContainer(this.getBackgroundImage())
		this.addToContainer(this.getImage())
	}

	setupTile() {
		this.imageID;
		//this.backgroundID  = "grasstile1";
		this.isFloor = false;
		switch(this.tileID) {
			case "F_E0000": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				break;
			case "F_FLWR0": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				var flowername = "redflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				var components = [flower1, flower2, flower3, flower4, flower5, flower6];
				this.components = components;
				break;
			case "F_FLWR1": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				var flowername = "whiteflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				var components = [flower1, flower2, flower3, flower4, flower5, flower6];
				this.components = components;
				break;
			case "F_FLWR2": 
				this.imageID = "grasstile1"
				this.isFloor = true;
				var flowername = "blueflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				var components = [flower1, flower2, flower3, flower4, flower5, flower6];
				this.components = components;
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
				break;
			case "F_W_000": 
				this.imageID = "forest_westwall_0"
				break;
			case "F_NE_CX": 
				this.imageID = "forest_northeast_cx"
				break;
			case "F_NE_CV": 
				this.imageID = "forest_northeast_cv"
				break;
			case "F_NW_CX": 
				this.imageID = "forest_northwest_cx"
				break;
			case "F_NW_CV": 
				this.imageID = "forest_northwest_cv"
				break;
			case "F_SE_CX": 
				this.imageID = "forest_southeast_cx"
				break;
			case "F_SE_CV": 
				this.imageID = "forest_southeast_cv"
				break;
			case "F_SW_CX": 
				this.imageID = "forest_southwest_cx"
				break;
			case "F_SW_CV": 
				this.imageID = "forest_southwest_cv"
				break;
		}
		this.image = new createjs.Bitmap(bm.assets.getResult(this.imageID))
		//this.backgroundImage = new createjs.Bitmap(bm.assets.getResult(this.backgroundID))
		//this.backgroundImage.regY = 0;
		if (!(this.isFloor)) {
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