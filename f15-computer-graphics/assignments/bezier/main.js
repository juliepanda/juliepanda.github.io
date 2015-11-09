function bezier(A, B, C, D) {
	var mat = new Matrix();
	var M = [
		[-1, 3, -3, 1],
		[3, -6, 3, 0],
		[-3, 3, 0, 0],
		[1, 0, 0, 0]
	];
	var tvec = mat.multiplyMatrix(M, [[A], [B], [C], [D]]);
	return [tvec[0][0], tvec[1][0], tvec[2][0], tvec[3][0]];
}

function viewport(p, w, h) {
	return [ ((w/2) * p[0]) + (w/2), (h/2) - (p[1] * (h/2)) ];
}

function reverseViewport(p, w, h) {
	return [(p[0] - (w/2)) * 2/w, (h/2 - p[1]) * 2/h ];
}

var bezpts = [];

var canvas = initCanvas('canvas');
var g = canvas.getContext('2d');
var pc, pt0, pt1, pt2, pt3, x, y, hx, hy, width = canvas.width, height = canvas.height, step = 0.05, sq_size = 5;
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
		if (bezpts.length === 0) bezpts.push(pt);
		if (pt[0] !== bezpts[bezpts.length-1][0] && pt[1] !== bezpts[bezpts.length-1][1]) bezpts.push(pt);

	}

	if (bezpts.length > 0) {
		g.lineWidth = 1;
		g.strokeStyle = 'green';
		bezpts.map(function(pt) {
			g.fillRect(pt[0], pt[1], 5, 5);
		});

		g.lineWidth = 1;
		g.strokeStyle = 'red';
		g.beginPath();
		if (bezpts.length > 3) {
			g.lineWidth = 1;
			g.strokeStyle = 'green';
			pt0 = reverseViewport(bezpts[0], width, height);
			pt1 = reverseViewport(bezpts[1], width, height);
			pt2 = reverseViewport(bezpts[2], width, height);
			pt3 = reverseViewport(bezpts[3], width, height);
			pc = bezpts[0];
			var pt0c = bezpts[0];
			var pt1c = bezpts[1];
			var pt2c = bezpts[2];
			var pt3c = bezpts[3];
			g.fillRect(pt0c[0], pt0c[1], sq_size, sq_size);
			g.fillRect(pt1c[0], pt1c[1], sq_size, sq_size);
			g.fillRect(pt2c[0], pt2c[1], sq_size, sq_size);
			g.fillRect(pt3c[0], pt3c[1], sq_size, sq_size);
			g.strokeStyle = 'red';
			g.beginPath();
			for (var t = 0; t < 1; t += step) {
				g.moveTo(pc[0], pc[1]);
				hx = bezier(pt0[0], pt1[0], pt2[0], pt3[0]);
				x = hx[0]*(Math.pow(t, 3)) + hx[1]*(Math.pow(t, 2)) + hx[2]*(t) + hx[3];
				hy = bezier(pt0[1], pt1[1], pt2[1], pt3[1]);
				y = hy[0]*(Math.pow(t, 3)) + hy[1]*(Math.pow(t, 2)) + hy[2]*(t) + hy[3];
				pc = viewport([x, y], width, height);
				g.lineTo(pc[0], pc[1]);
			}
			var lastPt = bezpts[bezpts.length - 1];
			if (pc[0] !== lastPt[0] || pc[1] !== lastPt[1]) {
				g.moveTo(pc[0], pc[1]);
				g.lineTo(lastPt[0], lastPt[1]);
			}
			g.stroke();

		}
		g.stroke();
	}
};

