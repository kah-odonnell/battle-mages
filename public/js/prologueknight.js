/**
 * prologueknight.js
 * 
 * An npc exclusive to the prologue
 *
 * Constructor takes a dictionary (retrieved from the global leveldata variable by Level.initialize) 
 * containing this npc's DNA - name, path, personality, interaction dialog, and, 
 * since hostile, opening/closing battle remarks and battle library information.
 * Other details of the PrologueKnight are hardcoded in the constructor.
 *
 * A PrologueKnight is initialized by Level.getNPCs(),
 * then stored in the list Level.maplist[mapindex].npcs
 *
**/

(function (window) {
	var PrologueKnight = function(npcInitDict, hostmap){
		this.initialize(npcInitDict, hostmap);
	}
	var g = PrologueKnight.prototype = new createjs.Container();

	g.Container_initialize = g.initialize;
	//
	//
	//
	//
	g.initialize = function(npcInitDict, hostmap) {
		this.Container_initialize();
		name = npcInitDict["name"];
		path = npcInitDict["path"];
		personality = npcInitDict["personality"];
		this.battleStartDialog = npcInitDict["battleStartDialog"];
		this.battleEndDialog = npcInitDict["battleEndDialog"];
		this.battleLibrary = npcInitDict["battleLibrary"];
		this.interactDialog = npcInitDict["interactDialog"]

		this.TYPE = hostmap.INTERACTABLE.NPC;
		this.npcname = name
		this.formalname = name
		this.x = (path[0][0]*40) + 20;
		this.y = (path[0][1]*40) + 20;

		this.isHostile = false;
		this.isBeaten = false;
		this.hasPaused = false;
		this.path = path;
		this.personality = personality;
		this.hostmap = hostmap;
		this.currentPath = 0;
		this.scaleX = (this.personality == "faceLeft")*2 - 1;
		this.paused = false;
		this.xVelocity = 1;
		this.yVelocity = 1;
		this.offsetX; this.offsetY;
		this.tileX; this.tileY;
		this.targetX; this.targetY;
		this.direction;
		this.seesPlayer = false;

		this.footprintCounter = 0;
		this.footprintArray = []
		this.maxFootprints = 20;
		this.hasIdleFootprints = false;
		this.FACING = {
			SIDE: {xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
			UP: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
			DOWN: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0}
		}
		this.spriteDirection = this.FACING.SIDE;

		this.isMoving = false;
		this.isMovingX = false;

		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("knight")],
			"frames": {
				"width": 100, 
				"height": 92, 
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
		this.idleSide = new createjs.Sprite(data, "idleSide");
		this.idleUp = new createjs.Sprite(data, "idleUp");
		this.idleDown = new createjs.Sprite(data, "idleDown");
		this.runSide = new createjs.Sprite(data, "runSide");
		this.runUp = new createjs.Sprite(data, "runUp");
		this.runDown = new createjs.Sprite(data, "runDown");

		this.scanner = new Scanner(this, hostmap);
		this.chaseReady; this.bestX; this.bestY;
		hostmap.addChild(this.scanner);

		this.setIdle();
	}
	PrologueKnight.prototype.tick = function() {
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

			//Footprint logic
			if (this.footprintCounter == 0) this.footprintCounter++;
			else if (this.footprintCounter == 60) this.footprintCounter = 0;
			else this.footprintCounter++;			
			if (this.footprintArray.length > this.maxFootprints) {
				this.hostmap.removeChild(this.footprintArray[0]);
				this.footprintArray.shift()					
			}
			this.makeFootprints();
		}

		this.attemptPrompt();

		
	}

	PrologueKnight.prototype.attemptPrompt = function() {
		if (!(map.alarm) && (level.promptEnabled)) {
			var c = Math.sqrt(Math.pow(player.x-this.x,2)+Math.pow(player.y-this.y,2));
			if ((c <= 40)) {
				var PromptLog; 
				if (!this.isHostile) PromptLog = this.interactDialog;
				else if (this.isHostile && this.isBeaten) PromptLog = this.battleEndDialog;
				else if (this.isHostile && !this.isBeaten) PromptLog = this.battleStartDialog;
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

	PrologueKnight.prototype.setIdle = function() {
		this.isMoving = false;
		this.isMovingX = false;
		this.removeChild(this.runSide);
		this.removeChild(this.runUp);
		this.removeChild(this.runDown);
		if (this.spriteDirection == this.FACING.SIDE) {
			this.addChild(this.idleSide);
			this.removeChild(this.idleUp);
			this.removeChild(this.idleDown);
		}
		if (this.spriteDirection == this.FACING.UP) {
			this.removeChild(this.idleSide);
			this.addChild(this.idleUp);
			this.removeChild(this.idleDown);
		}
		if (this.spriteDirection == this.FACING.DOWN) {
			this.removeChild(this.idleSide);
			this.removeChild(this.idleUp);
			this.addChild(this.idleDown);
		}
	}
	PrologueKnight.prototype.setRun = function() {
		this.isMoving = true;
		this.hasIdleFootprints = false;
		this.removeChild(this.idleSide);
		this.removeChild(this.idleUp);
		this.removeChild(this.idleDown);
		if (this.spriteDirection == this.FACING.SIDE) {
			this.isMovingX = true;
			this.addChild(this.runSide);
			this.removeChild(this.runUp);
			this.removeChild(this.runDown);
		}
		if (this.spriteDirection == this.FACING.UP) {
			this.isMovingX = false;
			this.removeChild(this.runSide);
			this.addChild(this.runUp);
			this.removeChild(this.runDown);
		}
		if (this.spriteDirection == this.FACING.DOWN) {
			this.isMovingX = false;
			this.removeChild(this.runSide);
			this.removeChild(this.runUp);
			this.addChild(this.runDown);
		}
	}
	PrologueKnight.prototype.move = function(){
		this.setRun();
	}
	PrologueKnight.prototype.makeFootprints = function(){
		var footprintInterval = 10;
		if (this.isMoving) {
			if (this.footprintCounter % footprintInterval == 0) {
				var color = '#D3EAEA'
				var shape = new createjs.Shape();
				shape.graphics.beginFill(color).drawCircle(0, 0, 4);
				shape.regY = -6
				//Determine x and y coords of both prints
				if (this.footprintCounter % (2*footprintInterval) == 0){
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
						this.y + 
						this.spriteDirection.yFootWidth + 
						shape.regY + 
						this.spriteDirection.yOffset/2
					);
				} else {
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
						this.y + 
						shape.regY - 
						this.spriteDirection.yOffset
					);
				}
				this.footprintArray.push(shape);

				//Add fade out for footprint
				createjs.Tween.get(
					this.footprintArray[this.footprintArray.length - 1]
				).to(
					{alpha:0,visible:false},this.maxFootprints*100
				);

				map.addChild(this.footprintArray[this.footprintArray.length - 1])
			}					
		} 
		if (!(this.isMoving) && !(this.hasIdleFootprints)) {
			var color = '#C5D8D8'
			var shape1 = new createjs.Shape();
			shape1.graphics.beginFill(color).drawCircle(0, 0, 4);
			shape1.regY = -4
			shape1.x = (
				this.x + 
				this.scaleX*(
					this.spriteDirection.xFootWidth/4 + 1 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
			);
			shape1.y = (
				this.y + 
				this.spriteDirection.yFootWidth + 
				shape1.regY + 
				this.spriteDirection.yOffset/2
			);
			this.footprintArray.push(shape1);
			createjs.Tween.get(
				this.footprintArray[this.footprintArray.length - 1]
			).to(
				{alpha:0,visible:false},this.maxFootprints*150
			);
			map.addChild(this.footprintArray[this.footprintArray.length - 1])

			var shape2 = new createjs.Shape();
			shape2.graphics.beginFill(color).drawCircle(0, 0, 4);
			shape2.regY = -5;
			shape2.x = (
				this.x + 
				this.scaleX*(
					this.spriteDirection.xFootWidth/4 - 7 + 
					this.xVelocity/2 + 
					this.spriteDirection.xOffset
				)
			);
			shape2.y = (
				this.y + 
				shape2.regY - 
				this.spriteDirection.yOffset
			);

			this.footprintArray.push(shape2);
			createjs.Tween.get(
				this.footprintArray[this.footprintArray.length - 1]
			).to(
				{alpha:0,visible:false},this.maxFootprints*150
			);
			map.addChild(this.footprintArray[this.footprintArray.length - 1])

			this.hasIdleFootprints = true;
		}
	}
	PrologueKnight.prototype.nextPath = function() {
		if (this.currentPath < (this.path.length - 1)){
			this.currentPath++;
		} else {
			this.currentPath = 0;
		}
	}
	PrologueKnight.prototype.patrol = function(){
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
	PrologueKnight.prototype.chase = function(){
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

	PrologueKnight.prototype.initiateBattle = function(){
		this.xVelocity = 1.5;
		this.yVelocity = 1.25;
		if (this.hasPaused == true) {
			var c = Math.sqrt(Math.pow(player.x-this.x,2)+Math.pow(player.y-this.y,2));
			//console.log((player.x-this.x) + "," + (player.y-this.y) + ":" + c)
			if (c >= 30) {
				this.chase();
			} else {
		 		this.setIdle();
				level.addDialog(this.battleStartDialog);
				var g = this;
				setTimeout(function(){
					player.faceDirection(g);
				}, 250)
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

	PrologueKnight.prototype.randDirection = function(){
		var direction = Math.floor((Math.random()*4)+1)
		if (direction == 1) this.direction = "west";
		if (direction == 2) this.direction = "east";
		if (direction == 3) this.direction = "north";
		if (direction == 4) this.direction = "south";
	}

	PrologueKnight.prototype.setTarget = function(){
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

	PrologueKnight.prototype.moveTo = function(tileX, tileY) {
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
			if (!(map.alarm)){
				this.setIdle();
			}
			if (!(this.paused)){
				this.nextPath();
			}
			this.chaseReady = true;
		}
	}

	PrologueKnight.prototype.moveLeft = function() {
		this.scaleX = 1;
		this.scanner.lookLeft();
		this.direction = "west";
		if (map.notBoundary(this.x, this.y, "left")){
			this.spriteDirection = this.FACING.SIDE;
			this.x -= this.xVelocity;
			this.move();
		}
	};
	PrologueKnight.prototype.moveRight = function() {
		this.scaleX = -1;
		this.scanner.lookRight();
		this.direction = "east";
		if (map.notBoundary(this.x, this.y, "right")){
			this.spriteDirection = this.FACING.SIDE;
			this.x += this.xVelocity;
	  		this.move();
		}
	};
	PrologueKnight.prototype.moveUp = function() {
		this.scanner.lookUp();
		this.direction = "north";
		if (map.notBoundary(this.x, this.y, "up")){
			this.spriteDirection = this.FACING.UP;
			this.y -= this.yVelocity;
			this.move();
		}
	};
	PrologueKnight.prototype.moveDown = function() {
		this.scanner.lookDown();
		this.direction = "south";
		if (map.notBoundary(this.x, this.y, "down")){
			this.spriteDirection = this.FACING.DOWN;
			this.y += this.yVelocity;
			this.move();
		}
	};
	window.PrologueKnight = PrologueKnight;
} (window));		