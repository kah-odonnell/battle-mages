var unitCatalog = {
	"000": {
		"name": "Ren Mei",
		"title": "The Renowned Act",
		"attributes": ["Illusionist"],
		"health": 70,
		"attack": 110,
		"defense": 115,
		"luck": 20,
		"img_battle": "renmei",
		"img_token": "token_renmei",
	},
	"001": {
		"name": "Ren Mei",
		"title": "The Renowned Act",
		"attributes": ["Illusionist"],
		"health": 70,
		"attack": 110,
		"defense": 115,
		"luck": 20,
		"img_battle": "renmei",
		"img_token": "token_renmei",
	},
	"002": {
		"name": "Ren Mei",
		"title": "The Renowned Act",
		"attributes": ["Illusionist"],
		"health": 70,
		"attack": 110,
		"defense": 115,
		"luck": 20,
		"img_battle": "renmei",
		"img_token": "token_renmei",
	},
}

var actionCatalog = {
	"ILL001": {
		"name": "Mind Crush",
		"mana": 1,
		"attribute": "Illusionist",
		"type": "Attack",
		"description": "Damage target opponent's unit for 1.0x Attack.",
		"img": "neurolyse",
		"mini_img": "small_neurolyse",
	},
	"ILL002": {
		"name": "Neurolyse",
		"mana": 2,
		"attribute": "Illusionist",
		"type": "Attack",
		"description": "Damage target opponent's unit for 1.5x Attack",
		"img": "neurolyse",
		"mini_img": "small_neurolyse",
	},
	"ILL003": {
		"name": "Arcane Chain",
		"mana": 0,
		"attribute": "Illusionist",
		"type": "Skill",
		"description": "Gain 2 Mana if this is the third time this unit has used this skill.",
		"img": "arcanechain",
		"mini_img": "small_arcanechain",
	},
	"ILL004": {
		"name": "Pain of the Mind",
		"mana": 0,
		"attribute": "Illusionist",
		"type": "Skill",
		"description": "Hex (1 opponent turn). Targets an opponent's unit. The second Token used by a unit under this hex costs an additional 1 Mana.",
		"img": "arcanechain",
		"mini_img": "small_arcanechain",
	},
	"ILL005": {
		"name": "Vice Pity",
		"mana": 1,
		"attribute": "Illusionist",
		"type": "Skill",
		"description": "Hex (1 opponent turn). Targets an opponent's unit. Units under this hex cannot use skills costing 0 Mana. Ends when the affected unit uses an Action Token.",
		"img": "arcanechain",
		"mini_img": "small_arcanechain",
	},
	"ILL006": {
		"name": "Mana Tap",
		"mana": 0,
		"attribute": "Illusionist",
		"type": "Counter",
		"description": "After this unit is attacked and if the attacker has more Mana than this unit, gain one Mana",
		"img": "mirrorforce",
		"mini_img": "small_mirrorforce",
	},
	"ILL007": {
		"name": "Mirror Force",
		"mana": 2,
		"attribute": "Illusionist",
		"type": "Counter",
		"description": "After this unit is attacked and if the attack costs less than 2 Mana, you can inflict damage on the attacker equal to the damage this unit recieved.",
		"img": "mirrorforce",
		"mini_img": "small_mirrorforce",
	},
	"ILL008": {
		"name": "Diffusion",
		"mana": "X",
		"attribute": "Illusionist",
		"type": "Counter",
		"description": "Target one of your units. If that target is targeted by an opponent for an attack, you can consume 2 Tokens, pay Mana equivalent to that attack's cost, and negate that attack.",
		"img": "mirrorforce",
		"mini_img": "small_mirrorforce",
	},
	"ILL009": {
		"name": "Pyrotechnics",
		"mana": 1,
		"attribute": "Illusionist",
		"type": "Counter",
		"description": "When this unit is targeted for an attack, you can inflict two stacks of Burning (2 turns) on the attacker.",
		"img": "mirrorforce",
		"mini_img": "small_mirrorforce",
	},
}

var player1library = {
	"units": ["000","001","002"],
	"actions": [
		"ILL001","ILL001","ILL001","ILL002","ILL003",
		"ILL003","ILL004","ILL004","ILL004","ILL005",
		"ILL005","ILL006","ILL007","ILL008","ILL009",
	]
}

var player2library = {
	"units": ["000","001","002"],
	"actions": [
		"ILL001","ILL001","ILL001","ILL002","ILL003",
		"ILL003","ILL004","ILL004","ILL004","ILL005",
		"ILL005","ILL006","ILL007","ILL008","ILL009",
	]
}