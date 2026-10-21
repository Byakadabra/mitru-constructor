// @ts-nocheck
/**
 * Logotipo 3D de MITRU CONSTRUCTOR, reconstruido a partir del logo original:
 * casa verde delante (tejado a dos aguas + buhardilla con ventana de dos hojas + chimenea)
 * y casa coral detrás (tejado grande con chimenea + hastial lateral con ventana de dos hojas).
 * Interiores blancos, como en el dibujo original. Se usa en el hero (WebGL en vivo) y en
 * scripts/generate-assets.mjs para renderizar las versiones PNG estáticas.
 */
import * as THREE from 'three';

export const LOGO_COLORS = {
  coral: 0xdb4a35,
  green: 0x2a8a37,
  wall: 0xfffaf0,
};

/** Desplaza las aristas de un triángulo hacia dentro (d por arista) y devuelve el triángulo interior. */
function insetTriangle([a, b, c], [dab, dbc, dca]) {
  const line = (p, q, d) => {
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const len = Math.hypot(dx, dy);
    // normal hacia dentro para triángulos en sentido antihorario
    const nx = -dy / len;
    const ny = dx / len;
    return { p: [p[0] + nx * d, p[1] + ny * d], d: [dx, dy] };
  };
  const meet = (l1, l2) => {
    const [x1, y1] = l1.p;
    const [x2, y2] = l2.p;
    const [dx1, dy1] = l1.d;
    const [dx2, dy2] = l2.d;
    const den = dx1 * dy2 - dy1 * dx2;
    const t = ((x2 - x1) * dy2 - (y2 - y1) * dx2) / den;
    return [x1 + dx1 * t, y1 + dy1 * t];
  };
  const L1 = line(a, b, dab);
  const L2 = line(b, c, dbc);
  const L3 = line(c, a, dca);
  return [meet(L3, L1), meet(L1, L2), meet(L2, L3)];
}

const shapeFrom = (pts, holes = []) => {
  const s = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
  for (const h of holes) s.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2(x, y))));
  return s;
};

/**
 * Hastial (tejado a dos aguas en "A"): faldones gruesos y base fina, interior hueco.
 * pts en sentido antihorario: [izquierda, derecha, cumbrera].
 */
function gable(left, right, apex, slope = 0.3, base = 0.07) {
  const outer = [left, right, apex];
  const inner = insetTriangle(outer, [base, slope, slope]);
  return { outer, inner };
}

/**
 * Construye el grupo 3D del logotipo. Devuelve { group, parts } para poder animar las piezas.
 */
