export const fragmentShader = `
varying vec2 vUv;
varying float vElevation;

uniform vec3 uColorDeep;
uniform vec3 uColorSurface;

void main() {
  // Mix colors based on elevation
  // Valleys: Deep Violet-Black (#050508)
  // Peaks: Subtle Cyan/Indigo tint (#1A1424 or similar)
  
  float mixStrength = (vElevation + 0.4) * 1.5;
  vec3 color = mix(uColorDeep, uColorSurface, mixStrength);
  
  gl_FragColor = vec4(color, 1.0);
}
`;
