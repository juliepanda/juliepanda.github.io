'use strict';
function ParamObj(u, v, r) {
	if (u !== undefined) {
		this.u = u;
		this.theta = Math.PI * 2 * this.u;
	}
	if (v !== undefined) this.v = v;
	if (r !== undefined) this.r = r;
}

ParamObj.prototype = {
	cylinder: function() {
		var x = Math.sin(this.theta);
		var y = Math.cos(this.theta);
		var z = 2 * this.v - 1;
		return [x, y, z];
	},

	sphere: function() {
		var phi = Math.PI * this.v - Math.PI / 2;
		var x = Math.cos(this.theta) * Math.cos(phi);
		var y = Math.cos(phi) * Math.sin(this.theta);
		var z = Math.sin(phi);
		return [x, y ,z]; 
	},
	torus: function() {
		var phi = 2 * Math.PI * this.v;
		var x = (1 + this.r * Math.cos(phi)) * Math.cos(this.theta); 
		var y = (1 + this.r * Math.cos(phi)) * Math.sin(this.theta);
		var z = this.r * Math.sin(phi);
		return [x, y , z];
	}
};