export function buildLogo({ depth = 0.34 } = {}) {
  const group = new THREE.Group();
  const parts = [];

  const mat = (color, opts = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.06, ...opts });
  const coral = mat(LOGO_COLORS.coral);
  const green = mat(LOGO_COLORS.green);
  const wall = mat(LOGO_COLORS.wall, { roughness: 0.75 });

  const extrude = (shape, d = depth, bevel = 0.035) =>
    new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 4,
    });

  const add = (geo, material, z, name, parent) => {
    const m = new THREE.Mesh(geo, material);
    m.position.z = z;
    m.name = name;
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };

  /* ── Casa coral (detrás) ─────────────────────────────── */
  const red = new THREE.Group();
  red.name = 'casa-coral';
  {
    // Tejado principal + cumbrera que baja hacia el hastial lateral (silueta del original).
    const main = gable([-1.95, -0.35], [0.15, -0.35], [-0.9, 1.0], 0.34, 0.08);
    // Faldón que une los dos hastiales (banda del tejado del dibujo original)
    const ridge = shapeFrom([
      [-0.9, 1.0],
      [-0.6, 0.62],
      [0.91, 0.55],
      [1.15, 0.88],
    ]);
    add(extrude(shapeFrom(main.outer, [main.inner])), coral, 0, 'tejado-principal', red);
    add(extrude(ridge), coral, 0, 'cumbrera', red);
    // Fachada blanca bajo el faldón
    add(extrude(shapeFrom([[-0.6, 0.62], [0.2, -0.35], [0.91, 0.55]]), 0.12, 0.01), wall, -0.02, 'fachada', red);
    // Pared interior blanca del hastial principal
    add(extrude(shapeFrom(main.inner), 0.12, 0.01), wall, -0.02, 'pared', red);
    // Chimenea
    const chim = shapeFrom([
      [0.18, 0.75],
      [0.48, 0.73],
      [0.48, 1.25],
      [0.18, 1.25],
    ]);
    add(extrude(chim, depth * 0.8), coral, -0.06, 'chimenea', red);

    // Hastial lateral (delante de la cumbrera), con ventana de dos hojas
    const side = gable([0.25, -0.35], [2.05, -0.35], [1.15, 0.88], 0.32, 0.08);
    const sideGroup = new THREE.Group();
    sideGroup.position.z = 0.16;
    add(extrude(shapeFrom(side.outer, [side.inner])), coral, 0, 'hastial', sideGroup);
    add(extrude(shapeFrom(side.inner), 0.1, 0.01), wall, 0.02, 'pared-hastial', sideGroup);
    for (const x of [0.98, 1.2]) {
      const pane = shapeFrom([
        [x, -0.22],
        [x + 0.14, -0.22],
        [x + 0.14, 0.12],
        [x, 0.12],
      ]);
      add(extrude(pane, 0.16, 0.015), coral, 0.08, 'ventana', sideGroup);
    }
    red.add(sideGroup);
  }
  red.position.set(0.45, 0.32, -0.45);
  group.add(red);
  parts.push(red);

  /* ── Casa verde (delante) ────────────────────────────── */
  const grn = new THREE.Group();
  grn.name = 'casa-verde';
  {
    const main = gable([-2.0, -0.95], [-0.1, -0.95], [-1.05, 0.15], 0.32, 0.08);
    const ridge = shapeFrom([
      [-1.05, 0.15],
      [-0.77, -0.17],
      [0.48, -0.27],
      [0.7, 0.02],
    ]);
    add(extrude(shapeFrom(main.outer, [main.inner])), green, 0, 'tejado-verde', grn);
    add(extrude(ridge), green, 0, 'cumbrera-verde', grn);
    add(extrude(shapeFrom([[-0.77, -0.17], [-0.08, -0.95], [0.48, -0.27]]), 0.12, 0.01), wall, -0.02, 'fachada-verde', grn);
    add(extrude(shapeFrom(main.inner), 0.12, 0.01), wall, -0.02, 'pared-verde', grn);
    const chim = shapeFrom([
      [-0.05, -0.1],
      [0.2, -0.12],
      [0.2, 0.36],
      [-0.05, 0.36],
    ]);
    add(extrude(chim, depth * 0.8), green, -0.06, 'chimenea-verde', grn);

    const side = gable([-0.05, -0.95], [1.45, -0.95], [0.7, 0.02], 0.28, 0.08);
    const sideGroup = new THREE.Group();
    sideGroup.position.z = 0.16;
    add(extrude(shapeFrom(side.outer, [side.inner])), green, 0, 'buhardilla', sideGroup);
    add(extrude(shapeFrom(side.inner), 0.1, 0.01), wall, 0.02, 'pared-buhardilla', sideGroup);
    for (const x of [0.56, 0.74]) {
      const pane = shapeFrom([
        [x, -0.84],
        [x + 0.11, -0.84],
        [x + 0.11, -0.56],
        [x, -0.56],
      ]);
      add(extrude(pane, 0.16, 0.012), green, 0.08, 'ventana-verde', sideGroup);
    }
    grn.add(sideGroup);
  }
  grn.position.set(-0.35, 0.05, 0.35);
  group.add(grn);
  parts.push(grn);

  // Centrar el conjunto
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.children.forEach((c) => c.position.sub(new THREE.Vector3(center.x, center.y, 0)));

  return { group, parts, materials: [coral, green, wall] };
}

/** Luces de estudio suaves, compartidas por el hero y el render de los PNG. */
export function addStudioLights(scene) {
  const hemi = new THREE.HemisphereLight(0xfff4e0, 0x1b2f4a, 1.2);
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 4, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0008;
  const rim = new THREE.DirectionalLight(0xffc56b, 1.4);
  rim.position.set(-4, 2, -3);
  const fill = new THREE.DirectionalLight(0x9cc8ff, 0.6);
  fill.position.set(-3, -1, 4);
  scene.add(hemi, key, rim, fill);
  return { hemi, key, rim, fill };
}

export function disposeObject(root) {
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => m.dispose());
    }
  });
}
