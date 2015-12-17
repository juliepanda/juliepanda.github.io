function viewport(p, w, h) {
    'use strict';
    return [ w/2 * p[0] + w/2, h/2 - p[1] * w/2 ];
};

var stepSizeBtn = document.getElementById('submitStepSize');
var stepSize = document.getElementById('stepSize');
var step = 0.01;
stepSizeBtn.addEventListener('click', function() {
    if (stepSize.value.length > 0) step = parseFloat(stepSize.value);
});


var canvas1 = initCanvas('canvas1');
var width = 600;
var height = 400;
var mat = new Matrix().scale(0.3, 0.3, 0.3).rotateY(1.2).rotateX(0.5);
var stepped = true;
var uTime = Math.sin(new Date() % 2) /25;
canvas1.update = function(g) {
    mat.rotateY(uTime);
    g.lineWidth = 1;
    g.strokeStyle = 'green';
    g.beginPath();
    for (var u = 0; u < 1; u += step) {
        for (var v = 0; v < 1; v += step) {
            var p = new ParamObj(u, v);
            var obj = p.sphere();
            var tobj = mat.transform([obj[0], obj[1], obj[2]]);
            var coords = viewport([tobj[0], tobj[1]], width, height);
            g.moveTo(coords[0], coords[1]);
            p = new ParamObj(u + step, v + step);
            obj = p.sphere();
            tobj = mat.transform([obj[0], obj[1], obj[2]]);
            coords = viewport([tobj[0], tobj[1]], width, height);
            g.lineTo(coords[0], coords[1]);
        }
    }
    g.stroke();
};

var canvas2 = initCanvas('canvas2');
canvas2.update = function(g) {
    g.lineWidth = 1;
    g.strokeStyle = 'green';
    g.beginPath();
    for (var u = 0; u < 1; u += step) {
        for (var v = 0; v < 1; v += step) {
            var p = new ParamObj(u, v);
            var obj = p.cylinder();
            var tobj = mat.transform([obj[0], obj[1], obj[2]]);
            var coords = viewport([tobj[0], tobj[1]], width, height);
            g.moveTo(coords[0], coords[1]);
            p = new ParamObj(u + step, v + step);
            obj = p.cylinder();
            tobj = mat.transform([obj[0], obj[1], obj[2]]);
            coords = viewport([tobj[0], tobj[1]], width, height);
            g.lineTo(coords[0], coords[1]);
        }
    }
    g.stroke();
};


var canvas3 = initCanvas('canvas3');
var r = 0.5;
canvas3.update = function(g) {
    g.lineWidth = 1;
    g.strokeStyle = 'green';
    g.beginPath();
    for (var u = 0; u < 1; u += step) {
        for (var v = 0; v < 1; v += step) {
            var p = new ParamObj(u, v, r);
            var obj = p.torus();
            var tobj = mat.transform([obj[0], obj[1], obj[2]]);
            var coords = viewport([tobj[0], tobj[1]], width, height);
            g.moveTo(coords[0], coords[1]);
            p = new ParamObj(u + step, v + step, r);
            obj = p.torus();
            tobj = mat.transform([obj[0], obj[1], obj[2]]);
            coords = viewport([tobj[0], tobj[1]], width, height);
            g.lineTo(coords[0], coords[1]);
        }
    }
    g.stroke();
};









