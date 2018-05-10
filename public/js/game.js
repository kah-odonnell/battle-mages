bm.Game = class {
	constructor() {
		this.setup();
	}

	tick(event) {
		if (bm.gameInstance.mapGraph) {
			bm.gameInstance.mapGraph.currentMap.tick(event);
		} 
		bm.gameInstance.stage.update(event);
	}

	setup() {
		this.setupCanvas();
		this.setupStage();
		this.setupLoadingText();
		this.loadAssets();
	}

	addTicker() {
		createjs.Ticker.setFPS(bm.globals._FPS);
		createjs.Ticker.addEventListener("tick", function() {
			bm.gameInstance.tick();
		});
	}

	buildWorld() {
		this.player = new bm.Player();
		this.mapGraph = new bm.maps.MapGraph1();
		this.mapGraph.addPlayer();
		this.addCurrentMapToStage();
	}

	addCurrentMapToStage() {
		this.mapGraph.currentMap.scaleX = bm.globals._pixelScale;
		this.mapGraph.currentMap.scaleY = bm.globals._pixelScale;
		this.stage.addChild(this.mapGraph.currentMap);
	}

	setupCanvas() {
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		bm.globals.refreshGlobals();
		canvas.width = bm.globals._canvasWidth;
		canvas.height = bm.globals._canvasHeight;
		$("canvas").css("width", bm.globals._canvasScale+"00%")
		$("canvas").css("height", bm.globals._canvasScale+"00%")
	}

	resetCanvas() {
		var canvasHolder = document.getElementById('canvasHolder');
		canvasHolder.style.width = window.innerWidth;
		canvasHolder.style.height = window.innerHeight;
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	setupStage() {
		this.stage = new createjs.Stage('canvas');
		this.stage.enableMouseOver();
	}

	setupLoadingText() {
		var fontSize = bm.globals._fontSize.big;
		this.loadText = new createjs.Text('Loading   0%', fontSize + 'px disposabledroid', '#FFFFFF');
		var b = this.loadText.getBounds();
		this.loadText.x = this.stage.canvas.width/2 - b.width/2;
		this.loadText.y = this.stage.canvas.height/2 - b.height/2;
		this.stage.addChild(this.loadText);
	}

	loadAssets() {
		var manifest = bm.globals._loadManifest;
		bm.assets = new createjs.LoadQueue(false);
		bm.assets.setMaxConnections(10);
		bm.assets.on('progress', this.handleLoadProgress, this);
		bm.assets.on('complete', this.handleLoadComplete, this)
		bm.assets.loadManifest(manifest);
	}

	handleLoadProgress(event) {
		var progress = Math.ceil(event.progress*100);
		this.loadText.text = 'Loading   ' + progress + '%';
		this.stage.update(event);
	}

	handleLoadComplete(event) {
		this.loadText.text = 'Loading   100%';
		this.stage.update(event);	
		this.stage.removeChild(this.loadText);
		this.buildWorld();
	}
}