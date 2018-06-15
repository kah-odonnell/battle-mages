bm.maps.Tile = class extends bm.ui.Container {
	constructor(tileID) {
		super();
		this.tileID = tileID
		this.setupTile();
	}

	setupTile() {
		var tileData = bm.gamedata.tiledata.tileIdDictionary[this.tileID];
		this.imageID = tileData.imageID;
		this.backgroundID  = tileData.backgroundID;
		this.isFloor = tileData.isFloor;
		this.isFlat = tileData.isFlat;
		this.ySortOffset = tileData.ySortOffset;
		this.components = bm.maps.ComponentMaker.getComponents(this.tileID);
		this.image = new createjs.Bitmap(bm.assets.getResult(this.imageID));
		if (this.backgroundID) {
			this.backgroundImage = new createjs.Bitmap(bm.assets.getResult(this.backgroundID))
			if (this.backgroundXOffset) {
				this.backgroundImage.x += this.backgroundXOffset;
			}
			if (this.backgroundYOffset) {
				this.backgroundImage.y += this.backgroundYOffset;
			}
		}

		if (!(this.isFlat)) {
			if (this.image.getBounds().height > bm.globals._tileSize) {
				this.image.regY = this.image.getBounds().height - bm.globals._tileSize;
			}
			if (this.image.getBounds().width >  bm.globals._tileSize) {
				this.image.regX = bm.globals._tileSize;
			}
		}

		if (this.ySortOffset) {
			this.image.ySortOffset = this.ySortOffset;
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