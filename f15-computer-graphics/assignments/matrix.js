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
var Matrix = function() {
  this.x = [1, 0, 0, 0];
  this.y = [0, 1, 0, 0];
  this.z = [0, 0, 1, 0];
  this.t = [0, 0, 0, 1];
  this.mat = [this.x, this.y, this.z, this.t];
};

/* matrix operations */
Matrix.prototype = {
  identity: function() {
    return [this.x, this.y, this.z, this.t];
  },
  
  translate: function(x, y, z) {
    console.log('translate');
    return this.multiplyMatrix(this.mat, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]]);
  },

  rotateX: function(theta) {
    console.log('rotateX');
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    return this.multiplyMatrix(this.mat, [[1, 0, 0, 0], [0, cos, sin, 0],[0, -sin, cos, 0], [0, 0, 0, 1]]);
  },

  rotateY: function(theta) {
    console.log('rotateY') ;
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    return this.multiplyMatrix(this.mat, [[cos, 0, -sin, 0], [0, 1, 0, 0], [sin, 0, cos, 0], [0, 0, 0, 1]]);
  },

  rotateZ: function(theta) {
    console.log('rotateZ');
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    return this.multiplyMatrix(this.mat, [[cos, sin, 0, 0], [-sin, cos, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
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
