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
var aCoords = [], aPrevCoords = [], aPt = [];
var bCoords = [], bPrevCoords = [], offset = [], bPt = [];
var mat = new Matrix();
var a = 0.5;
var b = 0.3;
canvas1.update = function(g) {
    g.lineWidth = 1;
    g.strokeStyle = 'green';
    g.beginPath();
    for (var t = 0; t < 2 * Math.PI; t += step) {
        aPt = [a * Math.cos(t), b * Math.sin(t)];
        aCoords = viewport(aPt, width, height);
        if (aPrevCoords.length === 0) aPrevCoords = aCoords;
        g.moveTo(aPrevCoords[0], aPrevCoords[1]);
        g.lineTo(aCoords[0], aCoords[1]);
        aPrevCoords = aCoords;
        bPt = [b * Math.cos(t), a * Math.sin(t)];
        // bCoords = viewport(bPt, width, height);
        var mat = new Matrix().translate(aPt[0], aPt[1]);
        var tobj = mat.transform([bPt[0], bPt[1], 0]);
        offset = viewport([tobj[0], tobj[1]], width, height);
        bCoords = viewport(bPt, width, height);
        // bCoords[0] += offset[0];
        // bCoords[1] += offset[1];
        if (bPrevCoords.length === 0) bPrevCoords = bCoords;
        g.moveTo(bPrevCoords[0], bPrevCoords[1]);
        g.lineTo(bCoords[0], bCoords[1]);
        bPrevCoords = bCoords;
    }
    g.stroke();
};
