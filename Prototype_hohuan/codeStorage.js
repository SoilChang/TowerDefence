function constructTower(name){
	for(var i=0; i<towerData.length; i++){
		if( name === towerData[i].name){
			// create tower image & tower properties
			towerI = new Image();
			towerI.src = towerData[i].image; 
			newTower = new createjs.Bitmap(towerI);
            newTower.range = towerData[i].range;
            newTower.maxCd = towerData[i].cd;
            newTower.cd = towerData[i].cd;
            newTower.damage = towerData[i].damage;
            newTower.x = event.target.coord[0];
            newTower.y = event.target.coord[1];
            tower_array.push(newTower);
            // create aoe shape
            var aoe = new createjs.Shape();
            aoe.graphics.beginStroke("#000").drawCircle(newTower.x+14,newTower.y+16,newTower.range);
            aoe.alpha = 0.5; 
            aoeT.push(aoe);
            // deduct tower cost
            player.money-=towerData[i].cost;
            document.getElementById("cash").value=player.money;
            player.buying = false;
            // add to stage
            stage.addChild(newTower);
            stage.update();
		}
	}
}

function getCursorPosition(event){
	cursorX = event.clientX
	cursorY = event.clientY
}

function handleMouse(event) {
    event.target.alpha = (event.type == "mouseover") ? 0.3 : 0.01;
    if (event.type == "click"){
    	if(player.buying !== null){ //checking if buying is activated

    		/*tower creation*/
			for(var i=0; i<towerData.length; i++){
				if( player.buying === towerData[i].name){
					// create tower image & tower properties
					towerI = new Image();
					towerI.src = towerData[i].image; 
					newTower = new createjs.Bitmap(towerI);
		            newTower.range = towerData[i].range;
		            newTower.maxCd = towerData[i].cd;
		            newTower.cd = towerData[i].cd;
		            newTower.damage = towerData[i].damage;
		            newTower.slow = towerData[i].slow;
		            newTower.x = event.target.coord[0];
		            newTower.y = event.target.coord[1];
		            tower_array.push(newTower);
		            // create aoe shape
		            var aoe = new createjs.Shape();
		            aoe.graphics.beginStroke("#000").drawCircle(newTower.x+14,newTower.y+16,newTower.range);
		            aoe.alpha = 0.5; 
		            aoeT.push(aoe);
		            // deduct tower cost
		            player.money -= towerData[i].cost;
		            document.getElementById("cash").value = player.money;
		            player.buying = false;
		            // add to stage
		            stage.addChild(newTower);
		            stage.update();
		            break;
				}

			}
		}
	} 
}



//ticker events
function tick(event) {
    time = Math.round(createjs.Ticker.getTime(true)/100)/10
    controlSpeed = time % 1


    if (!createjs.Ticker.getPaused()) {
        nticks++
        if (towers.length!=0) {
            for (var i=0;i<towers.length;i++) {
                if (towers[i].cd>0) {
                    towers[i].cd--;
                    break;
                }
                for (var j=0;j<monsters.length;j++) {
                    if (inRange(towers[i],monsters[j]) && monsters[j].y>=0) {
                        monsters[j].currentHp-=towers[i].damage;
                        monsters[j].getChildAt(0).sourceRect = 
                        new createjs.Rectangle(0,0,monsters[j].currentHp/monsters[j]
                            .maxHp*32,3);
                        towers[i].cd=towers[i].maxCd;

                        if (monsters[j].currentHp<=0) {
                            stage.removeChild(monsters[j]);
                            cash+=monsters[j].cash;
                            monsters.splice(j,1);
                            document.getElementById("cash").value=cash;
                        }
                    }
                }
            }
        }


        
        //lose life 
        for (var i=0;i<monsters.length;i++) {
            if (monsters[i].x==360 &&
                monsters[i].y==204) {
                life-=1;
                document.getElementById("life").value = life;
            };
        };

	
	stage.update(event); // important!!
};













