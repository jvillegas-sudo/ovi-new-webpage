/**
 * Hologram Material
 *
 * Floating holographic interface panel — the centrepiece of each research station.
 *
 * Visual elements (all driven by shader):
 *   • Animated scan line sweeping upward
 *   • Oscillating data waveform (sine curve)
 *   • Animated bar-chart strip at the bottom
 *   • Subtle grid overlay
 *   • Border glow on panel edges
 *   • Per-frame flicker
 *
 * Uniforms:
 *   uTime        – elapsed seconds
 *   uColor       – vec3  station brand colour
 *   uActivation  – 0→1  activated by scroll
 *   uHover       – 0→1  mouse hover strength
 *   uVizType     – 0/1/2/3  selects waveform variant
 */

import * as THREE from "three";

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3  uColor;
  uniform float uActivation;
  uniform float uHover;
  uniform float uVizType;  // 0=wave 1=bars 2=spiral 3=grid

  varying vec2 vUv;

  // ---- helpers -------------------------------------------------------

  float scanLine(vec2 uv, float t) {
    float y = fract(t * 0.38);
    return smoothstep(0.025, 0.0, abs(uv.y - y)) * 0.75;
  }

  float waveViz(vec2 uv, float t) {
    // Sine waveform across the middle band
    float wave = 0.5 + 0.28 * sin(uv.x * 12.566 + t * 2.2)
                     + 0.12 * sin(uv.x * 25.132 + t * 3.1);
    return smoothstep(0.018, 0.0, abs(uv.y - wave)) * 0.75;
  }

  float barsViz(vec2 uv, float t) {
    float idx  = floor(uv.x * 8.0);
    float frac = fract(uv.x * 8.0);
    // Each bar's height oscillates with a unique phase
    float h = 0.15 + 0.65 * (0.5 + 0.5 * sin(idx * 1.618 + t * 0.6));
    float inBar = step(frac, 0.72);
    float inHeight = step(uv.y, h);
    // Bottom-align bars
    return inBar * inHeight * step(0.0, uv.y) * 0.6;
  }

  float spiralViz(vec2 uv, float t) {
    vec2 c = uv - vec2(0.5, 0.5);
    float angle = atan(c.y, c.x);
    float r = length(c);
    float spiral = 0.5 + 0.5 * sin(angle * 4.0 - r * 14.0 + t * 2.0);
    return spiral * smoothstep(0.52, 0.45, r) * 0.55;
  }

  float gridViz(vec2 uv, float t) {
    vec2 cell = fract(uv * vec2(7.0, 9.0));
    float gx = step(0.88, cell.x);
    float gy = step(0.88, cell.y);
    float grid2 = max(gx, gy) * 0.35;
    // Random blinking cells
    float idx = floor(uv.x * 7.0) + floor(uv.y * 9.0) * 7.0;
    float blink = step(0.75, fract(sin(idx * 127.1 + t * 0.9) * 43758.5));
    float cellFill = (1.0 - gx) * (1.0 - gy) * blink * 0.3;
    return grid2 + cellFill;
  }

  // ---- main -----------------------------------------------------------

  void main() {
    // Background grid
    float bgGridX = step(0.96, fract(vUv.x * 8.0));
    float bgGridY = step(0.96, fract(vUv.y * 10.0));
    float bgGrid  = max(bgGridX, bgGridY) * 0.10;

    // Scan line
    float scan = scanLine(vUv, uTime);

    // Data visualisation — selected by uVizType
    float viz = 0.0;
    if (uVizType < 0.5) {
      viz = waveViz(vUv, uTime);
    } else if (uVizType < 1.5) {
      viz = barsViz(vUv, uTime);
    } else if (uVizType < 2.5) {
      viz = spiralViz(vUv, uTime);
    } else {
      viz = gridViz(vUv, uTime);
    }

    // Panel border glow (edges)
    float edgeX = smoothstep(0.06, 0.0, vUv.x) + smoothstep(0.06, 0.0, 1.0 - vUv.x);
    float edgeY = smoothstep(0.06, 0.0, vUv.y) + smoothstep(0.06, 0.0, 1.0 - vUv.y);
    float border = clamp(edgeX + edgeY, 0.0, 1.0) * 0.55;

    // Hover accent — extra brightness ring
    float hoverBoost = uHover * 0.25;

    float brightness = bgGrid + scan + viz + border + hoverBoost;

    // Subtle flicker
    float flicker = 0.88 + 0.12 * sin(uTime * 31.3);
    brightness *= flicker;

    float alpha = clamp(brightness * uActivation, 0.0, 0.92);

    // Colour: station hue + white highlights on brightest areas
    vec3 col = uColor * (0.6 + brightness * 0.8)
             + vec3(1.0) * clamp(brightness - 0.6, 0.0, 1.0) * 0.35;

    gl_FragColor = vec4(col, alpha);
  }
`;

// Map vizType string to float uniform
const VIZ_MAP: Record<string, number> = {
  wave: 0,
  bars: 1,
  spiral: 2,
  grid: 3,
};

export function createHologramMaterial(
  color: string,
  vizType: "wave" | "bars" | "spiral" | "grid",
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uActivation: { value: 0 },
      uHover: { value: 0 },
      uVizType: { value: VIZ_MAP[vizType] ?? 0 },
    },
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}
