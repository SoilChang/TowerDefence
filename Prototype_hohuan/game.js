var stage, image, fpstext;
function init() {
    stage = new createjs.Stage(id("gameCanvas"));
    image = new createjs.Bitmap("assets/hill.png");
    stage.addChild(image);
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);
}