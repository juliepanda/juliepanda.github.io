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


/* matrix constructor */
var Matrix = function(x, y, z) {
  this.x = [x, 0, 0, 0];
  this.y = [0, y, 0, 0];
  this.z = [0, 0, z, 0];
  this.t = [0, 0, 0, 1];
  this.mat = [this.x, this.y, this.z, this.t];
};

/* matrix operations */
Matrix.prototype = {
  toDegrees: function(angle) {
    return angle * (180 / Math.PI);
  },

  toRadians: function(angle) {
    return angle * (Math.PI / 180);
  },

  identity: function() {
    return [this.x, this.y, this.z, this.t];
  },

  translate: function(x, y, z) {
    return this.multiplyMatrix(this.mat, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]]);
  },

  rotateX: function(theta) {
    // theta = (theta > 2 * Math.PI) ? this.toDegrees(theta): theta;
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    var mat = this.multiplyMatrix(this.mat, [[1, 0, 0, 0], [0, cos, sin, 0],[0, -sin, cos, 0], [0, 0, 0, 1]]);
    this.x = mat[0];
    this.y = mat[1];
    this.z = mat[2];
    this.t = mat[3];
    return this;
  },

  rotateY: function(theta) {
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    var mat = this.multiplyMatrix(this.mat, [[cos, 0, -sin, 0], [0, 1, 0, 0], [sin, 0, cos, 0], [0, 0, 0, 1]]);
    this.x = mat[0];
    this.y = mat[1];
    this.z = mat[2];
    this.t = mat[3];
    return this;
  },

  rotateZ: function(theta) {
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    var mat = this.multiplyMatrix(this.mat, [[cos, sin, 0, 0], [-sin, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    this.x = mat[0];
    this.y = mat[1];
    this.z = mat[2];
    this.t = mat[3];
    return this;
  },

  scale: function(x, y, z) {
    console.log('scale');
    return this.multiplyMatrix(this.mat, [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]);
  },

  transform: function(src, dst) {
    /* src and dst are vectors*/
    console.log('transform');

  },

  multiplyMatrix: function(m1, m2) {
    var result = [];
    for(var j = 0; j < m2.length; j++) {
      result[j] = [];
      for(var k = 0; k < m1[0].length; k++) {
        var sum = 0;
        for(var i = 0; i < m1.length; i++) {
          sum += m1[i][k] * m2[j][i];
        }
        result[j].push(sum);
      }
    }
    return result;
  }

};
