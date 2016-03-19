(function (window) {
/**
 * mapevent.js
 * 
 * Triggers map changes, battles, and camera effects
 * Constructor takes a dictionary such as:
 *	{"pan": "player", "mapchange": "templeDoorEast", "battleinit": "Temora Tengarten"}
 *
 * A MapEvent can be created by:
 *  a Dialog
 *	an InteractPrompt (when player attempts to use a door)
 *  a Map (when player attempts to walk into a tile with an exit)
 *
 * Has a container prototype just in case I wanted to add visual effect
 *
**/
	function MapEvent(mapeventdict){
		for (var key in mapeventdict) {
			if (key == "pan") {
				if (mapeventdict[key] == "player") {
					this.pan(player);
				}
				var activeNPCs = level.maplist[level.currentmap].npcs
				for (var i = 0; i < activeNPCs.length; i++ ) {
					if (mapeventdict[key] == activeNPCs[i].npcname) {
						this.pan(activeNPCs[i])
					}
				}

			}
			if (key == "follow") {
				
			}
			if (key == "mapchange") {
				var map_id_list = gamedata.maps.map_id_list;
				for (var i = 0; i < map_id_list.length; i++) {
					var map_i = map_id_list[i]
					var entranceCoords = level.maplist[map_i].entrances[mapeventdict[key]];
					if (!(entranceCoords === undefined) && (level.maplist[level.currentmap] != level.maplist[map_i])) {
						level.changeMaps(mapeventdict[key], map_i);
					}
				}
			}
			if (key == "event") {
				
			}
			if (key == "battleinit") {
				var activeNPCs = level.maplist[level.currentmap].npcs
				for (var i = 0; i < activeNPCs.length; i++ ) {
					if (mapeventdict[key] == activeNPCs[i].name) {
						level.activebattle = new Battle(player, activeNPCs[i]);
						level.activebattle.initialize();
						break;
					}
				}
			}
		}
	}
	MapEvent.prototype.initialize = function(){

	}
	MapEvent.prototype.pan = function(obj) {
		var tileX = Math.floor(obj.x/40);
		var tileY = Math.floor(obj.y/40);
		map.centerOn(tileX, tileY, 2000);
	}
	MapEvent.prototype.tick = function() {

	}
	window.MapEvent = MapEvent;
} (window));		