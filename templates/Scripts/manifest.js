"use strict";

// global constants
var constants = {
	ticks: 25,
	money : 5,
	hitpoints : 10,
	mediPackCost : 5,
	mediPackFactor : 1.2,
	mediPackHealth : 1,
	towerBuildCost : 5,
	towerBuildFactor : 1,
	towerBuildNumber : 4,
};

// list of possible events
var events = {
	click: 'click',
	mousemove: 'mousemove',
	mouseover: 'mouseover',
	mouseout: 'mouseout',
	contextmenu: 'contextmenu',
	died: 'died',
	shot: 'shot',
	hit: 'hit',
	accomplished : 'accomplished',
	playerDefeated : 'playerDefeated',
	moneyChanged : 'moneyChanged',
	waveCreated : 'waveCreated',
	waveFinished : 'waveFinished',
	waveDefeated : 'waveDefeated',
	healthChanged : 'healthChanged',
	unitSpawned : 'unitSpawned',
	towerNumberChanged : 'towerNumberChanged',
	// towerBuildCostChanged is going to be removed
	towerBuildCostChanged : 'towerBuildCostChanged',
	mediPackCostChanged : 'mediPackCostChanged',
};


// images to load
var resources = {
	images : [
		{ name : 'background', value : 'Content/background.jpg' },
		{ name : 'airshot', value : 'Content/sprites/airshot.png' },
		{ name : 'airwolf', value : 'Content/sprites/airwolf.png' },
		{ name : 'armos', value : 'Content/sprites/armos.png' },
		{ name : 'canontower', value : 'Content/sprites/canontower.png' },
		{ name : 'darknut', value : 'Content/sprites/darknut.png' },
		{ name : 'firewizzrobe', value : 'Content/sprites/firewizzrobe.png' },
		{ name : 'flak', value : 'Content/sprites/flak.png' },
		{ name : 'flameshot', value : 'Content/sprites/flameshot.png' },
		{ name : 'flametower', value : 'Content/sprites/flametower.png' },
		{ name : 'gatetohell', value : 'Content/sprites/gatetohell.png' },
		{ name : 'hellshot', value : 'Content/sprites/hellshot.png' },
		{ name : 'iceshot', value : 'Content/sprites/iceshot.png' },
		{ name : 'icetower', value : 'Content/sprites/icetower.png' },
		{ name : 'lasershot', value : 'Content/sprites/lasershot.png' },
		{ name : 'lasertower', value : 'Content/sprites/lasertower.png' },
		{ name : 'mgnest', value : 'Content/sprites/mgnest.png' },
		{ name : 'mgshot', value : 'Content/sprites/mgshot.png' },
		{ name : 'newunit', value : 'Content/sprites/newunit.png' },
		{ name : 'rock', value : 'Content/sprites/rock.png' },
		{ name : 'rope', value : 'Content/sprites/rope.png' },
		{ name : 'shellshot', value : 'Content/sprites/shellshot.png' },
		{ name : 'suns', value : 'Content/sprites/suns.png' },
		{ name : 'sunshot', value : 'Content/sprites/sunshot.png' },
		{ name : 'mario', value : 'Content/sprites/mario.png' },
		{ name : 'zelda', value : 'Content/sprites/zelda.png' },
		{ name : 'sonic', value : 'Content/sprites/sonic.png' },
	],
}