bm.maps.ComponentMaker = class {
	static getComponents(tileID) {
		var components
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
				this.imageID = "grasstile1"
				this.isFloor = true;
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
				var flowernames = "blueflower";
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
			case "F_N_000": 
				break;
			case "F_N_001": 
				break;
			case "F_S_000": 
				break;
			case "F_E_000": 
				break;
			case "F_W_000": 
				break;
			case "F_NE_CX": 
				break;
			case "F_NE_CV": 
				break;
			case "F_NW_CX": 
				break;
			case "F_NW_CV": 
				break;
			case "F_SE_CX": 
				break;
			case "F_SE_CV": 
				break;
			case "F_SW_CX": 
				break;
			case "F_SW_CV": 
				break;
		}
		return components
	}
}