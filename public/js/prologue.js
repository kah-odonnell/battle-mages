"use strict";
var canvas;
var stage, w, h, loader;
var player;
var map;
var level;

var sortFunction = function(obj1, obj2, options) {
    if (obj1.y > obj2.y) { return 1; }
    if (obj1.y < obj2.y) { return -1; }
    return 0;
}
function signOf(number) {
	return number?number<0?-1:1:0
}

function init() {
	stage = new createjs.Stage("canvas");
	stage.enableMouseOver(20);
	canvas = document.getElementById("canvas")
	// grab canvas width and height for later calculations
	w = stage.canvas.width;
	h = stage.canvas.height;

	var manifest = [
		{src:"../sprites/thief_70.png", id:"thief"},
		{src:"../sprites/messenger_70.png", id:"messenger"},
		{src:"../sprites/guard_70.png", id:"egyptian"},
		{src:"../sprites/knight_92.png", id:"knight"},

		{src:"../imgs/tiles/city.png", id:"city"},
		{src:"../imgs/tiles/spaceTileLarge.png", id:"spaceTile"},
		{src:"../imgs/tiles/blackTile.png", id:"blackTile"},
		{src:"../imgs/tiles/templereversewall1.png", id:"templereversewall1"},
		{src:"../imgs/tiles/templereversebottomleft.png", id:"templereversebottomleft"},
		{src:"../imgs/tiles/templereversebottomright.png", id:"templereversebottomright"},
		{src:"../imgs/tiles/templereversetopright.png", id:"templereversetopright"},
		{src:"../imgs/tiles/templereversetopleft.png", id:"templereversetopleft"},
		{src:"../imgs/tiles/templebackwall0.png", id:"templebackwall0"},
		{src:"../imgs/tiles/templebackwall1.png", id:"templebackwall1"},
		{src:"../imgs/tiles/templebackwalldoor.png", id:"templebackwalldoor"},
		{src:"../imgs/tiles/templebackcornerL.png", id:"templebackcornerL"},
		{src:"../imgs/tiles/templefrontcornerL.png", id:"templefrontcornerL"},
		{src:"../imgs/tiles/templeleftwall1.png", id:"templeleftwall1"},
		{src:"../imgs/tiles/templebackcornerR.png", id:"templebackcornerR"},
		{src:"../imgs/tiles/templefrontcornerR.png", id:"templefrontcornerR"},
		{src:"../imgs/tiles/templerightwall1.png", id:"templerightwall1"},
		{src:"../imgs/tiles/snowtile1.png", id:"snowtile1"},
		{src:"../imgs/tiles/snowtileN.png", id:"snowtileN"},

		{src:"../imgs/dialogs/spacebar.png", id:"spacebarIcon"},
		{src:"../imgs/dialogs/dialogbox.png", id:"dialogbox"},
		{src:"../imgs/dialogs/dialogarrow.png", id:"dialogarrow"},
		{src:"../imgs/dialogs/knight1.png", id:"knight1"},
		{src:"../imgs/dialogs/morganprologue.png", id:"morganprologue"},

		{src:"../imgs/battles/gui/paperbutton.png", id:"paperbutton"},
		{src:"../imgs/battles/gui/rockbutton.png", id:"rockbutton"},
		{src:"../imgs/battles/gui/scissorsbutton.png", id:"scissorsbutton"},

		{src:"../imgs/battles/units/darkmagician.png", id:"darkmagician"},

		{src:"../imgs/battles/backgrounds/battlebkgd1.png", id:"battlebkgd1"},
	];

	loader = new createjs.LoadQueue(false);
	loader.on("progress", handleProgress);
	loader.on("complete", handleComplete);
	loader.loadManifest(manifest);
	
}

function handleProgress(event) {
	//console.log(event.loaded);
}

function handleComplete() {
	document.getElementById("loader").className = "";

	level = new Level(level1maps);
	map = level.maplist[0];
	stage.addChild(level);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
	level.tick();
	map.sortChildren(sortFunction);
	stage.update(event);

	//FPS/Debug info
	var color1 = "#FFFFFF"
	var fps = "";
	var playerCoords = "";
	if (!(player === null)) playerCoords = player.tileX + "," + player.tileY + ":";
	fps = playerCoords + Math.floor(createjs.Ticker.getMeasuredFPS());
	if (Math.floor(createjs.Ticker.getMeasuredFPS()) < 55) {
		color1 = "#FF0000"
	}
	$("#data").css("color",color1).html(fps);
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

var Key = {
	_pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	  
	isDown: function(keyCode) {
	  return this._pressed[keyCode];
	},
	  
	onKeydown: function(event) {
	  this._pressed[event.keyCode] = true;
	},
	  
	onKeyup: function(event) {
	  delete this._pressed[event.keyCode];
	}
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
