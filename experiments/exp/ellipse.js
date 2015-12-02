function viewport(p, w, h) {
    'use strict';
    return [ w/2 * p[0] + w/2, h/2 - p[1] * w/2 ];
};

var canvas1 = initCanvas('canvas1');
var width = 600;
var height = 400;
var step = 0.2;
var stepped = true;
// general form of ellipse:
//     ((x^2) / a^2) + ((y^2) / b^2) = 1
// parametric form:
//      0 < t < 2*PI
//      x = a * Math.cos(t)
//      y = b * Math.sin(t)
var coords = [], prevCoords = [];
var a = 0.5;
var b = 0.3;
canvas1.update = function(g) {
    g.lineWidth = 1;
    g.strokeStyle = 'green';
    g.beginPath();
    for (var t = 0; t < 2 * Math.PI; t += step) {
        coords = viewport([a * Math.cos(t), b * Math.sin(t)], width, height);
        if (prevCoords.length === 0) prevCoords = coords;
        g.moveTo(prevCoords[0], prevCoords[1]);
        g.lineTo(coords[0], coords[1]);
        prevCoords = coords;
    }
    g.stroke();
};
