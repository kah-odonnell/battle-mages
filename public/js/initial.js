/*

*/
"use strict";
var canvas;
var stage, w, h, loader;
var player;
var gamedata;
var map;
var level;
var mouseX, mouseY;
var loader, loadBar;

//disable selection of the canvas
$("#canvas").disableSelection();

function sortFunction(obj1, obj2, options) {
    if (obj1.y > obj2.y) { return 1; }
    if (obj1.y < obj2.y) { return -1; }
    return 0;
}
function distanceFormula(x1, x2, y1, y2) {
	var d = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
	return d;
}
function signOf(number) {
	return number?number<0?-1:1:0
}
function getMousePos(evt) {
	if (canvas != undefined) {
		var rect = canvas.getBoundingClientRect();
		mouseX = evt.clientX - rect.left
		mouseY = evt.clientY - rect.top
	}
}
function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false
  }
  return obj[Symbol.iterator] !== undefined
}
function isObject ( obj ) {
   return obj && (typeof obj  === "object");
}
//check that every key/value pair in dict1 is also present in dict2
//used by Counter Tokens to see if they should trigger
function dict1_subsetOf_dict2(dict1, dict2) {
	var isSubset = true;
	for (var key in dict1) {
		if (!(key in dict2)) {
			return false;
		}
		else if (key in dict2) {
			var value1 = dict1[key];
			var value2 = dict2[key];
			var both_objects = (isObject(value1) && isObject(value2));
			if (both_objects) {
				if (!dict1_subsetOf_dict2(value1, value2)) {
					return false;
				}
			}
			else if (!(both_objects) && (value1 == value2)) {

			}
			else if (!(both_objects) && (value1 != value2)) {
				isSubset = false;
			}
		}
	}
	return isSubset;
}
function isEmpty(obj) {
	return Object.keys(obj).length === 0;
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
		//~~~ character sprites 
		{src:"../imgs/sprites/knight_92.png", id:"knight"},
		{src:"../imgs/sprites/audrey_92.png", id:"audrey"},
		{src:"../imgs/sprites/audrey_92.png", id:"audreyparserrokah"},
		//~~~ temple tiles
		{src:"../imgs/tiles/spaceTileLarge.png", id:"spaceTile"},
		{src:"../imgs/tiles/blackTile.png", id:"blackTile"},
		{src:"../imgs/tiles/temple/temple_southwestcorner_concave.png", id:"temple_southwestcorner_concave"},
		{src:"../imgs/tiles/temple/temple_southeastcorner_concave.png", id:"temple_southeastcorner_concave"},
		{src:"../imgs/tiles/temple/temple_northwestcorner_concave.png", id:"temple_northwestcorner_concave"},
		{src:"../imgs/tiles/temple/temple_northeastcorner_concave.png", id:"temple_northeastcorner_concave"},
		{src:"../imgs/tiles/temple/temple_northwestcorner_convex.png", id:"temple_northwestcorner_convex"},
		{src:"../imgs/tiles/temple/temple_northeastcorner_convex.png", id:"temple_northeastcorner_convex"},
		{src:"../imgs/tiles/temple/temple_southwestcorner_convex.png", id:"temple_southwestcorner_convex"},
		{src:"../imgs/tiles/temple/temple_southeastcorner_convex.png", id:"temple_southeastcorner_convex"},
		{src:"../imgs/tiles/temple/temple_northwall_0.png", id:"temple_northwall_0"},
		{src:"../imgs/tiles/temple/temple_northwall_1.png", id:"temple_northwall_1"},
		{src:"../imgs/tiles/temple/temple_northwall_door.png", id:"temple_northwall_door"},
		{src:"../imgs/tiles/temple/temple_southwall_1.png", id:"temple_southwall_1"},
		{src:"../imgs/tiles/temple/temple_westwall_1.png", id:"temple_westwall_1"},
		{src:"../imgs/tiles/temple/temple_eastwall_1.png", id:"temple_eastwall_1"},
		{src:"../imgs/tiles/snowtile1.png", id:"snowtile1"},
		//~~~ forest tiles
		{src:"../imgs/tiles/forest/grasstile1.png", id:"grasstile1"},
		{src:"../imgs/tiles/forest/grasstile2.png", id:"grasstile2"},
		{src:"../imgs/tiles/forest/forest_southwestcorner_concave.png", id:"forest_southwestcorner_concave"},
		{src:"../imgs/tiles/forest/forest_southeastcorner_concave.png", id:"forest_southeastcorner_concave"},
		{src:"../imgs/tiles/forest/forest_northwestcorner_concave.png", id:"forest_northwestcorner_concave"},
		{src:"../imgs/tiles/forest/forest_northeastcorner_concave.png", id:"forest_northeastcorner_concave"},
		{src:"../imgs/tiles/forest/forest_northwestcorner_convex.png", id:"forest_northwestcorner_convex"},
		{src:"../imgs/tiles/forest/forest_northeastcorner_convex.png", id:"forest_northeastcorner_convex"},
		{src:"../imgs/tiles/forest/forest_southwestcorner_convex.png", id:"forest_southwestcorner_convex"},
		{src:"../imgs/tiles/forest/forest_southeastcorner_convex.png", id:"forest_southeastcorner_convex"},
		{src:"../imgs/tiles/forest/forest_northwall_0.png", id:"forest_northwall_0"},
		{src:"../imgs/tiles/forest/forest_northwall_1.png", id:"forest_northwall_1"},
		{src:"../imgs/tiles/forest/forest_southwall_0.png", id:"forest_southwall_0"},
		{src:"../imgs/tiles/forest/forest_westwall_0.png", id:"forest_westwall_0"},
		{src:"../imgs/tiles/forest/forest_eastwall_0.png", id:"forest_eastwall_0"},

		//~~~ prompt icons
		{src:"../imgs/dialogs/spacebar.png", id:"spacebarIcon"},
		//~~~ dialog ui elements
		{src:"../imgs/dialogs/dialogbox.png", id:"dialogbox"},
		{src:"../imgs/dialogs/dialogarrow.png", id:"dialogarrow"},
		//~~~ dialog sprites
		{src:"../imgs/dialogs/knight1.png", id:"knight1"},
		{src:"../imgs/dialogs/morganprologue.png", id:"morganprologue"},
		//~~~ battle ui elements
		{src:"../imgs/battles/gui/healthbar.png", id:"healthbar"},
		{src:"../imgs/battles/gui/healthbar_red.png", id:"healthbar_red"},
		{src:"../imgs/battles/gui/healthempty.png", id:"healthempty"},
		{src:"../imgs/battles/gui/mana.png", id:"mana"},
		{src:"../imgs/battles/gui/unit.png", id:"unit"},
		{src:"../imgs/battles/gui/counter.png", id:"counter"},
		{src:"../imgs/battles/gui/infoswirl.png", id:"infoswirl"},
		{src:"../imgs/battles/gui/marker_default.png", id:"marker_default"},
		{src:"../imgs/battles/gui/marker_target.png", id:"marker_target"},
		{src:"../imgs/battles/gui/paperbutton.png", id:"paperbutton"},
		{src:"../imgs/battles/gui/rockbutton.png", id:"rockbutton"},
		{src:"../imgs/battles/gui/scissorsbutton.png", id:"scissorsbutton"},
		{src:"../imgs/battles/gui/cancel.png", id:"cancelbutton"},
		{src:"../imgs/battles/gui/health.png", id:"health_icon"},
		{src:"../imgs/battles/gui/attack.png", id:"attack_icon"},
		{src:"../imgs/battles/gui/defense.png", id:"defense_icon"},
		//~~~ battle units and unit tokens
		{src:"../imgs/battles/units/sprite_shiren.png", id:"shiren_sprite"},
		{src:"../imgs/battles/units/big_shiren_icon.png", id:"shiren_icon"},
		{src:"../imgs/battles/units/small_shiren.png", id:"small_shiren"},

		{src:"../imgs/battles/units/sprite_matriarch.png", id:"sprite_matriarch"},
		{src:"../imgs/battles/units/big_matriarch_icon.png", id:"matriarch_icon"},
		{src:"../imgs/battles/units/small_matriarch.png", id:"small_matriarch"},

		{src:"../imgs/battles/units/sprite_pyraprisma.png", id:"pyraprisma_sprite"},
		{src:"../imgs/battles/units/big_pyraprisma_icon.png", id:"pyraprisma_icon"},
		{src:"../imgs/battles/units/small_pyraprisma.png", id:"small_pyraprisma"},

		{src:"../imgs/battles/units/big_audrey_icon.png", id:"audrey_icon"},
		{src:"../imgs/battles/units/small_audrey.png", id:"small_audrey"},
		//~~~ battle action tokens, big and small
		{src:"../imgs/battles/actions/big_neurolyse.png", id:"neurolyse"},
		{src:"../imgs/battles/actions/small_neurolyse.png", id:"small_neurolyse"},
		{src:"../imgs/battles/actions/big_swordofsmoke.png", id:"swordofsmoke"},
		{src:"../imgs/battles/actions/small_swordofsmoke.png", id:"small_swordofsmoke"},
		{src:"../imgs/battles/actions/big_arcanechain.png", id:"arcanechain"},
		{src:"../imgs/battles/actions/small_arcanechain.png", id:"small_arcanechain"},
		{src:"../imgs/battles/actions/big_manatap.png", id:"manatap"},
		{src:"../imgs/battles/actions/small_manatap.png", id:"small_manatap"},
		{src:"../imgs/battles/actions/big_amplifyattack.png", id:"amplifyattack"},
		{src:"../imgs/battles/actions/small_amplifyattack.png", id:"small_amplifyattack"},
		//~~~ Token components
		{src:"../imgs/battles/components/frame_attack.png", id:"frame_attack"},
		{src:"../imgs/battles/components/frame_skill.png", id:"frame_skill"},
		{src:"../imgs/battles/components/frame_counter.png", id:"frame_counter"},
		{src:"../imgs/battles/components/frame_unit.png", id:"frame_unit"},
		{src:"../imgs/battles/components/frame_mage.png", id:"frame_mage"},
		{src:"../imgs/battles/components/attribute_illusion_magic.png", id:"attribute_illusion_magic"},
		//~~~ battle backgrounds
		{src:"../imgs/battles/backgrounds/battlebkgd2.png", id:"battlebkgd1"},
	];

	loader = new createjs.LoadQueue(false);
	loader.setMaxConnections(10);
	loader.on("progress", handleProgress);
	loader.on("complete", handleComplete);
	loader.loadManifest(manifest);
}

function handleProgress(event) {
	var progress = Math.ceil(loader.progress*100);
	loadBar.text = "Loading | " + progress + "%";
	stage.update(event);
}

function handleComplete(event) {
	var progress = Math.ceil(loader.progress*100);
	loadBar.text = "Loading | " + progress + "%";
	stage.update(event);
	document.getElementById("loader").className = "";
	stage.removeChild(loadBar);
	gamedata = new GameData();
	level = new Level(gamedata);
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
	if (!(player === null)) playerCoords = player.tileX + "," + player.tileY + " | ";
	fps = playerCoords + Math.floor(createjs.Ticker.getMeasuredFPS());
	if (Math.floor(createjs.Ticker.getMeasuredFPS()) < 55) {
		color1 = "#FF0000"
	}
	$("#FPSdata").css("color",color1).html(fps);
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
	event.preventDefault(); //prevents spacebar from scrolling the page
	Key.onKeydown(event); 
}, false);
