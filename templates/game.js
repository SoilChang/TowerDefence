"use strict";


// use's starting gold
var money = 450;

// tower states I
var Tower_damage = 5;
var Tower_reload = 20;
var Tower_range = 60;
var Tower_cost = 50;

// enemy states
var ENEMY_HEALTH = 50;
var ENEMY_SPEED = 60;

var ENEMY_DELAY = 30; // time between enemies
var HEALTH_INCREASE = 10; // Per wave
var WAVE_INCREASE = 5; // Enemies per wave

var lives = 10; //player helth

frameRate(30);

var wave = 0; // Wave number
var waveCountdown = 10; // Countdown to the next wave
var waveActive = false; // Is the wave active (enemies are spawning)?
var enemiesLeft = 0; // Enemies left in the wave

// Variables for angles
angleMode = "degrees";
var NORTH = 270, EAST = 0, SOUTH = 90, WEST = 180;

// This function draws the background.
var drawBackground = function() {
    var background = getElementById("game_canvas");
    // The wall you have to protect.
    for (var i = 0; i < 400; i += 100) {
        image(getImage("cute/StoneBlockTall"), i, 300, 105, 100);
    }
};

// Create an array of towers.
var towers = [];
// And an array of enemies.
var enemies = [];

// This function finds the closest object from an array.
var findClosest = function(x, y, array) {
    var closestObj = null; // We haven't found anything yet
    var closestDist = Infinity; // ditto
    
    for (var i = 0; i < array.length; i++) {
        var d = dist(x, y, array[i].x, array[i].y);
        if (d < closestDist) {
            // Closer element!
            closestObj = array[i];
            closestDist = d;
        }
    }
    // Return our found object.
    return closestObj;
};

var createEnemy = function(x, y, health, speed) {
    // Create an object
    var newEnemy = {
        // Enemies have four properties: x, y, health, and speed.
        x: x,
        y: y,
        health: health,
        speed: speed
    };
    
    // Now push it to the enemies array.
    enemies.push(newEnemy);
};

var drawEnemies = function() {
    // Loop through the enemies array.
    // Variable i starts out at 0, and every time it goes up by 1. When it hits enemies.length, it stops.
    for (var i = 0; i < enemies.length; i++) {
        // Call "enemy" the enemy we're working with
        var enemy = enemies[i];
        // Draw it
        // face
        fill(255, 0, 0);
        noStroke();
        ellipse(enemy.x, enemy.y, 40, 40);
        // eyes
        var eyeSize = 7;
        fill(0, 0, 0);
        ellipse(enemy.x - 10, enemy.y - 10, eyeSize, eyeSize);
        ellipse(enemy.x + 10, enemy.y - 10, eyeSize, eyeSize);
        // mouth (sad face)
        noFill();
        stroke(0, 0, 0);
        strokeWeight(2);
        arc(enemy.x, enemy.y + 10, 20, 15, 180, 360);
        
        // health
        textSize(15);
        textAlign(CENTER, CENTER);
        text(enemy.health, enemy.x, enemy.y - 30);
    }
};

var updateEnemies = function() {
    // Again, loop through, but this time, backwards
    for (var i = enemies.length - 1; i >= 0; i--) {
        var enemy = enemies[i];
        // Speed is pixels per second, so divide by 30
        enemy.y += enemy.speed / 30;
        // Tower damage and such is under updateTowers
        
        if (enemy.y >= 300) {
            // broke down the base!
            enemy.health = 0;
            lives--;
        }
        
        if (enemy.health <= 0) {
            // Enemy has 0 health! Delete now!
            enemies.splice(i, 1);
            money += 15;
        }
    }
};

/**      **\
   TOWERS
\**      **/

var placeTower = function(x, y, type) {
    var newTower = {
        x: x,
        y: y,
        
        damage: TOWER_DAMAGE,
        range: TOWER_RANGE,
        reload: TOWER_RELOAD,
        // Stores when the tower last fired
        lastFired: -Infinity,
        
        // What angle the tower is pointing at
        angle: NORTH
    };
    towers.push(newTower);
};

