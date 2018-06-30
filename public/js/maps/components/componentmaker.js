bm.maps.ComponentMaker = class {
	static getComponents(tileID) {
		var components = [];
		switch(tileID) {
			case "F_E0000": 
				break;
			case "F_FLWR0": 
				var flowername = "redflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				components = [flower1, flower2, flower3, flower4, flower5, flower6];
				break;
			case "F_FLWR1": 
				var flowername = "whiteflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				components = [flower1, flower2, flower3, flower4, flower5, flower6];
				break;
			case "F_FLWR2": 
				var flowername = "blueflower";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				components = [flower1, flower2, flower3, flower4, flower5, flower6];
				break;
			case "F_FLWRR": 
				var flowername = "blueflower";
				var getFlower = function() {
					var list = ["blueflower", "redflower", "whiteflower", "bluebonnet", "fern", "grass", "grass2", "grass3", "fern", "grass", "grass2"]
					var rand = Math.floor(Math.random() * list.length);
					return new createjs.Bitmap(bm.assets.getResult(list[rand]));
				}
				var setFlowerVals = function(flower, iteration) {
					var bounds = flower.getBounds();
					var x; var y;
					if (i == 0) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2);
						y = Math.floor(Math.random() * bm.globals._tileSize/2);
					}
					if (i == 1) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
						y = Math.floor(Math.random() * bm.globals._tileSize/2);
					}
					if (i == 2) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2);
						y = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
					}
					if (i == 3) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
						y = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
					}
					flower.x = x;
					flower.y = y;
					flower.regX = bounds.width/2;
					flower.regY = bounds.height;
				}
				for (var i = 0; i < 1; i++) {
					var flower = getFlower()
					setFlowerVals(flower, i);
					components.push(flower);
				}
				break;
			case "F_FLWRX": 
				var flowername = "blueflower";
				var getFlower = function() {
					var list = ["blueflower", "redflower", "whiteflower", "bluebonnet", "fern", "grass", "grass2", "grass3", "fern", "grass", "grass2"]
					var rand = Math.floor(Math.random() * list.length);
					return new createjs.Bitmap(bm.assets.getResult(list[rand]));
				}
				var setFlowerVals = function(flower, iteration) {
					var bounds = flower.getBounds();
					var x; var y;
					if (i == 0) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2);
						y = Math.floor(Math.random() * bm.globals._tileSize/2);
					}
					if (i == 1) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
						y = Math.floor(Math.random() * bm.globals._tileSize/2);
					}
					if (i == 2) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2);
						y = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
					}
					if (i == 3) {
						x = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
						y = Math.floor(Math.random() * bm.globals._tileSize/2) + bm.globals._tileSize/2;
					}
					flower.x = x;
					flower.y = y;
					flower.regX = bounds.width/2;
					flower.regY = bounds.height;
				}
				for (var i = 0; i < 2; i++) {
					var flower = getFlower()
					setFlowerVals(flower, i);
					components.push(flower);
				}
				break;
			case "F_FLWR3": 
				var flowername = "bluebonnet";
				var getFlower = function(flowername) {
					return new createjs.Bitmap(bm.assets.getResult(flowername));
				}
				var flower1 = getFlower(flowername);
				var flowerBounds = flower1.getBounds();
				flower1.x = bm.globals._tileSize*(1/4); flower1.y = bm.globals._tileSize*(1/3); 
				flower1.regX = flowerBounds.width/2; flower1.regY = flowerBounds.height;
				var flower2 = getFlower(flowername);
				flower2.x = bm.globals._tileSize*(3/4); flower2.y = bm.globals._tileSize*(1/3); 
				flower2.regX = flowerBounds.width/2; flower2.regY = flowerBounds.height;
				var flower3 = getFlower(flowername);
				flower3.x = bm.globals._tileSize*(1/4); flower3.y = bm.globals._tileSize*(2/3); 
				flower3.regX = flowerBounds.width/2; flower3.regY = flowerBounds.height;
				var flower4 = getFlower(flowername);
				flower4.x = bm.globals._tileSize*(3/4); flower4.y = bm.globals._tileSize*(2/3); 
				flower4.regX = flowerBounds.width/2; flower4.regY = flowerBounds.height;
				var flower5 = getFlower(flowername);
				flower5.x = bm.globals._tileSize*(1/4); flower5.y = bm.globals._tileSize*(3/3); 
				flower5.regX = flowerBounds.width/2; flower5.regY = flowerBounds.height;
				var flower6 = getFlower(flowername);
				flower6.x = bm.globals._tileSize*(3/4); flower6.y = bm.globals._tileSize*(3/3); 
				flower6.regX = flowerBounds.width/2; flower6.regY = flowerBounds.height;
				components = [flower1, flower2, flower3, flower4, flower5, flower6];
				break;
		}
		return components
	}
}