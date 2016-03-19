(function (window) {
	var Level = function Level(gamedata) {
		this.initialize(gamedata);
	}
	var l = Level.prototype = new createjs.Container();
	l.Container_initialize = l.initialize;
	l.initialize = function(gamedata) {
		this.Container_initialize();
		this.gamedata = gamedata;
		this.paused = false;
		var currentmap = gamedata.maps.maptostart;
		var level_maps = gamedata.maps.getMapDataList();
		var level_npcs = gamedata.npcs.getNPCData();
		//the current prompt, if any
		this.activeprompt = null;
		//the current battle, if any
		this.activebattle = null;
		//if were are currently fading in/out upon a map change
		this.isChanging = false;
		//prompts (like press space to enter/talk) are enabled
		this.promptEnabled = true;

		this.npcsPaused = false;
		//generate each map
		this.maplist = []
		for (var i = 0; i < gamedata.maps.map_id_list.length; i++) {
			var m = level_maps[i];
			var map_id = level_maps[i]["id"];
			this.maplist[map_id] = new Map(gamedata.maps.getMapData(map_id));
			//generate all npcs for this map
			this.setNPCs(level_npcs[map_id], map_id);
			var initialize = m["entrances"]["initialize"];
			if (!(initialize === undefined)) {
				this.maplist[map_id].centerOn(initialize["x"],initialize["y"], 0)				
			}
		}
		this.currentmap = currentmap;
		map = this.maplist[this.currentmap];
		this.addChild(map);
	}
	Level.prototype.initPlayer =function() {
		var map = this.maplist[this.currentmap];
		var player = new Player(map.starttile.x, map.starttile.y);
		map.addChild(player);
		//map.centerOn(player.tileX, player.tileY, 3000); 
		//centerOn should only be done by MapEvents post map-init
		return player;
	}
	Level.prototype.addDialog = function(dialoglog) {
		var dialog1 = new Dialog(dialoglog, this);
		this.addChild(dialog1);
		this.setChildIndex(dialog1, this.getNumChildren()-1);
		this.currentdialog = dialog1;	
	}
	Level.prototype.setNPCs = function(npcData, map_id) {
		this.maplist[map_id].npcs = [];
		for (var i = npcData.length - 1; i >= 0; i--) {
			var newNpcData = npcData[i];
			if (newNpcData["type"] == "knight") {
				newNpc = new NPCKnight(newNpcData, this.maplist[map_id]);
				this.maplist[map_id].addChild(newNpc);
				this.maplist[map_id].npcs.push(newNpc);
			}
		}
	}
	Level.prototype.tick = function() {
		if (!(this.npcsPaused)) this.npcsTick();
		if (!(this.isChanging)) {
			if (!(this.paused)){
				if (map != null) map.tick();
				if (player != null) player.tick();
				if ((this.activeprompt != null) && (this.promptEnabled)) this.activeprompt.tick();		
			} else {
				player.getChildAt(0).paused = true;
				if (this.currentdialog !== null) {
					this.currentdialog.tick();
				} 
			}
		}
		if (!(this.activebattle == null)) this.activebattle.tick();
	}
	Level.prototype.delay = function(milliseconds) {
		this.endtime = createjs.Ticker.getTime() + milliseconds;
	}
	Level.prototype.npcsTick = function() {
		if (this.paused || this.isChanging) {
			for (var i = this.maplist[this.currentmap].npcs.length - 1; i >= 0; i--) {
				var currentnpc = this.maplist[this.currentmap].npcs[i]
				currentnpc.getChildAt(0).paused = true;
			}
			this.npcsPaused = true;
			return;
		}
		else if (this.maplist[this.currentmap].npcs !== undefined) {
			for (var i = this.maplist[this.currentmap].npcs.length - 1; i >= 0; i--) {
				var currentnpc = this.maplist[this.currentmap].npcs[i];
				if (currentnpc.isHostile) {
					if (!(map.alarm)) {
						currentnpc.tick();
					} else if (currentnpc.seesPlayer){
						currentnpc.tick();
					}		
				} else {
					if (!(map.alarm)) {
						currentnpc.tick();
					}	
				}
			}
		}
	}
	Level.prototype.changeMaps = function(route, mapIndex) {
		var color = '#000000'
		var curtain = new createjs.Shape();
		curtain.graphics.beginFill(color).drawRect(0, 0, canvas.width, canvas.height);
		curtain.alpha = 0;
		this.curtain = curtain;
		this.addChild(curtain);

		map.removeChild(player)
		player = null;

		this.isChanging = true;
		this.promptEnabled = false;

		//Change level when the curtain is fully black.
		createjs.Tween.get(this.curtain).to({alpha:1},500).call(
			function() {
				var g = level
				g.oldMap = map;
				g.removeChild(map);
				g.currentmap = mapIndex;

				var newMap = g.maplist[mapIndex];
				map = newMap;
				map.x = 0;
				map.y = 0;

				var offsetX = 0;
				var offsetY = 0;
				if (map.entrances[route]["direction"] == "west") offsetX = -1;
				if (map.entrances[route]["direction"] == "east") offsetX = 1;
				if (map.entrances[route]["direction"] == "north") offsetY = -1;
				if (map.entrances[route]["direction"] == "south") offsetY = 1;

				player = new Player(
					map.entrances[route]["x"] + offsetX,
					map.entrances[route]["y"] + offsetY);
				player.y -= offsetY*10; 
				player.x += 3;
				if (map.entrances[route]["offset"] == "west") player.x -= 20;
				if (map.entrances[route]["offset"] == "east") player.x += 20;
				if (map.entrances[route]["offset"] == "north") player.y -= 20;
				if (map.entrances[route]["offset"] == "south") player.y += 20;
				if (map.entrances[route]["direction"] == "west") player.spriteDirection = player.FACING.SIDE;
				if (map.entrances[route]["direction"] == "east") player.spriteDirection = player.FACING.SIDE;
				if (map.entrances[route]["direction"] == "north") player.spriteDirection = player.FACING.UP;
				if (map.entrances[route]["direction"] == "south") player.spriteDirection = player.FACING.DOWN; 
				if (offsetX != 0) player.scaleX = -offsetX;
				player.setIdle();
				var mapchange = true;
				player.makeFootprints(mapchange);
				map.addChild(player);

				g.addChildAt(map, g.getChildIndex(g.oldMap) + 1);				
				map.centerOn(
					newMap.entrances[route]["x"] + offsetX, 
					newMap.entrances[route]["y"] + offsetY)
				createjs.Tween.get(g.curtain).to({alpha:0},500).call(
					function() {
						var g = level;
						g.isChanging = false;
						g.unpause();
						setTimeout(function() {
							g.promptEnabled = true;
						}, 500);
						g.removeChild(g.oldMap);
					}
				);
			}
		);
	}
	Level.prototype.unpause = function() {
		player.getChildAt(0).paused = false;
		//if (!(this.maplist[this.currentmap].npcs == null)) {

		for (var i = 0; i < this.maplist[this.currentmap].npcs.length; i++) {
			var currentnpc = this.maplist[this.currentmap].npcs[i];
			for (var j = 0; j < currentnpc.numChildren; j++) {
				currentnpc.getChildAt(j).paused = false;					
			}
		}
		this.npcsPaused = false;
		//}	
	}

	Level.prototype.pauseOtherNPCs = function(npc) {
		for (var i = 0; i < this.maplist[this.currentmap].npcs.length; i++) {
			var currentnpc = this.maplist[this.currentmap].npcs[i];
			if (npc != currentnpc) {
				for (var j = 0; j < currentnpc.numChildren; j++) {
					currentnpc.getChildAt(j).paused = true;					
				}				
			}
		}
		//}	
	}
	window.Level = Level;
} (window));		

