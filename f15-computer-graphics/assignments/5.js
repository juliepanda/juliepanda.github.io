var sq_vertices = [
	new Vector3(0, 0, 0),
	new Vector3(100, 0, 0),
	new Vector3(0, 100, 0),
	new Vector3(100, 100, 0)
];

var sq_edges = [
	new Edge(0, 1),
	new Edge(1, 3),
	new Edge(3, 2),
	new Edge(2, 0)
];

var cu_vertices = [
	new Vector3(-0.5,-0.5,-0.5),
	new Vector3( 0.5,-0.5,-0.5),
	new Vector3(-0.5, 0.5,-0.5),
	new Vector3( 0.5, 0.5,-0.5),

	new Vector3(-0.5,-0.5, 0.5),
	new Vector3( 0.5,-0.5, 0.5),
	new Vector3(-0.5, 0.5, 0.5),
	new Vector3( 0.5, 0.5, 0.5)
];

var cu_edges = [
	new Edge(0, 1),
	new Edge(1, 3),
	new Edge(3, 2),
	new Edge(2, 0),

	new Edge(0 +4, 1 +4),
	new Edge(1 +4, 3 +4),
	new Edge(3 +4, 2 +4),
	new Edge(2 +4, 0 +4),

	new Edge(0, 0 +4),
	new Edge(1, 1 +4),
	new Edge(3, 3 +4),
	new Edge(2, 2 +4),
];

var square = new Polygon(sq_vertices, sq_edges);
var cube = new Polygon(cu_vertices, cu_edges);

// var canvas = initCanvas('canvas1');
// canvas.update = function(g) {
//   var x, y;

//   x = this.cursor.x;
//   y = this.cursor.y;

//   g.fillStyle = this.cursor.z ? 'red' : 'rgb(128,255,128)';
//   g.beginPath();
//   g.moveTo(x-50,y-50);
//   g.lineTo(x+50,y-50);
//   g.lineTo(x+50,y+50);
//   g.lineTo(x-50,y+50);
//   g.fill();

//   g.strokeStyle = 'blue';
//   g.beginPath();
//   g.moveTo(0,0);
//   g.lineTo(this.width,0);
//   g.lineTo(this.width,this.height);
//   g.lineTo(0,this.height);
//   g.lineTo(0,0);
//   g.stroke();
// };
//

var height = 400;
var width = 600;

function viewport(p, w, h) {
	return [ ((w/2) * p[0]) + (w/2), (h/2) - (p[1] * (w/2)) ];
}

var drawPolygon = function(polygon, lineWidth, strokeStyle, g) {
	g.lineWidth = lineWidth;
	g.strokeStyle = strokeStyle;
	g.beginPath();
	polygon.edges.map( (edge) => {
		// console.log(edge, polygon.vertices[edge.src], polygon.vertices[edge.dest]);
		var src = polygon.vertices[edge.src];
		var mat = new Matrix().rotateX(1.3).rotateY(1.2).transform([src.x, src.y, src.z]);
		src = viewport([mat[0], mat[1]], width, height);
		g.moveTo(src[0], src[1]);
		var dest = polygon.vertices[edge.dest];
		var det = new Matrix().rotateX(1.3).rotateY(1.2).transform([dest.x, dest.y, dest.z]);
		dest = viewport([det[0], det[1]], width, height);
		g.lineTo(dest[0], dest[1]);
	});
	g.stroke();
};


var canvas = initCanvas('canvas2');
// var x, y;

// g.strokeStyle = 'blue';
// g.beginPath();
// g.moveTo(0,0);
// g.lineTo(this.width,0);
// g.lineTo(this.width,this.height);
// g.lineTo(0,this.height);
// g.lineTo(0,0);
// g.stroke();

// g.lineWidth = 10;
// g.strokeStyle = 'red';
// g.beginPath();
// g.moveTo(x - 50, y);
// g.lineTo(x + 50, y);
// g.moveTo(x + 50 * Math.sin(10 * Math.PI * time), y);
// g.lineTo(this.cursor.x, this.cursor.y);
// g.stroke();

canvas.update = function(g) {
	drawPolygon(cube, 1, 'green', g);
};

