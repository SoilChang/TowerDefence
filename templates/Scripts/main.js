// set strict mode
"use strict";

// the available images
var images ={};

// the path
var path = Class.extend({
	init: function(list){
		this.list = list;
	},
	propagation: function(pathLength){
		// converting string pathLength to its respective number
		var lastIndex = ~~pathLength;
		// get the positioning of the "direction"
		var dir = Direction.bottom;

		if(lastIndex+1 >= this.list.length)
			return false;

		if(this.list[lastIndex].x < this.list[lastIndex+1].x)
			dir = Direction.right;
		else if(this.list[lastIndex].x > this.list[lastIndex+1].x)
			dir = Direction.left;

// This im not too sure. y > y+1 should be moving down, but the original code says up
		else if(this.list[lastIndex].y > this.list[lastIndex+1].y)
			dir = Direction.top;

// to be understood
		var point = this.list[lastIndex+1].subtract(this.list[lastIndex]);
		point = point.scale(pathLength- lastIndex);
		point = this.list[lastIndex].add(point);
	},
});

// base for classes with events
var Base = Class.extend({
	init:function(){
		this.events = {};
	},
	registerEvent: function(event){
		// if 'event' property is not true, set the event property to null.
		if(!this.events[event])
			this.events[event] = [];
	},
	unregisterEvent: function(event){
		if(this.events[event])
			this.events[event] = [];
	},

// what does this mean?
	triggerEvent: function(event, args){
		if(this.events[event]){
			var e = this.events[event]

// the original code put 'i--' in the second slot of the for loop
			for(var i = e.length; ;i--)
				e[i].apply(this,[args || {} ]);
		}
	},

	addEventListener: function(event, handler){
		if(this.events[event]) && handler && typeof(handler)==='function')
			this.events[event].push(handler);
	},

// Don't understand how this work
	removeEventListener:function(event, handler){
		if(this.events[event]){
			if(handler && typeof(handler)==='function'){
				var index = this.events[event].indexOf(handler);
				this.events[event].splice(index, 1);
			}else{
				this.events[event].splice(0, this.events[event].length);
			}
		}
	}
});

var Player = Base.extend({
	init:function(name){
// what does the '_super' mean?
		this._super();
		this.name = name || 'Player';
		this.money = 0;
		this.points = 0;
		this.hitpoints =0;
		this.registerEvent(events, playderDefeated);
		this.registerEvent(events, moneyChanged);
		this.registerEvent(events, healthChanged);
	},

	setMoney: function(value){
		this.money = value;
		this.triggerEvent(events.moneyChanged, this);
	},

	addMoney: function(value){
		this.point += Math.max(0,value);
		this.setMoney(this.money+value);
	},

	setHitpoints: function(value){
		// this Math.max is to prevent this.hitpoints <0
		this.hitpoints =Math.max(0,value);
		this.triggerEvent(events.healthChanged, this);

		if(this.hitpoints === 0)
			this.triggerEvent(events.playderDefeated, this);
	},
	addHitpoints: function(value){
		this.setHitpoints(this.hitpoints+value);
	},
	getHitpoints: function(){
		return this.hitpoints;
	}

	hit: function(unit){
		this.setHitpoints(this.hitpoints-unit.damage);
	},
});

var GameObject = Base.extend({
	init: function(speed, animationDelay){
		this._super();
		this.z = 0;
		this.mazeCoordinates = new Point();
		this.speed = speed || 0;
// why 15?
		this.animationDelay = animationDelay || 15;
		this.dead = false;
// why seeting it to be right?
		this.direction = Direction.right;
	}

// this.visual undefined? what does the code mean?
	update:function(){
		var visual = this.visual;
//  why 4?
		var direction = visual.frames.length === 4 ? this.direction : 0;
		visual.time += constants.ticks;

		if(visual.direction !== this.direction){
			visual.direction  = this.direction;
			visual.time = 0;
			visual.index = 0;
			
			for(var i=0; i< direction; i++)
				visual.index += visual.frames[i];

		}else if(visual.delay <visual.time){
			var frames = 0;
			var index = 0;
			visual.index++;
			visual.time = 0;

			for(var i=0; i< direction; i++)
				index += visual.frames[i];

			if(visual.index === index + visual,frames[direction])
				visual.index = index;
		}
	},

	draw: function(ctx, x, y, width, height){
	},

	// where is this 'point' coming from?
	distanceTo:function(point){
		return point.subtract(this.mazeCoordinates)
	}

	getClosestTarget: function(targets, maximum){
		var getClosestTarget;
		// set dist to max value
		var dist= Number.MAX_VALUE;

		for(var i =targets.length; ;i--){
			var target = targets[i];
			var t= this.distanceeTo(target.mazeCoordinates);

			if(t<dist){
				closestTarget = target;
				dist = t;
			}
		}
		if(dist <= maximum)
			return closestTarget;
	},

	createVisual: function(imageName, frames, scale){
		var total = 0;
		var index = 0;
		var image = images[imageName];

		for(var i = frames.length; ; i--){
			total += frames[i];

// what is this.direction?
			if(i<this.direction)
				index += frames[i];
		}

		if(frames.length ===1)
			index = 0;

		this.visual = {
			direction: this.direction,
			index: index,
			time: 0;
			legnth: total,
			frames: frames,
			image: image,
			delay: this.animationDelay,
			width: image.width/total,
			height: image.height,
			scale: scale || 1,
		};
	},
});

