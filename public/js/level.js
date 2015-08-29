(function (window) {
	var Level = function Level(levelmaps){
		this.initialize(levelmaps);
	}
	var l = Level.prototype = new createjs.Container();
	l.Container_initialize = l.initialize;
	l.initialize = function(levelmaps){
		this.Container_initialize();
		this.paused = false;

		this.maplist = [];
		this.activeprompt = null;
		this.activebattle = null;
		this.isChanging = false;
		this.promptEnabled = true;
		this.npcsPaused = false;

		for (var i = 0; i < levelmaps.length; i++) {
			var currentmap = levelmaps[i];
			this.maplist[i] = new Map(
				currentmap["title"], 
				currentmap["subtitle"], 
				currentmap["maparray"], 
				currentmap["maptiles"], 
				currentmap["entrances"],
				currentmap["exits"],
				this);
			this.getNPCs(currentmap["mapnpcs"], i)
			var initialize = currentmap["entrances"]["initialize"];
			if (!(initialize === undefined)) {
				this.maplist[i].centerOn(initialize["x"],initialize["y"])				
			}
		}
		this.currentmap = 0;
		player = new Player(12, 13);
		map = this.maplist[0];
		map.addChild(player);
		this.addChild(map);
	}
	Level.prototype.addDialog = function(dialoglog) {
		dialog1 = new Dialog(dialoglog, this);
		this.addChild(dialog1);
		this.setChildIndex(dialog1, this.getNumChildren()-1);
		this.currentdialog = dialog1;	
	}
	Level.prototype.getNPCs = function(npcData, mapindex) {
		this.maplist[mapindex].npcs = [];
		for (var i = npcData.length - 1; i >= 0; i--) {
			var newNpc = npcData[i]
			if (newNpc["type"] == "prologueknight") {
				npc = new PrologueKnight(newNpc, this.maplist[mapindex]);
				this.maplist[mapindex].npcs.push(npc);
				this.maplist[mapindex].addChild(npc)
			}
		};
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

