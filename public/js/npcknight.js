/**
 * NPCKnight.js
 * 
 * An npc exclusive to the prologue
 *
 * Constructor takes a dictionary (retrieved from the global leveldata variable by Level.initialize) 
 * containing this npc's DNA - name, path, personality, interaction dialog, and, 
 * since hostile, opening/closing battle remarks and battle library information.
 * Other details of the NPCKnight are hardcoded in the constructor.
 *
 * A NPCKnight is initialized by Level.getNPCs(),
 * then stored in the list Level.maplist[mapindex].npcs
 *
**/

(function (window) {
	var NPCKnight = function(npc_data, host_map){
		this.initialize(npc_data, host_map);
	}
	var g = NPCKnight.prototype = new createjs.Container();
	g.Container_initialize = g.initialize;
	g.initialize = function(npc_data, host_map) {
		this.Container_initialize();
		this.npc_id = npc_data.id;
		this.name = npc_data.name;
		this.formalname = this.name;
		this.x = npc_data.start_tile.x*40 + 20;
		this.y = npc_data.start_tile.y*40 + 20;
		this.path = npc_data.path;
		this.host_map = host_map;

		this.battleStartDialogScript = gamedata.dialogs.getDialogData(this.npc_id, "battle_start");
		this.battleEndDialogScript = gamedata.dialogs.getDialogData(this.npc_id, "battle_end");
		this.interactDialogScript = gamedata.dialogs.getDialogData(this.npc_id, "interact");
		this.battleLibrary = npc_data.token_library;

		this.TYPE = host_map.INTERACTABLE.NPC;
		//this npc will battle the opponent if true
		this.isHostile = true;
		//this npc has been beaten
		this.isBeaten = false;
		this.hasPaused = false;
		//this npc iterates through its path, a list of coordinates
		//currentPath is the current index of the path 
		this.currentPath = 0;
		this.scaleX = (this.start_facing == "left")*2 - 1;
		this.paused = false;
		this.xVelocity = 1;
		this.yVelocity = 1;
		this.offsetX; this.offsetY;
		this.tileX; this.tileY;
		this.targetX; this.targetY;
		this.direction;
		this.seesPlayer = false;

		this.footprintData = host_map.footprints;
		this.footprintCounter = 0;
		this.footprintArray = []
		this.hasIdleFootprints = false;
		this.FACING = {
			SIDE: {xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
			UP: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 2, movingOffset: 0},
			DOWN: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0}
		}
		this.spriteDirection = this.FACING.SIDE;
		this.currentAnimation;
		this.doubleKeys = false;

		this.isMoving = false;
		this.isMovingX = false;
		var scale = 2;
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("knight")],
			"frames": {
				"width": 50*scale, 
				"height": 46*scale, 
				"count": 36, 
				"regX": 46, 
				"regY": 92
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idleSide": [0, 1, "idleSide", .05], 
				"idleUp": [25, 25, "idleUp", .05], 
				"idleDown": [12, 14, "idleDown", .05], 
				"runSide": [2, 10, "runSide", 1],
				"runUp": [26, 35, "runUp", 2],
				"runDown": [15, 24, "runDown", 2]
			},
			"framerate": 10
		});
		this.sprite = new createjs.Sprite(data);
		this.addChild(this.sprite);

		this.scanner = new Scanner(this, host_map);
		this.chaseReady; this.bestX; this.bestY;
		host_map.addChild(this.scanner);

		this.setIdle();
	}
	NPCKnight.prototype.tick = function() {
		this.tileX = Math.floor(this.x/40);
		this.tileY = Math.floor(this.y/40);

		if (!this.isBeaten) {
			if (this.isHostile) {
				if (!(this.paused) && !(this.seesPlayer)){
					this.patrol();
				}
				else if (this.seesPlayer && (level.activebattle == null)) {
					this.initiateBattle();
				}			
			} else {
				if (!(this.paused) && !(map.alarm)) {
					this.patrol();
				} 
			}
			if (!(map.alarm)) this.scanner.tick(this.tileX, this.tileY);


			if (this.footprintCounter == 0) {
				this.footprintCounter++;
			}
			else if (this.footprintCounter == 60*this.xVelocity) {
				this.footprintCounter = 0;
			} 
			else {
				this.footprintCounter++;			
			}
			if (this.footprintArray.length > this.footprintData.footprintMax) {
				map.removeChild(this.footprintArray[0]);
				this.footprintArray.shift()					
			}
			if (this.footprintCounter % 12 == 0) {
				this.hasIdleFootprints = false;
			}
			this.makeFootprints();
		}
		this.attemptPrompt();
	}
	NPCKnight.prototype.attemptPrompt = function() {
		if (!(map.alarm) && (level.promptEnabled)) {
			var c = Math.sqrt(Math.pow(player.x-this.x,2)+Math.pow(player.y-this.y,2));
			if ((c <= 40)) {
				var PromptLog; 
				if (!this.isHostile) PromptLog = this.interactDialogScript;
				else if (this.isHostile && this.isBeaten) PromptLog = this.battleEndDialogScript;
				else if (this.isHostile && !this.isBeaten) PromptLog = this.battleStartDialogScript;
				if (level.activeprompt == null) {
					level.activeprompt = new InteractPrompt(PromptLog, this);
				}
				else if ((c < level.activeprompt.getDist()) && !(this === level.activeprompt.obj)){
					level.activeprompt.hardBreakdown()
					level.activeprompt = new InteractPrompt(PromptLog, this);		
				}
			}
		} else {
			if (level.activeprompt != null) {
				level.activeprompt.breakdown();
			}
		}		
	}
	NPCKnight.prototype.setIdle = function() {
		this.isMoving = false;
		this.isMovingX = false;
		if (this.spriteDirection == this.FACING.SIDE) {
			var anim = "idleSide";
			if (this.currentAnimation != anim) {
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
		if (this.spriteDirection == this.FACING.UP) {
			var anim = "idleUp";
			if (this.currentAnimation != anim) {
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
		if (this.spriteDirection == this.FACING.DOWN) {
			var anim = "idleDown";
			if (this.currentAnimation != anim) {
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
	}
	NPCKnight.prototype.setRun = function() {
		this.isMoving = true;
		this.hasIdleFootprints = false;
		if (this.spriteDirection == this.FACING.SIDE) {
			this.isMovingX = true;
			var anim = "runSide";
			if (this.currentAnimation != anim) {
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
		if (this.spriteDirection == this.FACING.UP) {
			var anim = "runUp";
			if ((this.currentAnimation != anim) && (!this.doubleKeys)) {
				this.isMovingX = false;
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
		if (this.spriteDirection == this.FACING.DOWN) {
			var anim = "runDown";
			if ((this.currentAnimation != anim) && (!this.doubleKeys)) {
				this.isMovingX = false;
				this.sprite.gotoAndPlay(anim);
				this.currentAnimation = anim;
			}
		}
	}
	NPCKnight.prototype.move = function(){
		this.setRun();
	}
	NPCKnight.prototype.makeFootprints = function(mapchange){
		var footprintInterval = 10;

		//if moving, attempt to create a footprint
		if (this.isMoving) {
			//every 'footprintInterval' number of ticks, make a new footprint
			if (this.footprintCounter % footprintInterval == 0) {
				var color = this.footprintData.footprintColor;
				var duration = this.footprintData.footprintDelay;

				var shape = new createjs.Shape();
				shape.graphics.beginFill(color).drawCircle(0, 0, 4);
				shape.regY = -6
				//if footprintCounter is an even multiple of footprintInterval, the created footprint will be offset south
				//set X and Y of the south footprint (West/East determined mathematically)
				if (this.footprintCounter % (2*footprintInterval) == 0){
					shape.x = (
						this.x + 
						this.scaleX*(
							this.spriteDirection.xFootWidth/4 - 7 + 
							this.xVelocity/2 + 
							this.spriteDirection.xOffset + 
							this.isMovingX*(this.spriteDirection.movingOffset - 6)
						)
					);
					shape.y = (
						this.y - 1 + 
						this.spriteDirection.yFootWidth + 
						shape.regY + 
						this.spriteDirection.yOffset/2
					);
				//else: if footprintCounter is an odd multiple of footprintInterval, the created footprint will be offset north
				//set X and Y of the north footprint (West/East determined mathematically)
				} else {
					shape.x = (
						this.x + 
						this.scaleX*(
							this.spriteDirection.xFootWidth/4 + 1 + 
							this.xVelocity/2 + 
							this.spriteDirection.xOffset -
							this.isMovingX*(this.spriteDirection.movingOffset + 2)
						)
					);
					shape.y = (
						this.y - 1 + 
						shape.regY - 
						this.spriteDirection.yOffset
					);
				}
				this.footprintArray.push(shape);

				//Add fade out for footprint
				createjs.Tween.get(
					this.footprintArray[this.footprintArray.length - 1]
				).to(
					{alpha:0,visible:false}, duration
				);

				map.addChild(this.footprintArray[this.footprintArray.length - 1])
			}					
		} 
		//if "idle" footprints havent been generated since this object became idle, create both footprints
		if ((!(this.isMoving) && !(this.hasIdleFootprints)) || mapchange) {
			var color = this.footprintData.footprintColorIdle;
			var duration = this.footprintData.footprintDelayIdle;

			//south footprint appearance
			var shape1 = new createjs.Shape();
			shape1.graphics.beginFill(color).drawCircle(0, 0, 4);
			shape1.regY = -4
			//south footprint - X and Y Position
			if (this.spriteDirection == this.FACING.SIDE) {
				shape1.x = this.x + this.scaleX*(
					this.spriteDirection.xFootWidth/4 + 4 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
				shape1.y = (
					this.y - 2 +
					this.spriteDirection.yFootWidth + 
					shape1.regY + 
					this.spriteDirection.yOffset/2
				);
			}
			else {
				shape1.x = this.x + this.scaleX*(
					this.spriteDirection.xFootWidth/4 + 1 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
				shape1.y = (
					this.y - 1 + 
					this.spriteDirection.yFootWidth + 
					shape1.regY + 
					this.spriteDirection.yOffset/2
				);
			}
			//Add south footprint to our footprintArray and begin to fade out
			this.footprintArray.push(shape1);
			createjs.Tween.get(
				this.footprintArray[this.footprintArray.length - 1]
			).to(
				{alpha:0,visible:false}, duration
			);
			//Add south footprint to map container
			map.addChild(this.footprintArray[this.footprintArray.length - 1])

			//north footprint appearance
			var shape2 = new createjs.Shape();
			shape2.graphics.beginFill(color).drawCircle(0, 0, 4);
			shape2.regY = -5;
			//north footprint - X Position
			if (this.spriteDirection == this.FACING.SIDE) {
				shape2.x = this.x + this.scaleX*(
					this.spriteDirection.xFootWidth/4 - 6 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
			}
			else {
				shape2.x = this.x + this.scaleX*(
					this.spriteDirection.xFootWidth/4 - 7 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
			}
			//north footprint - Y Position
			shape2.y = (
				this.y - 1 + 
				shape2.regY - 
				this.spriteDirection.yOffset
			);
			//Add north footprint to our footprintArray and begin to fade out
			this.footprintArray.push(shape2);
			createjs.Tween.get(
				this.footprintArray[this.footprintArray.length - 1]
			).to(
				{alpha:0,visible:false}, duration
			);
			//Add north footprint to map container
			map.addChild(this.footprintArray[this.footprintArray.length - 1])
			this.hasIdleFootprints = true;

			if (mapchange) {
				for (var i = 0; i < 4; i++) {
					var shape3 = new createjs.Shape();
					shape3.graphics.beginFill(color).drawCircle(0, 0, 4);
					shape3.regY = -4
					shape3.x = shape1.x;
					shape3.y = shape1.y;

					this.footprintArray.push(shape3);
					createjs.Tween.get(
						this.footprintArray[this.footprintArray.length - 1]
					).to(
						{alpha:0,visible:false}, duration
					);
					map.addChild(this.footprintArray[this.footprintArray.length - 1])

					var shape4 = new createjs.Shape();
					shape4.graphics.beginFill(color).drawCircle(0, 0, 4);
					shape4.regY = -5
					shape4.x = shape2.x;
					shape4.y = shape2.y;

					this.footprintArray.push(shape4);
					createjs.Tween.get(
						this.footprintArray[this.footprintArray.length - 1]
					).to(
						{alpha:0,visible:false}, duration
					);
					map.addChild(this.footprintArray[this.footprintArray.length - 1])
				}
			}
		}
	}
	NPCKnight.prototype.nextPath = function() {
		if (this.currentPath < (this.path.length - 1)){
			this.currentPath++;
		} else {
			this.currentPath = 0;
		}
	}
	NPCKnight.prototype.patrol = function(){
		if (this.path[this.currentPath] != "pause"){
			this.paused = false;
			this.moveTo(
				this.path[this.currentPath][0],
				this.path[this.currentPath][1]
			);
		} else {
			var g = this;
			g.paused = true;
			setTimeout(function(){
				g.paused = false;
			}, 2000)
			this.nextPath();
		}
	}
	// not relevant to non-hostile npcs
	NPCKnight.prototype.chase = function(){
		if (!(this.paused)) {
		if (this.chaseReady == true){
			var tileSet = []
			if (this.direction == "west") {
				if (map.tileOpen(this.x - 40, this.y)) {
					tileSet.push([this.x - 40, this.y])
				} 
				if (map.tileOpen(this.x, this.y + 40)) {
					tileSet.push([this.x, this.y + 40])
				} 
				if (map.tileOpen(this.x, this.y - 40)) {
					tileSet.push([this.x, this.y - 40])
				} 
			}
			else if (this.direction == "east") {
				if (map.tileOpen(this.x + 40, this.y)) {
					tileSet.push([this.x + 40, this.y])
				} 
				if (map.tileOpen(this.x, this.y + 40)) {
					tileSet.push([this.x, this.y + 40])
				} 
				if (map.tileOpen(this.x, this.y - 40)) {
					tileSet.push([this.x, this.y - 40])
				} 
			}
			else if (this.direction == "south") {
				if (map.tileOpen(this.x + 40, this.y)) {
					tileSet.push([this.x + 40, this.y])
				} 
				if (map.tileOpen(this.x - 40, this.y)) {
					tileSet.push([this.x - 40, this.y])
				} 
				if (map.tileOpen(this.x, this.y + 40)) {
					tileSet.push([this.x, this.y + 40])
				} 
			}
			else if (this.direction == "north") {
				if (map.tileOpen(this.x + 40, this.y)) {
					tileSet.push([this.x + 40, this.y])
				} 
				if (map.tileOpen(this.x - 40, this.y)) {
					tileSet.push([this.x - 40, this.y])
				} 
				if (map.tileOpen(this.x, this.y - 40)) {
					tileSet.push([this.x, this.y - 40])
				} 
			}
			this.setTarget();
			var best = 99999;
			for (var i = tileSet.length - 1; i >= 0; i--) {
				var xDist = this.targetX - ((tileSet[i][0]));
				var yDist = this.targetY - ((tileSet[i][1]));
				var dist = Math.sqrt(xDist*xDist + yDist*yDist);
				if (dist <= best){
					best = dist;
					this.bestX = Math.floor(tileSet[i][0]/40);
					this.bestY = Math.floor(tileSet[i][1]/40);
				}
			}
			this.chaseReady = false;
		}
		if (this.chaseReady == false) {
			this.moveTo(this.bestX, this.bestY);
		}
		}
	}

	NPCKnight.prototype.initiateBattle = function(){
		this.xVelocity = 1.5;
		this.yVelocity = 1.25;
		if (this.hasPaused == true) {
			var c = Math.sqrt(Math.pow(player.x-this.x,2)+Math.pow(player.y-this.y,2));
			//console.log((player.x-this.x) + "," + (player.y-this.y) + ":" + c)
			if (c >= 30) {
				this.chase();
			} else {
		 		this.setIdle();
				level.addDialog(this.battleStartDialogScript);
			}
		} else {
			this.setIdle();
			if (this.alertContainer == null) {
				this.alertContainer = new createjs.Container();
				for (var i = 0; i < 8; i++) {
					var actiontext = new createjs.Text("!", "32px crazycreation", "#000000");
					//actiontext.shadow = new createjs.Shadow("#FFFF00", 0, 0, 8);
					this.alertContainer.addChild(actiontext);			
				}
				this.alertContainer.x += 20;
				this.alertContainer.y -= 80;
				this.alertContainer.alpha = 0;	
				this.addChild(this.alertContainer);
				createjs.Tween.get(this.alertContainer).to({alpha:1},50)
			}
			var g = this;
			setTimeout(function(){
				if (g.alertContainer != null) {
					createjs.Tween.get(g.alertContainer).to({alpha:0},200).call(function () {
						g.removeChild(g.alertContainer); g.alertContainer = null;
					});
				}
				g.hasPaused = true;
			}, 1000)
		}
	}

	NPCKnight.prototype.randDirection = function(){
		var direction = Math.floor((Math.random()*4)+1)
		if (direction == 1) this.direction = "west";
		if (direction == 2) this.direction = "east";
		if (direction == 3) this.direction = "north";
		if (direction == 4) this.direction = "south";
	}

	NPCKnight.prototype.setTarget = function(){
		var targetX = player.x;
		var targetY = player.y;
		if (Math.abs(this.x - targetX) > 720) {
			var NWExitX = map.NWExit[0]*40 + 20;
			var SWExitX = map.SWExit[0]*40 + 20;
			var NEExitX = map.NEExit[0]*40 + 20;
			var SEExitX = map.SEExit[0]*40 + 20;
			var NWExitY = map.NWExit[1]*40 + 20;
			var SWExitY = map.SWExit[1]*40 + 20;
			var NEExitY = map.NEExit[1]*40 + 20;
			var SEExitY = map.SEExit[1]*40 + 20;
			if (signOf(this.x - targetX) == 1) {
				targetX = NEExitX;
				targetY = NEExitY;
			}
			else if (signOf(this.x - targetX) == -1) {
				targetX = NWExitX;
				targetY = NWExitY;
			}
		}
		this.targetX = targetX;
		this.targetY = targetY;
	}

	NPCKnight.prototype.moveTo = function(tileX, tileY) {
		var xTrue, yTrue;
		if ((Math.floor((this.x/40) + this.offsetX)) != tileX) {
			xTrue = false;
			if (signOf(this.x - ((tileX*40) + 20)) == -1){
				this.offsetX = -.3;
				this.moveRight();
			} else {
				this.offsetX = .3;
				this.moveLeft();
			}
		} else {
			xTrue = true;
		}
		if ((Math.floor((this.y/40) + this.offsetY)) != tileY) {
			yTrue = false;
			if (signOf(this.y - ((tileY*40) + 20)) == 1){
				this.offsetY = .4;
				this.moveUp();
			} else {
				this.offsetY = -.4;
				this.moveDown();
			}
		} else {
			yTrue = true;
		}
		if (xTrue && yTrue) {
			this.doubleKeys = false;
			if (!(map.alarm)){
				this.setIdle();
			}
			if (!(this.paused)){
				this.nextPath();
			}
			this.chaseReady = true;
		} else if (!xTrue && !yTrue) {
			this.doubleKeys = true;
		} else {
			this.doubleKeys = false;
		}
	}

	NPCKnight.prototype.moveLeft = function() {
		this.scaleX = 1;
		this.spriteDirection = this.FACING.SIDE;
		this.scanner.lookLeft();
		this.direction = "west";
		if (map.notBoundary(this.x, this.y, "left")){
			this.spriteDirection = this.FACING.SIDE;
			this.x -= this.xVelocity;
			this.move();
		}
	};
	NPCKnight.prototype.moveRight = function() {
		this.scaleX = -1;
		this.spriteDirection = this.FACING.SIDE;
		this.scanner.lookRight();
		this.direction = "east";
		if (map.notBoundary(this.x, this.y, "right")){
			this.spriteDirection = this.FACING.SIDE;
			this.x += this.xVelocity;
	  		this.move();
		}
	};
	NPCKnight.prototype.moveUp = function() {
		this.scanner.lookUp();
		this.spriteDirection = this.FACING.UP;
		this.direction = "north";
		if (map.notBoundary(this.x, this.y, "up")){
			this.spriteDirection = this.FACING.UP;
			this.y -= this.yVelocity;
			this.move();
		}
	};
	NPCKnight.prototype.moveDown = function() {
		this.scanner.lookDown();
		this.spriteDirection = this.FACING.DOWN;
		this.direction = "south";
		if (map.notBoundary(this.x, this.y, "down")){
			this.spriteDirection = this.FACING.DOWN;
			this.y += this.yVelocity;
			this.move();
		}
	};
	window.NPCKnight = NPCKnight;
} (window));		