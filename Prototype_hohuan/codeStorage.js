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














