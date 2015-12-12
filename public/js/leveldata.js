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
			"defaultHeight": 40,

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
			//"initialize": {"x": 12, "y": 4,}, 
			"initialize": {"x": 12, "y": 13,}, 
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
		"footprints": {
			"footprintColor": '#D3EAEA',
			"footprintMax": 30,
			"footprintDelay": 2500,
			"footprintColorIdle": '#C5D8D8',
			"footprintDelayIdle": 5000,
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
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
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
						{"xPosition": 510,},
					}
				},
				["Jeff","Yeah, you beat me. Please stop rubbing it in my face. I might be in a suit of metal, but underneath is a man with feelings. "],
			 ],
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
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
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
						{"xPosition": 510,},
					}
				},
				["Jeff","I'm a knight in shining armor, but it turns out the ladies only want knights with tested metal. So how about a battle? "], 
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
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
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
						{"xPosition": 510,},
					}
				},
				["Jeff","In my defense, I was poorly programmed. "], ],
			},
			{"name": "Rosa", 
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
						["Rosa","Morgan"],
					"Rosa":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
						},
					"initialize": 
						{"Rosa": 
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
					"Rosa": 
						{"xPosition": 510,},
					}
				},
				["Rosa","There are two types of women in this world. Women who are nice, and women who are knights. My advice? Take up the sword. "], ],
			"battleStartDialog": [
				{"dialogsetup": 
					{"characters":
						["Rosa","Morgan"],
					"Rosa":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
						},
					"initialize": 
						{"Rosa": 
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
					"Rosa": 
						{"xPosition": 510,},
					}
				},
				["Rosa","There are two types of women in this world: women who are nice, and women who are knights! "], 
				{"event": 
					{"battleinit": "Rosa", }
				}, ],
			"battleEndDialog": [
				{"dialogsetup": 
					{"characters":
						["Rosa","Morgan"],
					"Rosa":
						{"neutral": 
							{"silentSprites": ["knight1"],
							"talkingSprites": ["knight1"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
						},
					"initialize": 
						{"Rosa": 
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
					"Rosa": 
						{"xPosition": 510,},
					}
				},
				["Rosa","I lost? Should've just used my sword. "], ],
			},
		] },
	{
		"title": "The Mad Queen's Sepulcher",
		"subtitle": "Atrium",
		"maparray": [
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 83, 82, 82, 82, 81, 81, 99, 99, 99, 99, 99, 99, 99, 81, 81, 86, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 10, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 88, 88, 99, 99],
			[99, 99, 85, 11, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 11, 10, 10, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 88, 88, 99, 99],
			[99, 99, 85, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 88, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 94, 10, 10, 95, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 94, 10, 10, 95, 99, 99, 99, 99, 99, 99, 99, 99],
			[99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
		],
		"maptiles": {
			"defaultHeight": 280,

			"999": "spaceTile",

			"99": "forest_backwall0",
			"91": "forest_reversewall1",
			"92": "forest_reversebottomleft",
			"93": "forest_reversebottomright",
			"94": "forest_reversetopright",
			"95": "forest_reversetopleft",

			"0": "snowtile1",

			"81": "forest_backwall0",
			"82": "forest_backwall1",
			"83": "forest_backcornerL",
			"84": "forest_frontcornerL",
			"85": "forest_leftwall0",
			"86": "forest_backcornerR",
			"87": "forest_frontcornerR",
			"88": "forest_rightwall0",
			"89": "forest_backwalldoor",

			"10": "grasstile1",
			"11": "grasstile2",
			"19": "snowtileN",
		},
		"entrances": {
			"sideDoorA": {"x": 9, "y": 10, "direction": "north", "offset": "east"},
		},
		"exits": {
			"sideDoorA": {
				"x": 9, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Exterior",
				"set": ["sideDoorB", "sideDoorC", "sideDoorD"] },
			"sideDoorB": {
				"x": 10, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Exterior", 
				"set": ["sideDoorA", "sideDoorC", "sideDoorD"] },
			"sideDoorC": {
				"x": 9, 
				"y": 12, 
				"isDoor": false,
				"name": "Temple Exterior",
				"set": ["sideDoorA", "sideDoorB", "sideDoorD"]  },
			"sideDoorD": {
				"x": 10, 
				"y": 12, 
				"isDoor": false,
				"name": "Temple Exterior", 
				"set": ["sideDoorA", "sideDoorB", "sideDoorC"] },
			"sideDoorE": {
				"x": 16, 
				"y": 13, 
				"isDoor": false,
				"name": "Temple Sexterior", },
			"sideDoorF": {
				"x": 17, 
				"y": 7, 
				"isDoor": false,
				"name": "Temple Sasdasdexterior", },
		},
		"footprints": {
			"footprintColor": '#004C00',
			"footprintMax": 30,
			"footprintDelay": 250,
			"footprintColorIdle": '#004C00',
			"footprintDelayIdle": 1000,
		},
		"mapnpcs": [/*
			{"name": "Jeff", 
			"type": "prologueknight", 
			"personality": "faceRight", 
			"path": [
				[10, 4], 
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
							"yOffset": -80,}
						},
					"Morgan": 
						{"neutral": 
							{"silentSprites": ["morganprologue"],
							"talkingSprites": ["morganprologue"],
							"isAnimated": false,
							"regX": 100,
							"yOffset": 15,}
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
						{"xPosition": 510,},
					}
				},
				["Jeff","Hey there. "], 
			]},
		*/]
	}
]
