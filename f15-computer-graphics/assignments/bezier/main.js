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

function debouncePt(arr, pt, time) {
	window.setTimeout(function() {
		arr.push(pt);
	}, time);
}


var bezpts = [];

var canvas = initCanvas('canvas');
var ctx2 = canvas.getContext('2d');
var pc, pt0, pt1, pt2, pt3, x, y, hx, hy, width = canvas.width, height = canvas.height, step = 0.1;
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

	if (this.cursor.z > 0) {
		var pt = [this.cursor.x, this.cursor.y];
		debouncePt(bezpts, pt, 200);
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
			pt0 = reverseViewport(bezpts[0], width, height);
			pt1 = reverseViewport(bezpts[1], width, height);
			pt2 = reverseViewport(bezpts[2], width, height);
			pt3 = reverseViewport(bezpts[3], width, height);
			pc = bezpts[0];
			for (var t = 0; t < 1; t += step) {
				g.moveTo(pc[0], pc[1]);
				hx = bezier(pt0[0], pt1[0], pt2[0], pt3[0]);
				x = hx[0]*(Math.pow(t, 3)) + hx[1]*(Math.pow(t, 2)) + hx[2]*(t) + hx[3];
				hy = bezier(pt0[1], pt1[1], pt2[1], pt3[1]);
				y = hy[0]*(Math.pow(t, 3)) + hy[1]*(Math.pow(t, 2)) + hy[2]*(t) + hy[3];
				pc = viewport([x, y], width, height);
				g.lineTo(pc[0], pc[1]);
			}

		}
		g.stroke();
	}
};

