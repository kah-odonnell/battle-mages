bm.ui.UserInterface = class extends bm.ui.UI {
	constructor() {
		super();
		this._textData = {};
		this._panelData = {};
		this._tweenData = {};
		this._queue = [];
	}

	loadComplete() {
		this._panelData.blackoutPanel.tween = {
			totalTime: 30,
			newValue: 0,
			property: "opacity",
			onComplete: function () {
				bm.gameInstance.userInterface.fadeOutPanel("loadText", 30);
			}
		}
		this.completeLoadingText();
	}

	addBlackout(onComplete) {
		this._panelData.blackoutPanel = {
			style: {
				position: "absolute",
				background: "#000000",
				width: canvas.width + "px",
				height: canvas.height + "px",
				opacity: 0
			},
			innerHtml: "",
			id: "blackoutPanel",
			tween: {
				totalTime: 30,
				newValue: 1,
				property: "opacity",
				onComplete: function () {
					onComplete();
					bm.gameInstance.userInterface.fadeOutPanel("blackoutPanel", 30);
				}
			}
		};
	}

	addInitialBlackout() {
		this._panelData.blackoutPanel = {
			style: {
				position: "absolute",
				background: "#000000",
				width: canvas.width + "px",
				height: canvas.height + "px",
				opacity: 1
			},
			innerHtml: "",
			id: "blackoutPanel",
		};
	}

	removeBlackout() {
		delete this._panelData.blackoutPanel;
	}

	setupLoadingText() {
		this._panelData.loadText = {
			style: {
				position: "absolute",
				color: "white",
				"font-size": bm.globals._fontSize.big + "px",
				"font-family": "disposabledroid",
				opacity: 1
			},
			innerHtml: "Loading 0%",
			id: "loadText"
		}
	}

	updateLoadingText(progress) {
		this._panelData.loadText.innerHtml = 'Loading ' + progress + '%';
	}

	completeLoadingText() {
		this._panelData.loadText.innerHtml = 'Loading Done';
	}

	showInteractInfo(data) {
		
	}

	updateFPSCounter() {
		//FPS/Debug info
		if (bm.keys.isDown(bm.keys.SHIFT)) {
			var coords = bm.gameInstance.player.getCoords()
			var fps = Math.floor(createjs.Ticker.getMeasuredFPS());
			var color = "#FFFFFF"
			if (fps < 55) {
				color = "#FF0000"
			}
			fps = fps + " - " + coords.tileX + ", " + coords.tileY
			fps = fps + " [x: " + coords.x + ", y: " + coords.y + "]"
			$("#framerateCounter").css("color",color).html(fps);
		} else {
			$("#framerateCounter").html("");
		}
	}
}