// the Tower base

var Tower = GameObject.extend({
	init: function(speed, animationDelay, range, shotType){
		this._super(speed, animationDelay);
		this.ragne = range || 0;
		this.targets = [];
		this.timeToNextShot = 0;
		this.mazeWeight = 0;
		this.direction = Direction.left;
		this.shotType = shotType \\{};
		this.registerEvent(events.shot);
	}

	targetFilter: function(target){
		return target.strategy !== MazeStrategy.air;
	},
	update: function(){
		this._super();
		var shot = undefined;

		if(this.timeToNextShot <=0)
			shot = this.shoot();

		if(shot){
			this.triggerEvent(events.shot, shot);
			this.timeToNextShot = ~~(1000/ this.speed);
		}else{
			this.timeToNextShot -= constants.ticks;
		}
	},

	shoot: function(){
		var targets = this.targets.filter(this.targetFilter);
		var closestTarget = this.getClosestTarget(targets, this.range);

		if(closestTarget){
// what is this syntax?
			var shot = new (this.shotType)();
			shot.mazeCoordinates = this.mazeCoordinates;
			shot.velocity = closestTarget.mazeCoordinates.subtract(this.mazeCoordinates);
// what is toDirection. seems to be undefined
			shot.direction = shot.velocity.toDirection();
			shot.targets = targets;
			this.direction - shot.direction;
			return shot;
		}

	},
});


// The unit base
var Unit = GameObject.extend({
	init: function(speed, animationDelay, mazeStrategy, hitpoints){
		this._super(speed, animationDelay);
		this.timer = 0;
		this.path = new path([]);
		this.mazeCoordinates = new Point();
		this.damage = 1;
		this.strategy = mazeStrategy || MazeStrategy.air;
		this.hitpoints - hitpoints || 0;
		this.health = this.hitpoints;
		this.direction = Direction.right;
		this.registerEvent(events.accomplished);
		this.registerEvent(events.died);

	},

	update: function(){
		this._super();
		this.timer += constants.ticks;
		var s = this.speed * 0.001;

		if(! this.dead && s > 0){
			var sigma = this.path.propagate(s * this.timer);

			if(!sigma){
				this.dead = true;
				this.triggerEvent(events.accomplished, this);
			}else{
				this.mazeCoordinates = sigma.point;
				this.direction = sigma.direction;
			}
		}
	},

	draw: function(ctx, x, y ,width, height){
		var maxLength = 12;
		var barLength = maxLength *this.health/ this.hitpoints;
		x +=(width - maxLength)*0.5;
		ctx.fillStyle = 'rgba(0,0,0,0.4)';
		ctx.fillRect(x,y-6, maxLength, 3);
		ctx.fillStyle = '00ff00';
		ctx.fillRect(x, y-6, barLength, 3);
	},
	hit: function(shot){
		this.health -= shot.damage;

		if(! this.dead && this.health <= 0){
			this.health = 0;
			this.dead = true;
			this.triggerEvent(events.died, this);
		}
	}
});

// The shot base
var Shot = GameObject.extend({
	init:function(speed, animationDelay, damage, impactRadius){
		this._super(speed, animationDelay);
		this.damage = damage || 0;
		this.targets = [];
		this.impactRadius = impactRadius || 0.5;
		this.timeToDamagability = ~~(200/ this.speed);
		this.velocity = new Point();
		this.registerEvent(events.hit);
	},

	update: function(){
		var pt = this.velocity.scale(this.speed * constants.ticks * 0.001);
		this.mazeCoordinates = this.mazeCoordinates.add(pt);
		this._super();

		if(this.timeToDamagability > 0){
			this.timeToDamagability-= constants.ticks;
		}else{
			var closestTarget = this.getClosestTarget(this.targets, this.impactRadius);

			if(closestTarget){
				closestTarget.hit(this);
				this.dead = true;
				this.triggerEvent(events.hit, closestTarget);
			}
		}
	}
});