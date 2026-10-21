// Fondo del hero: "plano de obra" vivo.
// Degradado azul plano + niebla con domain warping + suelo en perspectiva con retícula que avanza
// + resplandor cálido en el horizonte + luz que sigue al puntero + chispas que suben.
// Es una función pura de uTime (se puede congelar para capturas).
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;   // 0..1, origen abajo a la izquierda
uniform float uHorizon; // altura del horizonte en coordenadas p (-0.5..0.5)

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
// Línea de retícula antialiasada a partir de coordenadas continuas
float gridLine(vec2 g, float w) {
  vec2 d = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), vec2(1e-4));
  return 1.0 - min(min(d.x, d.y) / w, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  // Cielo: degradado azul plano
  vec3 deep = vec3(0.031, 0.094, 0.169);   // navy-950
  vec3 mid  = vec3(0.071, 0.188, 0.310);   // navy-800
  vec3 col = mix(mid, deep, smoothstep(-0.2, 0.7, p.y));

  // Niebla orgánica (domain warping)
  vec2 q = vec2(fbm(p * 1.4 + t * 0.025), fbm(p * 1.4 + vec2(5.2, 1.3) - t * 0.02));
  float n = fbm(p * 1.8 + 3.0 * q + vec2(t * 0.03, 0.0));
  col += vec3(0.10, 0.20, 0.34) * smoothstep(0.35, 0.95, n) * 0.55;

  // Retícula fina del plano en el cielo
  float skyGrid = gridLine(p * 14.0, 1.0);
  col += vec3(0.35, 0.55, 0.85) * skyGrid * 0.05 * smoothstep(uHorizon, uHorizon + 0.6, p.y);

  // Suelo en perspectiva bajo el horizonte, con la retícula avanzando hacia el espectador
  float below = uHorizon - p.y;
  float floorMask = smoothstep(0.0, 0.015, below);
  float z = 0.42 / max(below, 0.004);
  vec2 g = vec2(p.x * z * 1.6, z + t * 0.35);
  float fl = gridLine(g, 1.2);
  float fade = smoothstep(0.0, 0.35, below) * (1.0 - smoothstep(0.55, 1.1, below) * 0.4);
  col = mix(col, vec3(0.043, 0.13, 0.22), floorMask * 0.6);
  col += vec3(0.38, 0.62, 0.95) * fl * fade * floorMask * 0.42;

  // Resplandor cálido del horizonte (amanecer de obra)
  float hz = exp(-abs(p.y - uHorizon) * 11.0);
  col += vec3(0.98, 0.48, 0.26) * hz * 0.28;
  col += vec3(1.0, 0.76, 0.24) * exp(-abs(p.y - uHorizon) * 40.0) * 0.12;

  // Luz que sigue al puntero
  vec2 m = (uMouse * uRes - 0.5 * uRes) / uRes.y;
  float dm = length(p - m);
  col += vec3(1.0, 0.55, 0.3) * 0.16 * exp(-dm * dm * 5.0);

  // Chispas: celdas con hash que suben y parpadean
  vec2 sp = vec2(p.x * 9.0, p.y * 9.0 - t * 0.6);
  vec2 cell = floor(sp);
  vec2 f = fract(sp) - 0.5;
  float h = hash(cell);
  vec2 off = vec2(hash(cell + 3.1) - 0.5, hash(cell + 7.7) - 0.5) * 0.6;
  float spark = smoothstep(0.06, 0.0, length(f - off)) * step(0.86, h);
  spark *= 0.5 + 0.5 * sin(t * 3.0 + h * 40.0);
  col += vec3(1.0, 0.78, 0.3) * spark * 0.55 * smoothstep(uHorizon - 0.1, uHorizon + 0.3, p.y);

  // Viñeta
  col *= 1.0 - 0.35 * pow(length(uv - 0.5) * 1.25, 2.0);

  gl_FragColor = vec4(col, 1.0);
}
