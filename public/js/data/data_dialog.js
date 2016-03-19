(function (window) {
	var POSITION = {
		STAGE_R: {
			"x": 510,
			"y": 0,
		},
		STAGE_L: {
			"x": 150,
			"y": 0,
		},
		OFFSTAGE_R: {
			"x": 1000,
			"y": 0,
		},
		OFFSTAGE_L: {
			"x": -200,
			"y": 0,
		}
	}
	var KNIGHT = {
		"NEUTRAL": {
			"silentSprites": ["knight1"],
			"talkingSprites": ["knight1"],
			"isAnimated": false,
			"regX": 100,
			"yOffset": -80,
		}
	}
	var MORGAN = {
		"NEUTRAL": {
			"silentSprites": ["morganprologue"],
			"talkingSprites": ["morganprologue"],
			"isAnimated": false,
			"regX": 100,
			"yOffset": 15,
		}
	}
	var scripts = {
		"rosa": {
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interact, Rosa
			"interact": [
				{
					"dialogsetup": {
						"characters": ["Rosa","Morgan"],
						"initialize": {
							"Rosa": {
								"position": POSITION.OFFSTAGE_R,
								"facing": "left",
								"mood": "NEUTRAL",
								"sprites": KNIGHT,
							},
							"Morgan": {
								"position": POSITION.OFFSTAGE_L,
								"facing": "right",
								"mood": "NEUTRAL",
								"sprites": MORGAN,
							},
							"background": {
								"xPosition": 0,
								"yPosition": 0,
								"hasBackground": false,
								"isAnimated": false,
								"animationqueue": null,
							},
							"openingline": 2,
						}
					}
				},
				{
					"transition": {
						"Morgan": {
							"position": POSITION.STAGE_L,
						},
						"Rosa": {
							"position": POSITION.STAGE_R,
						},
					}
				},
				["Rosa","Interact dialog! "],
			],
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Battle Start, Rosa
			"battle_start": [
				{
					"dialogsetup": {
						"characters": ["Rosa","Morgan"],
						"initialize": {
							"Rosa": {
								"position": POSITION.OFFSTAGE_R,
								"facing": "left",
								"mood": "NEUTRAL",
								"sprites": KNIGHT,
							},
							"Morgan": {
								"position": POSITION.OFFSTAGE_L,
								"facing": "right",
								"mood": "NEUTRAL",
								"sprites": MORGAN,
							},
							"background": {
								"xPosition": 0,
								"yPosition": 0,
								"hasBackground": false,
								"isAnimated": false,
								"animationqueue": null,
							},
							"openingline": 2,
						}
					}
				},
				{
					"transition": {
						"Morgan": {
							"position": POSITION.STAGE_L,
						},
						"Rosa": {
							"position": POSITION.STAGE_R,
						},
					}
				},
				["Rosa","Battle start dialog! "],
				{"event": 
					{"battleinit": "Rosa", }
				},
			],
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Battle End, Rosa
			"battle_end": [
				{
					"dialogsetup": {
						"characters": ["Rosa","Morgan"],
						"initialize": {
							"Rosa": {
								"position": POSITION.OFFSTAGE_R,
								"facing": "left",
								"mood": "NEUTRAL",
								"sprites": KNIGHT,
							},
							"Morgan": {
								"position": POSITION.OFFSTAGE_L,
								"facing": "right",
								"mood": "NEUTRAL",
								"sprites": MORGAN,
							},
							"background": {
								"xPosition": 0,
								"yPosition": 0,
								"hasBackground": false,
								"isAnimated": false,
								"animationqueue": null,
							},
							"openingline": 2,
						}
					}
				},
				{
					"transition": {
						"Morgan": {
							"position": POSITION.STAGE_L,
						},
						"Rosa": {
							"position": POSITION.STAGE_R,
						},
					}
				},
				["Rosa", "Yeah, you beat me. Please stop rubbing it in my face. I might be in a suit of metal, but underneath is a man with feelings. "],
			],
		}
	}

	var DialogData = function DialogData(){
		this.getDialogData = function(npc_id, key) {
			var dialog = scripts[npc_id][key];
			return dialog;
		}
		this.getPosition = function() {
			return POSITION;
		}
	}
	window.DialogData = DialogData;
} (window));		
