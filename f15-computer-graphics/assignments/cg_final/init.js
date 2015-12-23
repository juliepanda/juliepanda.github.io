
var interval = 22;
function init() {
    var sin = Math.sin, cos = Math.cos, PI = Math.PI;

    window.scene = new CT.Scene(canvas1);
    scene.setLight(0, [5,-1,1]);

    window.obj = new CT.Node().scale(0.13);
    scene.add(obj);
    // window.newobj = new CT.Node().scale(.13);

    // scene.add(newobj);
    // newobj.addChild(new CT.Cube());

    // obj.addChild(new CT.Wheel(22, 1.1, 0.2));
    // obj.addChild(new CT.Wheel(22, 1.1, 0.2));
    // obj.addChild(new CT.FlexCylinder(5, 1/15, 4));
    // obj.addChild(new CT.Wheel(22, 1.1, 0.2));
    // obj.addChild(new CT.Wheel(22, 1.1, 0.2));
    // obj.addChild(new CT.FlexCylinder(5, 1/15, 4));
    // obj.addChild(new CT.Garlic());
    obj.addChild(new CT.WheelSet(2));
    obj.getChild(0).setColor([139/255, 69/255, 19/255]);
    obj.addChild(new CT.WheelSet(-2));
    obj.getChild(1).setColor([139/255, 69/255, 19/255]);
    obj.addChild(new CT.Garlic());
    obj.getChild(2).setColor([208/255, 208/255, 208/255]);
      // obj.addChild(new CT.Extruded(16,100,
      // function(u,v){
      //     // v=.15+.06*cos(6*PI*v);
      //     u *= 2*PI;
      //     return [u, cos(u)*sin(u)];
      // },          // PROFILE
      // function(v){
      //     var r = 1;
      //     v *= 2*PI;
      //     return [0, r * cos(10*v), r * sin(10*v)];
      // })); // PATH
    //

      // obj.addChild(new CT.Extruded(16,100,
      // function(u,v){
      //     // v=.15+.06*cos(6*PI*v);
      //     // u*=2*PI;
      //     return [v, cos(u)*sin(u)];
      // },          // PROFILE
      // function(v){
      //     var r = 1;
      //     v *= 2*PI;
      //     return [0, r * cos(10*v), r * sin(10*v)];
      // })); // PATH

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
        var child = obj.getChild(i).identity().rotateY(time);
        if (i === 0) {
            child.translate(2, 0, 2).rotateZ(-time);
        
        }
        if (i === 1) {
            child.translate(-2, 0, 2).rotateZ(-time);
        
        }
        if (i === 2) {
            child.translate(0, 0.4, 2.2);
        }
 
        // wheel
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

