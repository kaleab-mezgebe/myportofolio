// ─────────────────────────────────────────────────────────────
//  "Follow the request" pipeline
//  A 3D path through the stack (client → edge → services → cache →
//  database → queue → realtime). A packet rides it, driven by scroll;
//  each hop lights up as the packet reaches it. scene.js owns placement.
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, '0');

export function createPipeline({ scene, flow, dotTex }) {
  const STOPS = flow.length + 1; // client + one stop per hop
  const GAP = 3.4;

  const root = new THREE.Group();  // positioned on screen by scene.js
  const track = new THREE.Group(); // shifted so the packet stays centred ("camera follows")
  root.add(track);
  root.visible = false;
  scene.add(root);

  // ── path ────────────────────────────────────────────────────
  const ctrl = Array.from({ length: STOPS }, (_, i) =>
    new THREE.Vector3(Math.sin(i * 1.25) * 1.7, -i * GAP, Math.cos(i * 1.1) * 1.3));
  const curve = new THREE.CatmullRomCurve3(ctrl, false, 'catmullrom', 0.5);
  const SEGS = 480;
  const pts = curve.getPoints(SEGS); // uniform in curve param → hop i sits at t = i / (STOPS - 1)

  const stopColors = [new THREE.Color(0xffffff), ...flow.map((f) => new THREE.Color(f.color))];
  const INK = new THREE.Color(0xcfe0f7);
  const ACCENT = new THREE.Color(0xff8a3d);
  const neonStops = stopColors.map((col) => col.clone());
  let bp = false;
  const colorAt = (t, out) => {
    if (bp) return out.copy(ACCENT);
    const s = clamp(t, 0, 1) * (STOPS - 1);
    const i = Math.min(STOPS - 2, Math.floor(s));
    return out.copy(stopColors[i]).lerp(stopColors[i + 1], s - i);
  };

  const baseGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const base = new THREE.Line(baseGeo, new THREE.LineDashedMaterial({
    color: 0x2bd9ff, dashSize: 0.16, gapSize: 0.14, transparent: true, opacity: 0.35,
  }));
  base.computeLineDistances();

  const litGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const litCol = new Float32Array((SEGS + 1) * 3);
  const c = new THREE.Color();
  for (let j = 0; j <= SEGS; j++) {
    colorAt(j / SEGS, c);
    litCol.set([c.r, c.g, c.b], j * 3);
  }
  litGeo.setAttribute('color', new THREE.BufferAttribute(litCol, 3));
  const lit = new THREE.Line(litGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.95 }));
  track.add(base, lit);

  // ── hops ────────────────────────────────────────────────────
  const coreGeo = new THREE.OctahedronGeometry(0.34, 0);
  const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.62, 0));
  const ringGeo = new THREE.TorusGeometry(0.95, 0.018, 6, 72);

  const layer = document.createElement('div');
  layer.className = 'labels hop-labels';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const hops = ctrl.map((p, i) => {
    const color = stopColors[i];
    const g = new THREE.Group();
    g.position.copy(p);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color, transparent: true }));
    const shell = new THREE.LineSegments(shellGeo, new THREE.LineBasicMaterial({ color, transparent: true }));
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, side: THREE.DoubleSide }));
    ring.rotation.x = Math.PI / 2;
    g.add(core, shell, ring);
    track.add(g);

    const el = document.createElement('span');
    el.className = 'hop-lbl';
    el.style.setProperty('--c', `#${color.getHexString()}`);
    el.innerHTML = `<b>${pad(i)}</b>${i ? flow[i - 1].stage : 'client'}`;
    layer.appendChild(el);

    return { g, core, shell, ring, el, t: i / (STOPS - 1), near: 0, reached: false };
  });

  // ── packet + trail ──────────────────────────────────────────
  const packet = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: dotTex, color: 0x7ff8ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  halo.scale.setScalar(1.8);
  track.add(packet, halo);

  const TRAIL = 48;
  const trailPos = new Float32Array(TRAIL * 3);
  const trailCol = new Float32Array(TRAIL * 3);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  trailGeo.setAttribute('color', new THREE.BufferAttribute(trailCol, 3));
  track.add(new THREE.Points(trailGeo, new THREE.PointsMaterial({
    size: 0.16, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })));

  // ── ambient traffic along the path ─────────────────────────
  const TRAFFIC = 70;
  const traffic = Array.from({ length: TRAFFIC }, () => ({ u: Math.random(), v: 0.02 + Math.random() * 0.05 }));
  const trafficPos = new Float32Array(TRAFFIC * 3);
  const trafficGeo = new THREE.BufferGeometry();
  trafficGeo.setAttribute('position', new THREE.BufferAttribute(trafficPos, 3));
  track.add(new THREE.Points(trafficGeo, new THREE.PointsMaterial({
    size: 0.07, map: dotTex, color: 0x5ff6ff, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending,
  })));

  // ── per-frame ───────────────────────────────────────────────
  let prog = 0;
  let vis = 0;
  const P = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function update({ dt, time, visibility, target, mx, x, y, scale }) {
    vis = visibility;
    root.visible = vis > 0.01;
    if (!root.visible) return;

    prog += (clamp(target, 0, 1) - prog) * Math.min(1, dt * 4);
    curve.getPoint(prog, P);
    packet.position.copy(P);
    halo.position.copy(P);
    colorAt(prog, halo.material.color).lerp(new THREE.Color(0xffffff), 0.35);
    halo.material.opacity = 0.75 + Math.sin(time * 6) * 0.2;
    lit.geometry.setDrawRange(0, Math.max(2, Math.round(prog * SEGS) + 1));

    for (let k = 0; k < TRAIL; k++) {
      const t = Math.max(0, prog - k * 0.0032);
      curve.getPoint(t, tmp);
      trailPos.set([tmp.x, tmp.y, tmp.z], k * 3);
      const fade = prog - k * 0.0032 < 0 ? 0 : Math.pow(1 - k / TRAIL, 2);
      colorAt(t, c).multiplyScalar(fade);
      trailCol.set([c.r, c.g, c.b], k * 3);
    }
    trailGeo.attributes.position.needsUpdate = true;
    trailGeo.attributes.color.needsUpdate = true;

    traffic.forEach((p, i) => {
      p.u = (p.u + dt * p.v) % 1;
      curve.getPoint(p.u, tmp);
      trafficPos.set([tmp.x, tmp.y, tmp.z], i * 3);
    });
    trafficGeo.attributes.position.needsUpdate = true;

    hops.forEach((h) => {
      const d = Math.abs(prog - h.t) * (STOPS - 1);
      h.near = clamp(1 - d * 1.4, 0, 1);
      h.reached = prog >= h.t - 0.02;
      h.core.material.opacity = h.reached ? 0.6 + h.near * 0.4 : 0.22;
      h.shell.material.opacity = h.reached ? 0.45 + h.near * 0.55 : 0.18;
      h.ring.material.opacity = h.near * 0.9;
      h.ring.scale.setScalar(1 + h.near * 0.25 + Math.sin(time * 4) * 0.04 * h.near);
      h.g.scale.setScalar(1 + h.near * 0.55);
      if (bp) h.core.material.color.copy(h.near > 0.5 ? ACCENT : INK);
      h.core.rotation.y += dt * (0.6 + h.near * 2.4);
      h.shell.rotation.y -= dt * 0.4;
      h.shell.rotation.x += dt * 0.2;
    });

    // keep the packet centred, sway gently with time + pointer
    track.position.set(-P.x * 0.6, -P.y, -P.z * 0.5);
    root.position.set(x, y, 0);
    root.scale.setScalar(scale * Math.max(vis, 0.001));
    root.rotation.set(0.12, Math.sin(time * 0.35) * 0.35 + mx * 0.25, 0);
  }

  // call after render so world matrices are fresh
  const v = new THREE.Vector3();
  function updateLabels(camera) {
    if (!root.visible) {
      if (layer.style.visibility !== 'hidden') layer.style.visibility = 'hidden';
      return;
    }
    layer.style.visibility = 'visible';
    layer.style.opacity = vis.toFixed(3);
    hops.forEach((h) => {
      h.core.getWorldPosition(v);
      v.project(camera);
      const sx = (v.x * 0.5 + 0.5) * innerWidth;
      const sy = (-v.y * 0.5 + 0.5) * innerHeight;
      const off = v.z > 1 || sy < -40 || sy > innerHeight + 40;
      h.el.style.opacity = off ? 0 : (h.near > 0.3 ? 1 : h.reached ? 0.55 : 0.28).toString();
      h.el.classList.toggle('on', h.near > 0.5);
      h.el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(${(34 + h.near * 40).toFixed(0)}px, -50%)`;
    });
  }

  // blueprint: ink hops, orange path + packet; neon: per-hop colours
  function setTheme(name) {
    bp = name === 'blueprint';
    stopColors.forEach((col, i) => col.copy(bp ? INK : neonStops[i]));
    for (let j = 0; j <= SEGS; j++) {
      colorAt(j / SEGS, c);
      litCol.set([c.r, c.g, c.b], j * 3);
    }
    litGeo.attributes.color.needsUpdate = true;
    base.material.color.set(bp ? 0xa0c4f5 : 0x2bd9ff);
    hops.forEach((h, i) => {
      h.core.material.color.copy(stopColors[i]);
      h.shell.material.color.copy(stopColors[i]);
      h.ring.material.color.copy(bp ? ACCENT : stopColors[i]);
    });
  }

  return { update, updateLabels, setTheme };
}
