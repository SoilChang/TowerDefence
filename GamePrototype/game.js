"use strict";

var stage, mapData, hitsT, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9,
tileset, output, cash, life, coordinates, controlSpeed, time,
castleI, castle, 
heroI, towers, towerCost, towerI, towerSelection, dist,
monsterI, monsters, monstersAmt, newMonster,
wave, checking

//game stats
monsters=[]
towers=[]
towerI = []
towerCost=[]
towerSelection = false
cash = 60;
life = 10;
wave = 1;

//initialized
function init() {
    stage = new createjs.Stage("demoCanvas");
    stage.enableMouseOver();
    //background image
    mapData = level1;

    grid();//grid of map
    path();//line of creep path
    imageurl();//direct image src

    //editing non canvas buttons
    document.getElementById("pauseBtn").value = "start";
    document.getElementById("cash").value = cash;
    document.getElementById("life").value = life;
    document.getElementById("wave").value = wave;

    // and register our main listener
    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setPaused(true);
    createjs.Ticker.setFPS(60);

    // UI code:
    output = stage.addChild(new createjs.Text("", "14px monospace", "#000"));
    output.lineHeight = 15;
    output.textBaseline = "top";
    output.x = 10;
    output.y = stage.canvas.height-output.lineHeight*4-10;
};


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

function imageurl() {
    //castle image
    castleI = new Image();
    castleI.src = "images/castle64.png"
    castleI.onload = handleImageLoad;

    //hero image
    heroI = new Image();
    heroI.src = "images/hero.png";
    heroI.onload = handleImageLoad;
    towerI.push(heroI);
    towerCost.push(10);

    //monster image
    monsterI = new Image();
    monsterI.src = "images/monster.png";
    monsterI.onload = handleImageLoad;
}

//hit area
function handleMouse(event) {
    event.target.alpha = (event.type == "mouseover") ? .3 : 0.01;
    if (event.type == "click") {
        if (towerSelection) {
            var newTower = new createjs.Bitmap(towerSelection[0]);
            newTower.x = event.target.coord[0];
            newTower.y = event.target.coord[1];
            towers.push(newTower);
            cash-=towerCost[towerSelection[1]];
            document.getElementById("cash").value=cash;
            towerSelection = false;
            stage.addChild(towers[0]);
            stage.update();
        };
    };
    
    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
};
//create monsters
function cMonster(speed,hp,cash,amt) {
    for (var i=0; i<amt; i++) {
        newMonster = new createjs.Bitmap(monsterI);
        newMonster.x = 80;
        newMonster.y = -32 - i*64;
        newMonster.speed = speed;
        newMonster.hp = hp;
        newMonster.cash = cash;
        stage.addChild(newMonster);
        monsters.push(newMonster);
    }
}

//handle image load
function handleImageLoad(event) {
    //load castle
    castle = new createjs.Bitmap(castleI);
    castle.x = 320;
    castle.y = 192;

    cMonster(4,3,2,2);

    //add to stage
    stage.addChild(castle);
    stage.update();
};




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
    controlSpeed = time % .5
    if (towers.length!=0 && controlSpeed==0) {
        for (var i=0;i<monsters.length;i++) {
            for (var j=0;j<towers.length;j++) {
                if (inRange(towers[j],monsters[i]) && monsters[i].y>=0) {
                    monsters[i].hp-=5
                }
                if (monsters[i].hp<=0) {
                    stage.removeChild(monsters[i]);
                    cash+=monsters[i].cash;
                    monsters.splice(i,1);
                    document.getElementById("cash").value=cash;
                }
            }
        }
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
    };
	

	output.text = "Paused = "+createjs.Ticker.getPaused()+"\n"+
		"Time = "+ time +"c"+checking
	
	stage.update(event); // important!!
};

//buying tower
function buyTower(index) {
    towerSelection = [towerI[index],index];
};

//next wave
function nextWave() {
    cMonster(4,5,2,2)
    wave++
    document.getElementById("wave").value = wave;
}

//restart
function restart() {
	cash = 100;
	life = 10;
    createjs.Ticker.setFPS(100);

}

//toggle pause
function togglePause() {
	var paused = createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(!paused);
	document.getElementById("pauseBtn").value = !paused ? "play" : "pause";

};

//game over
/*function over() {
    if (life<=0) {
        checking="nice"
        stage.update();
    }
}*/

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



