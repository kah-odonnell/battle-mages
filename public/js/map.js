/**
 * map.js
 * 
 * A Map is a Container responsible for building the map visually,
 * storing information on walls and other boundaries,
 * and creating an InteractPrompt (Level.activeprompt) when the player approaches an exit
 *
 * Constructor takes 8 objects:
 *
 * 		// Titles are displayed for a few seconds on init
 * 		title: "Water Temple"
 *		subtitle: "Floor 2"
 *
 *		// Each tile in the map is represented by a two-digit int
 *		array: [
 *			[99, 99, 99, 99, 99, 99]
 *			[99, 99, 99, 99, 99, 99]
 *			[99, 81, 81, 81, 81, 99]
 *			[99, 10, 10, 10, 10, 99]
 *			[99, 10, 10, 10, 10, 99]
 *			[99, 99, 99, 99, 99, 99]
 *		]
 *
 *		// Each two-digit int has an associated tile image loaded in the manifest
 *		tileData: {
 *			"99": "blackTile",
 *			"0": "snowtile1",
 *			"81": "templebackwall0",
 *		}
 *
 *		// When the map changes, move the player to the proper entrance location
 *		entrances: {
 *			"initialize": {"x": 3, "y": 3,}, 
 *			"doorA": {"x": 2, "y": 2, "direction": "south", "offset": null},
 *		}
 *
 *		// On building the map, exit objects are created
 *		// Player proximity to these objects creates a new InteractPrompt
 *		exits: {
 *			"doorA": {
 *				"x": 2, 
 *				"y": 2, 
 *				"isDoor": true,
 *				"name": "Temple Interior",} 
 *		}
 *
		"footprints": {
			"footprintColor": '#D3EAEA',
			"footprintMax": 30,
			"footprintDelay": 2500,
			"footprintColorIdle": '#C5D8D8',
			"footprintDelayIdle": 5000,
		},
 *		levelobject: the level instance
 *
 * A Map is initialized by Level.initialize(),
 * then stored in the list Level.maplist
 *
**/
(function (window) {
	var Map = function Map(title, subtitle, array, tileData, entrances, exits, footprints, levelobject){
		this.hostlevel = levelobject;
		this.INTERACTABLE = {
			DOOR: {value: 0},
			WALKOUT: {value: 1},
			NPC: {value: 2},	
		}
		this.initialize(title, subtitle, array, tileData, entrances, exits, footprints);
	}
	var m = Map.prototype = new createjs.Container();
	m.Container_initialize = m.initialize;
	m.initialize = function(title, subtitle, array, tileData, entrances, exits, footprints){
		this.Container_initialize();
		this.array = array;
		this.entrances = entrances;
		this.exits = exits;
		this.footprints = footprints;
		this.alarm = false;
		this.x = 0;
		this.tileData = tileData;
		this.NWExit = [];
		this.SWExit = [];
		this.NEExit = [];
		this.SEExit = [];

		this.buildMap(array, tileData);
		//this.hostlevel.addDialog(testdialog);
	}

	Map.prototype.notBoundary = function(x, y, direction){
		var tileType;
		var map = this.array;
		var tileX = Math.floor(x/40);
		var tileY = Math.floor(y/40);
		var mapRow = map[tileY];
		if (direction == "right"){
			tileX = Math.floor((x + 10)/40);
			tileType = mapRow[tileX]
		}
		if (direction == "left"){
			tileX = Math.floor((x - 10)/40);
			tileType = mapRow[tileX]
		}
		if (direction == "up"){
			tileY = Math.floor((y - 10)/40);
			tileType = map[tileY][tileX]
		}
		if (direction == "down"){
			tileY = Math.floor((y + 10)/40);
			tileType = map[tileY][tileX]
		}
		if (this.tileFloor(tileType)){
			return true;
		}
		else {
			if (player !== null) {
				if (player.x == x) this.checkExit(tileX, tileY);				
			}
			return false;
		}
	}

	Map.prototype.checkExit = function(tileX, tileY) {
		for (var key in this.exits) {
			if (!this.exits[key]["isDoor"]) {
				if ((this.exits[key]["x"] == tileX) && (this.exits[key]["y"] == tileY)) {
					if (level.activeprompt != null) {
						level.activeprompt.breakdown();
					}
					var mapEventDict = {
						"mapchange": key
					}
					var mapEvent = new MapEvent(mapEventDict);
				}
			}
		}		
	}

	Map.prototype.tileOpen = function(x, y){
		var tileX = Math.floor(x/40);
		var tileY = Math.floor(y/40);
		if ((10 <= this.array[tileY][tileX]) && (this.array[tileY][tileX] <= 29)){
			return true;
		} else {
			return false;
		}
	}

	Map.prototype.tileFloor = function(tileNo){
		if ((10 <= tileNo) && (tileNo <= 29)){
			return true;
		} else {
			return false;
		}
	}

	Map.prototype.buildMap = function(mapArray, tileData) {
		var tileX = 40;
		var tileY = 40;
		var mapHeight = mapArray.length*40;
		var mapWidth = mapArray[0].length*40;
		var alphaBackground = new createjs.Container()
		this.exitObjs = [];
		alphaBackground.uncache();
		for (var y = 0; y <= mapArray.length - 1; y++) {
			var mapRow = mapArray[y];
			for (var x = 0; x <= mapRow.length - 1; x++) {
				var tileNo = mapArray[y][x];
				var newTile;
					if (!(this.tileFloor(tileNo))){
						newTile = new createjs.Bitmap(
							loader.getResult(tileData[tileNo.toString()])
						);
						newTile.x = x*tileX;
						newTile.y = y*tileY + tileY;
						newTile.regY = newTile.getBounds().height;
						if (newTile.getBounds().width > 80) newTile.regX = tileX;
						//The y and regY offset give walls a higher z-index than floors
						this.addChild(newTile);
						newTile.cache(0,0,newTile.getBounds().width, newTile.regY);
					} 
					else {
						newTile = new createjs.Bitmap(
							loader.getResult(tileData[tileNo.toString()])
						);
						newTile.x = x*tileX;
						newTile.y = y*tileY;
						newTile.regY = 0;
						alphaBackground.addChild(newTile);	
					}
					//Create a container for each exit against which we can test proximity
					for (var key in this.exits) {
						if ((x == this.exits[key]["x"]) && (y == this.exits[key]["y"])) {
							var exitObj = new createjs.Container();
							exitObj.routename = key;
							exitObj.formalname = this.exits[key]["name"];
							exitObj.isExit = true;
							exitObj.isDoor = this.exits[key]["isDoor"];
							if (exitObj.isDoor) {
								exitObj.TYPE = this.INTERACTABLE.DOOR;
							} else {
								exitObj.TYPE = this.INTERACTABLE.WALKOUT;
							}
							exitObj.set = [];
							if (!(this.exits[key]["set"] === undefined)) {
								for (var i = 0; i < this.exits[key]["set"].length; i++) {
									for (var j = 0; j < this.exitObjs.length; j++) {
										if (this.exitObjs[j].routename == this.exits[key]["set"][i]) {
											this.exitObjs[j].set.push(exitObj);
											exitObj.set.push(this.exitObjs[j]);
										}
									}
								}
							}
							exitObj.x = x*tileX + 20;
							exitObj.y = y*tileY + 20;
							this.exitObjs.push(exitObj);
						}
					}
			}
		}
		//There are transparent gaps between tiles; fill them with the color of the foundation tile
		var color = '#FFFFFF'
		var shape = new createjs.Shape();
		shape.graphics.beginFill(color).drawRect(0, 0, mapWidth, mapHeight);
		shape.regY = 0;
		shape.y = 0;
		alphaBackground.addChildAt(shape);
		/* Is a lot of small things worse than one big thing? yes
		var city = new createjs.Bitmap(loader.getResult("city"));
		alphaBackground.addChild(city);
		*/
		this.addChild(alphaBackground);
		alphaBackground.cache(0,0, mapWidth, mapHeight)
	}

	Map.prototype.centerOn = function(tileX, tileY, tweenTime) {
		if (tweenTime === undefined) {
			tweenTime = 0;
		}
		var currentX = Math.round(this.x);
		var currentY = Math.round(this.y);
		var goalX = tileX*40 - canvas.width/2 + currentX;
		var goalY = tileY*40 - Math.floor(canvas.height/40)*20 + currentY;
		//Make goalX and goalY products of 20
		var moveDistX = 0;
		var moveDistY = 0;
		var overlap = 0;
		if (!(player === undefined)) {
			overlap = this.getBounds().width - player.x;
			if (overlap > (player.getBounds().width/2)) overlap = 0;
			else overlap = Math.floor(overlap/40)*40;  
		}
		//So long as we dont try to move the map to an X > 0 or more than the furthest left shift:
		while ((goalX - moveDistX >= 0) && (this.getBounds().width - overlap > canvas.width + moveDistX)) {
			if (currentX > goalX) {
				moveDistX -= 20;
			}
			else if (currentX < goalX) {
				moveDistX += 20;
			} else {
				break;
			}
		}
		var defaultHeight = this.tileData.defaultHeight;
		while ((goalY - moveDistY >= 0) && (this.getBounds().height - defaultHeight > canvas.height + moveDistY)) {
			if (currentY > goalY) {
				moveDistY -= 20;
			}
			else if (currentY < goalY) {
				moveDistY += 20;
			} else {
				break;
			}
		}
		var newX = currentX - moveDistX;
		var newY = currentY - moveDistY;
		createjs.Tween.get(this, {loop: false}).to({x:newX,y:newY},tweenTime,createjs.Ease.getPowInOut(4));
	}

	Map.prototype.attemptPrompt = function() {
		if (!(map.alarm) && (!(level.isChanging))) {
			for (var i = 0; i < this.exitObjs.length; i++) {
				var currentObj = this.exitObjs[i];
				if (currentObj.isDoor) this.doorPrompt(currentObj);
				if (currentObj.isExit && !currentObj.isDoor) this.exitPrompt(currentObj);
			}
		}	
	}

	Map.prototype.doorPrompt = function(doorObj) {
		//Proximity based
		var c = Math.sqrt(
			Math.pow(player.x-doorObj.x,2) + 
			Math.pow(player.y-doorObj.y,2)
		);
		if (c <= 40) {
			var mapPromptLog = this.exits[doorObj.routename];
			if (level.activeprompt == null) {
				level.activeprompt = new InteractPrompt(mapPromptLog, doorObj);
			}
			else if ((c < level.activeprompt.getDist()) && !(doorObj === level.activeprompt.obj)){
				level.activeprompt.hardBreakdown()
				level.activeprompt = new InteractPrompt(mapPromptLog, doorObj);		
			}
		}
	}

	Map.prototype.exitPrompt = function(exitObj) {
		//Tile based - disappears when player is not facing the exit 
		//prompt must persist even when the player moves between two distinct exits with the same destination
		var exitData = this.exits[exitObj.routename];
		var inTileY = (player.tileY <= exitData["y"] + 2) && (player.tileY >= exitData["y"] - 2) && (player.tileX == exitData["x"]);
		var inTileX = (player.tileX <= exitData["x"] + 2) && (player.tileX >= exitData["x"] - 2) && (player.tileY == exitData["y"]);
		if (level.activeprompt == null) {
			if ((inTileX || inTileY) && this.isFacing(player, exitObj)) {
				var mapPromptLog = exitData;
				level.activeprompt = new InteractPrompt(mapPromptLog, exitObj);				
			}
		} else {
			if (!(this.isFacing(player,level.activeprompt.obj))) {
				var currentObj = level.activeprompt.obj;
				if (currentObj === exitObj) {
					var hasSet = (exitObj.set.length > 0);
					if ((!(inTileX || inTileY) || !this.isFacing(player,exitObj)) && !hasSet) level.activeprompt.breakdown();
					else if (hasSet) {
						var hasAlternate = false;
						for (var i = 0; i < exitObj.set.length; i++) {
							if (this.isFacing(player,exitObj.set[i])) {
								level.activeprompt.obj = exitObj.set[i];
								hasAlternate = true;
							}
						}
						if (!(hasAlternate)) level.activeprompt.breakdown();
					}			
				}
			}
		} 
	}
	Map.prototype.isFacing = function(player, obj) {
		var isFacing = false;
		if ((player.spriteDirection == player.FACING.UP) && (obj.y < player.y)) {
			isFacing = true;
		} 
		else if ((player.spriteDirection == player.FACING.DOWN) && (obj.y > player.y)) {
			isFacing = true;
		} 
		else if (player.spriteDirection == player.FACING.SIDE) {
			if ((player.scaleX == -1) && (obj.x > player.x)) isFacing = true;
			if ((player.scaleX == 1) && (obj.x < player.x)) isFacing = true;
		}
		return isFacing;
	}
	Map.prototype.tick = function() {
		if (level.promptEnabled) this.attemptPrompt();
	}
	window.Map = Map;
} (window));		