bm.maps.MapGraph = class {
	constructor() {
		this.generateMaps();
		this.generateExits();
		this.currentMap = this.maps[0];
	}

	tick() {
		this.currentMap.tick();
	}

	addPlayer(player) {
		this.currentMap.addPlayer();
	}

	getCurrentMap() {
		return this.currentMap;
	}
}