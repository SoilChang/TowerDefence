"use strict";

<<<<<<< HEAD:GamePrototype/main.js
// declaration of variables
var stage, hitsT, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9,
output,  controlSpeed, time;

// game variables
var backgroundI;
var castleI;
var heroI;
var monsterI;
var healthbarI;
var background; 
var castle;
var dist, monstersAmt, newMonster, 
healthbar,
,nticks=0;


var monster_stats = [10,4,2,2]; //hp,speed,worth,amt
var monster_array = [];
var tower_array = [];
var tower_image = [];
var tower_cost = [];
var tower_range = [];
var tower_reloadTime = [];
var tower_damage = [];
var towerSelection = [];
var aoeT = []
var player_cash = 60;
var player_life = 10;
var wave_number = 1;
var player_defeated = 0;
var fast_forward = [20,40,80]
var fast_forwarder = 1
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

=======
var stage, mapData, hitsT, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9,
tileset, output, cash, life, coordinates, controlSpeed, time,
backgroundI, castleI, heroI, monsterI, healthbarI,
background, castle,
<<<<<<< HEAD:GamePrototype/main.js
towers, towerCost, towerI, towerSelection, dist,
=======
towers, towerCost, towerI, towerR, towerCd, towerSelection, dist,
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
monsters, monstersAmt, newMonster, monsterstats, 
healthbar,
wave, checkGG

//game stats
monsterstats = [4,3,2,2]//speed,hp,cash,amt
monsters=[]
towers=[]
towerI = []
towerCost=[]
<<<<<<< HEAD:GamePrototype/main.js
=======
towerR=[]
towerCd=[]
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
towerSelection = false
cash = 60;
life = 10;
wave = 0;
checkGG = 0;

//initialized
function init() {
    stage = new createjs.Stage("demoCanvas");

    stage.enableMouseOver();
    //background image
    mapData = level1;


    imageurl();//direct image src
    grid();//grid of map
    //path();//line of creep path

    //editing non canvas buttons
    document.getElementById("pauseBtn").value = "start";
    document.getElementById("cash").value = cash;
    document.getElementById("life").value = life;
    document.getElementById("wave").value = wave;

    // and register our main listener
    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setPaused(true);
    createjs.Ticker.setFPS(100);

    // UI code:
    output = stage.addChild(new createjs.Text("", "14px monospace", "#000"));
    output.lineHeight = 15;
    output.textBaseline = "top";
    output.x = 10;
    output.y = stage.canvas.height-output.lineHeight*4-10;
};

>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js

function path() {
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
}

<<<<<<< HEAD:GamePrototype/main.js
=======
function imageurl() {
    //background image
    backgroundI = new Image();
    backgroundI.src = "images/firstStage.png"
    //load background
    background = new createjs.Bitmap(backgroundI);
    stage.addChild(background);

    //castle image
    castleI = new Image();
    castleI.src = "images/castle64.png"
    castleI.onload = handleImageLoad;

    //hero image
    heroI = new Image();
    heroI.src = "images/hero.png";
    towerI.push(heroI);
<<<<<<< HEAD:GamePrototype/main.js
=======
    towerR.push(112);
    towerCd.push(19);//1APS
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
    towerCost.push(10);

    //hp image
    healthbarI = new Image();
    healthbarI.src = "images/lifebar.png";

    //monster image
    monsterI = new Image();
    monsterI.src = "images/monster.png";
};

