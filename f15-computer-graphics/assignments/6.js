function ParamObj(u, v, r) {
	if (u != undefined) {
		this.u = u;
		this.theta = Math.PI * 2 * this.u;
	}
	if (v != undefined) {
		this.v = v;
		this.phi = Math.PI * this.v - Math.PI / 2;
	}
	if (r != undefined) this.r = r;
}

ParamObj.prototype = {
	cylinder: function() {
		'use strict';
		var x = Math.sin(this.theta);
		var y = Math.cos(this.theta);
		var z = 2 * this.v - 1;
		return [x, y, z];
	},

	sphere: function() {
		'use strict';
		var x = Math.cos(this.theta) * Math.cos(this.phi);
		var y = Math.cos(this.phi) * Math.sin(this.theta);
		var z = Math.sin(this.phi);
		return [x, y ,z]; 
	},
	torus: function() {
		'use strict';
		var x = (1 + this.r * Math.cos(this.phi)) * Math.cos(this.theta); 
		var y = (1 + this.r * Math.cos(this.phi)) * Math.sin(this.theta);
		var z = this.r * Math.sin(this.phi);
		return [x, y , z];
	}
};

var viewport = function viewport(p, w, h) {
	return [ w/2 * p[0] + w/2, h/2 - p[1] * w/2 ];
};

var sp = new ParamObj(1, 1);
var canvas1 = initCanvas('canvas1');
var step = 0.01;
var width = 600;
var height = 400;
var mat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);
var stepped = true;
canvas1.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var u = 0; u < 1; u += step) {
		for (var v = 0; v < 1; v += step) {
			var p = new ParamObj(u, v);
			var obj = p.sphere();
			var tobj = mat.transform([obj[0], obj[1], obj[2]]);
			var coords = viewport([tobj[0], tobj[1]], width, height);
			if (stepped) {
				g.moveTo(coords[0], coords[1]);
				stepped = false;
			} else {
				g.lineTo(coords[0], coords[1]);
				stepped = true;
			}
		}
	}
	g.stroke();
};

var canvas2 = initCanvas('canvas2');
canvas2.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var u = 0; u < 1; u += step) {
		for (var v = 0; v < 1; v += step) {
			var p = new ParamObj(u, v);
			var obj = p.cylinder();
			var tobj = mat.transform([obj[0], obj[1], obj[2]]);
			var coords = viewport([tobj[0], tobj[1]], width, height);
			if (stepped) {
				g.moveTo(coords[0], coords[1]);
				stepped = false;
			} else {
				g.lineTo(coords[0], coords[1]);
				stepped = true;
			}
		}
	}
	g.stroke();
};


var canvas3 = initCanvas('canvas3');
var r = 0.5;
canvas3.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var u = 0; u < 1; u += step) {
		for (var v = 0; v < 1; v += step) {
			var p = new ParamObj(u, v, r);
			var obj = p.torus();
			var tobj = mat.transform([obj[0], obj[1], obj[2]]);
			var coords = viewport([tobj[0], tobj[1]], width, height);
			if (stepped) {
				g.moveTo(coords[0], coords[1]);
				stepped = false;
			} else {
				g.lineTo(coords[0], coords[1]);
				stepped = true;
			}
		}
	}
	g.stroke();
};









