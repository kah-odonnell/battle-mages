bm.ui.Container = class extends createjs.Container {
	constructor() {
		super();
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