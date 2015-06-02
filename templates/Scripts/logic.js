"use strict";

// game states enumeration
var GameState = {
	unstarted : 0,
	building : 1,
	waving : 2,
	finished : 3,
};

// global object
var types = {
	units : {},
	towers : {},
	shots : {},
};

// the game

var GameLogic = Base.extend({
	init: function(view, mazeWidth, mazeHeight) {
		var me = this;
		me._super();

		me.towers = [];
		me.units = [];
		me.shots = [];

		me.mediPackCost = constants.mediPackCost;
		me.mediPackFactor = constants.mediPackFactor;
		me.mediPackHealth = constants.mediPackHealth;

		me.view = view;
		me.player = new Player();
		me.state = GameState.unstarted;
		me.maze = new Maze(new Size(mazeWidth || 20, mazeHeight || 11));
		me.view.mazeSize = me.getMazeSize();
		me.waves = new WaveList();
		me.currentWave = new Wave();

		me.player.addEventListener(events.playerDefeated, function(e) {
			me.triggerEvent(events.playerDefeated, e);
			me.finish();
		});

		me.player.addEventListener(events.moneyChanged, function(e) {
			me.triggerEvent(events.moneyChanged, e);
		});

		me.player.addEventListener(events.healthChanged, function(e) {
			me.triggerEvent(events.healthChanged, e);
		});

		me.registerEvent(events.refreshed);
		me.registerEvent(events.waveDefeated);
		me.registerEvent(events.waveFinished);
		me.registerEvent(events.playerDefeated);
		me.registerEvent(events.moneyChanged);
		me.registerEvent(events.healthChanged);
		me.registerEvent(events.waveCreated);
		me.registerEvent(events.unitSpawned);
		me.registerEvent(events.mediPackCostChanged);
	},
	start: function() {		
		if (this.state === GameState.unstarted) {
			this.player.setHitpoints(constants.hitpoints);
			this.player.setMoney(constants.money);
			this.triggerEvent(events.towerNumberChanged, {
				current: this.getNumShooting(),
				maximum: this.maxTowerNumber,
			});
			this.state = GameState.building;
		}

		this.restart();
	},

	restart: function() {
		if (!this.gameLoop) {
			var me = this;
			this.view.start();
			this.gameLoop = setInterval(function() {
				me.tick();
			},
			constants.ticks);	
		}
	},

});