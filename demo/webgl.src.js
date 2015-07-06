require('./common.src.js');
var util = require('./webgl-utils.js');

var gl, // Output canvas webgl context
    program, // Output canvas program
    vertexShaderSrc,
    fragmentShaderSrc,
    mapLocation;

vertexShaderSrc = `
  // -1 ~ 1
  attribute vec2 a_position;
  // 0 ~ 1
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = (a_position+vec2(1, 1))/2.0;
  }
`;

fragmentShaderSrc = `
  //
  // Performs color lookup from map.
  // Ref: http://stackoverflow.com/a/19719654
  //

  precision mediump float;

  varying vec2 v_texCoord;
  uniform sampler2D u_image;
  uniform sampler2D u_map;

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    color.r = texture2D(u_map, vec2(color.r, 0.5)).a;
    color.g = texture2D(u_map, vec2(color.g, 0.5)).a;
    color.b = texture2D(u_map, vec2(color.b, 0.5)).a;
    color.a = 1.0;

    gl_FragColor = color;
  }
`;

window.renderInit = (inputCanvas, outputCanvas) => {
  var {width, height} = inputCanvas;

  // Compile webGl programs
  //
  gl = outputCanvas.getContext('webgl');

  program = util.createProgramFromSources(gl, [vertexShaderSrc, fragmentShaderSrc])
  gl.useProgram(program);

  // Setup input image as texture 0
  //
  setupActiveTexture('u_image', 0, true);

  // Upload the image into the texture.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, inputCanvas);


  // Setup a_position
  //
  var positionLocation = gl.getAttribLocation(program, "a_position");

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0
  ]), gl.STATIC_DRAW);


  // Setup color mapping as texture 1
  //
  setupActiveTexture('u_map', 1);
}

window.renderFn = (map) => {
  // Load color mapping to GPU
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, 256, 1, 0, gl.ALPHA, gl.UNSIGNED_BYTE, map);

  // Draw the rectangle.
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function setupActiveTexture(identifier, textureId, shouldFlipY){
  // Setup texture
  // ref: https://msdn.microsoft.com/zh-tw/library/dn302435(v=vs.85).aspx
  //
  gl.uniform1i(gl.getUniformLocation(program, identifier), textureId);
  gl.activeTexture(gl[`TEXTURE${textureId}`]);
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  if(shouldFlipY){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // Flip the image's Y axis to match the WebGL texture coordinate space.
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}