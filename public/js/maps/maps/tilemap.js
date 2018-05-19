bm.maps.TileMap = class extends bm.ui.Container {
	constructor() {
		super()
		this.createTileArrayAndMapContainer();
	}

	createTileArrayAndMapContainer() {
		var yLength = this.getMapArray().length;
		var xLength = this.getMapArray()[0].length;
		this.mapBackground = new bm.ui.Container();
		this.tileArray = new Array(yLength);
		for (var i = this.tileArray.length - 1; i >= 0; i--) {
			this.tileArray[i] = new Array(xLength);
		}
		for (var i = this.getMapArray().length - 1; i >= 0; i--) {
			for (var j = this.getMapArray()[i].length - 1; j >= 0; j--) {
				var tileID= this.getMapArray()[i][j];
				var tile = new bm.maps.Tile(tileID);
				if (tile.isFloor) {
					this.addTileToMapBackground(tile, i, j);
				} else {
					this.addTileToMapContainer(tile, i, j);
				}
				this.addTileToTileArray(tile, i, j);
			}
		}
		this.addToContainer(this.mapBackground)
	}

	cacheMap() {
		var mapBounds = this.getBounds()
		if (mapBounds)
			this.cache(0,0, mapBounds.width, mapBounds.height)
	}

	cacheMapBackground() {
		var backgroundBounds = this.mapBackground.getBounds()
		if (backgroundBounds)
			this.mapBackground.cache(0,0, backgroundBounds.width, backgroundBounds.height)
	}

	addTileToMapContainer(tile, y, x) {
		tile.x = x * bm.globals._tileSize;
		tile.y = y * bm.globals._tileSize
		//var tileBounds = tile.getBounds();
		//tile.cache(0,0,tileBounds.height,tileBounds.width)
		this.addToContainer(tile);
	}


	addTileToMapBackground(tile, y, x) {
		tile.x = x * bm.globals._tileSize;
		tile.y = y * bm.globals._tileSize
		this.addToContainer(tile);
	}

	addTileToTileArray(tile, y, x) {
		this.tileArray[y][x] = tile;
	}

	getBounds() {
		var x = {
			height: this.getMapArray()[0].length*bm.globals._tileSize*bm.globals._canvasScale,
			width: this.getMapArray()[0][0].length*bm.globals._tileSize*bm.globals._canvasScale
		}
		return x;
	}

	tick(event) {
		var sortFunction = function(obj1, obj2, options) {
			var obj1Y = obj1.y
			var obj2Y = obj2.y
			if (!obj1.isFloor && obj1.tileID) obj1Y += bm.globals._tileSize; 
			if (!obj2.isFloor && obj2.tileID) obj2Y += bm.globals._tileSize; 
		    if (obj1Y > obj2Y) { return 1; }
		    if (obj1Y < obj2Y) { return -1; }
		    return 0;
		}
		this.sortChildren(sortFunction);
		bm.gameInstance.player.tick(event);
	}

	addPlayer() {
		this.addToContainer(bm.gameInstance.player);
	}

	recenter() {

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
		if (tile.isFloor){
			return false;
		}
		return true;
	}
}