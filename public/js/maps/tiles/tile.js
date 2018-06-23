bm.maps.Tile = class extends bm.core.Container {
	constructor(images, attributes, components) {
		super();
		this.setupTile(images, attributes, components);
	}

	setupTile(images, attributes, components) {
		this._images = images;
		this._attributes = attributes;
		this._components = components;
	}

	getImages() {
		return this._images;
	}

	getGeometry() {
		return false;
	}

	getComponents() {
		return this._components;
	}

	getBackgroundImage() {
		return this.backgroundImage;
	}
}