
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

function draw4points(g, step, pc, pt0, pt1, pt2, pt3, width, height) {
	for (var t = 0; t < 1; t += step) {
		g.moveTo(pc[0], pc[1]);
		hx = bezier(pt0[0], pt1[0], pt2[0], pt3[0]);
		x = hx[0]*(Math.pow(t, 3)) + hx[1]*(Math.pow(t, 2)) + hx[2]*(t) + hx[3];
		hy = bezier(pt0[1], pt1[1], pt2[1], pt3[1]);
		y = hy[0]*(Math.pow(t, 3)) + hy[1]*(Math.pow(t, 2)) + hy[2]*(t) + hy[3];
		pc = viewport([x, y], width, height);
		g.lineTo(pc[0], pc[1]);
	}
	return pc;
}

function pointInSelection(pt, selectBoxStart, selectBoxEnd) {
	var x = pt[0], y = pt[1];
	if (selectBoxStart[0] < x && x < selectBoxEnd[0]) {
		if (selectBoxStart[1] < y && y < selectBoxEnd[1]) return true;
	}
	return false;
}

function drawSelectionBox(selectBoxStart, selectBoxEnd, g) {
	g.moveTo(selectBoxStart[0], selectBoxStart[1]);
	g.lineTo(selectBoxStart[0], selectBoxEnd[1]);
	g.moveTo(selectBoxStart[0], selectBoxEnd[1]);
	g.lineTo(selectBoxEnd[0], selectBoxEnd[1]);
	g.moveTo(selectBoxEnd[0], selectBoxEnd[1]);
	g.lineTo(selectBoxEnd[0], selectBoxStart[1]);
	g.moveTo(selectBoxEnd[0], selectBoxStart[1]);
	g.lineTo(selectBoxStart[0], selectBoxStart[1]);
}

var canvas = initCanvas('canvas');
var pc, pt0, pt1, pt2, pt3, x, y, hx, hy, width = canvas.width, height = canvas.height, step = 0.05, sqSize = 5, prevSet = 0, first, second, third, fourth, selectBoxStart = null, selectBoxEnd = null, drawn = false, saveSelectBoxStart, saveSelectBoxEnd, selectedPoints = [];


var bezpts = [];
var selected = false;

var selectButton = document.getElementById('select');
var deleteButton = document.getElementById('delete');

selectButton.addEventListener('click', function() { 
	selected = (selected) ? false: true;
	selectButton.style.backgroundColor = (selected) ? 'cyan': null;
});

deleteButton.addEventListener('click', function() {
	if (bezpts.length > 0 && selectedPoints.length > 0) {
		var cpy = bezpts.filter( function(pt, i) {
			console.log(i, pt, selectedPoints[i]);
			return (!selectedPoints[i]) ? true: false;
		});
		bezpts = cpy;
	}
	selectedPoints = [];
	saveSelectBoxStart = null;
	saveSelectBoxEnd = null;
});

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
		if (!selected) {
			var pt = [this.cursor.x, this.cursor.y];
			if (bezpts.length === 0) bezpts.push(pt);
			if (pt[0] !== bezpts[bezpts.length-1][0] && pt[1] !== bezpts[bezpts.length-1][1]) bezpts.push(pt);
		}
	} 

	if (bezpts.length > 0) {
		g.strokeStyle = 'green';
		bezpts.map(function(pt) { g.fillRect(pt[0], pt[1], 5, 5); });

		g.strokeStyle = 'red';
		g.beginPath();
		if (bezpts.length > 3) {
			var set = ((bezpts.length - 1) % 3);
			if (set > 0) {
				set = prevSet;
			} else {
				set = prevSet = ((bezpts.length - 1) / 3) - 1;
			}

			g.lineWidth = 1;
			g.strokeStyle = 'green';
			g.beginPath();
			for (var a = 0; a < bezpts.length; a++) {
				g.fillRect(bezpts[a][0], bezpts[a][1], sqSize, sqSize);
			}
			g.stroke();

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
				pc = bezpts[first];
				pt0 = reverseViewport(bezpts[first], width, height);
				pt1 = reverseViewport(bezpts[second], width, height);
				pt2 = reverseViewport(bezpts[third], width, height);
				pt3 = reverseViewport(bezpts[fourth], width, height);
				pc = draw4points(g, step, pc, pt0, pt1, pt2, pt3, width, height);
				var lastPt = bezpts[fourth];
				if (pc[0] !== lastPt[0] || pc[1] !== lastPt[1]) {
					g.moveTo(pc[0], pc[1]);
					g.lineTo(lastPt[0], lastPt[1]);
				}
				g.stroke();
			}

		}
		if (selected) {
			g.beginPath();
			g.strokeStyle = 'blue';
			if (this.cursor.z) {
				if (selectBoxStart === null) {
					selectBoxStart = [this.cursor.x, this.cursor.y];
					selectedPoints = [];
				} else {
					selectBoxEnd = [this.cursor.x, this.cursor.y];
					drawSelectionBox(selectBoxStart, selectBoxEnd, g);
				}
			} else {
				if (selectBoxStart && selectBoxEnd) {
					drawn = true;
					saveSelectBoxStart = selectBoxStart;
					saveSelectBoxEnd = selectBoxEnd;
					selectBoxStart = null;
					selectBoxEnd = null;
				}
				if (saveSelectBoxStart && saveSelectBoxEnd) {
					console.log(saveSelectBoxStart, saveSelectBoxEnd);
					drawSelectionBox(saveSelectBoxStart, saveSelectBoxEnd, g);
					selectedPoints = bezpts.map( function(pt) {
						return pointInSelection(pt, saveSelectBoxStart, saveSelectBoxEnd);
					});
				}
			}
		}

	}

	g.stroke();
};

