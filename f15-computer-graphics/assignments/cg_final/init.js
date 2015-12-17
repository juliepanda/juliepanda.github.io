
var interval = 22;
function addWheel(sceneObj) {
    sceneObj.addChild(new CT.Revolved(interval, 8, function(t) {
        return [2.2, 1 * t];
    }));
    sceneObj.addChild(new CT.Revolved(interval, 8, function(t) {
        return [2, 1 * t];
    }));
    sceneObj.addChild(new CT.Revolved(interval, 8, function(t) {
        return [1, 2 * t];
    }));
    sceneObj.addChild(new CT.Disk(interval));
    sceneObj.addChild(new CT.Disk(interval));

    for (var i = 0; i < interval/2; i++) {
        sceneObj.addChild(new CT.Revolved(interval, 8, function(t) {
            return [0.05, 4 * t];
        }));
    }
}


function init() {
    var sin = Math.sin, cos = Math.cos, PI = Math.PI;

    window.scene = new CT.Scene(canvas1);
    scene.setLight(0, [1,1,1]);

    window.obj = new CT.Node().scale(.13);
    scene.add(obj);
    // window.newobj = new CT.Node().scale(.13);

    // scene.add(newobj);
    // newobj.addChild(new CT.Cube());
    // addWheel(obj);
    obj.addChild(new CT.Wheel(22, 2, 0.5));
    obj.addChild(new CT.Wheel(22, 2, 0.5));
    obj.addChild(new CT.FlexCylinder(5, 1/10, 4));

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
        var child = obj.getChild(i).identity().rotateZ(time).rotateY(time);
        if (i === 0) {
            child.translate(0, 0, 2);
        }
        if (i === 1) {
            child.translate(0, 0, -2);
        }

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

