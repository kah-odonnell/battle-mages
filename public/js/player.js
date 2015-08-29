(function (window) {
/**
 * player.js
 * 
 * Player is declared at the global scale,
 * then initialized by Level.initialize()
 *
 *
**/
	var Player = function(tileX, tileY){
		this.x = tileX*40 + 20;
		this.y = tileY*40 + 20;
		this.tileX = tileX;
		this.tileY = tileY;
		this.scaleX = -1;
		this.xVelocity = 3;
		this.yVelocity = 2.5;

		this.footprintCounter = 0;
		this.footprintArray = []
		this.maxFootprints = 25;
		this.hasIdleFootprints = false;
		this.FACING = {
			SIDE: {xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
			UP: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
			DOWN: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0}
		}
		this.spriteDirection = this.FACING.SIDE;

		this.isMoving = false;
		this.isMovingX = false;
		this.initialize();
	}
	var p = Player.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	Player.prototype.initialize = function(){
		p.Container_initialize();
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
				"runUp": [26, 35, "runUp", 4],
				"runDown": [15, 24, "runDown", 4]
			},
			"framerate": 10
		});
		this.idleSide = new createjs.Sprite(data, "idleSide");
		this.idleUp = new createjs.Sprite(data, "idleUp");
		this.idleDown = new createjs.Sprite(data, "idleDown");
		this.runSide = new createjs.Sprite(data, "runSide");
		this.runUp = new createjs.Sprite(data, "runUp");
		this.runDown = new createjs.Sprite(data, "runDown");
		this.addChild(this.idleSide);
	}
	Player.prototype.tick = function() {
		this.tileX = Math.floor(this.x/40);
		this.tileY = Math.floor(this.y/40);
		if (!(map.alarm)) {
		 	if (Key.isDown(Key.UP)) this.moveUp();
		 	if (Key.isDown(Key.DOWN)) this.moveDown();
		 	if (Key.isDown(Key.LEFT)) this.moveLeft();
		 	if (Key.isDown(Key.RIGHT)) this.moveRight();
		 	if (isEmpty(Key._pressed)) this.setIdle();			
		} else {
			this.setIdle();
		}

		if (this.footprintCounter == 0) {
			this.footprintCounter++;
		}
		else if (this.footprintCounter == 60*this.xVelocity) {
			this.footprintCounter = 0;
		} 
		else {
			this.footprintCounter++;			
		}
		if (this.footprintArray.length > this.maxFootprints) {
			map.removeChild(this.footprintArray[0]);
			this.footprintArray.shift()					
		}
		this.makeFootprints();
	}
	Player.prototype.makeFootprints = function(){
		var footprintInterval = 5;
		if (this.isMoving) {
			if (this.footprintCounter % footprintInterval == 0) {
				var color = '#D3EAEA'
				var shape = new createjs.Shape();
				shape.graphics.beginFill(color).drawCircle(0, 0, 4);
				shape.regY = -6
				//Determine x and y coords of footprints through random chance
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
					{alpha:0,visible:false},2500
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
				{alpha:0,visible:false},5000
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
				{alpha:0,visible:false},5000
			);
			map.addChild(this.footprintArray[this.footprintArray.length - 1])

			this.hasIdleFootprints = true;
		}
	}
	Player.prototype.setIdle = function() {
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
	Player.prototype.setRun = function() {
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
	Player.prototype.moveLeft = function() {
		this.scaleX = 1;
		this.spriteDirection = this.FACING.SIDE;
		var local = this.localToGlobal(0,0)
		if (map.notBoundary(this.x, this.y, "left")){
			this.x -= this.xVelocity;

			this.setRun();
			if ((local.x < 300) && (map.x < 0)) {
				map.x += this.xVelocity;
			}	
		}
	};
	Player.prototype.moveRight = function() {
		this.scaleX = -1;
		this.spriteDirection = this.FACING.SIDE;
		var local = this.localToGlobal(0,0)
		if (map.notBoundary(this.x, this.y, "right")){
			this.x += this.xVelocity;
	  		this.setRun();
	  		if ((local.x > canvas.width - 300) && (map.getBounds().width > canvas.width - map.x + this.regX)){
	  			if (this.x<.9*map.getBounds().width) {
		  			map.x -= this.xVelocity;	  				
	  			}
	  		}
		}
	};
	Player.prototype.moveUp = function() {
		var local = this.localToGlobal(0,0)
		var moveAllowed = false;
		this.spriteDirection = this.FACING.UP;
		if (map.notBoundary(this.x, this.y, "up")){
			if (this.scaleX == -1) {
				if ((map.notBoundary(this.x-13,this.y,"up"))){
					moveAllowed = true;
				}
			} else {
				if (map.notBoundary(this.x+13,this.y,"up")){
					moveAllowed = true;
				}				
			}
		}
		if (moveAllowed) {
			this.y -= this.yVelocity;
			this.setRun();
			if ((local.y < 240) && (map.y < 0)) {
				map.y += this.yVelocity;
			}	
		}
	};
	Player.prototype.moveDown = function() {
		this.spriteDirection = this.FACING.DOWN;
		var local = this.localToGlobal(0,0)
		var moveAllowed = false;
		if (map.notBoundary(this.x, this.y, "down")){
			if (this.scaleX == -1) {
				if (map.notBoundary(this.x-13,this.y,"down")){
					moveAllowed = true;
				}
			} else {
				if (map.notBoundary(this.x+13,this.y,"down")){
					moveAllowed = true;
				}
			}
		}
		if (moveAllowed){
			this.y += this.yVelocity;
			this.setRun();
			//map needs to move up when player gets to the bottom of map
			if ((local.y > canvas.height-180) && (map.getBounds().height - 40 > canvas.height - map.y)) {
				map.y -= this.yVelocity;
			}			
		}

	};
	window.Player = Player;
} (window));		