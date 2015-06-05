"use strict";

//handle image load
function handleImageLoad(event) {
    //load castle
    castle = new createjs.Bitmap(castleI);
    castle.x = 320;
    castle.y = 192;

    creatMonster(monster_stats[0],monster_stats[1],monster_stats[2],monster_stats[3]);

    //add to stage
    stage.addChild(castle);
    stage.update();
};

//handle tower upgrades
function handleTower(event) {
    event.target
}

//hit area
function handleMouse(event) {
    event.target.alpha = (event.type == "mouseover") ? .3 : 0.01;
    if (event.type == "click") {
        if (towerSelection) {
            var newTower = new createjs.Bitmap(towerSelection[0]);
            newTower.range = towerSelection[1];
            newTower.maxCd = towerSelection[2]
            newTower.cd = 0
            newTower.damage = towerSelection[3]
            newTower.x = event.target.coord[0];
            newTower.y = event.target.coord[1];
            newTower.on("click", handleTower); 
            tower_array.push(newTower);
            var aoe = new createjs.Shape();
            aoe.graphics.beginStroke("#000").drawCircle(
                newTower.x+14,newTower.y+16,newTower.range);
            aoe.alpha = .5; 
            aoeT.push(aoe)
            player_cash-=towerSelection[4];
            document.getElementById("player_cash").value=player_cash;
            towerSelection = [];
            stage.addChild(tower_array[tower_array.length-1]);
        };
    };
    
    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
};
