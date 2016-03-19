(function (window) {
	var j001 = {
		"id": "jeff",
		"name": "Jeff", 
		"type": "knight", 
		"start_facing": "right", 
		"start_tile": {"x": 4, "y": 4},
		"path": 
		[
			[10, 4], 
			"pause",
			[10, 5],
			[11, 5],
			"pause",
			[13, 5],
			"pause",
			[14, 5], 
			[14, 4], 
			[13, 4], 
			"pause",
		],
		"token_library": {
			units: ["001","001"],
			actions: [
				"ILL003","ILL003","ILL003","ILL004","ILL004",
				"ILL004","ILL001","ILL001","ILL001","ILL005",
				"ILL001","ILL001","ILL002","ILL002","ILL005",
			]
		}
	}
	var j002 = {
		"id": "rosa",
		"name": "Rosa", 
		"type": "knight", 
		"start_facing": "right", 
		"start_tile": {"x": 8, "y": 4},
		"path": 
		[
			[10, 4], 
			"pause",
			[10, 5],
			[11, 5],
			"pause",
			[13, 5],
			"pause",
			[14, 5], 
			[14, 4], 
			[13, 4], 
			"pause",
		],
	}
	var j003 = {
		"id": "tom",
		"name": "Tom", 
		"type": "knight", 
		"start_facing": "right", 
		"start_tile": {"x": 8, "y": 4},
		"path": 
		[
			[12, 4], 
			"pause",
			[12, 12],
			[11, 5],
			"pause",
			[13, 5],
			"pause",
			[14, 5], 
			[14, 4], 
			[13, 4], 
			"pause",
			[12, 12],
			[12, 4], 
		],
	}
	var NPCData = function NPCData(){
		this.getNPCData = function() {
			var npcs = {
				"test00": [],				
				"test01": [j002]
			}
			return npcs;
		}
	}
	window.NPCData = NPCData;
} (window));		
