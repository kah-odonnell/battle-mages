(function (window) {
	var m000 = {
		"id": "test00",
		"title": "The Mad Queen's Sepulcher",
		"subtitle": "",
		"background": "#FFFFFF",
		"starttile": {"x":12,"y":4},
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 83, 82, 82, 82, 81, 81, 81, 86, 83, 82, 81, 81, 81, 81, 86, 83, 81, 81, 81, 81, 81, 81, 86, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 87, 84, 10, 10, 10, 10, 10, 87, 84, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 92, 91, 91, 91, 91, 91, 91, 91, 91, 94, 10, 10, 10, 95, 91, 91, 91, 91, 91, 91, 91, 91, 93, 99, 99],
			[82, 81, 81, 81, 81, 81, 81, 81, 81, 81, 84, 10, 10, 10, 87, 81, 82, 81, 81, 82, 81, 81, 81, 86, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 87, 89, 82],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
		],  
		"maptiles": {
			"defaultHeight": 40,

			"99": "blackTile",
			"0": "snowtile1", //invisible boundary

			"81": "temple_northwall_0",
			"82": "temple_northwall_1",
			"85": "temple_westwall_1",
			"88": "temple_eastwall_1",
			"91": "temple_southwall_1",
			"83": "temple_northwestcorner_concave",
			"86": "temple_northeastcorner_concave",
			"92": "temple_southwestcorner_concave",
			"93": "temple_southeastcorner_concave",
			"95": "temple_northwestcorner_convex",
			"94": "temple_northeastcorner_convex",
			"84": "temple_southeastcorner_convex",
			"87": "temple_southwestcorner_convex",
			"89": "temple_northwall_door",

			"10": "snowtile1",
			"19": "snowtileN",
		},
		"entrances": {
			//"initialize": {"x": 12, "y": 4,}, 
			"unused": {"x": 24, "y": 11, "direction": "south", "offset": null},
		},
		"exits": {
			"unused": {
				a: {
					"x": 24, 
					"y": 11, 
					"isDoor": true,
					"name": "Temple Interior",
				}
			} 
		},
		"footprints": {
			"footprintColor": '#D3EAEA',
			"footprintMax": 30,
			"footprintDelay": 2500,
			"footprintColorIdle": '#C5D8D8',
			"footprintDelayIdle": 5000,
		}
	}

	var m001 = {
		"id": "test01",
		"title": "Forest",
		"subtitle": "Atrium",
		"background": "#005600",
		"starttile": {"x":9,"y":6},
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 82, 99, 99, 99, 99, 99],
			[99, 99, 83, 82, 82, 82, 81, 81, 99, 99, 99, 82, 82, 99, 99, 81, 81, 86, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 82, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 82, 82],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 10, 10, 10, 88, 82, 99],
			[99, 82, 85, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 94, 10, 10, 95, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 94, 10, 10, 95, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
		],
		"maptiles": {
			"defaultHeight": 280,

			"999": "spaceTile",

			"99": "forest_northwall_0",

			"0": "snowtile1",

			"81": "forest_northwall_0",
			"82": "forest_northwall_1",
			"85": "forest_westwall_0",
			"88": "forest_eastwall_0",
			"91": "forest_southwall_0",
			"83": "forest_northwestcorner_concave",
			"86": "forest_northeastcorner_concave",
			"92": "forest_southwestcorner_concave",
			"93": "forest_southeastcorner_concave",
			"95": "forest_northwestcorner_convex",
			"94": "forest_northeastcorner_convex",
			"84": "forest_southeastcorner_convex",
			"87": "forest_southwestcorner_convex",
			"89": "forest_northwall_door",

			"10": "grasstile1",
			"11": "grasstile2",
			"19": "snowtileN",
		},
		"entrances": {
			"initialize": {"x": 6, "y": 6,}, 
			"north_south": {
				"x": 9, "y": 10, "direction": "north", "offset": "east"
			},
		},
		"exits": {
			"north_south": {
				"a": {
					"x": 9, 
					"y": 13, 
					"isDoor": false,
					"name": "Forest - South"
				},
				"b": {
					"x": 10, 
					"y": 13, 
					"isDoor": false,
					"name": "Forest - South"
				},
				"c": {
					"x": 9, 
					"y": 12, 
					"isDoor": false,
					"name": "Forest - South"
				},
				"d": {
					"x": 10, 
					"y": 12, 
					"isDoor": false,
					"name": "Forest - South"
				},
			}
		},
		"footprints": {
			"footprintColor": '#004C00',
			"footprintMax": 30,
			"footprintDelay": 250,
			"footprintColorIdle": '#004C00',
			"footprintDelayIdle": 1000,
		}
	}
	var m002 = {
		"id": "test02",
		"title": "Forest",
		"subtitle": "Atrium",
		"background": "#005600",
		"starttile": {"x":9,"y":6},
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 10, 10, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 83, 82, 82, 82, 81, 81, 84, 10, 10, 87, 99, 82, 99, 81, 81, 86, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
		],
		"maptiles": {
			"defaultHeight": 280,

			"999": "spaceTile",

			"99": "forest_northwall_0",

			"0": "snowtile1",

			"81": "forest_northwall_0",
			"82": "forest_northwall_1",
			"85": "forest_westwall_0",
			"88": "forest_eastwall_0",
			"91": "forest_southwall_0",
			"83": "forest_northwestcorner_concave",
			"86": "forest_northeastcorner_concave",
			"92": "forest_southwestcorner_concave",
			"93": "forest_southeastcorner_concave",
			"95": "forest_northwestcorner_convex",
			"94": "forest_northeastcorner_convex",
			"84": "forest_southeastcorner_convex",
			"87": "forest_southwestcorner_convex",
			"89": "forest_northwall_door",

			"10": "grasstile1",
			"11": "grasstile2",
		},
		"entrances": {
			"initialize": {"x": 6, "y": 6,}, 
			"north_south": {
				"x": 9, "y": 2, "direction": "south", "offset": "east"
			},
		},
		"exits": {
			"north_south": {
				"a": {
					"x": 9, 
					"y": 1, 
					"isDoor": false,
					"name": "Forest - North"
				},
				"b": {
					"x": 9, 
					"y": 0, 
					"isDoor": false,
					"name": "Forest - North"
				},
				"c": {
					"x": 10, 
					"y": 1, 
					"isDoor": false,
					"name": "Forest - North"
				},
				"d": {
					"x": 10, 
					"y": 0, 
					"isDoor": false,
					"name": "Forest - North"
				},
			}
		},
		"footprints": {
			"footprintColor": '#004C00',
			"footprintMax": 30,
			"footprintDelay": 250,
			"footprintColorIdle": '#004C00',
			"footprintDelayIdle": 1000,
		}
	}
	var MapData = function MapData(){
		this.maptostart = "test01";
		this.map_id_list = ["test00", "test01", "test02"]
		this.getMapDataList = function() {
			var maps = [];
			for (var i = this.map_id_list.length - 1; i >= 0; i--) {
				var map = this.getMapData(this.map_id_list[i]);
				maps.push(map);
			}
			return maps;
		}
		this.getMapData = function(index) {
			var m;
			if (index == "test00") m = m000;
			else if (index == "test01") m = m001;
			else if (index == "test02") m = m002;
			else if (index == "test03") m = m003;
			else if (index == "test04") m = m004;
			else console.log("error getting map data: " + index)
			return m;
		}
	}
	window.MapData = MapData;
} (window));		
