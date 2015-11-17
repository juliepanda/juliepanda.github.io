function ParamObj(u, v) {
	if (u != undefined) {
		this.u = u;
		this.theta = Math.PI * 2 * this.u;
	}
	if (v != undefined) this.v = v;
}

ParamObj.prototype = {
	cylinder: function() {
		var x = Math.sin(this.theta);
		var y = Math.cos(this.theta);
		var z = 2 * this.v - 1;
		return [x, y, z];
	},

	sphere: function(theta, phi) {
		var x = Math.cos(theta) * Math.cos(phi);
		var y = Math.cos(phi) * Math.sin(theta);
		var z = Math.sin(phi);
		return [x, y ,z]; 
	},
	torus: function(theta, phi, r) {
		var x = (1 + r * Math.cos(phi)) * Math.cos(theta); 
		var y = (1 + r * Math.cos(phi)) * Math.sin(theta);
		var z = r * Math.sin(phi);
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
var sphmat = new Matrix().rotateY(1.2).rotateX(0.5);

canvas1.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var t = 0; t < 1; t += step) {
		var r = 2 * Math.cos(t) + Math.sin(t);
	}
	g.stroke();
};

var canvas2 = initCanvas('canvas2');
var cymat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);
var stepped = true;
canvas2.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var u = 0; u < 1; u += step) {
		for (var v = 0; v < 1; v += step) {
			var cy = new ParamObj(u, v);
			var obj = cy.cylinder();
			var cyc = cymat.transform([obj[0], obj[1], obj[2]]);
			var coords = viewport([cyc[0], cyc[1]], width, height);
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


var to = new ParamObj(1, 1);
var canvas3 = initCanvas('canvas3');
var tomat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);
canvas3.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0, phi = 0; theta < to.theta - step || phi < to.phi - step; theta+=step, phi+=step) {
		var obj = to.torus(theta, phi, 0.2);
		var toc = tomat.transform([obj[0], obj[1], obj[2]]);
		var coords = viewport([toc[0], toc[1]], width, height);
		g.moveTo(coords[0], coords[1]);
		obj = to.torus(theta + step, phi + step, 0.2);
		toc = tomat.transform([obj[0], obj[1], obj[2]]);
		coords = viewport([toc[0], toc[1]], width, height);
		g.lineTo(coords[0], coords[1]);
	}
	g.stroke();
};









