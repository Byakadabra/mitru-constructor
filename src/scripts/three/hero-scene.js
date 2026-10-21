// @ts-nocheck
/**
 * Escena WebGL del hero: fondo con shader (plano de obra vivo) + logotipo 3D con rótulo arqueado.
 * - Entrada: las casas llegan desde el fondo girando y se asientan (con un pequeño rebote).
 * - Reposo: flotan suavemente y se inclinan hacia el puntero (amortiguado, independiente de los fps).
 * - spin(): giro completo al pulsar el logo.
 * - Se pausa fuera de pantalla y libera la memoria de la GPU en dispose().
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildLogo, addStudioLights, disposeObject } from './logo3d.js';
import { buildWordmark } from './wordmark.js';
import fragmentShader from './blueprint.frag.glsl?raw';

const easeOutBack = (x, s = 1.35) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const damp = (cur, goal, lambda, dt) => cur + (goal - cur) * (1 - Math.exp(-lambda * dt));

export async function mountHero({ canvas, host, stage }) {
  const isSmall = () => host.clientWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall() ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.autoClear = false;

  /* ── Fondo: quad a pantalla completa con el shader ── */
  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.7, 0.6) },
    uHorizon: { value: -0.18 },
  };
  const bgMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: 'void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader,
    depthWrite: false,
    depthTest: false,
  });
  const bgScene = new THREE.Scene();
  const bgGeo = new THREE.PlaneGeometry(2, 2);
  bgScene.add(new THREE.Mesh(bgGeo, bgMat));
  const bgCam = new THREE.Camera();

  /* ── Escena 3D ── */
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.4;
  addStudioLights(scene);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  const root = new THREE.Group(); // posición en pantalla (sigue al "escenario" del layout)
  const tilt = new THREE.Group(); // inclinación hacia el puntero + flotación
  root.add(tilt);
  scene.add(root);

  const { group: logo, parts } = buildLogo();
  tilt.add(logo);
  const logoBox = new THREE.Box3().setFromObject(logo);
  const logoH = logoBox.max.y - logoBox.min.y;

  const word = await buildWordmark({ width: 6.3 });
  word.position.set(0, logoBox.max.y + 0.3, 0.4);
  tilt.add(word);

  // Sombra de contacto suave bajo las casas
  const sc = document.createElement('canvas');
  sc.width = sc.height = 128;
  const sctx = sc.getContext('2d');
  const rg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, 'rgba(0,0,0,0.55)');
  rg.addColorStop(1, 'rgba(0,0,0,0)');
  sctx.fillStyle = rg;
  sctx.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(sc);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, 1.3),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, logoBox.min.y - 0.25, 0);
  tilt.add(shadow);

  // Ladrillos flotando a distintas profundidades (profundidad / paralaje)
  const brickGeo = new THREE.BoxGeometry(0.42, 0.2, 0.2);
  const brickMat = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0 });
  const BRICKS = isSmall() ? 8 : 14;
  const bricks = new THREE.InstancedMesh(brickGeo, brickMat, BRICKS);
  const palette = [0xdb4a35, 0xe8b46a, 0x2a8a37, 0xf3e6cf, 0x3d6ea8];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const brickData = Array.from({ length: BRICKS }, (_, i) => {
    bricks.setColorAt(i, new THREE.Color(palette[i % palette.length]));
    return {
      // alrededor del logo (en coordenadas del grupo "root"), nunca sobre el texto
      x: (rnd() - 0.35) * 9,
      y: (rnd() - 0.4) * 6,
      z: -2.5 - rnd() * 6,
      rx: rnd() * 6,
      ry: rnd() * 6,
      s: 0.6 + rnd() * 0.9,
      sp: 0.15 + rnd() * 0.35,
    };
  });
  bricks.instanceColor.needsUpdate = true;
  bricks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  root.add(bricks);
  const dummy = new THREE.Object3D();

  // Estado inicial de la entrada
  const pieces = [...parts, word];
  const restPos = pieces.map((p) => p.position.clone());
  pieces.forEach((p, i) => {
    p.userData.fading = true;
    p.userData.delay = 0.15 + i * 0.22;
    // Materiales propios por pieza para poder fundirlas por separado
    p.traverse((o) => {
      if (!o.material) return;
      o.material = o.material.clone();
      o.material.userData.baseTransparent = o.material.transparent;
    });
  });

  /* ── Layout: el logo se coloca sobre el elemento "stage" del HTML ── */
  let viewH = 1;
  const layout = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const hr = host.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const cx = (sr.left + sr.width / 2 - hr.left) / w;
    const cy = (sr.top + sr.height / 2 - hr.top) / h;
    root.position.set((cx - 0.5) * viewH * camera.aspect, (0.5 - cy) * viewH, 0);
    const totalH = logoH + 2.2; // casas + rótulo
    const s = Math.min((sr.height / h) * viewH / totalH, (sr.width / w) * viewH * camera.aspect / 6.4);
    root.scale.setScalar(s);
    tilt.position.y = -0.55;
    // horizonte del shader a la altura de la base del logo
    const baseY = (0.5 - cy) * viewH + (logoBox.min.y - 0.55) * s;
    uniforms.uHorizon.value = (baseY / viewH) * 1.0 - 0.02;
  };
  const ro = new ResizeObserver(layout);
  ro.observe(host);
  layout();

  /* ── Interacción ── */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    const r = host.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    uniforms.uMouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
  };
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (finePointer) host.addEventListener('pointermove', onMove, { passive: true });

  let spinStart = -1;
  const spin = () => {
    if (spinStart < 0) spinStart = clock.elapsedTime;
  };

  /* ── Bucle ── */
  const clock = new THREE.Clock();
  let last = 0;
  // Vigilante de rendimiento: si los primeros segundos van lentos, baja la resolución;
  // si siguen lentos, congela la escena en su último fotograma.
  let slowFrames = 0;
  let sampled = 0;
  let degraded = false;
  const frame = () => {
    const t = clock.getElapsedTime();
    const rawDt = t - last;
    const dt = Math.min(rawDt, 0.05);
    last = t;
    if (t > 1.5 && t < 6 && sampled < 120) {
      sampled++;
      if (rawDt > 1 / 30) slowFrames++;
      if (sampled === 120 && slowFrames > 60) {
        if (!degraded) {
          degraded = true;
          renderer.setPixelRatio(1);
          layout();
          sampled = 0;
          slowFrames = 0;
        } else {
          frozen = true;
        }
      }
    }
    uniforms.uTime.value = t;

    // Entrada desde la profundidad
    pieces.forEach((p, i) => {
      const k = clamp01((t - p.userData.delay) / 1.25);
      const e = easeOutBack(k);
      const from = restPos[i];
      p.position.set(from.x + (1 - e) * (i % 2 ? 2.5 : -2.5), from.y + (1 - e) * 1.5, from.z - (1 - easeOutCubic(k)) * 9);
      p.rotation.y = (1 - easeOutCubic(k)) * (i % 2 ? -1.6 : 1.6);
      p.rotation.x = (1 - easeOutCubic(k)) * 0.6;
      if (k < 1 || p.userData.fading) {
        p.userData.fading = k < 1;
        p.traverse((o) => {
          if (!o.material) return;
          o.material.transparent = o.material.userData.baseTransparent || k < 1;
          o.material.opacity = Math.min(1, k * 1.8);
        });
      }
    });

    // Inclinación hacia el puntero + flotación
    pointer.x = damp(pointer.x, pointer.tx, 4, dt);
    pointer.y = damp(pointer.y, pointer.ty, 4, dt);
    let spinY = 0;
    if (spinStart >= 0) {
      const k = clamp01((t - spinStart) / 1.4);
      spinY = easeInOut(k) * Math.PI * 2;
      if (k >= 1) spinStart = -1;
    }
    tilt.rotation.y = -0.28 + pointer.x * 0.35 + Math.sin(t * 0.45) * 0.07 + spinY;
    tilt.rotation.x = 0.1 + pointer.y * 0.12;
    tilt.position.y = -0.55 + Math.sin(t * 0.9) * 0.06;

    // Ladrillos a la deriva
    brickData.forEach((b, i) => {
      dummy.position.set(b.x + Math.sin(t * b.sp + i) * 0.4 - pointer.x * (b.z * -0.08), b.y + Math.sin(t * b.sp * 1.3 + i * 2) * 0.35, b.z);
      dummy.rotation.set(b.rx + t * b.sp * 0.6, b.ry + t * b.sp * 0.4, 0);
      dummy.scale.setScalar(b.s);
      dummy.updateMatrix();
      bricks.setMatrixAt(i, dummy.matrix);
    });
    bricks.instanceMatrix.needsUpdate = true;

    renderer.clear();
    renderer.render(bgScene, bgCam);
    renderer.clearDepth();
    renderer.render(scene, camera);
    if (frozen && t > 3) stop();
  };

  // Pausar fuera de pantalla
  let running = false;
  let frozen = false;
  const start = () => {
    if (!running) {
      running = true;
      renderer.setAnimationLoop(frame);
    }
  };
  const stop = () => {
    running = false;
    renderer.setAnimationLoop(null);
  };
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
  io.observe(host);
  frame();
  start();

  const dispose = () => {
    stop();
    io.disconnect();
    ro.disconnect();
    host.removeEventListener('pointermove', onMove);
    disposeObject(scene);
    disposeObject(bgScene);
    bgGeo.dispose();
    shadowTex.dispose();
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
  return { spin, dispose };
}
