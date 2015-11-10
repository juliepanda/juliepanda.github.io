function hermite(A, B, C, D) {
	var M = [
		[2, -2, 1, 1],
		[-3, 3, -2, -1],
		[0, 0, 1, 0],
		[1, 0, 0, 0]
	];
	var tvec = new Matrix().multiplyMatrix(M, [[A], [B], [C], [D]]);
	return [tvec[0][0], tvec[1][0], tvec[2][0], tvec[3][0]];
}

function viewport(p, w, h) {
	'use strict';
	return [ ((w/2) * p[0]) + (w/2), (h/2) - (p[1] * (h/2)) ];
}

function reverseViewport(p, w, h) {
	'use strict';
	return [(p[0] - (w/2)) * 2/w, (h/2 - p[1]) * 2/h ];
}

function draw4points(g, step, pc, pt0, pt1, pt2, pt3, width, height) {
	var d0 = getDerivative(pt0, pt1);
	var d1 = getDerivative(pt2, pt3);
	for (var t = 0; t < 1; t += step) {
		g.moveTo(pc[0], pc[1]);
		var hx = hermite(pt0[0], pt3[0], d0, d1);
		var x = hx[0]*(Math.pow(t, 3)) + hx[1]*(Math.pow(t, 2)) + hx[2]*(t) + hx[3];
		var hy = hermite(pt0[1], pt3[1], d0, d1);
		var y = hy[0]*(Math.pow(t, 3)) + hy[1]*(Math.pow(t, 2)) + hy[2]*(t) + hy[3];
		pc = viewport([x, y], width, height);
		g.lineTo(pc[0], pc[1]);
	}
	return pc;
}

function getDerivative(pt0, pt1) {
	return (pt1[1] - pt0[1]) / (pt1[0] - pt0[0]); 
}

var width = 600;
var height = 400;


var canvas = initCanvas('canvas');
var hermpts = [];
var step = 0.01, x = 0, y = 0, d0 = 0.5, d1 = -d0, first, second, third, fourth, set, prevSet, sqSize = 5, pt0, pt1, pt2, pt3, pc;
canvas.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'black';
	g.beginPath();
	g.moveTo(0, 0);
	g.lineTo(0, height);
	g.moveTo(0, height);
	g.lineTo(width, height);
	g.moveTo(width, height);
	g.lineTo(width, 0);
	g.moveTo(width, 0);
	g.lineTo(0, 0);
	g.stroke();
	if (this.cursor.z > 0) {
		var pt = [this.cursor.x, this.cursor.y];
		if (hermpts.length === 0) hermpts.push(pt);
		if (pt[0] !== hermpts[hermpts.length-1][0] && pt[1] !== hermpts[hermpts.length-1][1]) hermpts.push(pt);
	}

	if (hermpts.length > 0) {
		g.lineWidth = 1;
		g.strokeStyle = 'green';
		hermpts.map(function(pt) { g.fillRect(pt[0], pt[1], 5, 5); });

		g.lineWidth = 1;
		g.strokeStyle = 'red';
		g.beginPath();
		if (hermpts.length > 3) {
			var set = ((hermpts.length - 1) % 3);
			if (set > 0) {
				set = prevSet;
			} else {
				set = prevSet = ((hermpts.length - 1) / 3) - 1;
			}

			g.lineWidth = 1;
			g.strokeStyle = 'green';

			for (var a = 0; a < hermpts.length; a++) {
				g.fillRect(hermpts[a][0], hermpts[a][1], sqSize, sqSize);
			}

			g.strokeStyle = 'red';
			g.beginPath();
			for (var i = 0; i < set + 1; i++) {
				if (i === 0) {
					first = 0, second = 1, third = 2, fourth = 3;
				} else {
					first = 3*i + 0;
					second = 3*i + 1;
					third = 3*i + 2;
					fourth = 3*i + 3;
				}
				pc = hermpts[first];
				pt0 = reverseViewport(hermpts[first], width, height);
				pt1 = reverseViewport(hermpts[second], width, height);
				pt2 = reverseViewport(hermpts[third], width, height);
				pt3 = reverseViewport(hermpts[fourth], width, height);

				pc = draw4points(g, step, pc, pt0, pt1, pt2, pt3, width, height);
				var lastPt = hermpts[fourth];
				if (pc[0] !== lastPt[0] || pc[1] !== lastPt[1]) {
					g.moveTo(pc[0], pc[1]);
					g.lineTo(lastPt[0], lastPt[1]);
				}
			}
		}
	}
	g.stroke();

};

