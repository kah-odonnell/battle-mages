bm.characters.Character = class extends bm.core.Container {
	constructor() {
		super();
		this._isMoving = false;
		this._isMovingX = false;
		this._xVelocity = 2;
		this._yVelocity = 2;
		this._diagonalMovement = false;
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
		this._spriteSpeedMultiplier = (60/bm.globals._FPS)

		if (bm.globals._debugMode) {	
			var redCircle = new createjs.Graphics().beginFill("green").drawCircle(0,0,3);
			var regDot = new createjs.Shape(redCircle);
			regDot.x = this.regX;
			regDot.y = this.regY;
			this.addToContainer(regDot);
		}
	}

	interact() {
		
	}

	createSprite() {
		var spriteSheet = new createjs.SpriteSheet(this._spriteData);
		this.regY = this._spriteData.frames.height;
		this._sprite = new createjs.Sprite(spriteSheet);
		this.addToContainer(this._sprite);
	}

	setIdle() {
		this._isMoving = false;
		this._isMovingX = false;
		if (this._sprite.currentAnimation != this._spriteDirection.idleAnimation) {
			this._sprite.gotoAndPlay(this._spriteDirection.idleAnimation)
		}
	}

	setRun() {
		this._isMoving = true;
		if (this._sprite.currentAnimation != this._spriteDirection.runAnimation && (!this._diagonalMovement || (this._spriteDirection == this._FACING.SIDE))) {
			this._sprite.gotoAndPlay(this._spriteDirection.runAnimation)
		}
		if (this._spriteDirection == this._FACING.SIDE) {
			this._isMovingX = true;
		}
	}
}