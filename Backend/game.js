
var stage, mapData, tileset, output, cash, life, 
castleI, castle,
heroI, hero,
monsterI, monster1, monster2;

//initialized
function init() {
	stage = new createjs.Stage("demoCanvas");
	stage.mouseEventsEnabled = true;
	//background image
	mapData = level1;


	//coordinates of creep movement
	var coordinates = [
	[96, 0],
	[96, 480],
	[800, 480],
	[800, 96],
	[224, 96],
    [224, 352],
    [672, 352],
    [672, 224],
    [384, 224]
	];
	//show on map the path of creep
    var line = new createjs.Shape();

    for (var i=1;i<coordinates.length;i++) {
    	var point1=coordinates[i-1];
    	var point2=coordinates[i];
    //start drawing	
    line.graphics.setStrokeStyle(1).beginStroke("#000")
    .moveTo(point1[0],point1[1])
    .lineTo(point2[0],point2[1]);
    stage.addChild(line);
	};

    //castle image
    castleI = new Image();
    castleI.src = "images/castle64.png"
    castleI.onload = handleImageLoad;

	//hero image
	heroI = new Image();
	heroI.src = "images/hero.png";
	heroI.onload = handleImageLoad;

	//monster image
	monsterI = new Image();
	monsterI.src = "images/monster.png";
	monsterI.onload = handleImageLoad;

	cash = 120;
	life = 10;
	document.getElementById("pauseBtn").value = "start";
	document.getElementById("cash").value = cash;
	document.getElementById("life").value = life;
	//drag tower

	// and register our main listener
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setPaused(true);
	createjs.Ticker.setFPS(100);

	// UI code:
	output = stage.addChild(new createjs.Text("", "14px monospace", "#000"));
	output.lineHeight = 15;
	output.textBaseline = "top";
	output.x = 10;
	output.y = stage.canvas.height-output.lineHeight*2-10;
};


//handle image load
function handleImageLoad(event) {
    //load castle
    castle = new createjs.Bitmap(castleI);
    castle.x = 320;
    castle.y = 192;

	//load hero
    hero = new createjs.Bitmap(heroI);
    hero.alpha = .5;//opacity
    hero.cost = 100;
    hero.x = 200;
    hero.y = stage.canvas.height-40;
    hero.damage = 5;
    hero.range = 20;
    hero.attack = function(obj) {
    	obj.hp -= this.damage;
    };

    var monsters = [];
    var monstersAmt = 2;

    for (var i=0; i<monstersAmt; i++) {
        monsters[i] = new createjs.Bitmap(monsterI);
        monsters[i].x = 50 ;
        monsters[i].y = -32 - i*64;
    };

    for (var i=0; i<monstersAmt; i++) {
        stage.addChild(monsters[i]);
    };

    //add to stage
    stage.addChild(castle);
    stage.addChild(hero);
    stage.update();
};

//functions in-game
function isdead(obj) {
	if (obj.hp <= 0) {
		cash+=obj.cash;
		stage.removeChild(obj);
		obj.cash=0;
	}
};
function inRange(tower,mon) {
	dx=Math.abs(tower.x-mon.x);
	xy=Math.abs(tower.y-mon.y);
	dist=Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	if (dist<=tower.range) {
		mon.hp-=tower.damage;
	};
	if (mon.hp<=0) {
		cash+=mon.cash;
		stage.removeChild(mon);
		mon.cash=0;
	}
};
//ticker events
function tick(event) {
	if (hero.cost<=cash) {
		hero.alpha = 1;
	};

	if (hero.cost>cash) {
		hero.alpha = .5;
	}
    if (!createjs.Ticker.getPaused()) {
        

    };
	

	output.text = "Paused = "+createjs.Ticker.getPaused()+"\n"+
		"Time = "+ Math.round(createjs.Ticker.getTime(true))+"\n"
	
	stage.update(event); // important!!
};

//restart
function restart() {
	cash = 100;
	life = 10;
}

//toggle pause
function togglePause() {
	var paused = createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(!paused);
	document.getElementById("pauseBtn").value = !paused ? "play" : "pause";
	//allow tower dragging
	if (paused) {
		var drag =hero.on('pressmove', function(evt) {
			evt.currentTarget.x = evt.stageX;
			evt.currentTarget.y = evt.stageY;
			stage.update();
		});
	}
	if (!paused) {
		hero.on('pressmove', function() {});
	}

}

//map datas
var level1 = { "height":10,
 "layers":[
        {
         "data":[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
         "height":10,
         "name":"TowerTile",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
         "height":10,
         "name":"CreepPath",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"images/magecity_0.png",
         "imageheight":1450,
         "imagewidth":256,
         "margin":0,
         "name":"magecity_0",
         "properties":
            {

            },
         "spacing":1,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":10
}
