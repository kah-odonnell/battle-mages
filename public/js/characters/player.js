bm.Player = class extends bm.characters.Character {
	constructor() {
		super();
		this._spriteData = {
			"images": [bm.assets.getResult("player")],
			"frames": {
				"width": 50, 
				"height": 50, 
				"count": 41, 
				"regX": 28, 
				"regY": 0
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idleSide": [0, 4, true, 0.0125*this._spriteSpeedMultiplier], 
				"idleUp": [30, 30, true, 0.0125*this._spriteSpeedMultiplier], 
				"idleDown": [15, 19, true, 0.0125*this._spriteSpeedMultiplier], 
				"runSide": [5, 13, true, .25*this._spriteSpeedMultiplier],
				"runUp": [31, 40, true, .25*this._spriteSpeedMultiplier],
				"runDown": [20, 29, true, .25*this._spriteSpeedMultiplier]
			},
			"framerate": 1
		};

		this._FACING = {
			SIDE: {
				footprintConfig: { xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
				runAnimation: "runSide",
				idleAnimation: "idleSide"
			},
			UP: {
				footprintConfig: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
				runAnimation: "runUp",
				idleAnimation: "idleUp"
			},
			DOWN: {
				footprintConfig: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
				runAnimation: "runDown",
				idleAnimation: "idleDown"
			},
		}
		this._spriteDirection = this._FACING.SIDE;

		this.x = 760;
		this.y = 900;

		this.createSprite();
	}

	getCoords() {
		var tileX = Math.floor(this.x/bm.globals._tileSize);
		var tileY = Math.floor(this.y/bm.globals._tileSize);
		var data = {
			x: this.x,
			y: this.y,
			tileX: tileX,
			tileY: tileY
		}
		return data;
	}

	tick(event) {
		if (bm.keys.isDown(bm.keys.UP) && bm.keys.isDown(bm.keys.LEFT)) this._diagonalMovement = true;
		else if (bm.keys.isDown(bm.keys.UP) && bm.keys.isDown(bm.keys.RIGHT)) this._diagonalMovement = true;
		else if (bm.keys.isDown(bm.keys.DOWN) && bm.keys.isDown(bm.keys.LEFT)) this._diagonalMovement = true;
		else if (bm.keys.isDown(bm.keys.DOWN) && bm.keys.isDown(bm.keys.RIGHT)) this._diagonalMovement = true;
		else this._diagonalMovement = false;
		//Handle movement of sprite
		if (!(false)) {
		 	if (bm.keys.isDown(bm.keys.UP)) this.moveUp();
		 	if (bm.keys.isDown(bm.keys.DOWN)) this.moveDown();
		 	if (bm.keys.isDown(bm.keys.LEFT)) this.moveLeft();
		 	if (bm.keys.isDown(bm.keys.RIGHT)) this.moveRight();
		 	if (bm.utils.isEmpty(bm.keys._pressed)) this.setIdle();			
		} else {
			this.setIdle();
		}	
		this.interact()
	}


	interact() {
		super.interact();
		var tileX = Math.floor(this.x/bm.globals._tileSize);
		var tileY = Math.floor(this.y/bm.globals._tileSize);
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		if (map.getNearbyExits(tileX, tileY)) {
			bm.gameInstance.showInteractInfo(map.getNearbyExits(tileX, tileY)[0]);
		}
		if (map.isExit(tileX, tileY)) {
			map.removePlayer();
			var mapExit = map.getNearbyExits(tileX, tileY)[0];
			var destinationID = mapExit.destinationMapID;
			var destMap = bm.gameInstance.mapGraph.getMapFromID(destinationID);
			bm.gameInstance.mapGraph.setCurrentMap(destMap);
			this.x = mapExit.outputLocation[0];
			this.y = mapExit.outputLocation[1];
			destMap.addPlayer();
			bm.gameInstance.mapGraph.getCurrentMap().centerOn(bm.gameInstance.player);
		}
	}

	interactByMovement() {
		
	}

	moveLeft() {
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.scaleX = 1;
		this._spriteDirection = this._FACING.SIDE;
		this.setRun();
		if (!map.isBoundary(this.x, this.y, "left")){
			this.x -= this._xVelocity*this._spriteSpeedMultiplier;
			var local = this.localToGlobal(0,0)
			if ((local.x < canvas.width/(bm.globals._canvasScale*2.5)) && (map.x < 0)) {
				map.x += this.getXVelocity()
			}	
		}
	}

	moveUp() {
		var moveAllowed = false;
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this._spriteDirection = this._FACING.UP;
		this.setRun();
		if (!map.isBoundary(this.x, this.y, "up")){
			if (this.scaleX == -1) {
				if ((!map.isBoundary(this.x-0.325*bm.globals._tileSize,this.y,"up"))){
					moveAllowed = true;
				}
			} else {
				if (!map.isBoundary(this.x+0.325*bm.globals._tileSize,this.y,"up")){
					moveAllowed = true;
				}				
			}
		}
		if (moveAllowed) {
			this.y -= this.getYVelocity();
			var local = this.localToGlobal(0,0)
			var mapCanMoveDown = (map.y < 0);
			var playerTowardsTop = (local.y + this.regY < canvas.height/(bm.globals._canvasScale*2));
			if (playerTowardsTop && mapCanMoveDown) {
				map.y += this.getYVelocity();
			}	
		}
	}

	moveRight() {
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.scaleX = -1;
		this._spriteDirection = this._FACING.SIDE;
	  	this.setRun();
		if (!map.isBoundary(this.x, this.y, "right")){
			this.x += this.getXVelocity()
			var mapBounds = map.getBounds();
			var local = this.localToGlobal(0,0)
			var mapCanMoveLeft = ((map.x-1)*bm.globals._canvasScale > canvas.width - mapBounds.width);
			var playerTowardsRight = (local.x > canvas.width/bm.globals._canvasScale - (canvas.width/bm.globals._canvasScale)/2.5);
			var mapBiggerThanCanvas = (canvas.width < mapBounds.width);
			var moveMap = (mapCanMoveLeft && playerTowardsRight && mapBiggerThanCanvas);
	  		if (moveMap) {
	  			map.x -= this.getXVelocity()
	  		}
		}
	}

	moveDown() {
		var moveAllowed = false;
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this._spriteDirection = this._FACING.DOWN;
		this.setRun();
		if (!map.isBoundary(this.x, this.y, "down")){
			if (this.scaleX == -1) {
				if (!map.isBoundary(this.x-0.325*bm.globals._tileSize,this.y,"down")){
					moveAllowed = true;
				}
			} else {
				if (!map.isBoundary(this.x+0.325*bm.globals._tileSize ,this.y,"down")){
					moveAllowed = true; 
				}
			}
		}
		if (moveAllowed){
			var local = this.localToGlobal(0,0);
			var mapBounds = map.getBounds();
			var mapCanMoveUp = ((map.y-2)*bm.globals._canvasScale > canvas.height - mapBounds.height + bm.globals._tileSize*bm.globals._canvasScale);
			var playerTowardsBottom = (local.y + this.regY > canvas.height/bm.globals._canvasScale - (canvas.height/bm.globals._canvasScale)/2.5);
			var mapBiggerThanCanvas = (canvas.height < mapBounds.height);
			var moveMap = (mapCanMoveUp && playerTowardsBottom && mapBiggerThanCanvas);
			this.y += this.getYVelocity();
			if (moveMap) {
				map.y -= this.getYVelocity();
			}
		}
	}

	getYVelocity() {
		return this._yVelocity*this._spriteSpeedMultiplier;
	}

	getXVelocity() {
		return this._xVelocity*this._spriteSpeedMultiplier;
	}
}