bm.ui.UI = class {
	constructor() {

	}

	tick(event) {
		this.updateFPSCounter();
		this.updateUI();
		this.handleTweens();
	}

	handleTweens() {
		for (var panelID in this._panelData) {
			if (this._panelData[panelID].tween) {
				if (!this._panelData[panelID].tween.startingValue) {
					var tweenData = this._panelData[panelID].tween;
					this._panelData[panelID].tween.startingValue = this._panelData[panelID].style[tweenData.property]
				}
				if (!this._panelData[panelID].tween.currentTime) {
					this._panelData[panelID].tween.currentTime = 0;
				}
				if (this._panelData[panelID].tween.currentTime == this._panelData[panelID].tween.totalTime) {
					var tweenData = this._panelData[panelID].tween;
					if (tweenData.onComplete()) {
						console.log("")
					}
				}
				var tweenData = this._panelData[panelID].tween;
				if (tweenData.currentTime || tweenData.currentTime == 0) {				
					var biggerValue = Math.max(tweenData.newValue, tweenData.startingValue);
					var smallerValue = Math.min(tweenData.newValue, tweenData.startingValue);
					if (tweenData.newValue < tweenData.startingValue) {
						this._panelData[panelID].style[tweenData.property] = (biggerValue - smallerValue) - (biggerValue - smallerValue)*(tweenData.currentTime/tweenData.totalTime)
					} else {
						this._panelData[panelID].style[tweenData.property] = (smallerValue) + (biggerValue - smallerValue)*(tweenData.currentTime/tweenData.totalTime)
					}
					this._panelData[panelID].tween.currentTime++;
				}
			}
		}
		//this.removeTransparentPanels();
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
		}
	}

	updateUI() {
		$("#ui").html(this.getHmtl());
	}

	getHmtl() {
		var html = ""
		for (var panelID in this._panelData) {
			html = html + this.getPanelHtml(panelID);
		}
		return html;
	}

	getPanelHtml(panelID) {
		var data = this._panelData[panelID];
		var styleString = this.getStyle(data.style);
		var html = "<div style=\""+styleString+"\">" + data.innerHtml + "</div>"
		return html;
	}

	getStyle(styleObj) {
		var styleString = "";
		for (var styleName in styleObj) {
			styleString = styleString + styleName + ": " + styleObj[styleName] + "; "
		}
		return styleString;
	}

	fadeOutPanel(panelID, ticks) {
		this._panelData[panelID].tween = {
			totalTime: ticks,
			newValue: 0,
			property: "opacity",
			onComplete: function() {

			}
		}
	}

	removePanel(panelID) {
		delete this._panelData[panelID];
	}

	removeTransparentPanels() {
		for (var panelID in this._panelData) {
			var panelData = this._panelData[panelID];
			if (panelData.opacity <= 0) {
				this.removePanel(panelID);
			}
		}
	}
}