


/*global storage*/ 
var monster_array=[];
var tower_array = [];

/*global variables*/
/*----------------------------------------------------------------------------------------*/
var coordinates = [  //this is the coordinates of the creep path
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
var lastEnemy = 0; //this is to track when previous monster was created, hence after a random delay, 
                   //the next monster will be created
var enemyLeft = 0;
var cursorX, cursorY;  //two variables to record current cursor position for usage later

/*player data*/
var player ={
	money: 50,
	hp: 10,
	defeated: false,
	wave_number:0,
	wave_active:false,
	wave_countdown:2,
	buying= null;  //buying null means buying nothing. null also will appear false in condition checking
};


var stage, castle ,background, backgroundI, healthbarI,castleI,towerI_fireTower, healthbar,
 newMonster, monsterI,
 hitsT, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9;
/*--------------------------------------------------------------------------------------------*/

function init() {
    stage = new createjs.Stage("demoCanvas");
    stage.enableMouseOver();

    //background image
    backgroundI = new Image();
    backgroundI.src = "images/firstStage.png"
    //place background
    background = new createjs.Bitmap(backgroundI);
    stage.addChild(background);

    //castle image
    castleI = new Image();
    castleI.src = "images/castle64.png"
    //place castle
    castle = new createjs.Bitmap(castleI);
    castle.x = 320;
    castle.y = 192;
    stage.addChild(castle);

    // hp bar image
    healthbarI = new Image();
        healthbarI.src = "images/lifebar.png"

    // grid();
    // update stage
    stage.update();


    //editing non canvas buttons
    document.getElementById("pauseBtn").value = "start";
    document.getElementById("cash").value = player.money;
    document.getElementById("life").value = player.hp;
    document.getElementById("wave").value = player.wave_number;
    document.getElementById("countdown").value = player.wave_countdown;

};



/*the following variables are to regulate game frames*/
/*-------------------------------------------------------------------------------*/
var frameRate=20;  //will be set to 20 times per second
var frameCount= 0;   //every tick increment this count. it is used in some other function later on
var pause = true;
var tick; //tick is our ticker variable
var ffCount = [20,40,80];  
var ffCounter= 1;

function fastForward(){
	frameRate = ffCount[ffCounter];
	switch(ffCounter) {
	    case 1:
	        ffCounter++;
	        document.getElementById("ffBtn").value="2x";
	        break;
	    case 2:
	        ffCounter=0;
	        document.getElementById("ffBtn").value="4x";
	        break;
	    case 0:
	        ffCounter++;
	        document.getElementById("ffBtn").value="1x";
	        break;
	}
};

// toggle pause the game
function togglePause(){
	if(pause){
		tick = setInterval( update, 1000/frameRate );
		pause = false;
	}else{
		clearInterval(tick);
		pause = true;
	}
};

//restart
function restart() {
    document.location.reload();
};

// this function handles a list of things that needs constant update. this function is called every interval
var update = function(){
	frameCount++;
	updateGame();
	moveCreep();
	stage.update();
	

	document.getElementById("countdown").value = player.wave_countdown;
	document.getElementById("wave").value = player.wave_number;
};
/*----------------------------------------------------------*/


function updateGame() {
    if (player.wave_active) {
        if (enemyLeft <= 0) {
            enemyLeft = 0;
            player.wave_countdown = 10; // reset countdown
            player.wave_active = false;  //reset wave_active state
        } else {
        	var delay = Math.floor((Math.random() * frameRate*3) + frameRate);  /*random delay bettwen 1 to 3 second. since frame
        														 rate is 20, 20= 1 second*/
            if (frameCount - lastEnemy >= delay) {
                createEnemy();  /*here we call createEnemy function. in the function, we will create random
                				monsters based on wave number. hp will be increased based on wave number*/

                enemyLeft--;
                lastEnemy = frameCount;
            }
        }
    } else {
        // countdown...
        player.wave_countdown -= 1/frameRate;  /*every tick minus 1/20. over the duration of 10 second, we will minus away everything*/
        document.getElementById("countdown").value = player.wave_countdown;
        if (player.wave_countdown < 0) {
            player.wave_number++;
            player.wave_countdown = 0;
            player.wave_active = true;
            enemyLeft = 5 + player.wave_number;
        }
    }
};


var hp_multiplier = 1.1;
var bounty_multiplier = 1.01;

var monsterData = [
	{name: 'hulk',             speed: 3,   hp: 10,   bounty:2,    image: "images/hulk.png"},
	{name: 'babyDragon',       speed: 4,   hp: 12,   bounty:3,    image: "images/babyDragon.png"},
	{name: 'evilEye',          speed: 5,   hp: 10,   bounty:3,    image: "images/evilEye.png"},
	{name: 'fireDragon',       speed: 3,   hp: 15,   bounty:5,    image: "images/fireDragon.png"},
	{name: 'earthDragon',      speed: 2,   hp: 20,   bounty:7,    image: "images/earthDragon"}
];

function constructMonster(name){
	for(var i=0; i<monsterData.length; i++){
		if(name === monsterData[i].name){
			healthbar = new createjs.Bitmap(healthbarI);
		    healthbar.y= -5;

		    monsterI = new Image();
		    monsterI.src = monsterData[i].image;
		    var m1 = new createjs.Bitmap(monsterI);
		    newMonster = new createjs.Container();
		    newMonster.addChild(healthbar, m1);
		    newMonster.x = 80;
		    newMonster.y = -32 -64;
		    newMonster.speed = monsterData[i].speed;
		    newMonster.currentHp = monsterData[i].hp*Math.pow(hp_multiplier,player.wave_number);
		    newMonster.maxHp = monsterData[i].hp*Math.pow(hp_multiplier,player.wave_number);
		    newMonster.bounty = monsterData[i].bounty*Math.pow(bounty_multiplier,player.wave_number);
		    monster_array.push(newMonster);
		    stage.addChild(newMonster);
		    stage.update();
		}
	}
}

var createEnemy = function(){
	if(player.wave_number <= 10){  //wave number less than 10
		var dice = Math.floor((Math.random() * 2) + 1); //random number between 1 and 2
		switch(dice){
			case 1:
				constructMonster('hulk');
				break;
			case 2:
				constructMonster('babyDragon');
				break;
		}
				
	}else if(player.wave_number <=20){  //wave number less than 20
		var dice = Math.floor((Math.random() * 3) + 1); //random number between 1 and 2
		switch(dice){
			case 1:
				constructMonster('hulk');
				break;
			case 2:
				constructMonster('babyDragon');
				break;
			case 3:
				constructMonster('evilEye')
		}
		
	}else if(player.wave_number <=30){ // wave number less than 30
		var dice = Math.floor((Math.random() * 4) + 1); //random number between 1 and 3
		switch(dice){
			case 1:
				constructMonster('hulk');
				break;
			case 2:
				constructMonster('babyDragon');
				break;
			case 3:
				constructMonster('evilEye');
				break;
			case 4:
				constructMonster('earthDragon');

		}
	}
};

function moveCreep(){
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

}


var towerData = [
	{name:'fireTower',  damage: 5, cd:19, range:112, slow: 1,   cost: 10,  image:"images/fireTower"},
	{name:'iceTower',   damage: 3, cd:19, range:112, slow: 0.5, cost: 20,  image:"images/iceTower"},
];

function buyTower(type){
	if(player.buying === null)
		player.buying = type;
		
	else{
		player.buying = null;
	}
}

function constructTower(name){
	for(var i=0; i<towerData.length; i++){
		if( name === towerData[i].name){

		}
	}
}


function getCursorPosition(){
	var cursorX = event.clientX;
	var cursorY = event.clientY; 
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

