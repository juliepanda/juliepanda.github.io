function hermite(A, B, C, D) {
	var mat = new Matrix();
	var M = [
		[2, -2, 1, 1],
		[-3, 3, -2, -1],
		[0, 0, 1, 0],
		[1, 0, 0, 0]
	];
	var vec = [A, B, C, D];
	var tvec = mat.mutiplyMatrix(M, vec);
}

function bezier(A, B, C, D) {
	var mat = new Matrix();
	var M = [
		[-1, 3, -3, 1],
		[3, -6, 3, 0],
		[-3, 3, 0, 0],
		[1, 0, 0, 0]
	];
	var vec = [A, B, C, D];
	var tvec = mat.mutiplyMatrix(M, vec);
}

function viewport(p, w, h) {
	return [ ((w/2) * p[0]) + (w/2), (h/2) - (p[1] * (h/2)) ];
}
var width = 600;
var height = 400;

var canvas1 = initCanvas('canvas1');
var step = 1, x = 0, y = 0, pt, i;
canvas1.update = function(g) {
	g.lineWidth = 5;
	g.strokeStyle = 'green';
	g.beginPath();
	for (i = 0.01; i < 2; i++) {
		x = i;
		y = x;
		pt = viewport([x, y], width, height);
		console.log(i, pt);
		g.moveTo(pt[0], pt[1]);
		g.lineTo(pt[0] + step, pt[1] + step);
	}
	g.stroke();
};
