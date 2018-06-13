bm.Player = class extends bm.ui.Container {
	constructor() {
		super();
		this.spriteSpeedMultiplier = (60/bm.globals._FPS)
		var data = new createjs.SpriteSheet({
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
				"idleSide": [0, 4, true, 0.0125*this.spriteSpeedMultiplier], 
				"idleUp": [30, 30, true, 0.0125*this.spriteSpeedMultiplier], 
				"idleDown": [15, 19, true, 0.0125*this.spriteSpeedMultiplier], 
				"runSide": [5, 13, true, .25*this.spriteSpeedMultiplier],
				"runUp": [31, 40, true, .25*this.spriteSpeedMultiplier],
				"runDown": [20, 29, true, .25*this.spriteSpeedMultiplier]
			},
			"framerate": 1
		});
		this.sprite = new createjs.Sprite(data);
		this.addToContainer(this.sprite);

		this.FACING = {
			SIDE: {xFootWidth: 10, yFootWidth: 1, xOffset: 0, yOffset: 1, movingOffset: 5},
			UP: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0},
			DOWN: {xFootWidth: 6, yFootWidth: 0, xOffset: 3, yOffset: 0, movingOffset: 0}
		}
		this.spriteDirection = this.FACING.SIDE;
		this.currentAnimation;

		this.x = 250;
		this.y = 105;
		this.regY = 50;

		if (bm.globals._debugMode) {	
			var redCircle = new createjs.Graphics().beginFill("green").drawCircle(0,0,3);
			var regDot = new createjs.Shape(redCircle);
			regDot.x = this.regX;
			regDot.y = this.regY;
			this.addToContainer(regDot);
		}

		this.doubleKeys = false;
		this.isMoving = false;
		this.isMovingX = false;
		this.xVelocity = 2;
		this.yVelocity = 2;
	}

	tick(event) {
		if (bm.keys.isDown(bm.keys.UP) && bm.keys.isDown(bm.keys.LEFT)) this.doubleKeys = true;
		else if (bm.keys.isDown(bm.keys.UP) && bm.keys.isDown(bm.keys.RIGHT)) this.doubleKeys = true;
		else if (bm.keys.isDown(bm.keys.DOWN) && bm.keys.isDown(bm.keys.LEFT)) this.doubleKeys = true;
		else if (bm.keys.isDown(bm.keys.DOWN) && bm.keys.isDown(bm.keys.RIGHT)) this.doubleKeys = true;
		else this.doubleKeys = false;
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
	}

	setIdle() {
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
	setRun() {
		this.isMoving = true;
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
	moveLeft() {
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.scaleX = 1;
		this.spriteDirection = this.FACING.SIDE;
		if (!map.isBoundary(this.x, this.y, "left")){
			this.x -= this.xVelocity*this.spriteSpeedMultiplier;
			this.setRun();
			var local = this.localToGlobal(0,0)
			if ((local.x < canvas.width/(bm.globals._canvasScale*2.5)) && (map.x < 0)) {
				map.x += this.xVelocity*this.spriteSpeedMultiplier;
			}	
		}
	}
	moveUp() {
		var moveAllowed = false;
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.spriteDirection = this.FACING.UP;
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
			this.y -= this.yVelocity*this.spriteSpeedMultiplier;
			this.setRun();
			var local = this.localToGlobal(0,0)
			var mapCanMoveDown = (map.y < 0);
			var playerTowardsTop = (local.y + this.regY < canvas.height/(bm.globals._canvasScale*2));
			if (playerTowardsTop && mapCanMoveDown) {
				map.y += this.yVelocity*this.spriteSpeedMultiplier;
			}	
		}
	}
	moveRight() {
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.scaleX = -1;
		this.spriteDirection = this.FACING.SIDE;
		if (!map.isBoundary(this.x, this.y, "right")){
			this.x += this.xVelocity*this.spriteSpeedMultiplier;
			var mapBounds = map.getBounds();
			var local = this.localToGlobal(0,0)
			var mapCanMoveLeft = ((map.x-1)*bm.globals._canvasScale > canvas.width - mapBounds.width);
			var playerTowardsRight = (local.x > canvas.width/bm.globals._canvasScale - (canvas.width/bm.globals._canvasScale)/2.5);
			var mapBiggerThanCanvas = (canvas.width < mapBounds.width);
			var moveMap = (mapCanMoveLeft && playerTowardsRight && mapBiggerThanCanvas);
	  		this.setRun();
	  		if (moveMap) {
	  			map.x -= this.xVelocity*this.spriteSpeedMultiplier;
	  		}
		}
	}
	moveDown() {
		var moveAllowed = false;
		var map = bm.gameInstance.mapGraph.getCurrentMap();
		this.spriteDirection = this.FACING.DOWN;
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
			this.y += this.yVelocity*this.spriteSpeedMultiplier;
			this.setRun();
			if (moveMap) {
				map.y -= this.yVelocity*this.spriteSpeedMultiplier;
			}
		}
	}
}