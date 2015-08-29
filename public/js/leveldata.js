
var level1maps = [
	{
		"title": "The Mad Queen's Sepulcher",
		"subtitle": "Atrium",
		"starttile": {"x":12,"y":4},
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 83, 82, 82, 82, 81, 81, 81, 86, 83, 82, 81, 81, 81, 81, 86, 83, 81, 81, 81, 81, 81, 81, 86, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 87, 84, 10, 10, 10, 10, 10, 87, 84, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 92, 91, 91, 91, 91, 91, 91, 91, 91, 94, 10, 10, 10, 95, 91, 91, 91, 91, 91, 91, 91, 91, 93, 99, 99],
			[82, 81, 81, 81, 81, 81, 81, 81, 81, 81, 84, 10, 10, 10, 87, 81, 82, 81, 81, 82, 81, 81, 81, 86, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 87, 89, 82],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
			[00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00],
		],  
		"maptiles": {
			"999": "spaceTile",

			"99": "blackTile",
			"91": "templereversewall1",
			"92": "templereversebottomleft",
			"93": "templereversebottomright",
			"94": "templereversetopright",
			"95": "templereversetopleft",

			"0": "snowtile1", //invisible boundary

			"81": "templebackwall0",
			"82": "templebackwall1",
			"83": "templebackcornerL",
			"84": "templefrontcornerL",
			"85": "templeleftwall1",
			"86": "templebackcornerR",
			"87": "templefrontcornerR",
			"88": "templerightwall1",
			"89": "templebackwalldoor",

			"10": "snowtile1",
			"19": "snowtileN",

		},
		"entrances": {
			"initialize": {"x": 12, "y": 4,}, 
			"sideDoorA": {"x": 24, "y": 11, "direction": "south", "offset": null},
			"sideDoorB": {"x": 24, "y": 11, "direction": "south", "offset": null},
		},
		"exits": {
			"sideDoorA": {
				"x": 24, 
				"y": 11, 
				"isDoor": true,
				"name": "Temple Interior",} 
		},
		"mapnpcs": [
			{"name": "Jeff", 
			"type": "prologueknight", 
			"personality": "faceRight", 
			"path": [
						[10, 4], 
						"pause",
						[10, 5],
						[11, 5],
						"pause",
						[13, 5],
						"pause",
						[14, 5], 
						[14, 4], 
						[13, 4], 
						"pause",
					],
			"interactDialog": [
				{"dialogsetup": 
					{"characters":
						["Jeff","Morgan"],
					"Jeff":
						{"neutral": 
							//Some dialog sprites are more than static animations with mouth movements.
							//There will need to be one set of sprites for when the character is both speaking and emoting
							//And one for when the character is finished speaking but still emoting
							//if a mood is not animated, (isAnimated = false), the renderer will still attempt
							//to cycle through talkingSprites while the character's line is being delivered
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Jeff": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Jeff": 
						{"xPosition": 650,},
					}
				},
				["Jeff","Hey there. "], ],
			"battleStartDialog": [
				{"dialogsetup": 
					{"characters":
						["Jeff","Morgan"],
					"Jeff":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Jeff": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Jeff": 
						{"xPosition": 650,},
					}
				},
				["Jeff","Hey! You're not supposed to be back here! I call hacks! "], 
				{"event": 
					{"battleinit": "Jeff", }
				}, ],
			"battleEndDialog": [
				{"dialogsetup": 
					{"characters":
						["Jeff","Morgan"],
					"Jeff":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Jeff": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Jeff": 
						{"xPosition": 650,},
					}
				},
				["Jeff","Good luck on your quest to screw with the game. "], ],
			},
			{"name": "Tom", 
			"type": "prologueknight", 
			"personality": "faceLeft", 
			"path": [
						[14, 4], 
						[13, 4], 
						"pause",
						[10, 4], 
						"pause",
						[10, 5],
						[11, 5],
						"pause",
						[13, 5],
						"pause",
						[14, 5],
					],
			"interactDialog": [
				{"dialogsetup": 
					{"characters":
						["Tom","Morgan"],
					"Tom":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Tom": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Tom": 
						{"xPosition": 650,},
					}
				},
				["Tom","Hey there. "], ],
			"battleStartDialog": [
				{"dialogsetup": 
					{"characters":
						["Tom","Morgan"],
					"Tom":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Tom": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Tom": 
						{"xPosition": 650,},
					}
				},
				["Tom","You're editing the game files so you can battle us? "], 
				["Tom","Does your mother know her innocent child is in fact a dangerous rapscallion? "],
				{"event": 
					{"battleinit": "Tom", }
				}, ],
			"battleEndDialog": [
				{"dialogsetup": 
					{"characters":
						["Tom","Morgan"],
					"Tom":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"regY": 370,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"regY": 270,}
						},
					"initialize": 
						{"Tom": 
							{"xPosition": 1000,
							"yPosition": 0,
							"facing": "left",
							"mood": "neutral",},
						"Morgan": 
							{"xPosition": -200,
							"yPosition": 0,		
							"facing": "right",
							"mood": "neutral",},
						"background":
							{"xPosition": 0,
							"yPosition": 0,
							"hasBackground": false,
							"isAnimated": false,
							"animationqueue": null,},
						"openingline": 2,
						},
					}
				},
				{"transition": 
					{"Morgan": 
						{"xPosition": 150,},
					"Tom": 
						{"xPosition": 650,},
					}
				},
				["Tom","Don't you know modifying client-side javascript is a felony? "], ],
			},
		] },
	{
		"title": "The Mad Queen's Sepulcher",
		"subtitle": "Atrium",
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99, 99],
			[99, 99, 99, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 10, 10, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
		],  
		"maptiles": {
			"999": "spaceTile",

			"99": "blackTile",
			"91": "templereversewall1",
			"92": "templereversebottomleft",
			"93": "templereversebottomright",
			"94": "templereversetopright",
			"95": "templereversetopleft",

			"0": "snowtile1",

			"81": "templebackwall0",
			"82": "templebackwall1",
			"83": "templebackcornerL",
			"84": "templefrontcornerL",
			"85": "templeleftwall1",
			"86": "templebackcornerR",
			"87": "templefrontcornerR",
			"88": "templerightwall1",
			"89": "templebackwalldoor",

			"10": "snowtile1",
			"19": "snowtileN",
		},
		"entrances": {
			"sideDoorA": {"x": 9, "y": 10, "direction": "north", "offset": "east"},
		},
		"exits": {
			"sideDoorA": {
				"x": 9, 
				"y": 11, 
				"isDoor": false,
				"name": "Temple Exterior",
				"set": ["sideDoorB"]  },
			"sideDoorB": {
				"x": 10, 
				"y": 11, 
				"isDoor": false,
				"name": "Temple Exterior", 
				"set": ["sideDoorA"] },
			"sideDoorC": {
				"x": 16, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Sexterior", },
			"sideDoorD": {
				"x": 17, 
				"y": 7, 
				"isDoor": false,
				"name": "Temple Sasdasdexterior", },
		},
		"mapnpcs": [],
	}
]