"use strict";

//game over
function isOver() {
    if (confirm("Game Over!!"+"\n"+"Do you want to restart?") == true) {
        restart();
    }
}

//toggle pause
function togglePause() {
	var paused = createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(!paused);
	document.getElementById("pauseBtn").value = !paused ? "play" : "pause";

};

//restart
function restart() {
    document.location.reload();
}

// fast forward
function ff() {
    createjs.Ticker.setFPS(fast_forward[fast_forwarder]);
    switch(fast_forwarder) {
        case 1:
            fast_forwarder++;
            document.getElementById("ffBtn").value="2x";
            break;
        case 2:
            fast_forwarder=0;
            document.getElementById("ffBtn").value="4x";
            break;
        case 0:
            fast_forwarder++;
            document.getElementById("ffBtn").value="1x";
            break;
    }
}