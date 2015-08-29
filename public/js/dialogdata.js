var prologue1_1 = [
	{"dialogsetup": 
		{"characters":
			["Guard I","Guard II","Morgan"],
		"Guard I":
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
		"Guard II": 
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
				"regY": 370,}
			},
		"initialize": 
			{"Guard I": 
				{"xPosition": -200,
				"yPosition": 0,
				"facing": "right",
				"mood": "neutral",},
			"Guard II": 
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
		{"Guard I": 
			{"xPosition": 150,},
		"Guard II": 
			{"xPosition": 650,},
		}
	},
	["Guard I","Cold night. "],
	["Guard II","...yeah. "],
	["Guard I","You know what would pass the time? "],
	["Guard II","Besides doing our job without distractions? "],
	["Guard I","For God's sake, lighten up. We're sharing this assignment for the rest of winter. "],
	["Guard I","Are you going to stand in silence the entire time?  "],
	["Guard II","Fine. What do you want me to say? "],
	["Guard I","You could start by telling me about yourself. "],
	["Guard II","I am Kynro, a legionnaire of the Empire.  "],
	["Guard II","End of trivia. "],
	["Guard I","What about your Aptitude? "],
	["Guard II","I beg your pardon? "],
	["Guard I","You know, the ability were you born with! For instance, I can see very well in the dark, "],
	["Guard I","my wife can heal bruises, and my son- "],
	["Guard II","I know what an Aptitude is, but you should only care about one: "],
	["Guard II","The ability to conjure fire. "],
	["Guard II","Our task is to protect the Mad Queen Morkana's invocation relic "],
	["Guard II","from any who would wish to revive her. "],
	["Guard I","Yeah, yeah. You've said it a dozen times. "],
	["Guard I","But there's only one person in the world who COULD revive her: "],
	["Guard I","someone who inherited her Aptitude for fire. "],
	["Guard I","And there's no way of knowing if such a person has even been born! "],
];

var testdialog = [
	{"dialogsetup": 
		{"characters":
			["Guard I","Guard II","Morgan"],
		"Guard I":
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
		"Guard II": 
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
			{"Guard I": 
				{"xPosition": -200,
				"yPosition": 0,
				"facing": "right",
				"mood": "neutral",},
			"Guard II": 
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
		{"Guard I": 
			{"xPosition": 150,},
		"Guard II": 
			{"xPosition": 650,},
		}
	},
	["Guard I","This is a test of the dialog renderer. "],
	["Guard II","...Yeah. A test. "],
	{"transition": 
		{"Guard I": 
			{"xPosition": -200,},
		"Morgan": 
			{"xPosition": 150,},
		}
	},
	["Guard II","Unique New York. "],
	["Guard II","How Now Brown Cow? How Now Brown Cow? HowNowBrownCow? HowNowBrownCow? "],
	{"event": 
		{"pan": "player", }
	},
];