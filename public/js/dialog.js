(function (window) {
/**
 * dialog.js
 * 
 * A Dialog is a rendering of a nasty list:
 *	[	
 *		// First, we declare each character that will appear in the script, 
 *		// and for each declared, create a DialogChar container
 *		// then initialize it by setting its x/y position and orientation
 *		// We must also declare on which element of this list the dialog truly starts (the openingline),
 *		// as some elements in the script are not lines- they are stage directions (events/transitions)
 *
 *	 	{"dialogsetup": { 
 *		 	"characters": ["Temora", "Morgan"]},
 *		 	"Temora": {"neutral": {mood data}},
 *		 	"Morgan": {"neutral": {mood data}, "laughing": {mood data}},
 *		 	"initialize": {"Temora": {position data}, "Morgan": {position data}, "openingline": 2}, }
 *	 	},
 *
 *	 	// Transitions can appear anywhere after the dialogsetup
 *	 	// They move DialogChars on and off the stage and change moods 
 *	 	{"transition": {"Morgan": {new position data}}},
 *
 *	 	// Lines of dialog are lists w/ the name of the speaker character, then the spoken line
 *	 	["Morgan": "This is a first line of dialog"],
 *
 *	 	{"transition": {"Temora": {new position data}}},
 *	 	["Temora": "This is a second line of dialog"],
 *	 	["Temora": "This is a third line of dialog"],
 *
 *	 	// Events create MapEvents
 *		{"event": {"battleinit": "Temora Tengarten", }}, 
 *	]
 *
 * A Dialog is initialized as the property Level.currentdialog
 *
**/
	function Dialog(dialoglog, levelobject){
		this.canvasBounds = {width: 800, height: 450};

		this.hostlevel = levelobject;
		this.script = this.parselog(dialoglog);
		this.setupdata = dialoglog[0]["dialogsetup"];
		this.characterList = this.setupdata["characters"]; //["Guard I","Guard II","Morgan"]
		this.characters = {};

		for (var i = 0; i < this.characterList.length; i++) {
			var characterName = this.characterList[i];
			var moodData = this.setupdata[characterName];
			var initData = this.setupdata["initialize"][characterName];
			tempChar = new DialogChar(characterName, moodData, initData);
			this.characters[characterName] = tempChar;
		}

		this.openingline = this.setupdata["initialize"]["openingline"];
		this.currentline = 1;
		this.currentcharacter = 1;
		this.linefinished = 0;
		this.textspeed = 1;
		this.currentspeaker = this.characters[this.script[this.openingline][0]];
		this.endtime = Number.POSITIVE_INFINITY;
		this.closing = false;
		this.starting = true;
		this.speechpause = false;

		this.speakertext = new createjs.Text(" ", "26px crazycreation", "#000000");
		this.textline1 = new createjs.Text(" ", "26px crazycreation", "#000000");
		this.textline2 = new createjs.Text(" ", "26px crazycreation", "#000000");
		this.boxY = 335;
		this.speakertext.y = this.boxY + 15;
		this.textline1.y = this.boxY + 60;
		this.textline2.y = this.boxY + 85;
		this.speakertext.x = this.canvasBounds.width/2 - this.speakertext.getBounds().width/2;
		this.textline1.x = 100;
		this.textline2.x = 100;
		this.textline1.textBaseline = "alphabetic";
		this.textline1.textBaseline = "alphabetic";
		this.textline2.textBaseline = "alphabetic";

		for (var key in this.characters) {
			this.addChild(this.characters[key]);
		}
		//this.getCharacters();
		this.initialize();
	}
	Dialog.prototype = new createjs.Container();
	Dialog.prototype.initialize = function(){
		this.x = 0;
		this.y = 0;

		var box = new createjs.Bitmap(loader.getResult("dialogbox"));
		box.y = 1000;
		this.addChild(box);		
		this.box = box;

		var arrow = new createjs.Bitmap(loader.getResult("dialogarrow"));
		arrow.y = this.boxY - 16;
		arrow.x = this.script[0]["dialogsetup"]["initialize"][this.currentspeaker.charName]["xPosition"];
		this.addChild(arrow);
		this.arrow = arrow;

		this.delay(1000);
		createjs.Tween.get(box, {loop: false}).to({y:this.boxY},1000,createjs.Ease.getPowInOut(4));
		this.hostlevel.paused = true;

		this.addChild(this.speakertext);
		this.addChild(this.textline1);
		this.addChild(this.textline2);
	}
	Dialog.prototype.tick = function() {
		var isOnDialog = Array.isArray(this.script[this.currentline]);
 		if (isOnDialog) {
		 	if (Key.isDown(Key.SPACE)) {
		 		if (this.currentcharacter >= this.script[this.currentline][1].length) {
		 			this.nextline();	 			
		 		}
		 	}
		 	isOnDialog = Array.isArray(this.script[this.currentline]);
			if ((createjs.Ticker.getTime() > this.endtime) && (!this.closing) && (isOnDialog)) {
				if (createjs.Ticker.getTicks() % this.textspeed == 0) {
					var currentcharacter = this.script[this.currentline][1][this.currentcharacter-1]
					var punctuation = [",", ".", "?", ";", ":", "!"];
					var isPunctuation = punctuation.contains(currentcharacter);
					console.log(currentcharacter + " | " + isPunctuation);
					var shouldspeak = (!(isPunctuation) && !(this.speechpause))
					if (shouldspeak) this.updateText();
					else {
						var pausetime = 250;
						if (currentcharacter == ",") pausetime = 100;
						if (currentcharacter == "?") pausetime = 250;
						if (this.speechpause == false) {
							this.speechpause = true;
						}
						console.log(this.speechpause)
						var g = this;
						if (isPunctuation) {
							g.updateText();
							setTimeout(function() {
								g.speechpause = false;
							}, pausetime);					
						}
					}
				}
			} 			
 		} else {
 			this.handleTransition();
 		}
	}
	Dialog.prototype.updateText = function() {
		var line = this.script[this.currentline][1];
		var line1max = line.length;
		var line2 = 0;
		if (this.starting) {
			if (this.currentspeaker.x < canvas.width/2) {
				this.setleft();
			}
			if (this.currentspeaker.x > canvas.width/2) {
				this.setright();
			}			
			this.starting = false;
		}
		this.textline3 = new createjs.Text("", "26px crazycreation", "#000000");
		this.textline3.isVisible = false;
		var lineMaxWidth = canvas.width - 250;
		this.textline3.text = line;
		if (this.textline3.getBounds().width > lineMaxWidth) {
			this.textline3.text = " ";
			var wordarray = line.split(" ");
			var charactertally = 0;
			var bestsize = 0;
			for (var i = 0; i < wordarray.length; i++){
				this.textline3.text = this.textline3.text + wordarray[i]
				charactertally += wordarray[i].length + 1;
				if ((this.textline3.getBounds().width > bestsize) && (this.textline3.getBounds().width < lineMaxWidth)) {
					bestsize = charactertally;
				}
				if (this.textline3.getBounds().width > lineMaxWidth) {
					break;
				}
			}
			line1max = bestsize;
		}
		if (this.currentcharacter < line1max) {
			this.textline1.text = line.slice(0,this.currentcharacter);
			this.currentcharacter++;
		} else {
			this.textline2.text = line.slice(line1max,this.currentcharacter);
			this.currentcharacter++;
		}	
	}
	/*
	Dialog.prototype.getCharacters = function() 
		if ((this.leftspeaker == "Guard I") || (this.leftspeaker == "Guard II")) {
			this.leftchar = new createjs.Bitmap(loader.getResult("knight1"))
			this.leftchar.regX = 100;
			this.leftchar.regY = 370;
			this.leftchar.scaleX = -1;
		}
		if ((this.rightspeaker == "Guard I") || (this.rightspeaker == "Guard II")) {
			this.rightchar = new createjs.Bitmap(loader.getResult("knight1"))
			this.rightchar.regX = 100;
			this.rightchar.regY = 370;
		}
		if (this.leftchar !== null) {
			this.leftchar.x = -200;
			//this.leftchar.y = -300;
			this.addChild(this.leftchar)
			createjs.Tween.get(this.leftchar, {loop: false}).to({x:150},1000,createjs.Ease.getPowInOut(4));
		}
		if (this.rightchar !== null) {
			this.rightchar.x = 1000;
			//this.rightchar.y = -300;
			this.addChild(this.rightchar)
			createjs.Tween.get(this.rightchar, {loop: false}).to({x:650},1000,createjs.Ease.getPowInOut(4));
		}
	}
	Dialog.prototype.removeCharacter = function(child) {
		if (child !== null) {
			if (child == this.leftchar) {
				createjs.Tween.get(this.leftchar, {loop: false}).to({x:-200},1000,createjs.Ease.getPowInOut(4));
			}
			if (child == this.rightchar) {
				createjs.Tween.get(this.rightchar, {loop: false}).to({x:1000},1000,createjs.Ease.getPowInOut(4));
			}
		}
	}
	*/
	Dialog.prototype.nextline = function() {
		var previousspeaker = this.currentspeaker;
		this.textline1.text = " ";
		this.textline2.text = " ";
		this.currentline++;
		this.currentcharacter = 0;
		if (this.currentline == this.script.length) {
			this.closelog();
		}
		if (Array.isArray(this.script[this.currentline])){
			this.currentspeaker = this.characters[this.script[this.currentline][0]];
			if (previousspeaker != this.currentspeaker) { 
				this.speakertext.text = this.currentspeaker.charName;
				this.speakertext.x = this.boxBounds.width/2 - this.speakertext.getBounds().width/2;
				if (this.currentspeaker.x < canvas.width/2) {
					this.setleft();
				}
				if (this.currentspeaker.x > canvas.width/2) {
					this.setright();
				}
			};			
		}
	}
	Dialog.prototype.handleTransition = function() {
		if (!(this.script[this.currentline] === undefined)) {
			if( !(this.script[this.currentline]["transition"] === undefined)) {
				var transition = this.script[this.currentline]["transition"];
				for (var key in transition) {
					this.characters[key].transition(transition[key]);
				}
				this.nextline();
			}
			if(!(this.script[this.currentline]["event"] === undefined)) {
				var eventLog = this.script[this.currentline]["event"];
				this.nextline();
				var mapevent = new MapEvent(eventLog);
			}
		} 
	}
	Dialog.prototype.setleft = function() {
		this.speakertext.text = this.script[this.currentline][0];
		createjs.Tween.get(this.arrow, {loop: false}).to({x:150},500,createjs.Ease.getPowInOut(4));
	}
	Dialog.prototype.setright = function() {
		this.speakertext.text = this.script[this.currentline][0];w
		createjs.Tween.get(this.arrow, {loop: false}).to({x:600},500,createjs.Ease.getPowInOut(4));
	}
	Dialog.prototype.setboth = function() {

	}
	Dialog.prototype.closelog = function() {
		this.speakertext.text = " ";
		this.delay(1000);
		createjs.Tween.get(this.box, {loop: false}).to({y:1000},1000,createjs.Ease.getPowInOut(4));
		createjs.Tween.get(this.arrow, {loop: false}).to({y:1000},1000,createjs.Ease.getPowInOut(4));
		this.closing = true;
		for (var key in this.characters) {
			var x = this.characters[key].x;
			if (x < canvas.width/2) {
				createjs.Tween.get(this.characters[key], {loop: false}).to({x:-200},1000,createjs.Ease.getPowInOut(4));
			}
			if (x > canvas.width/2) {
				createjs.Tween.get(this.characters[key], {loop: false}).to({x:1000},1000,createjs.Ease.getPowInOut(4));
			}
		}
		var g = this;
		setTimeout(function() {
			for (var key in g.characters) {
	 			g.removeChild(g.characters[key]);
	 		}
	 		level.removeChild(level.currentdialog);
			level.currentdialog = null;
			if ((level.activebattle == null) || (level.activebattle.initiator.isBeaten == true)) {
		 		level.paused = false;
		 		level.unpause();	 	
			}
		}, 1000);
					
	}
	Dialog.prototype.parselog = function(dialoglog){
		/*
       //This event is called when the DOM is fully loaded
        var fulltext;
        var script = {};
        window.addEvent("domready",function(){
            //Creating a new AJAX request that will request 'test.csv' from the current directory
            var csvRequest = new Request({
                url: dialoglog,
                onSuccess:function(response){
                    //The response text is available in the 'response' variable
                    //Set the value of the textarea with the id 'csvResponse' to the response
                    fulltext = response;
                }
            }).send(); //Don't forget to send our request!
        });
        var lines = fulltext.split(/\r\n|\r|\n/).length;
        var speakerarray = [];
        var linearray = [];
        //Split each line into the speaker and dialog and put in seperate arrays
        for (var i = 0; i < lines.length; i++) {
        	var colon = lines[i].indexOf(":");
        	for (var j = 0; j < lines[i].length; j++) {
        		speakerarray[i] = lines[i].substring(0,colon-1);
        		linearray[i] = lines[i].substring(colon+2,lines[i].length);
        	};
        };
        */
        return dialoglog;
	}
	Dialog.prototype.delay = function(milliseconds) {
		this.endtime = createjs.Ticker.getTime() + milliseconds;
	}
	window.Dialog = Dialog;
} (window));		