var drawTowers = function() {
    for (var i = 0; i < towers.length; i++) {
        var tower = towers[i];
        // Draw tower like O- with an outline
        // Read the documentation on pushMatrix().
        pushMatrix();
        translate(tower.x, tower.y);
        rotate(tower.angle);
        
        // Draw the blue circle
        fill(0, 0, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        // (tower.x, tower.y) is the new (0, 0)
        ellipse(0, 0, 20, 20);
        // and the turret (5 pixels outward)
        line(10, 0, 15, 0);
        
        // Draw its range
        stroke(0, 0, 0, 128);
        noFill();
        ellipse(0, 0, tower.range * 2, tower.range * 2);
        popMatrix();
    }
};
var updateTowers = function() {
    for (var i = towers.length - 1; i >= 0; i--) {
        var tower = towers[i];
        var x = tower.x, y = tower.y;
        // Are we ready to fire?
        
        /* This code ahead is complicated!
        
        Suppose this tower's reload is 30, and it fired last at frame 65. If frameCount is 94, then:
        frameCount - tower.lastFired === 29;
        29 >= 30 === false
        So the tower will not fire.
        At frame 95, we get 30 >= 30, which is true.
        */
        
        var enemy = findClosest(x, y, enemies);
        // Make sure we actually have an enemy
        if (enemy !== null) {
            var x2 = enemy.x, y2 = enemy.y;
            // accounts for the size of the enemy
            if (dist(x, y, x2, y2) <= tower.range + 15) {
                // enemy in range?
                if (frameCount - tower.lastFired >= tower.reload) {
                    // yes, subtract health
                    enemy.health -= tower.damage;
                    tower.lastFired = frameCount;
                }
                // rotate tower
                tower.angle = atan2(enemy.y - tower.y,
                                    enemy.x - tower.x);
            }
        }
    }
};

// This function gets called when you click.
var mouseClicked = function() {
    var x = mouseX;
    var y = mouseY;
    // If we have enough money
    if (money >= TOWER_COST) {
        // Yay. Now we need to check tower in bounds.
        if (y <= 280) {
            // Ok, be sure towers don't stack on each other
            for (var i = 0; i < towers.length; i++) {
                var twr = towers[i];
                if (dist(x, y, twr.x, twr.y) <= 40) {
                    return; // Tower on that spot...
                }
            }
            
            // Place a tower!
            placeTower(x, y);
            money -= TOWER_COST;
        }
    }
};

// Enemy spawned last at...
var lastEnemy = 0;


// This function updates the game logic.
var updateGame = function() {
    // Create enemies.
    if (waveActive) {
        if (enemiesLeft <= 0) {
            enemiesLeft = 0;
            waveCountdown = 10; // reset countdown
            waveActive = false;
        } else {
            if (frameCount - lastEnemy >= ENEMY_DELAY) {
                var x = random(20, width - 20);
                var y = -100;
                createEnemy(x, y, ENEMY_HEALTH, ENEMY_SPEED);
                enemiesLeft--;
                lastEnemy = frameCount;
            }
        }
    } else {
        // countdown...
        waveCountdown -= 1/30;
        if (waveCountdown < 0) {
            wave++;
            waveCountdown = 0;
            waveActive = true;
            enemiesLeft = WAVE_INCREASE * wave;
            
            ENEMY_HEALTH += HEALTH_INCREASE;
        }
    }
    
    updateTowers();
    updateEnemies();
};


var draw = function() {
    drawBackground();
    
    // Update stuff
    updateGame();
    
    // Draw stuff
    drawTowers();
    drawEnemies();
    
    // Display stuff
    fill(0, 0, 0);
    textSize(24);
    textAlign(LEFT, TOP);
    // Display money
    text("Money: " + money, 0, height - 90);
    
    // Display lives
    for (var i = 0; i < lives; i++) {
        var heart = getImage("space/healthheart");
        image(heart,
              i * 20,
              height - 20,
              20,
              20
        );
    }
    
    textSize(20);
    // Display the "Next wave in:" text
    textAlign(RIGHT, TOP);
    text("Next wave in:", width, height - 90);
    textSize(50);
    // countdown
    text(round(waveCountdown), width - 10, height - 70);
    
    if (lives <= 0) {
        background(255, 0, 0);
        fill(0, 0, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("You lost!", width/2, height/2);
    }
};
