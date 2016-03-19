(function (window) {
	var GameData = function GameData(){
		this.maps = new MapData();
		this.npcs = new NPCData();
		this.dialogs = new DialogData();
	}
	window.GameData = GameData;
} (window));		