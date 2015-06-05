"use strict";

function init() {
    stage = new createjs.Stage("demoCanvas");
    stage.enableMouseOver();

    imageurl();//direct image src
    grid();//grid of map
    //path();//line of creep path

    //editing non canvas buttons
    document.getElementById("pauseBtn").value = "start";
    document.getElementById("player_cash").value = player_cash;
    document.getElementById("player_life").value = player_life;
    document.getElementById("wave_number").value = wave_number;


    // and register our main listener
    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setPaused(true);
    createjs.Ticker.setFPS(20);

    // UI code:
    output = stage.addChild(new createjs.Text("", "14px monospace", "#000"));
    output.lineHeight = 15;
    output.textBaseline = "top";
    output.x = 10;
    output.y = stage.canvas.height-output.lineHeight*4-10;
};

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
    tower_image.push(heroI);
    tower_range.push(112);
    tower_reloadTime.push(19);//1APS
    tower_damage.push(5);
    tower_cost.push(10);


    //hp image
    healthbarI = new Image();
    healthbarI.src = "images/player_lifebar.png";

    //monster image
    monsterI = new Image();
    monsterI.src = "images/monster.png";
};
