bm.core.Sprite = class extends createjs.Sprite {
	constructor(data) {
		super(data);
	}

	addToContainer(container) {
		this.addChild(container);
	}

	addListToContainer(list) {
		if (!list) return;
		for (var i = 0; i < list.length; i++) {
			this.addChild(list[i]);
		}
	}
}