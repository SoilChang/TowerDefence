
var stage, mapData, tileset, output, cash, life, coordinates, 
castleI, castle,
heroI, hero,
monsterI,monsters, monstersAmt, monster1, monster2,
dist

//initialized
function init() {
	stage = new createjs.Stage("demoCanvas");
	stage.mouseEventsEnabled = true;
	//background image
	mapData = level1;


	//coordinates of creep movement
	coordinates = [
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

    //bullet image
    bulletI = new Image();

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
    createjs.Ticker.setFPS(60);

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
    hero.x = 300;
    hero.y = stage.canvas.height-36;
    hero.damage = 5;
    hero.range = 100;
    hero.attack = function(obj) {
    	obj.hp -= this.damage;
    };

    monsters = [];
    monstersAmt = 8;

    for (var i=0; i<monstersAmt; i++) {
        monsters[i] = new createjs.Bitmap(monsterI);
        monsters[i].x = 80;
        monsters[i].y = -32 - i*64;
        monsters[i].speed = 4;
        monsters[i].hp = 50;
        monsters[i].cash = 2;
    };

    for (var i=0; i<monstersAmt; i++) {
        stage.addChild(monsters[i]);
    };

    //add to stage
    stage.addChild(castle);
    stage.addChild(hero);
    stage.update();
};

//check range
function inRange(tower,monx,mony) {
	var dx=Math.abs(tower.x-monx);
	var dy=Math.abs(tower.y-mony);
	dist=Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	if (dist<=tower.range) {
		return true
	}
    else {
        return false
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
        //creep path
        for (var i=0;i<monsters.length;i++) {
            if (monsters[i].y<=coordinates[1][1]-16 &&
                monsters[i].x<=coordinates[1][0]) {
                monsters[i].y+=monsters[i].speed;
            }
            else if (monsters[i].x<=coordinates[2][0]-16 &&
                monsters[i].y>=coordinates[2][1]-16) {
                monsters[i].x+=monsters[i].speed;
            }
            else if (monsters[i].y>=coordinates[3][1]-16 &&
                monsters[i].x>=coordinates[3][0]-16) {
                monsters[i].y-=monsters[i].speed;
            }
            else if (monsters[i].x>=coordinates[4][0]-16 &&
                monsters[i].y<=coordinates[4][1]-16) {
                monsters[i].x-=monsters[i].speed;
            }
            else if (monsters[i].y<=coordinates[5][1]-16 &&
                monsters[i].x<=coordinates[5][0]-16) {
                monsters[i].y+=monsters[i].speed;
            }
            else if (monsters[i].x<=coordinates[6][0]-16 &&
                monsters[i].y>=coordinates[6][1]-16) {
                monsters[i].x+=monsters[i].speed;
            }
            else if (monsters[i].y>=coordinates[7][1]-16) {
                monsters[i].y-=monsters[i].speed;
            }
            else if (monsters[i].x>=coordinates[8][0]-32) {
                monsters[i].x-=monsters[i].speed;
            };
        };

        //lose life 
        for (var i=0;i<monsters.length;i++) {
            if (monsters[i].x<362 &&
                monsters[i].x>358 &&
                monsters[i].y==204) {
                life-=1;
                document.getElementById("life").value = life;
            };
        };
        /*for (var i=0;i<monsters.length;i++) {
            if (inRange(hero, monsters[i].x,monsters[i].y)) {
                monsters[i].hp-=hero.damage;
                if (monsters[i].hp<=0) {
                    cash+=monsters[i].hp;
                    monsters[i].hp=0;
                    monsters[i].x=350;
                    monsters[i].y=204;
                }
            }
        }*/
    };
	

	output.text = "Paused = "+createjs.Ticker.getPaused()+"\n"+
		"Time = "+ Math.round(createjs.Ticker.getTime(true))+
        "mob1=" +monsters[0].x+','+monsters[0].y
	
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
