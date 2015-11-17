'use strict';
function ParamObj(u, v, r) {
	if (u !== undefined) {
		this.u = u;
		this.theta = Math.PI * 2 * this.u;
	}
	if (v !== undefined) {
		this.v = v;
		this.phi = Math.PI * this.v - Math.PI / 2;
	}
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
		var x = Math.cos(this.theta) * Math.cos(this.phi);
		var y = Math.cos(this.phi) * Math.sin(this.theta);
		var z = Math.sin(this.phi);
		return [x, y ,z]; 
	},
	torus: function() {
		var x = (1 + this.r * Math.cos(this.phi)) * Math.cos(this.theta); 
		var y = (1 + this.r * Math.cos(this.phi)) * Math.sin(this.theta);
		var z = this.r * Math.sin(this.phi);
		return [x, y , z];
	}
};
