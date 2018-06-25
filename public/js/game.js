bm.Game = class {
	constructor() {
		this.setup();
	}

	tick(event) {
		if (this.mapGraph) {
			this.mapGraph.tick(event);
		} 
		this.userInterface.tick(event);
		this.stage.update(event);
	}

	setup() {
		this.setupCanvas();
		this.setupStage();
		this.setupUserInterface();
		this.addTicker();
		this.userInterface.addInitialBlackout();
		this.loadAssets();
		//bm.gamedata.tiledata.addComponents();
	}

	setupCanvas() {
		var canvas = document.getElementById('canvas');
		canvas.width = bm.globals._canvasWidth;
		canvas.height = bm.globals._canvasHeight;
		$("canvas").css("width", bm.globals._canvasScale+"00%")
		$("canvas").css("height", bm.globals._canvasScale+"00%")
	}

	setupStage() {
		this.stage = new createjs.StageGL('canvas');
		this.stage.update();
	}

	setupUserInterface() {
		this.userInterface = new bm.ui.UserInterface();
	}

	loadAssets() {
		this.userInterface.setupLoadingText();
		var manifest = bm.globals._loadManifest;
		bm.assets = new createjs.LoadQueue(false);
		bm.assets.setMaxConnections(10);
		bm.assets.on('progress', this.handleLoadProgress, this);
		bm.assets.on('complete', this.handleLoadComplete, this)
		bm.assets.loadManifest(manifest);
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

	resetCanvasAndStage() {
		bm.globals._canvasWidth = window.innerWidth;
		bm.globals._canvasHeight = window.innerHeight;
		var canvas = document.getElementById('canvas');
		canvas.width = bm.globals._canvasWidth;
		canvas.height = bm.globals._canvasHeight;
		this.stage.updateViewport(bm.globals._canvasWidth, bm.globals._canvasHeight)
	}

	handleLoadProgress(event) {
		var progress = Math.ceil(event.progress*100);
		if (bm.gameInstance.userInterface) bm.gameInstance.userInterface.updateLoadingText(progress);
	}

	handleLoadComplete(event) {
		bm.gameInstance.userInterface.loadComplete();
		bm.gameInstance.buildWorld();
		bm.assets.removeAllEventListeners();
	}
}