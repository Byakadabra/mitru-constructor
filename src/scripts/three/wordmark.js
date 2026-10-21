// @ts-nocheck
/**
 * Rótulo "MITRU CONSTRUCTOR" arqueado sobre las casas, como en el logo original.
 * Se dibuja en un canvas 2D (letra con remates, Bitter) y se apilan varias capas
 * desplazadas en Z con verde más oscuro para darle grosor 3D real.
 */
import * as THREE from 'three';

const FONT = "900 150px 'Bitter Variable', 'Bitter', Georgia, serif";

function drawArc(text, fill, { highlight = false } = {}) {
  const W = 2400;
  const H = 720;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  ctx.font = FONT;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'center';

  const R = 2300; // radio del arco: curva suave como en el original
  const cx = W / 2;
  const cy = R + 190;
  const spacing = 10;
  const widths = [...text].map((ch) => ctx.measureText(ch).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0) - spacing;
  let angle = -total / 2 / R;

  [...text].forEach((ch, i) => {
    const a = angle + widths[i] / 2 / R;
    ctx.save();
    ctx.translate(cx + Math.sin(a) * R, cy - Math.cos(a) * R);
    ctx.rotate(a);
    if (highlight) {
      const g = ctx.createLinearGradient(0, -120, 0, 10);
      g.addColorStop(0, '#4fbf5c');
      g.addColorStop(1, fill);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = fill;
    }
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    angle += widths[i] / R;
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Devuelve un grupo con el rótulo extruido (capas). width = ancho en unidades de mundo. */
export async function buildWordmark({ text = 'MITRU CONSTRUCTOR', width = 5.6, layers = 9, thickness = 0.16 } = {}) {
  if (document.fonts?.load) {
    try {
      await document.fonts.load(FONT);
    } catch {
      /* se usa la fuente de respaldo */
    }
  }
  const group = new THREE.Group();
  group.name = 'rotulo';
  const front = drawArc(text, '#25803a', { highlight: true });
  const side = drawArc(text, '#123f1a');
  const geo = new THREE.PlaneGeometry(width, width * (720 / 2400));
  for (let i = layers; i >= 0; i--) {
    const isFront = i === 0;
    const mat = new THREE.MeshBasicMaterial({
      map: isFront ? front : side,
      transparent: true,
      alphaTest: 0.35,
      depthWrite: true,
      toneMapped: false,
    });
    if (!isFront) mat.color.setScalar(0.65 + 0.35 * (1 - i / layers));
    const m = new THREE.Mesh(geo, mat);
    m.position.z = -(i / layers) * thickness;
    m.position.y = -(i / layers) * thickness * 0.35;
    group.add(m);
  }
  return group;
}
