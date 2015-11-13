"use strict";
var canvas;
var stage, w, h, loader;
var player;
var map;
var level;
var mouseX, mouseY;
var loader, loadBar;

var sortFunction = function(obj1, obj2, options) {
    if (obj1.y > obj2.y) { return 1; }
    if (obj1.y < obj2.y) { return -1; }
    return 0;
}
function signOf(number) {
	return number?number<0?-1:1:0
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left
    mouseY = evt.clientY - rect.top
}
window.addEventListener('mousemove', getMousePos, false);
window.onkeydown = function(e) { 
  return !(e.keyCode == 32);
};

function init() {
	stage = new createjs.Stage("canvas");
	stage.enableMouseOver(20);
	canvas = document.getElementById("canvas")
	// grab canvas width and height for later calculations
	w = stage.canvas.width;
	h = stage.canvas.height;

	loadBar = new createjs.Text("Loading | 0%", "36px crazycreation", "#FFFFFF");
	var d = loadBar.getBounds()
	loadBar.x = w/2 - d.width/2;
	loadBar.y = h/2 - d.height/2;
	stage.addChild(loadBar);

	var manifest = [
		{src:"../imgs/sprites/knight_92.png", id:"knight"},
		{src:"../imgs/sprites/audrey_92.png", id:"audrey"},
		{src:"../imgs/sprites/audrey_p_92.png", id:"audreyparserrokah"},

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

		{src:"../imgs/tiles/grasstile1.png", id:"grasstile1"},
		{src:"../imgs/tiles/grasstile2.png", id:"grasstile2"},
		//{src:"../imgs/tiles/forest_reversewall1.png", id:"forest_reversewall1"},
		//{src:"../imgs/tiles/forest_reversebottomleft.png", id:"forest_reversebottomleft"},
		//{src:"../imgs/tiles/forest_reversebottomright.png", id:"forest_reversebottomright"},
		{src:"../imgs/tiles/forest_reversetopright.png", id:"forest_reversetopright"},
		{src:"../imgs/tiles/forest_reversetopleft.png", id:"forest_reversetopleft"},
		{src:"../imgs/tiles/forest_backwall0.png", id:"forest_backwall0"},
		{src:"../imgs/tiles/forest_backwall1.png", id:"forest_backwall1"},
		//{src:"../imgs/tiles/forest_backwalldoor.png", id:"forest_backwalldoor"},
		{src:"../imgs/tiles/forest_backcornerL.png", id:"forest_backcornerL"},
		//{src:"../imgs/tiles/forest_frontcornerL.png", id:"forest_frontcornerL"},
		{src:"../imgs/tiles/forest_leftwall0.png", id:"forest_leftwall0"},
		{src:"../imgs/tiles/forest_backcornerR.png", id:"forest_backcornerR"},
		//{src:"../imgs/tiles/forest_frontcornerR.png", id:"forest_frontcornerR"},
		{src:"../imgs/tiles/forest_rightwall0.png", id:"forest_rightwall0"},

		{src:"../imgs/dialogs/spacebar.png", id:"spacebarIcon"},
		{src:"../imgs/dialogs/dialogbox.png", id:"dialogbox"},
		{src:"../imgs/dialogs/dialogarrow.png", id:"dialogarrow"},
		{src:"../imgs/dialogs/knight1.png", id:"knight1"},
		{src:"../imgs/dialogs/morganprologue.png", id:"morganprologue"},

		{src:"../imgs/battles/gui/paperbutton.png", id:"paperbutton"},
		{src:"../imgs/battles/gui/rockbutton.png", id:"rockbutton"},
		{src:"../imgs/battles/gui/scissorsbutton.png", id:"scissorsbutton"},
		{src:"../imgs/battles/gui/cancel.png", id:"cancelbutton"},

		{src:"../imgs/battles/units/renmei.png", id:"renmei"},
		{src:"../imgs/battles/units/token_renmei.png", id:"token_renmei"},

		{src:"../imgs/battles/actions/arcanechain.png", id:"arcanechain"},
		{src:"../imgs/battles/actions/small_arcanechain.png", id:"small_arcanechain"},
		{src:"../imgs/battles/actions/neurolyse.png", id:"neurolyse"},
		{src:"../imgs/battles/actions/small_neurolyse.png", id:"small_neurolyse"},
		{src:"../imgs/battles/actions/mirrorforce.png", id:"mirrorforce"},
		{src:"../imgs/battles/actions/small_mirrorforce.png", id:"small_mirrorforce"},

		{src:"../imgs/battles/backgrounds/battlebkgd1.png", id:"battlebkgd1"},
	];

	loader = new createjs.LoadQueue(false);
	loader.on("progress", handleProgress);
	loader.on("complete", handleComplete);
	loader.loadManifest(manifest);
	
}

function handleProgress(event) {
	var progress = Math.ceil(loader.progress*100);
	loadBar.text = "Loading | " + progress + "%";
	console.log(progress);
}

function handleComplete() {
	document.getElementById("loader").className = "";
	stage.removeChild(loadBar);
	level = new Level(level1maps);
	player = level.initPlayer();
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
	$("#FPSdata").css("color",color1).html(fps);
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

var Key = {
	_pressed: {},

	LEFT: 65,
	UP: 87,
	RIGHT: 68,
	DOWN: 83,
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
window.addEventListener('keydown', function(event) { 
	event.preventDefault();
	Key.onKeydown(event); 
}, false);
