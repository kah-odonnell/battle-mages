(function (window) {
	var m001 = {
		"id": "test00",
		"title": "Forest",
		"subtitle": "",
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
			"sideDoorA": {"x": 24, "y": 11, "direction": "south", "offset": null},
			"sideDoorB": {"x": 24, "y": 11, "direction": "south", "offset": null},
		},
		"exits": {
			"sideDoorA": {
				"x": 24, 
				"y": 11, 
				"isDoor": true,
				"name": "Temple Interior",} 
		},
		"footprints": {
			"footprintColor": '#D3EAEA',
			"footprintMax": 30,
			"footprintDelay": 2500,
			"footprintColorIdle": '#C5D8D8',
			"footprintDelayIdle": 5000,
		}
	}

	var m002 = {
		"id": "test01",
		"title": "The Mad Queen's Sepulcher",
		"subtitle": "Atrium",
		"starttile": {"x":6,"y":6},
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 83, 82, 82, 82, 81, 81, 99, 99, 99, 99, 99, 99, 99, 81, 81, 86, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
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

			"99": "forest_backwall0",
			"91": "forest_reversewall1",
			"92": "forest_reversebottomleft",
			"93": "forest_reversebottomright",
			"94": "forest_reversetopright",
			"95": "forest_reversetopleft",

			"0": "snowtile1",

			"81": "forest_backwall0",
			"82": "forest_backwall1",
			"83": "forest_backcornerL",
			"84": "forest_frontcornerL",
			"85": "forest_leftwall0",
			"86": "forest_backcornerR",
			"87": "forest_frontcornerR",
			"88": "forest_rightwall0",
			"89": "forest_backwalldoor",

			"10": "grasstile1",
			"11": "grasstile2",
			"19": "snowtileN",
		},
		"entrances": {
			"initialize": {"x": 6, "y": 6,}, 
			"sideDoorA": {
				"x": 9, "y": 10, "direction": "north", "offset": "east"
			},
		},
		"exits": {
			"sideDoorA": {
				"x": 9, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Exterior",
				"set": ["sideDoorB", "sideDoorC", "sideDoorD"] },
			"sideDoorB": {
				"x": 10, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Exterior", 
				"set": ["sideDoorA", "sideDoorC", "sideDoorD"] },
			"sideDoorC": {
				"x": 9, 
				"y": 12, 
				"isDoor": false,
				"name": "Temple Exterior",
				"set": ["sideDoorA", "sideDoorB", "sideDoorD"]  },
			"sideDoorD": {
				"x": 10, 
				"y": 12, 
				"isDoor": false,
				"name": "Temple Exterior", 
				"set": ["sideDoorA", "sideDoorB", "sideDoorC"] },
			"sideDoorE": {
				"x": 16, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Sexterior", },
			"sideDoorF": {
				"x": 17, 
				"y": 7, 
				"isDoor": false,
				"name": "Temple Sasdasdexterior", },
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
		this.map_id_list = ["test00", "test01"]
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
			if (index == "test00") m = m001;
			else if (index == "test01") m = m002;
			return m;
		}
	}
	window.MapData = MapData;
} (window));		
