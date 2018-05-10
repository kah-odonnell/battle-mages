bm.ui.Container = class extends createjs.Container {
	constructor() {
		super();
	}

	addToContainer(container) {
		this.addChild(container);
	}
}