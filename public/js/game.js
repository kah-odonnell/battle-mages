bm.Game = class {
	constructor() {
		this.setup();
	}

	tick(event) {
		if (this.mapGraph) {
			this.mapGraph.tick(event);
		} 
		this.stage.update(event);
		this.updateFPSCounter();
	}

	setup() {
		this.setupCanvas();
		this.setupStage();
		this.setupLoadingText();
		this.loadAssets();
		//bm.gamedata.tiledata.addComponents();
	}

	addTicker() {
		createjs.Ticker.setFPS(bm.globals._FPS);
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", function() {
			bm.gameInstance.tick();
		});
	}

	buildWorld() {
		this.player = new bm.Player();
		this.mapGraph = bm.maps.MapGraphMaker.getMapGraph("DEMO");
		this.mapGraph.addPlayer();
		this.addCurrentMapToStage();
		this.mapGraph.getCurrentMap().centerOn(this.player);
		bm.gameInstance.addTicker();
	}

	addCurrentMapToStage() {
		this.mapGraph.getCurrentMap().scaleX = bm.globals._pixelScale;
		this.mapGraph.getCurrentMap().scaleY = bm.globals._pixelScale;
		this.stage.addChild(this.mapGraph.getCurrentMap());
	}

	resetMapOnStage() {
		this.stage.removeAllChildren();
		this.mapGraph.getCurrentMap().scaleX = bm.globals._pixelScale;
		this.mapGraph.getCurrentMap().scaleY = bm.globals._pixelScale;
		this.stage.addChild(this.mapGraph.getCurrentMap());
	}

	setupCanvas() {
		var canvas = document.getElementById('canvas');
		canvas.width = bm.globals._canvasWidth;
		canvas.height = bm.globals._canvasHeight;
		$("canvas").css("width", bm.globals._canvasScale+"00%")
		$("canvas").css("height", bm.globals._canvasScale+"00%")
	}

	resetCanvasAndStage() {
		bm.globals._canvasWidth = window.innerWidth;
		bm.globals._canvasHeight = window.innerHeight;
		var canvas = document.getElementById('canvas');
		canvas.width = bm.globals._canvasWidth;
		canvas.height = bm.globals._canvasHeight;
		this.stage.updateViewport(bm.globals._canvasWidth, bm.globals._canvasHeight)
	}

	setupStage() {
		this.stage = new createjs.StageGL('canvas');
	}

	setupLoadingText() {
		var fontSize = bm.globals._fontSize.big;
		this.loadText = new createjs.Text('Loading   0%', fontSize + 'px Arial', '#FFFFFF');
		var b = this.loadText.getBounds();
		this.loadText.x = 0;
		this.loadText.y = 0;
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

	updateFPSCounter() {
		//FPS/Debug info
		var color1 = "#FFFFFF"
		var fps = Math.floor(createjs.Ticker.getMeasuredFPS());
		if (Math.floor(createjs.Ticker.getMeasuredFPS()) < 55) {
			color1 = "#FF0000"
		}
		var coords = bm.gameInstance.player.getCoords()
		$("#framerateCounter").css("color",color1).html(fps + " - " + coords.tileX + ", " + coords.tileY);
	}

	showInteractInfo(data) {
		
	}

	handleLoadProgress(event) {
		var progress = Math.ceil(event.progress*100);
		this.loadText.text = 'Loading   ' + progress + '%';
		this.stage.update(event);
	}

	handleLoadComplete(event) {
		this.loadText.text = 'Loading   100%';
		this.stage.removeChild(this.loadText);
		this.buildWorld();
		bm.assets.removeAllEventListeners();
	}
}