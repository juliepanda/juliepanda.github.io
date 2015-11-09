var Vector3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

var Edge = function(src, dest) {
	this.src = src;
	this.dest = dest;
};

var Polygon = function(vertices, edges) {
	this.vertices = vertices;
	this.edges = edges;
};



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


var height = 400;
var width = 600;

function viewport(p, w, h) {
	return [ ((w/2) * p[0]) + (w/2), (h/2) - (p[1] * (w/2)) ];
}

var drawPolygon = function(polygon, tobj, g) {
	polygon.edges.map( (edge) => {
		// console.log(edge, polygon.vertices[edge.src], polygon.vertices[edge.dest]);
		var src = polygon.vertices[edge.src];
		var mat = tobj.transform([src.x, src.y, src.z]);
		src = viewport([mat[0], mat[1]], width, height);
		g.moveTo(src[0], src[1]);
		var dest = polygon.vertices[edge.dest];
		var det = tobj.transform([dest.x, dest.y, dest.z]);
		dest = viewport([det[0], det[1]], width, height);
		g.lineTo(dest[0], dest[1]);
	});
};

var f = 0.01;
var canvas = initCanvas('canvas2');
var tobj = new Matrix().rotateX(1.3).rotateY(1.2);
// tobj.translate(0, 0, -f).focal(f);
var sobj = new Matrix().scale(0.5, 0.5, 0.5).rotateZ(0.4).rotateX(0.3).rotateY(1.2);
// sobj.translate(0, 0, -f).focal(f);

canvas.update = function(g) {
	g.lineWidth = 1;
	g.strokeStyle = 'green';
	g.beginPath();
	drawPolygon(cube, tobj, g);
	drawPolygon(cube, sobj, g);
	g.stroke();
};

