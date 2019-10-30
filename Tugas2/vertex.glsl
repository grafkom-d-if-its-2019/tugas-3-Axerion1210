precision mediump float;

varying vec3 fColor;
attribute vec2 vPosition, vPosition2;
attribute vec3 vColor, vColor2;
uniform float theta, scaleX, mode;

void main() {
  mat4 rotate = mat4 (
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    -1.0, 0.0, 0.0, 1.0
  );

  mat4 scale = mat4 (
    scaleX, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.5, 0.0, 0.0, 1.0
  );

  mat4 scale2 = mat4 (
    0.5, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  if (mode == 0.0)
  {
    fColor = vColor;
    gl_Position = scale2 * rotate * vec4(vPosition, 0.0, 1.0);
  }
  else if(mode == 1.0)
  {
    fColor = vColor;
    gl_Position = scale * vec4(vPosition, 0.0, 1.0);
  }
}
