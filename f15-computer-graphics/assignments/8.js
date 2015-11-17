var gl, prog;
function draw() {
	gl = document.getElementById('canvas1').getContext('experimental-webgl');
	prog = gl.createProgram();

	function addShader(type, str) {
		var s = gl.createShader(type);
		gl.shaderSource(s, str);
		gl.compileShader(s);
		gl.attachShader(prog, s);
	}

	addShader(gl.VERTEX_SHADER, [
      ,'attribute vec3 aPos;'
      ,'uniform mat4 uMatrix;'
      ,'varying vec3 uPos;'
      ,'void main() {'
      ,'   uPos = aPos;'
      ,'   gl_Position = uMatrix * vec4(aPos, 1.);'
      ,'}',
	].join('\n'));

	addShader(gl.FRAGMENT_SHADER, [
      ,'precision highp float;'
      ,'varying vec3 uPos;'
      ,'void main() {'
      ,'   gl_FragColor = vec4(vec3(0.,1.,1.) * (uPos.z < .5 ? .5 : 1.), 1.);'
      ,'}',
	].join('\n'));

	var step = 0.01;
	var mat = new Matrix().rotateY(1.2).rotateX(0.5);
	var vertices = [];

	for (var u = 0; u < 1; u += step) {
		for (var v = 0; v < 1; v += step) {
			var p = new ParamObj(u, v);
			var obj = p.sphere();
			var tobj = mat.transform([obj[0], obj[1], obj[2]]);
			vertices.push(tobj);
		}
	}

	// var vertices = [
	// 	-.5,-.5, 0,
	// 	-.5, .5, 0,
	// 	.5,-.5, 0,
	// 	.5, .5, 0,
	// ];
	vertices = vertices.reduce((a, b) => a.concat(b));
   function address(name) { return gl.getUniformLocation(prog, name); }
   gl.linkProgram(prog);
   gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   var attr = gl.getAttribLocation(prog, 'aPos');
   gl.enableVertexAttribArray(attr);
   gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);
   gl.useProgram(prog);

   setInterval(tick, 1000 / 60);

   function tick() {
      var turn = (new Date()).getTime() / 1000.;
      var cos = Math.cos(turn);
      var sin = Math.sin(turn);
      var adjust = gl.canvas.height / gl.canvas.width;
      var matrix = [ adjust*cos,  0,sin, .1*sin,
                              0,  1,  0,  0,
                    -adjust*sin,  0,cos, .1*cos,
                              0,  0,  0,  1];
      gl.uniformMatrix4fv(address('uMatrix'), false, matrix);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 3);
   }
}


setTimeout(draw, 100);
