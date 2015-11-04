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


var width = 600;
var height = 400;

var pts = [[0.2, 0.02], [0.3, 0.5], [0.4, 0.7], [0.4, 0.1]];

var canvas1 = initCanvas('canvas1');
var step = 0.1, x = 0, y = 0, pt, d0 = 0.5, d1 = -d0;
canvas1.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	for (var i = 0; i < pts.length - 1; i++) {
		var pt0 = pts[i];
		var pt1 = pts[i+1];
		d0 = d1;
		d1 = d0;
		var pc = viewport([pt0[0], pt0[1]], width, height);
		for (var t = 0; t < 1; t += step) {
			g.moveTo(pc[0], pc[1]);
			hx = hermite(pt0[0], d0, pt1[0], d1);
			x = hx[0]*(Math.pow(t, 3)) + hx[1]*(Math.pow(t, 2)) + hx[2]*(t) + hx[3];
			hy = hermite(pt0[1], d0, pt1[1], d1);
			y = hy[0]*(Math.pow(t, 3)) + hy[1]*(Math.pow(t, 2)) + hy[2]*(t) + hy[3];
			pc = viewport([x, y], width, height);
			g.lineTo(pc[0], pc[1]);
		}

	}
	g.stroke();
};

var bezpts = [];

var bez_plot = document.getElementById('bezier-plot');
bez_plot.addEventListener('click', function() {
	var i = 0;
	bezpts = [];
	while (i < 4) {
		var x = parseFloat(document.getElementById('pt-' + i + '-x').value);
		var y = parseFloat(document.getElementById('pt-' + i + '-y').value);
		bezpts.push([x, y]);
		i++;
	}
	console.log(bezpts);
});

var canvas2 = initCanvas('canvas2');
var ctx2 = canvas2.getContext('2d');
var pt0, pt1, pt2, pt3, x, y;
canvas2.update = function(g) {
	if (bezpts.length > 3) {
		g.lineWidth = 1;
		g.strokeStyle = 'green';
		pt0 = bezpts[0];
		pt1 = bezpts[1];
		pt2 = bezpts[2];
		pt3 = bezpts[3];
		var pc = viewport([pt0[0], pt0[1]], width, height);
		var pt0c = viewport([pt0[0], pt0[1]], width, height);
		var pt1c = viewport([pt1[0], pt1[1]], width, height);
		var pt2c = viewport([pt2[0], pt2[1]], width, height);
		var pt3c = viewport([pt3[0], pt3[1]], width, height);
		ctx2.fillRect(pt0c[0], pt0c[1],3,3);
		ctx2.fillRect(pt1c[0], pt1c[1],3,3);
		ctx2.fillRect(pt2c[0], pt2c[1],3,3);
		ctx2.fillRect(pt3c[0], pt3c[1],3,3);
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
		g.stroke();
	}
};
