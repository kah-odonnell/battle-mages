bm.maps.MapGraphMaker = class {
	static getMapGraph(mapGraphID) {
		var data = {};
		var maps = [];
		data.vertices = [];
		data.edges = [];
		switch(mapGraphID) {
			case "DEMO":
				var mapGraphVertexA = new bm.maps.MapGraphVertex(bm.maps.MapMaker.getMap("NewAmsterdamCreek"));
				var mapGraphVertexB = new bm.maps.MapGraphVertex(bm.maps.MapMaker.getMap("NewAmsterdam"));
				var mapGraphVertexC = new bm.maps.MapGraphVertex(bm.maps.MapMaker.getMap("SouthernForest"));
				var mapGraphEdgeA = new bm.maps.MapGraphEdge(mapGraphVertexA, mapGraphVertexB);
				var mapGraphEdgeB = new bm.maps.MapGraphEdge(mapGraphVertexA, mapGraphVertexC);
				data.vertices = [mapGraphVertexA, mapGraphVertexB, mapGraphVertexC];
				data.edges = [mapGraphEdgeA, mapGraphEdgeB];
				data.startingMapID = "NewAmsterdamCreek";
				break;
		}
		var mapGraph = new bm.maps.MapGraph(data);
		return mapGraph;
	}
}