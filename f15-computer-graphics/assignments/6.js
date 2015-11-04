function ParamObj(u, v) {
	this.u = u;
	this.v = v;
	this.theta = 2 * Math.PI * this.u;
	this.phi = Math.PI * this.v - (Math.PI / 2);
}

ParamObj.prototype = {
	cylinder: function(theta) {
		if (theta < this.theta) {
			var x = Math.sin(theta);
			var y = Math.cos(theta);
			var z = 2 * this.v - 1;
			return [x, y, z];
		}
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
var step = 0.05;
var width = 600;
var height = 400;
var sphmat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);
canvas1.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0, phi = 0; theta < sp.theta - step || phi < sp.phi - step; theta+=step, phi+=step) {
		var obj = sp.sphere(theta, phi);
		var sphc = sphmat.transform([obj[0], obj[1], obj[2]]);
		var coords = viewport([sphc[0], sphc[1]], width, height);
		g.moveTo(coords[0], coords[1]);
		obj = sp.sphere(theta + step, phi + step);
		var sphd = sphmat.transform([obj[0], obj[1], obj[2]]);
		coords = viewport([sphd[0], sphd[1]], width, height);
		g.lineTo(coords[0], coords[1]);
	}
	g.stroke();
};

var cy = new ParamObj(0.5, 1);
var canvas2 = initCanvas('canvas2');
var cymat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);

canvas2.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0; theta < cy.theta; theta+=step) {
		var obj = cy.cylinder(theta);
		var cyc = cymat.transform([obj[0], obj[1], obj[2]]);
		var coords = viewport([cyc[0], cyc[1]], width, height);
		g.moveTo(coords[0], coords[1]);
		obj = cy.cylinder(theta + step);
		cyc = cymat.transform([obj[0], obj[1], obj[2]]);
		coords = viewport([cyc[0], cyc[1]], width, height);
		g.lineTo(coords[0], coords[1]);
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









