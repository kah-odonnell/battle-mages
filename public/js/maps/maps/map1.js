bm.maps.Map1 = class extends bm.maps.TileMap {
	getMapArray() {
		var array = [
			["F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000"],
			["F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000"],
			["F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000"],
			["F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000", "F_N_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_N_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_NW_CX", "F_NE_CX", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_NW_CX", "F_E0000", "F_SW_CX", "F_SE_CX", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_W_000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E0000", "F_E_000"],
			["F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000"],
			["F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000"],
			["F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000"],
			["F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000", "F_S_000"],
		]
		return array;
	}
	getBounds() {
		var x = {
			height: this.getMapArray().length*bm.globals._tileSize*bm.globals._canvasScale,
			width: this.getMapArray()[0].length*bm.globals._tileSize*bm.globals._canvasScale
		}
		return x;
	}
}