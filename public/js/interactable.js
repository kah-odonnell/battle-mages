(function (window) {
	var Interactable = function(){
		this.initialize();
	}
	var d = Interactable.prototype = new createjs.Container();
	d.Container_initialize = d.initialize;
	d.initialize = function(name, moodData, initData){

	}
	Interactable.prototype.tick = function() {
	}
	window.Interactable = Interactable;
} (window));		