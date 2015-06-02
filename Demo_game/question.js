// logic-186

getNumShooting: function() {
	return this.towers.filter(function(tower) {
		return (tower instanceof Rock) === false;
	}).length;
},


// video 18
// what is sort(function(){});  how will that work?
add: function(visual) {
		if (Array.isArray(visual)) {
			for (var i = 0, n = visual.length; i < n; ++i)
				this.visuals.push(visual[i]);
		} else
			this.visuals.push(visual);

		this.visuals.sort(function(a, b) {
			return a.z - b.z;
		});
	},



	
var View = Class.extend({
	init: function(width, height) {
		this.running = false;
		this.visuals = [];
		this.background = undefined;
		this.width = width || 300;
		this.height = height || 200;
		this.showGrid = true;
		this.mazeSize = new Size(25, 25);