export const vertexShader = `
varying vec2 vUv;
varying float vElevation;

uniform float uTime;

void main() {
  vUv = uv;
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Slow sine waves
  float elevation = sin(modelPosition.x * 0.3 + uTime * 0.2) * 0.3;
  elevation += sin(modelPosition.y * 0.3 + uTime * 0.1) * 0.3;
  
  modelPosition.z += elevation;
  
  vElevation = elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}
`;
