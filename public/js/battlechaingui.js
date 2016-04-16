(function (window) {
	var BattleChainGui = function() {
		this.initialize();
	}
	var bu = BattleChainGui.prototype = new createjs.Container();
	bu.Container_initialize = bu.initialize;
	bu.initialize = function() {
		this.Container_initialize();
		this.x = 0;
		this.y = 0;
		this.main_container = new createjs.Container();
		this.main_container.x = canvas.width/2 - 100;
		this.main_container.y = 100;
		this.chain_size = 0;

		this.active_tokens = [];
		this.active_token_imgs = [];

		this.addChild(this.main_container);
	}
	BattleChainGui.prototype.appearToken = function(action, unit) {
		var guiUnit = unit.guiUnit;
		var x = guiUnit.x;
		var y = guiUnit.y;
		var token = new createjs.Bitmap(loader.getResult(action.mini_img));
		var t_bounds = token.getBounds();
		token.regX = t_bounds.width/2;
		token.regY = t_bounds.height/2;
		token.x = x;
		token.y = y - guiUnit.regY + guiUnit.image.getBounds().height/2 - 5;
		if (unit.owner == "red") {
			token.scaleX = -1;
			token.x -= 40;
		} else {
			token.scaleX = 1;
			token.x += 40;
		}
		guiUnit.active_tokens.push(action);
		guiUnit.active_token_imgs.push(token);
		token.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
		guiUnit.num_tokens_active++;
		this.addChild(token);
	}
	BattleChainGui.prototype.moveTokenToChain = function(action, unit) {
		var guiUnit = unit.guiUnit;
		var l = guiUnit.active_tokens.indexOf(action);
		var image = guiUnit.active_token_imgs[l];
		var token = guiUnit.active_tokens[l];
		var coords = {
			x: canvas.width/2 - 100, 
			y: 40*this.chain_size + 60
		};
		this.chain_size++;
		image.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
		var g = this;
		createjs.Tween.get(image).to({x: coords.x, y: coords.y},300).call(
			function() {
				var name_container = new createjs.Container();
				for (var i = 0; i < 16; i++) {
					var nametext1 = new createjs.Text(token.name, "26px crazycreation", "#000000");			
					var color = "#FFFFFF";
					nametext1.shadow = new createjs.Shadow(color, 0, 0, 4);
					name_container.addChild(nametext1);
				}
				var tween_size = 20
				var b = name_container.getBounds();
				name_container.regY = b.height/2
				name_container.x = coords.x + 22 + tween_size;
				name_container.y = coords.y - 2;
				name_container.alpha = 0;
				g.addChild(name_container);

				var invis_shape = new createjs.Graphics().beginFill("#FFFFFF").drawRect(coords.x - 20, coords.y - 20, 225, 36);
				var invis_box = new createjs.Shape(invis_shape);
				invis_box.alpha = 0.01;
				invis_box.on("mouseover", function(evt) {
					level.activebattle.battleStage.newInfoPane("action_hand_info", action);
				});
				g.addChild(invis_box);

				createjs.Tween.get(name_container).to({x: name_container.x - tween_size, alpha: 1}, 200);
			}
		);
	}
	BattleChainGui.prototype.resolveTokenOnChain = function(action, unit) {
		var guiUnit = unit.guiUnit;
		var l = guiUnit.active_tokens.indexOf(action);
		var old_img = guiUnit.active_token_imgs[l];
		var old_token = guiUnit.active_tokens[l];
		var coords = {x: old_img.x, y: old_img.y};
		guiUnit.active_tokens.slice(l, 1);
		guiUnit.active_token_imgs.slice(l, 1);

		this.removeChild(old_img);
		var imagename = old_token.mini_img;
		var token = new createjs.Bitmap(loader.getResult(imagename));
		var matrix = new createjs.ColorMatrix().adjustSaturation(-150);
		token.filters = [
		    new createjs.ColorMatrixFilter(matrix)
		];
		var t_bounds = token.getBounds();
		token.regX = t_bounds.width/2;
		token.regY = t_bounds.height/2;
		token.x = coords.x;
		token.y = coords.y;
		if (unit.owner == "red") {
			token.scaleX = -1;
		} else {
			token.scaleX = 1;
		}
		token.cache(t_bounds.x, t_bounds.y, t_bounds.width, t_bounds.height)
		guiUnit.active_token_imgs.push(token);
		guiUnit.active_tokens.push(old_token);
		this.addChild(token);

		token.on("mouseover", function(evt) {
			level.activebattle.battleStage.newInfoPane("action_hand_info", action);
		});
	}
	BattleChainGui.prototype.removeChain = function() {
		var old_coords = {x: this.x, y: this.y};
		var g = this;
		createjs.Tween.get(this).to({x: this.x - 15, alpha: 0},200).call(
			function() {
				g.x = old_coords.x;
				g.alpha = 1;
				g.removeAllChildren();
				//a very sloppy way of ending the battle for now
				var bc = level.activebattle.battleController;
				bc.decideBattleOutcome();
			}
		);
		this.chain_size = 0;
	}
	BattleChainGui.prototype.tick = function() {

	}
	window.BattleChainGui = BattleChainGui;
} (window));	