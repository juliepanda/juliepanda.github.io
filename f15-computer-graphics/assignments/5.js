
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
  new Vector3(-0.9,-0.9,-0.9),
  new Vector3( 0.9,-0.9,-0.9),
  new Vector3(-0.9, 0.9,-0.9),
  new Vector3( 0.9, 0.9,-0.9),

  new Vector3(-0.9,-0.9, 0.9),
  new Vector3( 0.9,-0.9, 0.9),
  new Vector3(-0.9, 0.9, 0.9),
  new Vector3( 0.9, 0.9, 0.9)
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

console.log(JSON.stringify(square));

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
var getImageView = function(vertice, width, height) {
  vertice.x = ((vertice.x + 1) / 2) * width;
  vertice.y = ((vertice.y + 1) / 2) * height;
  vertice.z = vertice.z + 2;
  return vertice;
};

var setPolygon = function(polygon, width, height) {
  return polygon.vertices.map( (vertice) => {
    return getImageView(vertice, width, height);
  });
};

var drawPolygon = function(polygon, lineWidth, strokeStyle, g) {
  g.lineWidth = lineWidth;
  g.strokeStyle = strokeStyle;
  g.beginPath();
  polygon.edges.map( (edge) => {
    var src = polygon.vertices[edge.src];
    console.log(src);
    g.moveTo(src.x/src.z, src.y/src.z);
    var dest = polygon.vertices[edge.dest];
    g.lineTo(dest.x/dest.z, dest.y/dest.z);
  });
  g.stroke();
};

var canvas = initCanvas('canvas2');
setPolygon(cube, canvas.width, canvas.height);
console.log(cube);
canvas.update = function(g) {
  var width = this.width;
  var height = this.height;
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


  drawPolygon(cube, 10, 'green', g);

};
