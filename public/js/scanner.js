/**
 * scanner.js
 * 
 * An npc child that tells the npc and alerts the map when the player comes into 
 * the npc's visual range
 *
 * Has a container prototype just in case I wanted to add visual effect
 *
**/

(function (window) {
	var Scanner = function Scanner(npc, map){
		this.initialize(npc, map);
	}
	var s = Scanner.prototype = new createjs.Container();
	s.Container_initialize = s.initialize;
	s.initialize = function(npc, map){
		this.Container_initialize();
		this.npc = npc;
		if (this.npc.isHostile) {
			this.viewDist = 8;
		} else {
			this.viewDist = 2;
		}
		this.active;
		this.tileX = 0;
		this.tileY = 0;
		this.direction = "west";
		this.prevdirection;
		this.active = [[0,0]];		
		this.array = map.array;
	};
	Scanner.prototype.tick = function(tileX, tileY) {
		this.tileX = tileX;
		this.tileY = tileY;
		if ((this.active[0][0] != tileX) || (this.active[0][1] != tileY)) {
			this.active = [[tileX, tileY]];
			this.updateActive();
		}
		if (this.prevdirection != this.direction) {
			this.updateActive();
		}
		this.prevdirection = this.direction;
		this.check();
	};
	Scanner.prototype.lookLeft = function() {
		this.direction = "west";
	};
	Scanner.prototype.lookRight = function() {
		this.direction = "east";
	};
	Scanner.prototype.lookUp = function() {
		this.direction = "north"
	};
	Scanner.prototype.lookDown = function() {
		this.direction = "south"
	};
	Scanner.prototype.check = function() {
		var isCenterX = false;
		var isCenterY = false;
		var inLineOfSight = false;
		if ((this.npc.x - 10 < player.x) && (player.x < this.npc.x + 10)) {
			isCenterX = true;
		}
		if ((this.npc.y - 10 < player.y) && (player.y < this.npc.y + 10)) {
			isCenterY = true;
		}
		for (var i = this.active.length - 1; i >= 0; i--) {
			if ((this.active[i][0] == player.tileX) && (this.active[i][1] == player.tileY)) {
				if ((this.direction == "east" || this.direction == "west") && isCenterY) {
					inLineOfSight = true;		
				}
				if ((this.direction == "north" || this.direction == "south") && isCenterX) {
					inLineOfSight = true;		
				}
			}
		}
		if ((player.tileX == this.npc.tileX) && (player.tileY == this.npc.tileY)) {
			if ((this.direction == "east") && (player.x < this.npc.x + 20)) inLineOfSight = false;
			if ((this.direction == "west") && (player.x > this.npc.x - 20)) inLineOfSight = false;
			if ((this.direction == "south") && (player.y < this.npc.y - 20)) inLineOfSight = false;
			if ((this.direction == "north") && (player.y > this.npc.y + 20)) inLineOfSight = false;
		}
		if (inLineOfSight) {
			if (this.npc.isHostile) {
				map.alarm = true;
				level.pauseOtherNPCs(this.npc);
			}
			this.npc.seesPlayer = true;	
		} 
	}
	Scanner.prototype.updateActive = function() {
		if (this.direction == "west") {
			for (var i = 0; i <= this.viewDist; i++) {
				if (map.tileFloor(this.array[this.tileY][this.tileX - i])) {
					this.active.push([this.tileX-i, this.tileY])
				} else {
					break;
				}
			}
		}

		else if (this.direction == "east") {
			for (var i = 0; i <= this.viewDist; i++) {
				if (map.tileFloor(this.array[this.tileY][this.tileX + i])) {
					this.active.push([this.tileX+i, this.tileY])
				} else {
					break;
				}
			}
		}

		if (this.direction == "north") {
			for (var i = 0; i <= this.viewDist; i++) {
				if (map.tileFloor(this.array[this.tileY][this.tileX - i])) {
					this.active.push([this.tileX-i, this.tileY])
				} else {
					break;
				}
			}
		}

		else if (this.direction == "south") {
			for (var i = 0; i <= this.viewDist; i++) {
				if (map.tileFloor(this.array[this.tileY][this.tileX + i])) {
					this.active.push([this.tileX+i, this.tileY])
				} else {
					break;
				}
			}
		}
	}
	window.Scanner = Scanner;
} (window));		