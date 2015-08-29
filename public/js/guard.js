(function (window) {
	var Guard = function(path, personality, guardmap){
		this.initialize(path, personality, guardmap);
	}
	var g = Guard.prototype = new createjs.Container();

	g.Container_initialize = g.initialize;
	g.initialize = function(path, personality, guardmap) {
		this.Container_initialize();
		this.x = (path[0][0]*40) + 20;
		this.y = (path[0][1]*40) + 20;
		var data = new createjs.SpriteSheet({
			"images": [loader.getResult("egyptian")],
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
		this.path = path;
		this.personality = personality;
		this.pathCurrent = 0;
		this.scaleX = -1;
		this.paused = false;
		this.moveSpeedX = 2;
		this.moveSpeedY = 1.5;
		this.offsetX; this.offsetY;
		this.tileX; this.tileY;
		this.targetX; this.targetY;
		this.direction;
		this.chaseReady; this.bestX; this.bestY;
		this.scanner = new Scanner(this, guardmap);
		guardmap.addChild(this.scanner);
		this.setIdle();
	}
	Guard.prototype.tick = function() {
		this.tileX = Math.floor(this.x/40);
		this.tileY = Math.floor(this.y/40);
		if (!(map.alarm)) {
			if (!(this.paused)){
				this.patrol();
			} 			
		} else {
			this.chase();
		}

		this.scanner.tick(this.tileX, this.tileY);
	}

	Guard.prototype.setIdle = function() {
		this.removeChild(this.run);
		this.removeChild(this.walk);
		this.addChild(this.idle);
	}
	Guard.prototype.setRun = function() {
		this.moveSpeedX = 2;
		this.moveSpeedY = 1.5;
		this.removeChild(this.walk);
		this.removeChild(this.idle);
		this.addChild(this.run);
	}
	Guard.prototype.setWalk = function() {
		this.moveSpeedX = 1.5;
		this.moveSpeedY = 1;
		this.removeChild(this.run);
		this.removeChild(this.idle);
		this.addChild(this.walk);
	}
	Guard.prototype.move = function(){
		if (map.alarm) {
			this.setRun();
		} else {
			this.setWalk();
		}
	}
	Guard.prototype.nextPath = function() {
		if (this.pathCurrent < (this.path.length - 1)){
			this.pathCurrent++;
		} else {
			this.pathCurrent = 0;
		}
	}
	Guard.prototype.patrol = function(){
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
			}, 2000)
			this.nextPath();
		}
	}

	Guard.prototype.chase = function(){
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

	Guard.prototype.randDirection = function(){
		var direction = Math.floor((Math.random()*4)+1)
		if (direction == 1) this.direction = "west";
		if (direction == 2) this.direction = "east";
		if (direction == 3) this.direction = "north";
		if (direction == 4) this.direction = "south";
	}

	Guard.prototype.setTarget = function(){
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

	Guard.prototype.moveTo = function(tileX, tileY) {
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

	Guard.prototype.moveLeft = function() {
		this.scaleX = 1;
		this.scanner.lookLeft();
		this.direction = "west";
		if (map.notBoundary(this.x, this.y, "left")){
			this.x -= this.moveSpeedX;
			this.move();
		}
	};
	Guard.prototype.moveRight = function() {
		this.scaleX = -1;
		this.scanner.lookRight();
		this.direction = "east";
		if (map.notBoundary(this.x, this.y, "right")){
			this.x += this.moveSpeedX;
	  		this.move();
		}
	};
	Guard.prototype.moveUp = function() {
		this.scanner.lookUp();
		this.direction = "north";
		if (map.notBoundary(this.x, this.y, "up")){
			this.y -= this.moveSpeedY;
			this.move();
		}
	};
	Guard.prototype.moveDown = function() {
		this.scanner.lookDown();
		this.direction = "south";
		if (map.notBoundary(this.x, this.y, "down")){
			this.y += this.moveSpeedY;
			this.move();
		}
	};
	window.Guard = Guard;
} (window));		