//handle image load
function handleImageLoad(event) {
    //load castle
    castle = new createjs.Bitmap(castleI);
    castle.x = 320;
    castle.y = 192;
>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js



<<<<<<< HEAD:GamePrototype/main.js
//buying tower
function buyTower(index) {
<<<<<<< HEAD:GamePrototype/main.js
    towerSelection = [tower_image[index],tower_range[index],
    tower_reloadTime[index],tower_damage[index],tower_cost[index]];
=======
    towerSelection = [towerI[index],towerR[index],
    towerCd[index],towerCost[index]];
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
};




//create monster_array
function creatMonster(hp,speed,worth,amt) {
=======
//hit area
function handleMouse(event) {
    event.target.alpha = (event.type == "mouseover") ? .3 : 0.01;
    if (event.type == "click") {
        if (towerSelection) {
            var newTower = new createjs.Bitmap(towerSelection[0]);
<<<<<<< HEAD:GamePrototype/main.js
            newTower.x = event.target.coord[0];
            newTower.y = event.target.coord[1];
            towers.push(newTower);
            cash-=towerCost[towerSelection[1]];
=======
            newTower.range = towerSelection[1];
            newTower.maxCd = towerSelection[2]
            newTower.cd = 0
            newTower.x = event.target.coord[0];
            newTower.y = event.target.coord[1];
            towers.push(newTower);
            cash-=towerSelection[3];
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
            document.getElementById("cash").value=cash;
            towerSelection = false;
            stage.addChild(towers[towers.length-1]);
            stage.update();
        };
    };
    
    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
};
<<<<<<< HEAD:GamePrototype/main.js
//create monsters
function cMonster(speed,hp,cash,amt) {
>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js
=======

//handle towers
function handleTower(event) {

}

//create monsters
function cMonster(speed,hp,cash,amt) {
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
    for (var i=0; i<amt; i++) {
        healthbar = new createjs.Bitmap(healthbarI);
        healthbar.y= -5;
        var m1 = new createjs.Bitmap(monsterI);
        newMonster = new createjs.Container();
        newMonster.addChild(healthbar, m1);
        newMonster.x = 80;
        newMonster.y = -32 - i*64;
        newMonster.speed = speed;
        newMonster.currentHp = hp;
        newMonster.maxHp = hp;
        newMonster.worth = worth;
        monster_array.push(newMonster);
        stage.addChild(newMonster);
    }
}



//check range
function inRange(tower,mon) {
	var dx=Math.abs(tower.x-mon.x);
	var dy=Math.abs(tower.y-mon.y);
	dist=Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
	if (dist<=64) {
		return true
	}
    else {
        return false
    }
};


//ticker events
function tick(event) {
    time = Math.round(createjs.Ticker.getTime(true)/100)/10
<<<<<<< HEAD:GamePrototype/main.js
    controlSpeed = time % 1


    if (!createjs.Ticker.getPaused()) {
        nticks++
        if (tower_array.length!=0) {
            for (var i=0;i<tower_array.length;i++) {
                if (tower_array[i].cd>0) {
                    tower_array[i].cd--;
                    break;
                }
<<<<<<< HEAD:GamePrototype/main.js
                for (var j=0;j<monster_array.length;j++) {
                    if (inRange(tower_array[i],monster_array[j]) && monster_array[j].y>=0) {
                        monster_array[j].currentHp-=tower_array[i].damage;
                        monster_array[j].getChildAt(0).sourceRect = 
                        new createjs.Rectangle(0,0,monster_array[j].currentHp/monster_array[j]
=======
                for (var j=0;j<monsters.length;j++) {
                    if (inRange(towers[i],monsters[j]) && monsters[j].y>=0) {
                        monsters[j].currentHp-=5;
                        monsters[j].getChildAt(0).sourceRect = 
                        new createjs.Rectangle(0,0,monsters[j].currentHp/monsters[j]
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js
                            .maxHp*32,3);
                        tower_array[i].cd=tower_array[i].maxCd;

                        if (monster_array[j].currentHp<=0) {
                            stage.removeChild(monster_array[j]);
                            player_cash+=monster_array[j].player_cash;
                            monster_array.splice(j,1);
                            document.getElementById("player_cash").value=player_cash;
                        }
=======
    controlSpeed = time % .5
    if (towers.length!=0 && controlSpeed==0) {
        for (var i=0;i<towers.length;i++) {
            for (var j=0;j<monsters.length;j++) {
                if (inRange(towers[i],monsters[j]) && monsters[j].y>=0) {
                    monsters[j].currentHp-=5;
                    monsters[j].getChildAt(0).sourceRect = 
                    new createjs.Rectangle(0,0,monsters[j].currentHp/monsters[j]
                        .maxHp*32,3);

                    if (monsters[j].currentHp<=0) {
                        stage.removeChild(monsters[j]);
                        cash+=monsters[j].cash;
                        monsters.splice(j,1);
                        document.getElementById("cash").value=cash;
>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js
                    }
                    break;
                }
            }
        }
    }

    if (!createjs.Ticker.getPaused()) {
        //creep path
        for (var i=0;i<monster_array.length;i++) {
            if (monster_array[i].y<=coordinates[1][1]-16 &&
                monster_array[i].x<=coordinates[1][0]) {
                monster_array[i].y+=monster_array[i].speed;
            }
            else if (monster_array[i].x<=coordinates[2][0]-16 &&
                monster_array[i].y>=coordinates[2][1]-16) {
                monster_array[i].x+=monster_array[i].speed;
            }
            else if (monster_array[i].y>=coordinates[3][1]-16 &&
                monster_array[i].x>=coordinates[3][0]-16) {
                monster_array[i].y-=monster_array[i].speed;
            }
            else if (monster_array[i].x>=coordinates[4][0]-16 &&
                monster_array[i].y<=coordinates[4][1]-16) {
                monster_array[i].x-=monster_array[i].speed;
            }
            else if (monster_array[i].y<=coordinates[5][1]-16 &&
                monster_array[i].x<=coordinates[5][0]-16) {
                monster_array[i].y+=monster_array[i].speed;
            }
            else if (monster_array[i].x<=coordinates[6][0]-16 &&
                monster_array[i].y>=coordinates[6][1]-16) {
                monster_array[i].x+=monster_array[i].speed;
            }
            else if (monster_array[i].y>=coordinates[7][1]-16) {
                monster_array[i].y-=monster_array[i].speed;
            }
            else if (monster_array[i].x>=coordinates[8][0]-32) {
                monster_array[i].x-=monster_array[i].speed;
            };
        };

        //lose player_life 
        for (var i=0;i<monster_array.length;i++) {
            if (monster_array[i].x==360 &&
                monster_array[i].y==204) {
                player_life-=1;
                document.getElementById("player_life").value = player_life;
            };
        };

<<<<<<< HEAD:GamePrototype/main.js
        if (player_life==0) {
            player_defeated++;
            if (player_defeated==1) {
                isOver();
                player_defeated++;
=======
        if (life==0) {
            checkGG++;
            if (checkGG==1) {
                over();
                checkGG++;
>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js
            }
        }
    };
	

	output.text = "Paused = "+createjs.Ticker.getPaused()+"\n"+
		"Time = "+ time +"c"
	
	stage.update(event); // important!!
};

<<<<<<< HEAD:GamePrototype/main.js

//next wave_number
function nextWave() {
    if (!createjs.Ticker.getPaused()) {
        wave_number++;
        document.getElementById("wave_number").value = wave_number;
        if (wave_number%10) {
           monster_stats[2] += 1 
        }
<<<<<<< HEAD:GamePrototype/main.js
        monster_stats[0] *= 1.2
        creatMonster(monster_stats[0],monster_stats[1],monster_stats[2],monster_stats[3]);
=======
        monsterstats[1] *= 1.2
        cMonster(monsterstats[0],monsterstats[1],monsterstats[2],monsterstats[3]);
>>>>>>> parent of 6948693... 5 Jun 550pm:GamePrototype/game.js

        stage.removeChild(castle);//making sure castle stays on the top layer
        stage.addChild(castle);
    }
}

=======
//buying tower
function buyTower(index) {
    towerSelection = [towerI[index],index];
};

//next wave
function nextWave() {
    monsterstats[2] += 1
    monsterstats[1] *= 1.2
    cMonster(monsterstats[0],monsterstats[1],monsterstats[2],monsterstats[3]);
    wave++;
    document.getElementById("wave").value = wave;
    stage.removeChild(castle);
    stage.addChild(castle);
}

//restart
function restart() {
    document.location.reload();

}

//toggle pause
function togglePause() {
	var paused = createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(!paused);
	document.getElementById("pauseBtn").value = !paused ? "play" : "pause";

};

//game over
function over() {
    if (confirm("Game Over!!"+"\n"+"Do you want to restart?") == true) {
        restart();
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
>>>>>>> parent of 0019067... 4 Jun 1130pm:GamePrototype/game.js

//grid
function grid() {
    //hitarea of map
    hitsT=[]
    //left area
    hitsT[0] = []
    hit0=[2, stage.canvas.height/32]

    for (var i=0;i<hit0[0];i++) {
        hitsT[0][i] = [];
    };

    for (var i=0;i<hit0[0];i++) {
        for (var j=0;j<hit0[1];j++) {
            hitsT[0][i][j] = new createjs.Shape();
            hitsT[0][i][j].graphics.beginFill("#f00").drawRect(32*i,32*j,32,32);
            hitsT[0][i][j].alpha=0.01;
            hitsT[0][i][j].coord=[32*i,32*j]
            hitsT[0][i][j].on("mouseover", handleMouse);
            hitsT[0][i][j].on("mouseout", handleMouse);
            hitsT[0][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[0][i][j]);
        };
    };
    //bottom area
    hitsT[1] = []
    hit1=[(stage.canvas.width/32)-4,1]

    for (var i=0;i<hit1[0];i++) {
        hitsT[1][i] = [];
    };

    for (var i=0;i<hit1[0];i++) {
        for (var j=0;j<hit1[1];j++) {
            hitsT[1][i][j] = new createjs.Shape();
            hitsT[1][i][j].graphics.beginFill("#f00").drawRect(64+32*i,
                (stage.canvas.height-32),32,32);
            hitsT[1][i][j].alpha=0.01;
            hitsT[1][i][j].coord=[64+32*i,stage.canvas.height-32];
            hitsT[1][i][j].on("mouseover", handleMouse);
            hitsT[1][i][j].on("mouseout", handleMouse);
            hitsT[1][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[1][i][j]);
        };
    };
    //top area
    hitsT[2] = []
    hit2=[(stage.canvas.width/32)-6,2]

    for (var i=0;i<hit2[0];i++) {
        hitsT[2][i] = [];
    };

    for (var i=0;i<hit2[0];i++) {
        for (var j=0;j<hit2[1];j++) {
            hitsT[2][i][j] = new createjs.Shape();
            hitsT[2][i][j].graphics.beginFill("#f00").drawRect(128+32*i,
                32*j,32,32);
            hitsT[2][i][j].alpha=0.01;
            hitsT[2][i][j].coord=[128+32*i,32*j];
            hitsT[2][i][j].on("mouseover", handleMouse);
            hitsT[2][i][j].on("mouseout", handleMouse);
            hitsT[2][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[2][i][j]);
        };
    };
    //left inner area
    hitsT[3] = []
    hit3=[2,12]

    for (var i=0;i<hit3[0];i++) {
        hitsT[3][i] = [];
    };

    for (var i=0;i<hit3[0];i++) {
        for (var j=0;j<hit3[1];j++) {
            hitsT[3][i][j] = new createjs.Shape();
            hitsT[3][i][j].graphics.beginFill("#f00").drawRect(128+32*i,
                64+32*j,32,32);
            hitsT[3][i][j].alpha=0.01;
            hitsT[3][i][j].coord=[128+32*i,64+32*j];
            hitsT[3][i][j].on("mouseover", handleMouse);
            hitsT[3][i][j].on("mouseout", handleMouse);
            hitsT[3][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[3][i][j]);
        };
    };       
    //bottom inner area
    hitsT[4] = []
    hit4=[16,2]

    for (var i=0;i<hit4[0];i++) {
        hitsT[4][i] = [];
    };

    for (var i=0;i<hit4[0];i++) {
        for (var j=0;j<hit4[1];j++) {
            hitsT[4][i][j] = new createjs.Shape();
            hitsT[4][i][j].graphics.beginFill("#f00").drawRect(192+32*i,
                stage.canvas.height-160+32*j,32,32);
            hitsT[4][i][j].alpha=0.01;
            hitsT[4][i][j].coord=[192+32*i,stage.canvas.height-160+32*j];
            hitsT[4][i][j].on("mouseover", handleMouse);
            hitsT[4][i][j].on("mouseout", handleMouse);
            hitsT[4][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[4][i][j]);
        };
    };
    //top inner area
    hitsT[5] = []
    hit5=[14,2]

    for (var i=0;i<hit5[0];i++) {
        hitsT[5][i] = [];
    };

    for (var i=0;i<hit5[0];i++) {
        for (var j=0;j<hit5[1];j++) {
            hitsT[5][i][j] = new createjs.Shape();
            hitsT[5][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                128+32*j,32,32);
            hitsT[5][i][j].alpha=0.01;
            hitsT[5][i][j].coord=[256+32*i,128+32*j];
            hitsT[5][i][j].on("mouseover", handleMouse);
            hitsT[5][i][j].on("mouseout", handleMouse);
            hitsT[5][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[5][i][j]);
        };
    };
    //bot inner-most area
    hitsT[6] = []
    hit6=[12,2]

    for (var i=0;i<hit6[0];i++) {
        hitsT[6][i] = [];
    };

    for (var i=0;i<hit6[0];i++) {
        for (var j=0;j<hit6[1];j++) {
            hitsT[6][i][j] = new createjs.Shape();
            hitsT[6][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                256+32*j,32,32);
            hitsT[6][i][j].alpha=0.01;
            hitsT[6][i][j].coord=[256+32*i,256+32*j];
            hitsT[6][i][j].on("mouseover", handleMouse);
            hitsT[6][i][j].on("mouseout", handleMouse);
            hitsT[6][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[6][i][j]);
        };
    };
    //left inner-most area
    hitsT[7] = []
    hit7=[2,2]

    for (var i=0;i<hit7[0];i++) {
        hitsT[7][i] = [];
    };

    for (var i=0;i<hit7[0];i++) {
        for (var j=0;j<hit7[1];j++) {
            hitsT[7][i][j] = new createjs.Shape();
            hitsT[7][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                192+32*j,32,32);
            hitsT[7][i][j].alpha=0.01;
            hitsT[7][i][j].coord=[256+32*i,192+32*j];
            hitsT[7][i][j].on("mouseover", handleMouse);
            hitsT[7][i][j].on("mouseout", handleMouse);
            hitsT[7][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[7][i][j]);
        };
    };
    //right inner area
    hitsT[8] = []
    hit8=[2,10]

    for (var i=0;i<hit8[0];i++) {
        hitsT[8][i] = [];
    };

    for (var i=0;i<hit8[0];i++) {
        for (var j=0;j<hit8[1];j++) {
            hitsT[8][i][j] = new createjs.Shape();
            hitsT[8][i][j].graphics.beginFill("#f00").drawRect(704+32*i,
                128+32*j,32,32);
            hitsT[8][i][j].alpha=0.01;
            hitsT[8][i][j].coord=[704+32*i,128+32*j];
            hitsT[8][i][j].on("mouseover", handleMouse);
            hitsT[8][i][j].on("mouseout", handleMouse);
            hitsT[8][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[8][i][j]);
        };
    };
    //right area
    hitsT[9] = []
    hit9=[2,17]

    for (var i=0;i<hit9[0];i++) {
        hitsT[9][i] = [];
    };

    for (var i=0;i<hit9[0];i++) {
        for (var j=0;j<hit9[1];j++) {
            hitsT[9][i][j] = new createjs.Shape();
            hitsT[9][i][j].graphics.beginFill("#f00").drawRect(832+32*i,
                32*j,32,32);
            hitsT[9][i][j].alpha=0.01;
            hitsT[9][i][j].coord=[704+32*i,128+32*j];
            hitsT[9][i][j].on("mouseover", handleMouse);
            hitsT[9][i][j].on("mouseout", handleMouse);
            hitsT[9][i][j].on("click", handleMouse); 
            stage.addChild(hitsT[9][i][j]);
        };
    };
};



