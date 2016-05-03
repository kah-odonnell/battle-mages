var data_script = {
	"jeff01": {
		"interact_dialog": {
			"dialog_setup": {
				"characters": ["Jeff", "PlayerF"],
				"Jeff": {
					"position": "offstage_r",
					"facing": "left",
					"spritesheet": "knight",
				},
				"PlayerF": {
					"position": "offstage_l",
					"facing": "left",
					"spritesheet": "player_f",
				},
			},
			"script": [
				{"transition": 
					{"PlayerF": 
						{"position": 150,},
					"Jeff": 
						{"position": 510,},
					}
				},
			]
		}
	}
}