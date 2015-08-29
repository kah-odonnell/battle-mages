var unitCatalog = {
	"000": {
		"name": "Red Magician",
		"attributes": ["illusionist","elementalist"],
		"Health": 70,
		"Attack": 110,
		"Defense": 115,
		"Luck": 20
	},
	"001": {
		"name": "Green Magician",
		"attributes": ["illusionist","necromancer"],
		"Health": 80,
		"Attack": 100,
		"Defense": 120,
		"Luck": 30
	},
	"002": {
		"name": "Blue Magician",
		"attributes": ["necromancer","elementalist"],
		"Health": 70,
		"Attack": 110,
		"Defense": 115,
		"Luck": 20
	}
}

var actionCatalog = {
	"ILL001": {
		"name": "Mind Crush",
		"mana": 1,
		"attribute": "illusionist",
		"type": "attack",
		"modifier": .9,
		"description": "Damage target opponent's unit",
	},
	"ILL002": {
		"name": "Neurolyse",
		"mana": 2,
		"attribute": "illusionist",
		"type": "attack",
		"modifier": 1.8,
		"description": "Damage target opponent's unit",
	},
	"ILL003": {
		"name": "Troupe Mentality",
		"mana": 1,
		"attribute": "illusionist",
		"type": "skill",
		"description": "At the end of your turn, the positions of your units are changed, and each unit randomly takes on the appearance of one of your units. A disguised unit remains disguised until damaged.",
	},
	"ILL004": {
		"name": "Arcane Chain",
		"mana": 0,
		"attribute": "illusionist",
		"type": "skill",
		"description": "Gain one Mana if this is the third time this unit has used this skill",
	},
	"ILL005": {
		"name": "Arcane Overload",
		"mana": 1,
		"attribute": "illusionist",
		"type": "skill",
		"description": "Draw two tokens from your library. If they remain in your hand at the end of your turn, this unit loses .25x HP",
	},
	"ILL006": {
		"name": "Mana Tap",
		"mana": 0,
		"attribute": "illusionist",
		"type": "counter",
		"description": "After this unit is attacked and if the attacker has more Mana than this unit, gain one Mana",
	},
	"ILL007": {
		"name": "Mirror Force",
		"mana": 2,
		"attribute": "illusionist",
		"type": "counter",
		"description": "After this unit is attacked and if the attack costs less than 2 Mana, you can inflict damage on the attacker equal to the damage this unit recieved"
	},
	"ILL008": {
		"name": "Diversion Wall",
		"mana": 0,
		"attribute": "illusionist",
		"type": "counter",
		"description": "Target one of your units. If that target is targeted by an opponent for an attack costing 0 Mana, negate that attack"
	},
	"ILL009": {
		"name": "Distortion Wall",
		"mana": 1,
		"attribute": "illusionist",
		"type": "counter",
		"description": "Target one of your units. If that target is targeted by an opponent for an attack costing 1 Mana, negate that attack"
	},
	"NEC001": {
		"name": "Gaze of Withering",
		"mana": 0,
		"attribute": "necromancer",
		"type": "attack",
		"description": "Damage target opponent's unit for .4x Attack"
	},
	"NEC002": {
		"name": "Gaze of Envy",
		"mana": 1,
		"attribute": "necromancer",
		"type": "attack",
		"description": "Damage target opponent's unit for .6x Attack. Costs no Mana if target has more HP than this unit."
	},
	"NEC003": {
		"name": "Blood Offering",
		"mana": 0,
		"attribute": "necromancer",
		"type": "skill",
		"description": "Lose .33x HP. Gain 2 Mana"
	},
	"NEC004": {
		"name": "Animate Skeleton Knight",
		"mana": 2,
		"attribute": "necromancer",
		"type": "skill",
		"description": "Summon a Knight minion"
	},
	"NEC005": {
		"name": "Animate Shadow Spectre",
		"mana": 2,
		"attribute": "necromancer",
		"type": "skill",
		"description": "Summon an Illusionist minion"
	},
	"NEC006": {
		"name": "Death Knell",
		"mana": 1,
		"attribute": "necromancer",
		"type": "skill",
		"description": "Destroy all minions this unit controls. This unit can make an additional attack this turn for each minion destroyed this way."
	},
	"NEC007": {
		"name": "Feast for Crows",
		"mana": 1,
		"attribute": "necromancer",
		"type": "skill",
		"description": "Target a minion this unit controls and destroy it. This unit gains Mana equivalent to that minion's."
	},
	"NEC008": {
		"name": "Soul Cycle",
		"mana": 1,
		"attribute": "necromancer",
		"type": "counter",
		"description": "Target one of your units. If that target is destroyed, the next 'Animate' skill this unit uses cost no Mana."
	},
	"ELE001": {
		"name": "Chain Lightning",
		"mana": 1,
		"attribute": "elementalist",
		"type": "attack",
		"description": "Air. Damage target opponent's unit for .6x Attack and another random opponent's unit for .4 Attack"
	},
	"ELE002": {
		"name": "Grasping Ground",
		"mana": 1,
		"attribute": "elementalist",
		"type": "attack",
		"description": "Earth. Damage target opponent's unit for .9x Attack"
	},
	"ELE003": {
		"name": "Soothing Rain",
		"mana": 1,
		"attribute": "elementalist",
		"type": "attack",
		"description": "Water. Heal target unit for .4x Attack."
	},
	"ELE004": {
		"name": "Fireball",
		"mana": 1,
		"attribute": "elementalist",
		"type": "attack",
		"description": "Fire. Damage target opponent's unit for .9x Attack."
	},
	"ELE005": {
		"name": "Lightning Bottle",
		"mana": 0,
		"attribute": "elementalist",
		"type": "skill",
		"description": "Air. Discard any number of tokens in your hand. Gain one Mana for every two discarded."
	},
	"ELE006": {
		"name": "Armor of Earth",
		"mana": 1,
		"attribute": "elementalist",
		"type": "skill",
		"description": "Earth. Increase Defense by one stage."
	},
	"ELE007": {
		"name": "Glass Cannon",
		"mana": 0,
		"attribute": "elementalist",
		"type": "skill",
		"description": "Fire. Increase Attack by one stage and decrease Defense by one stage."
	},
	"ELE008": {
		"name": "Frostburst",
		"mana": 1,
		"attribute": "elementalist",
		"type": "counter",
		"description": "Water. Target opponent's unit. If that target uses a skill, you can negate that skill's effect until your opponent's next turn."
	},
}

