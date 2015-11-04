var u = 0.5; // 0 < u < 1
var v = 0.5; // 0 < v < 1

function ParamObj(u, v) {
	this.u = u;
	this.v = v;
	this.theta = 2 * Math.PI * this.u;
	this.phi = Math.PI * this.v - (Math.PI / 2);
}

var cylinder = function(theta) {
	var x = Math.sin(theta);
	var y = Math.cos(theta);
	var z = 2 * this.v - 1;
	return [x, y, z];
};

var sphere = function(theta, phi) {
	var x = Math.cos(theta) * Math.cos(phi);
	var y = Math.cos(phi) * Math.sin(theta);
	var z = Math.sin(phi);
	return [x, y ,z]; 
};

var torus = function(theta, phi, r) {
	var x = (1 + r * Math.cos(phi)) * Math.cos(theta); 
	var y = (1 + r * Math.cos(phi)) * Math.sin(theta);
	var z = r * Math.sin(phi);
	return [x, y , z];
};

var viewport = function viewport(p, w, h) {
	return [ w/2 * p[0] + w/2, h/2 - p[1] * h/2 ];
};

var sp = new ParamObj(1, 1);
var canvas1 = initCanvas('canvas1');
var step = 0.1;
var width = 600;
var height = 400;
var sphmat = new Matrix();
canvas1.update = function(g) {
	g.lineWidth = 5;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0, phi = 0; theta < sp.theta - step || phi < sp.phi - step; theta+=step, phi+=step) {
		var obj = sphere(theta, phi);
		sphmat.x = obj[0];
		sphmat.y = obj[1];
		sphmat.z = obj[2];
		sphmat.mat = [obj[0], obj[1], obj[2], 1];
		sphmat.rotateX(0.3);
		var coords = viewport([sphmat.mat[0], sphmat.mat[1]], width, height);
		g.moveTo(coords[0], coords[1]);
		obj = sphere(theta + step, phi + step);
		sphmat.x = obj[0];
		sphmat.y = obj[1];
		sphmat.z = obj[2];
		sphmat.mat = [obj[0], obj[1], obj[2], 1];
		sphmat.rotateX(0.3);
		coords = viewport([sphmat.mat[0], sphmat.mat[1]], width, height);
		g.lineTo(coords[0], coords[1]);
	}
	g.stroke();
};

var cy = new ParamObj(1, 1);
var canvas2 = initCanvas('canvas2');
var cymat = new Matrix();
canvas2.update = function(g) {
	g.lineWidth = 5;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0; theta < cy.theta - step; theta+=step) {
		var obj = cylinder(theta);
		cymat.x = obj[0];
		cymat.y = obj[1];
		cymat.z = obj[2];
		cymat.mat = [obj[0], obj[1], obj[2], 1];
		cymat.rotateX(1).rotateY(0.5);
		var coords = viewport([cymat.mat[0], cymat.mat[1]], width, height);
		g.moveTo(coords[0], coords[1]);
		obj = cylinder(theta + step);
		cymat.x = obj[0];
		cymat.y = obj[1];
		cymat.z = obj[2];
		cymat.mat = [obj[0], obj[1], obj[2], 1];
		cymat.rotateX(1).rotateY(0.5);
		coords = viewport([cymat.mat[0], cymat.mat[1]], width, height);
		g.lineTo(coords[0], coords[1]);
	}
	g.stroke();
};


var to = new ParamObj(1, 1);
var canvas3 = initCanvas('canvas3');
canvas3.update = function(g) {
	g.lineWidth = 5;
	g.strokeStyle = 'green';
	g.beginPath();
	for (var theta = 0, phi = 0; theta < to.theta - step || phi < to.phi - step; theta+=step, phi+=step) {
		var coords = viewport(torus(theta, phi, 0.2), width, height);
		g.moveTo(coords[0], coords[1]);
		coords = viewport(torus(theta + step, phi + step, 0.2), width, height);
		g.lineTo(coords[0], coords[1]);
	}
	g.stroke();
};









