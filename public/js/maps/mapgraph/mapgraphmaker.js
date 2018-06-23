bm.maps.MapGraphMaker = class {
	static getMapGraph(mapGraphID) {
		var data = {};
		var maps = [];
		data.vertices = [];
		data.edges = [];
		switch(mapGraphID) {
			case "DEMO":
				var mapGraphVertexA = new bm.maps.MapGraphVertex(bm.maps.MapMaker.getMap("AzuredamCreek"));
				var mapGraphVertexB = new bm.maps.MapGraphVertex(bm.maps.MapMaker.getMap("Azuredam"));
				var mapGraphEdgeA = new bm.maps.MapGraphEdge(mapGraphVertexA, mapGraphVertexB);
				data.vertices = [mapGraphVertexA, mapGraphVertexB];
				data.edges = [mapGraphEdgeA];
				data.startingMapID = "AzuredamCreek";
				break;
		}
		var mapGraph = new bm.maps.MapGraph(data);
		return mapGraph;
	}
}