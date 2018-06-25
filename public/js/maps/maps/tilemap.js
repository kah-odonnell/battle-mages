bm.maps.TileMap = class extends bm.core.Container {
	constructor(data) {
		super()
		this._mapArray = data.mapArray;
		this._mapID = data.mapID;
		this._mapTitle = data.mapTitle;
		this._edgesData = data.edgesData;
		this.setPromptLocations();
		this.createTileArrayAndMapContainer();
		//this.cacheMapBackground();
	}

	tick(event) {
		var sortFunction = function(obj1, obj2, options) {
			var obj1Y = obj1.y
			var obj2Y = obj2.y
			if (obj1.ySortOffset) {
				obj1Y += obj1.ySortOffset; 
			}
			if (obj2.ySortOffset) obj2Y += obj2.ySortOffset;
			if (obj1Y == obj2Y) {
				if (obj1.x > obj2.x) { return 1; }
				if (obj1.x < obj2.x) { return -1; }
				return 0;
			} 
		    if (obj1Y > obj2Y) { return 1; }
		    if (obj1Y < obj2Y) { return -1; }
		    return 0;
		}
		this.sortChildren(sortFunction);
	}

	setPromptLocations() {
		var edgesData = this._edgesData;
		for (var n = 0; n < edgesData.length; n++) {
			var edgeData = edgesData[n];
			var promptLocations = [];
			var promptRadius = edgeData.promptRadius;
			var exits = edgeData.locations;
			for (var k = 0; k < exits.length; k++) {
				var exitCoords = exits[k];
				for (var i = -promptRadius; i < promptRadius; i++) {
					for (var j = -promptRadius; j < promptRadius; j++) {
						var coords = [exitCoords[0]-i, exitCoords[1]-j];
						if (!(JSON.stringify(promptLocations).includes(JSON.stringify(coords)))) {
							promptLocations.push(coords);
						}
					}
				}
			}
			this._edgesData[n].promptLocations = promptLocations;
		}
	}

	//the tileArray is a 2D array containing the tiles, so tile data can be looked up
	//the mapContainer contains the images from the tiles, and eventually the player and npcs
	createTileArrayAndMapContainer() {
		var yLength = this.getMapArray().length;
		var xLength = this.getMapArray()[0].length;
		this.tileArray = new Array(yLength);
		for (var i = this.tileArray.length - 1; i >= 0; i--) {
			this.tileArray[i] = new Array(xLength);
		}
		for (var i = this.getMapArray().length - 1; i >= 0; i--) {
			for (var j = this.getMapArray()[i].length - 1; j >= 0; j--) {
				var tileID= this.getMapArray()[i][j];
				var tile = bm.maps.TileMaker.getTile(tileID);
				this.addTileToMapContainer(tile, i, j);
				this.addTileToTileArray(tile, i, j);
			}
		}
	}

	cacheMap() {
		var mapBounds = this.getBounds()
		if (mapBounds)
			this.cache(0,0, mapBounds.width, mapBounds.height)
	}

	addTileToMapContainer(tile, y, x) {
		tile.x = x * bm.globals._tileSize;
		tile.y = y * bm.globals._tileSize;
		var tileImages = tile.getImages();
		for (var i = 0; i < tileImages.length; i++) {
			var image = tileImages[i];
			image.x = tile.x + image.x;
			image.y = tile.y + image.y;
			this.addToContainer(image)
		}
	}

	addTileToTileArray(tile, y, x) {
		this.tileArray[y][x] = tile;
	}

	getMapArray() {
		return this._mapArray;
	}

	getBounds() {
		if (!this.xLength || !this.yLength) {
			this.yLength = Object.create({obj: this.getMapArray().length}).obj;
			this.xLength = Object.create({obj: this.getMapArray()[0].length}).obj;
		}
		if (!this.bounds) {
			this.bounds = {
				height: this.yLength*bm.globals._tileSize*bm.globals._canvasScale,
				width: this.xLength*bm.globals._tileSize*bm.globals._canvasScale
			}
		}
		return this.bounds;
	}

	addPlayer() {
		this.addToContainer(bm.gameInstance.player);
	}

	removePlayer() {
		this.removeChild(bm.gameInstance.player);
	}

	centerOn(obj, tweenTime) {
		if (tweenTime === undefined) {
			tweenTime = 0;
		}
		var currentX = Math.round(this.x);
		var currentY = Math.round(this.y);
		var goalX = obj.x - canvas.width/2 + currentX;
		var goalY = obj.y - canvas.height/2 + currentY;
		var newX = -(obj.x - (canvas.width/2)/(bm.globals._canvasScale*bm.globals._pixelScale));
		var newY = -(obj.y - (canvas.height/2)/(bm.globals._canvasScale*bm.globals._pixelScale));
		if (newY > 0) newY = 0;
		if (newY < (canvas.height)/(bm.globals._canvasScale*bm.globals._pixelScale) - this.getBounds().height/(bm.globals._canvasScale*bm.globals._pixelScale)) {
			newY = (canvas.height)/(bm.globals._canvasScale*bm.globals._pixelScale) - this.getBounds().height/(bm.globals._canvasScale*bm.globals._pixelScale);
		}
		createjs.Tween.get(this, {loop: false}).to({x: newX,y: newY},tweenTime,createjs.Ease.getPowInOut(4));
	}

	isBoundary(x, y, direction) {
		var tile;
		var tileArray = this.tileArray;
		var tileX = Math.floor(x/bm.globals._tileSize);
		var tileY = Math.floor(y/bm.globals._tileSize);
		if (direction == "right"){
			tileX = Math.floor((x + bm.globals._tileSize/4)/bm.globals._tileSize);
		}
		if (direction == "left"){
			tileX = Math.floor((x - bm.globals._tileSize/4)/bm.globals._tileSize);
		}
		if (direction == "up"){
			tileY = Math.floor((y - bm.globals._tileSize/4)/bm.globals._tileSize);
		}
		if (direction == "down"){
			tileY = Math.floor((y + bm.globals._tileSize/4)/bm.globals._tileSize);
		}
		tile = this.tileArray[tileY][tileX];
		if (tile._attributes.isFloor){
			return false;
		}
		return true;
	}

	getNearbyExits(tileX, tileY) {
		var exits = [];
		var edgesData = this._edgesData;
		for (var i = 0; i < edgesData.length; i++) {
			var edgeData = edgesData[i];
			var currentCoords = [tileX, tileY];
			if (JSON.stringify(edgeData.locations).includes(JSON.stringify(currentCoords))) {
				exits.push(edgeData);
			}
			if (JSON.stringify(edgeData.promptLocations).includes(JSON.stringify(currentCoords))) {
				exits.push(edgeData);
			}
		}
		return exits;
	}

	isExit(tileX, tileY) {
		var edgesData = this._edgesData;
		for (var i = 0; i < edgesData.length; i++) {
			var edgeData = edgesData[i];
			var currentCoords = [tileX, tileY];
			if (JSON.stringify(edgeData.locations).includes(JSON.stringify(currentCoords))) {
				return true;
			}
		}
		return false;
	}
}