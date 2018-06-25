bm.maps.MapGraph = class {
	constructor(data) {
		this._vertices = data.vertices;
		this._edges = data.edges;
		this._currentMap = this.getMapFromID(data.startingMapID);
	}

	tick(event) {
		this._currentMap.tick(event);
		bm.gameInstance.player.tick(event);
	}

	getMapFromID(mapID) {
		for (var i = this._vertices.length - 1; i >= 0; i--) {
			if ((this._vertices[i].getMap()._mapID) == mapID) {
				return this._vertices[i].getMap();
			}
		}
	}

	setDestinationID(destinationID) {
		this._destinationID = destinationID;
	}

	getDestinationID() {
		return this._destinationID;
	}

	addPlayer(player) {
		this._currentMap.addPlayer();
	}

	getCurrentMap() {
		return this._currentMap;
	}

	setCurrentMap(map) {
		this._currentMap = map;
		bm.gameInstance.resetMapOnStage();
		return this._currentMap;
	}

	changeMaps(mapID) {
		
	}
}

bm.maps.MapGraphVertex = class {
	constructor(map) {
		this._map = map;
	}

	getMap() {
		return this._map;
	}

	getEdgeData() {
		return this._map._edgeData;
	}
}

bm.maps.MapGraphEdge = class {
	constructor(mapGraphVertexA, mapGraphVertexB) {
		this._mapGraphVertexA = mapGraphVertexA;
		this._mapGraphVertexB = mapGraphVertexB;
	}
}