var player1library = {
	"units": ["001","002","003"],
	"actions": [
		"ILL001","ILL001","ILL001","ILL002","ILL003",
		"ILL003","ILL004","ILL004","ILL004","ILL005",
		"ILL005","ILL006","ILL007","ILL008","ILL009",
		"NEC001","NEC001","NEC001","NEC002","NEC003",
		"NEC003","NEC004","NEC004","NEC004","NEC005",
		"NEC005","NEC006","NEC007","NEC008","NEC008",
		"ELE001","ELE001","ELE001","ELE002","ELE003",
		"ELE003","ELE004","ELE004","ELE004","ELE005",
		"ELE005","ELE006","ELE007","ELE008","ELE008",
	]
}

var player2library = {
	"units": ["001","002","003"],
	"actions": [
		"ILL001","ILL001","ILL001","ILL002","ILL003",
		"ILL003","ILL004","ILL004","ILL004","ILL005",
		"ILL005","ILL006","ILL007","ILL008","ILL009",
		"NEC001","NEC001","NEC001","NEC002","NEC003",
		"NEC003","NEC004","NEC004","NEC004","NEC005",
		"NEC005","NEC006","NEC007","NEC008","NEC008",
		"ELE001","ELE001","ELE001","ELE002","ELE003",
		"ELE003","ELE004","ELE004","ELE004","ELE005",
		"ELE005","ELE006","ELE007","ELE008","ELE008",
	]
}