
var interval = 22;
function init() {
    var sin = Math.sin, cos = Math.cos, PI = Math.PI;

    window.scene = new CT.Scene(canvas1);
    scene.setLight(0, [1,1,1]);

    window.obj = new CT.Node().scale(.13);
    scene.add(obj);
    // window.newobj = new CT.Node().scale(.13);

    // scene.add(newobj);
    // newobj.addChild(new CT.Cube());

    // obj.addChild(new CT.Wheel(22, 2, 0.5));
    // obj.addChild(new CT.Wheel(22, 2, 0.5));
    // obj.addChild(new CT.FlexCylinder(5, 1/10, 4));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.FlexCylinder(15, 1/10, 2));
    obj.addChild(new CT.Square());
    obj.addChild(new CT.Square());
    obj.addChild(new CT.Square());
    obj.addChild(new CT.Square());
    obj.addChild(new CT.Square());
    obj.addChild(new CT.Square());

    // obj.getChild(0).setFragmentShader(
    //     ['precision highp float;'
    //   ,'varying vec3 vNormal;'
    //   ,'void main() { vec3 n = normalize(vNormal); gl_FragColor = vec4(n*n,1.); }'
    //     ].join('\n')
    // );
}

function update() {
    for (var i = 0 ; i < obj.numChildren() ; i++) {
        // obj.getChild(i).identity().translate(4*(i%4)-6, i<4?2:-2, 0).rotateY(time).rotateX(time/2);
        // obj.getChild(i).identity().translate(4*(i%4)-6, i<4?2:-2, 0).rotateZ(time/2).rotateX(0.1);
        var child = obj.getChild(i).identity().rotateX(time);
        if (i === 1) {
            child.translate(2, 0, 0);
        }
        if (i === 2) {
            child.translate(2, 2, 0);
        }
        if (i === 3) {
            child.translate(0, 2, 0);
        }
        if (i === 4) {
            child.rotateY(Math.PI/2).translate(0, 0, 0);
        }
        if (i === 5) {
            child.rotateY(Math.PI/2).translate(0, 2, 0);
        }
        if (i === 6) {
            child.rotateY(Math.PI/2).rotateX(Math.PI/2).translate(0, 0, -2);
        }
        if (i === 7) {
            child.rotateY(Math.PI/2).rotateX(Math.PI/2).translate(0, 2, -2);
        }
        if (i === 8) {
            child.rotateY(Math.PI/2).translate(-2, 2, 0);
        }
        if (i === 9) {
            child.rotateY(Math.PI/2).translate(-2, 0, 0);
        }
        if (i === 10) {
            child.rotateY(Math.PI/2).rotateX(Math.PI/2).translate(-2, 0, -2);
        }
        if (i === 11) {
            child.rotateY(Math.PI/2).rotateX(Math.PI/2).translate(-2, 2, -2);
        }
        if (i === 12) {
            child.translate(1, 1, 0);
        }
        if (i === 13) {
            child.translate(1, 1, 2);
        }
        if (i === 14) {
            child.rotateY(Math.PI/2).translate(-1, 1, 0);
        }
        if (i === 15) {
            child.rotateY(Math.PI/2).translate(-1, 1, 2);
        }
        if (i === 16) {
            child.rotateX(Math.PI/2).translate(1, 1, 0);
        }
        if (i === 17) {
            child.rotateX(Math.PI/2).translate(1, 1, -2);
        }



        
        // wheel
        // if (i === 0) {
        //     child.translate(0, 0, 2);
        // }
        // if (i === 1) {
        //     child.translate(0, 0, -2);
        // }
    }

    obj.draw();

}

setTimeout(function() {
    init();
    setInterval(function() {
        window.time = (new Date()).getTime() / 1000;
        update();
    }, 16);
}, 100);

