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
	toDegrees: function(angle) {
		return angle * (180 / Math.PI);
	},

	toRadians: function(angle) {
		return angle * (Math.PI / 180);
	},

	identity: function() {
		return this;
	},

	translate: function(x, y, z) {
		var mat = this.multiplyMatrix(this.mat, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]]);
		this.x = mat[0];
		this.y = mat[1];
		this.z = mat[2];
		this.t = mat[3];
		this.mat = [this.x, this.y, this.z, this.t];
		return this;
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
		this.mat = [this.x, this.y, this.z, this.t];
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
		this.mat = [this.x, this.y, this.z, this.t];
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
		var mat = this.multiplyMatrix(this.mat, [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]]);
		this.x = mat[0];
		this.y = mat[1];
		this.z = mat[2];
		this.t = mat[3];
		this.mat = [this.x, this.y, this.z, this.t];
		return this;
	},

	transform: function(src) {
		/* src and dst are vectors*/
		var tvec = [[src[0]], [src[1]], [src[2]], [1]];
		var t = this.multiplyMatrix(this.mat, tvec);
		return [t[0][0], t[1][0], t[2][0]];
	},

	multiplyMatrix: function(a, b) {
		var aNumRows = a.length, aNumCols = a[0].length,
			bNumRows = b.length, bNumCols = b[0].length,
				m = new Array(aNumRows);  // initialize array of rows
				for (var r = 0; r < aNumRows; ++r) {
					m[r] = new Array(bNumCols); // initialize the current row
					for (var c = 0; c < bNumCols; ++c) {
						m[r][c] = 0;             // initialize the current cell
						for (var i = 0; i < aNumCols; ++i) {
							m[r][c] += a[r][i] * b[i][c];
						}
					}
				}
				return m;
	}

};
