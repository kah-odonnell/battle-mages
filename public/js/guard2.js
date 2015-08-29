(function (window) {
	function Guard2(path){
		this.x = (path[0][0]*60) + 30;
		this.y = (path[0][1]*40) + 20;
		this.idle;
		this.walk;
		this.run;
		this.path = path;
		this.pathCurrent = 0;
		this.scaleX = -1;
		this.paused = false;
		this.moveSpeedX = 2;
		this.moveSpeedY = 1.5;
		this.scanner;
		this.offsetX; this.offsetY;
		this.scanDirection; this.tileX; this.tileY;
		this.initialize();
	}
	Guard2.prototype = new createjs.Container();
	Guard2.prototype.initialize = function(){
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("guard")],
			"frames": {"width": 100, "height": 70, "count": 21, "regX": 53, "regY": 70},
			"animations": {
				"idle": [0, 0, "idle", .05], 
				"run": [2, 10, "run", 1],
				"walk": [12, 20, "walk", 1]
			},
			"framerate": 10
		});
		this.idle = new createjs.Sprite(data, "idle");
		this.run = new createjs.Sprite(data, "run");
		this.walk = new createjs.Sprite(data, "walk");
		this.scanner = new Scanner(0,0);
		map.addChild(this.scanner);
		this.pathCurrent = 0;
		this.setIdle();
	}
	Guard2.prototype.tick = function() {
		this.tileX = Math.floor(this.x/60);
		this.tileY = Math.floor(this.y/40);
		if (this.x < 50) {
			this.x = 1040;
		}
		if (this.x > 1040) {
			this.x = 50;
		}
		if (!(this.paused)){
			this.patrol();
		} 
		else if (this.paused) {

		}
		this.scanner.tick(this.tileX, this.tileY);
	}

	Guard2.prototype.setIdle = function() {
		this.removeChild(this.run);
		this.removeChild(this.walk);
		this.addChild(this.idle);
	}
	Guard2.prototype.setRun = function() {
		this.moveSpeedX = 2;
		this.moveSpeedY = 1.5;
		this.removeChild(this.walk);
		this.removeChild(this.idle);
		this.addChild(this.run);
	}
	Guard2.prototype.setWalk = function() {
		this.moveSpeedX = 1.5;
		this.moveSpeedY = 1;
		this.removeChild(this.run);
		this.removeChild(this.idle);
		this.addChild(this.walk);
	}
	Guard2.prototype.move = function(){
		if (map.alarm) {
			this.setRun();
		} else {
			this.setWalk();
		}
	}
	Guard2.prototype.nextPath = function() {
		if (this.pathCurrent < (this.path.length - 1)){
			this.pathCurrent++;
		} else {
			this.pathCurrent = 0;
		}
	}
	Guard2.prototype.patrol = function(){
		if (this.path[this.pathCurrent] != "pause"){
			this.paused = false;
			this.moveTo(
				this.path[this.pathCurrent][0],
				this.path[this.pathCurrent][1]
			);
		} else {
			var g = this;
			g.paused = true;
			setTimeout(function(){
				g.paused = false;
			}, 3000)
			this.nextPath();
		}
	}

	Guard2.prototype.moveTo = function(tileX, tileY) {
		var xTrue, yTrue;
		if ((Math.floor((this.x/60) + this.offsetX)) != tileX) {
			xTrue = false;
			if (signOf(this.x - ((tileX*60) + 30)) == -1){
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
			this.setIdle();
			if (!(this.paused)){
				this.nextPath();
			}
		}
	}

	Guard2.prototype.moveLeft = function() {
		this.scaleX = 1;
		this.scanner.lookLeft();
		if (map.notBoundary(this.x, this.y, "left")){
			this.x -= this.moveSpeedX;
			this.move();
		}
	};
	Guard2.prototype.moveRight = function() {
		this.scaleX = -1;
		this.scanner.lookRight();
		if (map.notBoundary(this.x, this.y, "right")){
			this.x += this.moveSpeedX;
	  		this.move();
		}
	};
	Guard2.prototype.moveUp = function() {
		this.scanner.lookUp();
		if (map.notBoundary(this.x, this.y, "up")){
			this.y -= this.moveSpeedY;
			this.move();
		}
	};
	Guard2.prototype.moveDown = function() {
		this.scanner.lookDown();
		if (map.notBoundary(this.x, this.y, "down")){
			this.y += this.moveSpeedY;
			this.move();
		}
	};
	window.Guard2 = Guard2;
} (window));		