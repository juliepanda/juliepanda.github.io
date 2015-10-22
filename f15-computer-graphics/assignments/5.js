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
var cube1 = new Polygon(cu_vertices, cu_edges);


var getImageView = function(pt, width, height) {
  var px = (width  / 2) + pt.x * (width / 2);
  var py = (height / 2) - pt.y * (width / 2);
  return [px, py];
};

var drawPolygon = function(polygon, lineWidth, strokeStyle, g, width, height, fn) {
  g.lineWidth = lineWidth;
  g.strokeStyle = strokeStyle;
  g.beginPath();
  polygon.edges.map( (edge) => {
    var src = fn(polygon.vertices[edge.src]);
    var set = getImageView(src, width, height);
    g.moveTo(set[0], set[1]);
    var dest = fn(polygon.vertices[edge.dest]);
    set = getImageView(dest, width, height);
    g.lineTo(set[0], set[1]);
  });
  g.stroke();
};

var manipCube = function(v) {
  var mat = new Matrix(v.x, v.y, v.z).rotateY(Math.PI/3).rotateX(Math.PI/3);
  return new Vector3(mat.x[0], mat.y[1], mat.z[2]);
};

var manipCube1 = function(v) {
  var mat = new Matrix(v.x, v.y, v.z).rotateZ(Math.PI/3);
  return new Vector3(mat.x[0], mat.y[1], mat.z[2]);
};


var canvas2 = initCanvas('canvas2');

canvas2.update = function(g) {
  drawPolygon(cube, 5, 'green', g, this.width, this.height, manipCube);
};


var canvas3 = initCanvas('canvas3');
// cube1.convert();
canvas3.update = function(g) {
  var uTime = time;
  drawPolygon(cube1, 5, 'green', g, this.width, this.height, manipCube1);
};
