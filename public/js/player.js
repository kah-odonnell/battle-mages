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

		this.footprintData = level.maplist[level.currentmap].footprints;
		this.footprintCounter = 0;
		this.footprintArray = []
		this.hasIdleFootprints = false;
		this.FACING = {
			SIDE: {xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
			UP: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
			DOWN: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0}
		}
		this.spriteDirection = this.FACING.SIDE;
		this.currentAnimation;
		//if up || down && left || right keys pressed, use side animation
		this.doubleKeys = false;

		this.isMoving = false;
		this.isMovingX = false;
		this.initialize();
	}
	var p = Player.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	Player.prototype.initialize = function(){
		p.Container_initialize();
		var scale = 2;
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("audreyparserrokah")],
			"frames": {
				"width": 50*scale, 
				"height": 46*scale, 
				"count": 41, 
				"regX": 28*scale, 
				"regY": 46*scale
			},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"idleSide": [0, 4, true, .05], 
				"idleUp": [30, 30, true, .05], 
				"idleDown": [15, 19, true, .05], 
				"runSide": [5, 13, true, 1],
				"runUp": [31, 40, true, 1.5],
				"runDown": [20, 29, true, 1.5]
			},
			"framerate": 10
		});
		this.sprite = new createjs.Sprite(data);
		this.addChild(this.sprite);
	}
	Player.prototype.tick = function() {
		this.tileX = Math.floor(this.x/40);
		this.tileY = Math.floor(this.y/40);
		//Checking for these key combinations before changing certain sprites prevents sprite lockup
		if (Key.isDown(Key.UP) && Key.isDown(Key.LEFT)) this.doubleKeys = true;
		else if (Key.isDown(Key.UP) && Key.isDown(Key.RIGHT)) this.doubleKeys = true;
		else if (Key.isDown(Key.DOWN) && Key.isDown(Key.LEFT)) this.doubleKeys = true;
		else if (Key.isDown(Key.DOWN) && Key.isDown(Key.RIGHT)) this.doubleKeys = true;
		else this.doubleKeys = false;
		//Handle movement of sprite
		if (!(map.alarm)) {
		 	if (Key.isDown(Key.UP)) this.moveUp();
		 	if (Key.isDown(Key.DOWN)) this.moveDown();
		 	if (Key.isDown(Key.LEFT)) this.moveLeft();
		 	if (Key.isDown(Key.RIGHT)) this.moveRight();
		 	if (isEmpty(Key._pressed)) this.setIdle();			
		} else {
			this.setIdle();
		}
		//Do footprints on an interval
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
	Player.prototype.faceDirection = function(obj) {
		if (obj.spriteDirection == obj.FACING.SIDE) {
			this.spriteDirection = this.FACING.SIDE;
			if (obj.x < this.x)	this.scaleX = 1;
			if (obj.x > this.x)	this.scaleX = -1;
		}
		if (obj.spriteDirection == obj.FACING.UP) {
			this.spriteDirection = this.FACING.DOWN;
		}
		if (obj.spriteDirection == obj.FACING.DOWN) {
			this.spriteDirection = this.FACING.UP;
		}
		this.setIdle();
	}
	Player.prototype.makeFootprints = function(mapchange){
		var footprintInterval = 5;

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
	Player.prototype.setIdle = function() {
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
	Player.prototype.setRun = function() {
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
			var defaultHeight = level.maplist[level.currentmap].tileData.defaultHeight;
			if ((local.y > canvas.height-180) && (map.getBounds().height - defaultHeight > canvas.height - map.y)) {
				map.y -= this.yVelocity;
			}			
		}

	};
	window.Player = Player;
} (window));		