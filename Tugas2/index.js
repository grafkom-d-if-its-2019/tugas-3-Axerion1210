(function(global) {

  glUtils.SL.init({ callback: function() { main(); }});
  var gl, program;
  function main() {
    var canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    
    draw();
  }
  
  function draw(){
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0;
    var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
    var scaleX = 1.0;
    var span = 1.0;
    var mode = 0.0;
    var modeUniformLocation;
    
    function render(){
      gl.clearColor(0.0, 1.0, 0.5, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      modeUniformLocation = gl.getUniformLocation(program,'mode');
      
      theta += 0.0113;
      gl.uniform1f(thetaUniformLocation, theta);
      
      if(scaleX >= 1.0) span = -1.0;
      else if (scaleX <= -1.0) span = 1.0;
      scaleX += 0.0113 * span;
      gl.uniform1f(scaleXUniformLocation,scaleX);
      
      mode = 0.0;
      gl.uniform1f(modeUniformLocation,mode);
      var n = initBuffer(gl);
      gl.drawArrays(gl.LINE_LOOP, 0, n);
      
      gl.uniform1f(modeUniformLocation,mode);
      var n2 = initBuffer2(gl);
      gl.drawArrays(gl.LINE_LOOP, 0, n2);
      
      mode = 1.0;
      gl.uniform1f(modeUniformLocation,mode);
      var n3 = initBuffer3(gl);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n3);
      
      requestAnimationFrame(render);
    }
    
    render();
  }


  function initBuffer(){
    var vertexBuffer = gl.createBuffer(),
        vertices = [];
        
    for (var i = 90; i<=270; i+=1){
      var j = i * Math.PI / 180;
      
      var vert1 = [
        Math.sin(j) / 2,
        Math.cos(j) / 2 - 0.25,

        1.0, 0.0, 0.0
      ];

      vertices = vertices.concat(vert1);
    }

    for (var i = 270; i<=450; i+=1){
      var j = i * Math.PI / 180;

      var vert2 = [
        Math.sin(j) / 2 ,
        Math.cos(j) / 2 + 0.25,

        0.0, 0.0, 1.0
      ];
      vertices = vertices.concat(vert2);
    }

    var n = vertices.length / 5;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    return n;
  }

  function initBuffer2(){
    var vertexBuffer2 = gl.createBuffer(),
        vertices2 = [];
        
    for (var i = 90; i<=270; i+=1){
      var j = i * Math.PI / 180;

      var vert1 = [
        Math.sin(j) / 3,
        Math.cos(j) / 3 - 0.25,

        0.0, 0.0, 1.0
      ];

      vertices2 = vertices2.concat(vert1);
    }

    for (var i = 270; i<=450; i+=1){
      var j = i * Math.PI / 180;

      var vert2 = [
        Math.sin(j) / 3,
        Math.cos(j) / 3 + 0.25,

        1.0, 0.0, 0.0
      ];
      vertices2 = vertices2.concat(vert2);
    }

    var n2 = vertices2.length / 5;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices2), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    return n2;
  }

  function initBuffer3(){
    var vertexBuffer3 = gl.createBuffer(),
        vertices3 = [];
        
    for (var i = 90; i<=270; i+=1){
      var j = i * Math.PI / 180;

      var vert1 = [
        Math.sin(j) / 4,
        Math.cos(j) / 2 - 0.25,

        1.0, 0.0, 1.0
      ];

      var vert3 = [
        Math.sin(j) / 6,
        Math.cos(j) / 3 - 0.25,

        1.0, 1.0, 0.0
      ]

      vertices3 = vertices3.concat(vert1);
      vertices3 = vertices3.concat(vert3);
    }

    for (var i = 270; i<=450; i+=1){
      var j = i * Math.PI / 180;

      var vert2 = [
        Math.sin(j) / 4,
        Math.cos(j) / 2 + 0.25,

        1.0, 1.0, 0.0
      ];

      var vert4 = [
        Math.sin(j) / 6,
        Math.cos(j) / 3 + 0.25,

        1.0, 0.0, 1.0
      ]
      vertices3 = vertices3.concat(vert2);
      vertices3 = vertices3.concat(vert4);
    }

    var vert5 = [
      0.25,0.25,    1.0, 1.0, 0.0,
      (1/6),0.25,   1.0, 0.0, 1.0,
      0.25,-0.25,   1.0, 0.0, 1.0,
      (1/6),-0.25,  1.0, 1.0, 0.0,
    ];

    vertices3 = vertices3.concat(vert5);

    var n3 = vertices3.length / 5;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices3), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
    );
    gl.vertexAttribPointer(
      vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    return n3;
  }
})();
