// ─────────────────────────────────────────────────────────────
//  3D "service mesh" scene
//  core ⇄ skill nodes ⇄ packets, starfield, synth grid, bloom.
//  Talks to the UI only through window CustomEvents:
//    in : 'skill:focus' {label|null}, 'skill:burst' {label}
//    out: 'node:select' {label|null}
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SKILLS, SKILL_CATEGORIES, TEAM_COUNT, FLOW } from './data.js';
import { createPipeline } from './pipeline.js';

// Where the mesh sits for each section.
// nx/ny: position in screen space (-1..1), my: ny on mobile, z: depth, s: scale, l: label opacity,
// p: visibility of the 'follow the request' pipeline, ms: scale on phones (mesh only lives in the hero there)
const KEYFRAMES = {
  hero:       { nx: 0.44,  ny: 0,     my: 0.7,  z: 0,  s: 1.0,  l: 1, p: 0, ms: 1 },
  about:      { nx: -0.55, ny: 0.05,  my: 0,    z: -5, s: 0.8,  l: 0, p: 0, ms: 0 },
  flow:       { nx: 1.6,   ny: 0.1,   my: 0,    z: -20, s: 0.01, l: 0, p: 1, ms: 0 },
  experience: { nx: 0.62,  ny: -0.05, my: 0,    z: -7, s: 0.75, l: 0, p: 0, ms: 0 },
  projects:   { nx: 0,     ny: 0.1,   my: 0,    z: -9, s: 0.9,  l: 0, p: 0, ms: 0 },
  skills:     { nx: -0.47, ny: -0.2,  my: 0,    z: 0,  s: 0.84, l: 1, p: 0, ms: 0 },
  terminal:   { nx: 0.6,   ny: -0.05, my: 0,    z: -5, s: 0.8,  l: 0, p: 0, ms: 0 },
  contact:    { nx: 0,     ny: -0.95, my: -0.8, z: -3, s: 1.25, l: 0, p: 0, ms: 0 },
};

const BG = 0x05070d;
const CAM_Z = 15;
const RADIUS = 5.4;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SPEED = reduceMotion ? 0.2 : 1;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const isSmall = () => innerWidth < 900;

start();

function start() {
  const canvas = document.getElementById('scene');
  const labelLayer = document.getElementById('labels');
  const tip = document.getElementById('node-tip');
  const fpsEl = document.getElementById('hud-fps');

  // ── renderer ────────────────────────────────────────────────
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (err) {
    document.documentElement.classList.add('no-webgl');
    console.warn('[scene] WebGL unavailable — falling back to static background.', err);
    return;
  }
  renderer.setClearColor(BG, 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  // Explicit background (not just clear color): RenderPass otherwise clears with the GL
  // clear color left over from OutputPass's screen render, which is sRGB → double-encoded grey.
  scene.background = new THREE.Color(BG);
  scene.fog = new THREE.FogExp2(BG, 0.021);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 0, CAM_Z);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.8, 0.4, 0.32);  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  // ?lite in the URL disables bloom (useful on low-end devices / for debugging)
  let useBloom = !new URLSearchParams(location.search).has('lite');

  const dotTex = makeDotTexture();
  const ringTex = makeRingTexture();

  // ── starfield ───────────────────────────────────────────────
  const STAR_COUNT = isSmall() ? 1400 : 3000;
  const starPos = new Float32Array(STAR_COUNT * 3);
  const starCol = new Float32Array(STAR_COUNT * 3);
  const starPalette = [0xffffff, 0x00f0ff, 0xff2bd6, 0x6f8cff, 0x39ff88].map((c) => new THREE.Color(c));
  const camPos0 = new THREE.Vector3(0, 0, CAM_Z);
  const tmp = new THREE.Vector3();
  for (let i = 0; i < STAR_COUNT; i++) {
    do {
      const r = 16 + Math.random() * 55;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      tmp.set(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    } while (tmp.distanceTo(camPos0) < 8);
    starPos.set([tmp.x, tmp.y, tmp.z], i * 3);
    const c = starPalette[Math.random() < 0.6 ? 0 : 1 + ((Math.random() * 4) | 0)];
    // keep most stars under the bloom threshold (otherwise they haze the whole frame);
    // a few bright ones still sparkle
    const k = Math.random() < 0.04 ? 0.8 + Math.random() * 0.2 : 0.1 + Math.random() * 0.2;
    starCol.set([c.r * k, c.g * k, c.b * k], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.2, map: dotTex, vertexColors: true, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(stars);

  // ── synth grid floor ────────────────────────────────────────
  const grid = new THREE.GridHelper(160, 80, 0x00f0ff, 0x0a3550);
  grid.material.transparent = true;
  grid.material.opacity = 0.2;
  grid.material.depthWrite = false;
  grid.position.y = -8.5;
  scene.add(grid);

  // ── system: placement group → spin group → contents ────────
  const system = new THREE.Group();
  const spin = new THREE.Group();
  spin.rotation.x = 0.22;
  system.add(spin);
  scene.add(system);

  // core
  const core = new THREE.Group();
  spin.add(core);
  const coreShell = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 1)),
    new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 }),
  );
  const coreInner = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.95, 0)),
    new THREE.LineBasicMaterial({ color: 0xff2bd6 }),
  );
  const coreGlow = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 16), new THREE.MeshBasicMaterial({ color: 0xc8fdff }));
  const coreHit = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), new THREE.MeshBasicMaterial());
  coreHit.visible = false;
  core.add(coreShell, coreInner, coreGlow, coreHit);

  const rings = [0, 1, 2].map((k) => {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(2.2 + k * 0.42, 0.012, 6, 200),
      new THREE.MeshBasicMaterial({ color: k === 1 ? 0xff2bd6 : 0x00f0ff, transparent: true, opacity: 0.5 }),
    );
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    m.userData.speed = (k % 2 ? -1 : 1) * (0.14 + k * 0.06);
    core.add(m);
    return m;
  });

  // accretion disk of tiny points
  const DISK = 700;
  const diskPos = new Float32Array(DISK * 3);
  for (let i = 0; i < DISK; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3.1 + Math.pow(Math.random(), 1.6) * 1.1;
    diskPos.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.08, Math.sin(a) * r], i * 3);
  }
  const diskGeo = new THREE.BufferGeometry();
  diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
  const disk = new THREE.Points(diskGeo, new THREE.PointsMaterial({
    size: 0.06, map: dotTex, color: 0x5ff6ff, transparent: true, opacity: 0.7,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  spin.add(disk);

  // ── skill nodes ─────────────────────────────────────────────
  const nodeData = SKILLS.filter((s) => s.node);
  const N = nodeData.length;
  const octGeo = new THREE.OctahedronGeometry(0.2, 0);
  const shellGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.36, 0));
  const hitGeo = new THREE.SphereGeometry(0.6, 10, 8);
  const golden = Math.PI * (3 - Math.sqrt(5));

  const nodes = nodeData.map((d, i) => {
    const y = 1 - ((i + 0.5) / N) * 2;
    const r = Math.sqrt(1 - y * y);
    const base = new THREE.Vector3(Math.cos(i * golden) * r, y * 0.72, Math.sin(i * golden) * r).multiplyScalar(RADIUS);
    const hex = SKILL_CATEGORIES[d.cat].color;
    const color = new THREE.Color(hex);

    const g = new THREE.Group();
    g.position.copy(base);
    const body = new THREE.Mesh(octGeo, new THREE.MeshBasicMaterial({ color }));
    const shell = new THREE.LineSegments(shellGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 }));
    const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial());
    hit.visible = false;
    hit.userData.index = i;
    g.add(body, shell, hit);
    spin.add(g);

    const el = document.createElement('span');
    el.className = 'lbl';
    el.textContent = d.label;
    el.style.setProperty('--c', hex);
    labelLayer.appendChild(el);

    return { d, g, body, shell, hit, base, color, baseColor: color.clone(), hex, el, phase: Math.random() * Math.PI * 2, scale: 1 };
  });
  const indexByLabel = new Map(nodes.map((n, i) => [n.d.label, i]));

  // ── edges (core→node + 2 nearest neighbours) ───────────────
  const edges = [];
  const nodeEdges = nodes.map(() => []);
  const coreEdges = [];
  const seen = new Set();
  const addEdge = (a, b) => {
    const key = a < b ? `${a}:${b}` : `${b}:${a}`;
    if (seen.has(key)) return;
    seen.add(key);
    const idx = edges.push([a, b]) - 1;
    if (a >= 0) nodeEdges[a].push(idx); else coreEdges.push(idx);
    if (b >= 0) nodeEdges[b].push(idx); else coreEdges.push(idx);
  };
  nodes.forEach((n, i) => {
    addEdge(-1, i);
    nodes
      .map((m, j) => [j, n.base.distanceTo(m.base)])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .forEach(([j]) => addEdge(i, j));
  });

  const ORIGIN = new THREE.Vector3();
  const endpoint = (i) => (i < 0 ? ORIGIN : nodes[i].g.position);

  const edgePos = new Float32Array(edges.length * 6);
  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
  const edgeLines = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
    color: 0x2bd9ff, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  spin.add(edgeLines);

  // ── packets travelling along edges ─────────────────────────
  const PACKETS = isSmall() ? 60 : 130;
  const pkPos = new Float32Array(PACKETS * 3);
  const pkCol = new Float32Array(PACKETS * 3);
  const pkGeo = new THREE.BufferGeometry();
  pkGeo.setAttribute('position', new THREE.BufferAttribute(pkPos, 3));
  pkGeo.setAttribute('color', new THREE.BufferAttribute(pkCol, 3));
  const packetPoints = new THREE.Points(pkGeo, new THREE.PointsMaterial({
    size: 0.2, map: dotTex, vertexColors: true, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  spin.add(packetPoints);

  const WHITE = new THREE.Color(0xffffff);
  let focusIndex = -1;
  const packets = [];
  for (let i = 0; i < PACKETS; i++) {
    packets.push(spawnPacket({ i }));
    packets[i].t = Math.random();
  }

  function spawnPacket(p, edgeIdx, fromNode) {
    let e = edgeIdx;
    if (e === undefined) {
      const pool = focusIndex >= 0 && Math.random() < 0.6 ? nodeEdges[focusIndex] : null;
      e = pool ? pool[(Math.random() * pool.length) | 0] : (Math.random() * edges.length) | 0;
    }
    const [a, b] = edges[e];
    p.e = e;
    p.t = 0;
    p.v = (0.18 + Math.random() * 0.4) * (edgeIdx !== undefined ? 2.2 : 1);
    if (fromNode !== undefined) p.dir = a === fromNode ? 1 : -1;
    else p.dir = Math.random() < 0.5 ? 1 : -1;
    const target = p.dir > 0 ? b : a;
    const c = target >= 0 && Math.random() < 0.75 ? nodes[target].color : WHITE;
    pkCol.set([c.r, c.g, c.b], p.i * 3);
    pkGeo.attributes.color.needsUpdate = true;
    return p;
  }

  function burst(nodeIndex) {
    const pool = nodeIndex >= 0 ? nodeEdges[nodeIndex] : coreEdges;
    const count = Math.min(PACKETS, nodeIndex >= 0 ? 28 : 60);
    for (let k = 0; k < count; k++) {
      const p = packets[(Math.random() * PACKETS) | 0];
      spawnPacket(p, pool[(Math.random() * pool.length) | 0], nodeIndex);
    }
  }

  // ── click pulses (expanding rings; optional delay + size) ──
  const pulses = [];
  function pulse(pos, color, delay = 0, size = 3.2) {
    const mat = new THREE.SpriteMaterial({
      map: ringTex, color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const s = new THREE.Sprite(mat);
    s.position.copy(pos);
    s.scale.setScalar(0.4);
    spin.add(s);
    pulses.push({ s, t: -delay, size });
  }

  // ── broadcast: shockwave from the core, packets to every node, nodes ping on arrival ──
  let flash = 0;
  let pkCursor = 0;
  const nextPacket = () => packets[(pkCursor = (pkCursor + 1) % PACKETS)];
  const CYAN = new THREE.Color(0x00f0ff);
  const MAGENTA = new THREE.Color(0xff2bd6);

  function broadcast() {
    flash = 1;
    [0, 0.15, 0.3].forEach((d, k) => pulse(ORIGIN, k === 1 ? MAGENTA : CYAN, d, 7));
    const per = Math.max(1, Math.floor((PACKETS * 0.7) / N));
    const SPEED_OUT = 1.15;
    nodes.forEach((n, i) => {
      const e = nodeEdges[i].find((idx) => edges[idx][0] === -1 && edges[idx][1] === i);
      if (e === undefined) return;
      for (let k = 0; k < per; k++) {
        const p = spawnPacket(nextPacket(), e, -1);
        p.v = SPEED_OUT;
        p.t = -k * 0.14; // stagger the train of packets
      }
      n.pingDelay = 1 / SPEED_OUT; // arrival of the first packet
    });
  }

  function select(target) {
    if (target === 'core') {
      broadcast();
      emit('node:select', { label: null, core: true });
    } else if (target >= 0) {
      const n = nodes[target];
      pulse(n.g.position, blueprint ? ACCENT : n.color);
      burst(target);
      emit('node:select', { label: n.d.label });
    }
  }

  // ── follow-the-request pipeline ────────────────────────────
  const pipeline = createPipeline({ scene, flow: FLOW, dotTex });
  const flowStage = document.querySelector('.flow-stage');

  // ── theming: blueprint (ink + one orange accent) ↔ neon ─────
  const INK = new THREE.Color(0xcfe0f7);
  const ACCENT = new THREE.Color(0xff8a3d);
  const BP_BG = new THREE.Color(0x0a1626);
  const NEON_BG = new THREE.Color(BG);
  const neonStarCol = starCol.slice();
  const bpStarCol = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    const k = Math.random() < 0.05 ? 0.9 : 0.12 + Math.random() * 0.22;
    bpStarCol.set([0.78 * k, 0.87 * k, 1.0 * k], i * 3);
  }
  const neon = {
    coreShell: coreShell.material.color.clone(),
    coreInner: coreInner.material.color.clone(),
    coreGlow: coreGlow.material.color.clone(),
    rings: rings.map((r) => r.material.color.clone()),
    disk: disk.material.color.clone(),
    edge: edgeLines.material.color.clone(),
    cyan: CYAN.clone(),
    magenta: MAGENTA.clone(),
  };
  let blueprint = false;
  let bloomBase = 0.8;
  function applyTheme(name) {
    blueprint = name !== 'neon';
    const bg = blueprint ? BP_BG : NEON_BG;
    scene.background.copy(bg);
    scene.fog.color.copy(bg);
    renderer.setClearColor(bg, 1);
    starCol.set(blueprint ? bpStarCol : neonStarCol);
    starGeo.attributes.color.needsUpdate = true;
    grid.visible = !blueprint; // the CSS drafting grid replaces the synth floor
    coreShell.material.color.copy(blueprint ? INK : neon.coreShell);
    coreInner.material.color.copy(blueprint ? ACCENT : neon.coreInner);
    coreGlow.material.color.copy(blueprint ? ACCENT : neon.coreGlow);
    rings.forEach((r, k) => r.material.color.copy(blueprint ? (k === 1 ? ACCENT : INK) : neon.rings[k]));
    disk.material.color.copy(blueprint ? INK : neon.disk);
    edgeLines.material.color.copy(blueprint ? INK : neon.edge);
    CYAN.copy(blueprint ? ACCENT : neon.cyan);
    MAGENTA.copy(blueprint ? INK : neon.magenta);
    nodes.forEach((n) => {
      n.color.copy(blueprint ? INK : n.baseColor);
      n.body.material.color.copy(n.color);
      n.shell.material.color.copy(n.color);
    });
    bloomBase = blueprint ? 0.32 : 0.8;
    pipeline.setTheme(blueprint ? 'blueprint' : 'neon');
  }
  applyTheme('blueprint');


  // ── UI → scene events ───────────────────────────────────────
  addEventListener('skill:focus', (e) => {
    const idx = e.detail?.label ? indexByLabel.get(e.detail.label) : undefined;
    focusIndex = idx ?? -1;
  });
  addEventListener('scene:broadcast', () => select('core'));
  addEventListener('skill:burst', (e) => {
    const idx = indexByLabel.get(e.detail?.label);
    if (idx !== undefined) {
      pulse(nodes[idx].g.position, blueprint ? ACCENT : nodes[idx].color);
      burst(idx);
    }
  });

  // ── pointer: parallax, drag-rotate, hover + click picking ──
  const mouse = new THREE.Vector2();
  const pointer = new THREE.Vector2(9, 9);
  const raycaster = new THREE.Raycaster();
  const hitTargets = [...nodes.map((n) => n.hit), coreHit];
  const vel = { x: 0, y: 0 };
  let overCanvas = false;
  let dragging = false;
  let down = null;
  let last = { x: 0, y: 0 };
  let hovered = -1; // node index, 'core', or -1

  addEventListener('pointermove', (e) => {
    mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    overCanvas = e.target === canvas;
    if (overCanvas) pointer.copy(mouse);
    if (dragging) {
      vel.y += (e.clientX - last.x) * 0.0011;
      vel.x += (e.clientY - last.y) * 0.0011;
      last = { x: e.clientX, y: e.clientY };
    }
  }, { passive: true });

  canvas.addEventListener('pointerdown', (e) => {
    down = { x: e.clientX, y: e.clientY };
    if (e.pointerType === 'touch') return; // keep native scroll on touch
    dragging = true;
    last = { x: e.clientX, y: e.clientY };
    canvas.classList.add('grabbing');
  });

  addEventListener('pointerup', (e) => {
    const wasDown = down;
    dragging = false;
    down = null;
    canvas.classList.remove('grabbing');
    if (!wasDown || e.target !== canvas) return;
    if (Math.hypot(e.clientX - wasDown.x, e.clientY - wasDown.y) > 6) return;
    pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    const hit = pick();
    if (hit !== -1) select(hit);
  });

  canvas.addEventListener('pointerleave', () => { overCanvas = false; });

  function pick() {
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(hitTargets, false)[0];
    if (!hit) return -1;
    return hit.object === coreHit ? 'core' : hit.object.userData.index;
  }

  // ── scroll-driven placement ─────────────────────────────────
  // Each section contributes two stops (enter/exit) so tall sections hold their pose
  // and the mesh only travels in the gap between sections.
  let sections = [];
  function measure() {
    sections = [...document.querySelectorAll('[data-scene]')].flatMap((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + scrollY;
      const half = Math.min(r.height / 2, innerHeight * 0.5);
      return [
        { key: el.dataset.scene, c: top + half },
        { key: el.dataset.scene, c: top + r.height - half },
      ];
    });
    // pipeline stops: client (section header) + the centre of each hop card
    const flowEl = document.getElementById('flow');
    const stepEls = [...document.querySelectorAll('.flow-step')];
    flowStops = flowEl && stepEls.length
      ? [flowEl.getBoundingClientRect().top + scrollY + innerHeight * 0.2,
        ...stepEls.map((el) => { const r = el.getBoundingClientRect(); return r.top + scrollY + r.height / 2; })]
      : [];
  }
  let flowStops = [];
  function flowProgress() {
    if (flowStops.length < 2) return 0;
    const mid = scrollY + innerHeight / 2;
    if (mid <= flowStops[0]) return 0;
    for (let k = 0; k < flowStops.length - 1; k++) {
      if (mid < flowStops[k + 1]) return (k + (mid - flowStops[k]) / (flowStops[k + 1] - flowStops[k])) / (flowStops.length - 1);
    }
    return 1;
  }
  measure();
  new ResizeObserver(measure).observe(document.body);

  const cur = { nx: 0.44, ny: 0, my: 0.36, z: -10, s: 0.001, l: 0, p: 0, ms: 1 };
  const tgt = { ...cur };
  function computeTarget() {
    const mid = scrollY + innerHeight / 2;
    if (!sections.length) return Object.assign(tgt, KEYFRAMES.hero);
    let i = 0;
    for (let k = 0; k < sections.length; k++) if (sections[k].c <= mid) i = k;
    const A = KEYFRAMES[sections[i].key] ?? KEYFRAMES.hero;
    const next = sections[i + 1];
    if (!next) return Object.assign(tgt, A);
    const B = KEYFRAMES[next.key] ?? A;
    let t = clamp((mid - sections[i].c) / Math.max(1, next.c - sections[i].c), 0, 1);
    t = t * t * (3 - 2 * t);
    for (const key in A) tgt[key] = A[key] + (B[key] - A[key]) * t;
    return tgt;
  }

  // ── resize ──────────────────────────────────────────────────
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
    measure();
  });

  // ── loop ────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  const v = new THREE.Vector3();
  const sysWorld = new THREE.Vector3();
  let time = 0;
  let lastScroll = scrollY;
  let scrollVel = 0;
  let frames = 0;
  let fpsT = 0;
  let slowSeconds = 0;

  // pause rendering while an overlay (quick view) covers the scene
  let paused = false;
  let shown = false;
  let idleRendered = false;
  addEventListener('scene:pause', (e) => { paused = !!e.detail?.paused; clock.getDelta(); });

  renderer.setAnimationLoop(() => {
    if (paused) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    time += dt * SPEED;
    const small = isSmall();

    // placement
    computeTarget();
    const ease = Math.min(1, dt * 3.2);
    for (const k in cur) cur[k] += (tgt[k] - cur[k]) * ease;
    const depth = CAM_Z - cur.z;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * depth;
    const halfW = halfH * camera.aspect;
    // desktop: shrink the mesh on narrower windows so it never runs into the text column,
    // and push it a little further toward its side so the smaller mesh hugs the edge
    const widthFit = clamp((innerWidth - 560) / 880, 0.5, 1);
    const nxEff = cur.nx + Math.sign(cur.nx) * (1 - widthFit) * 0.2;
    system.position.set(small ? 0 : nxEff * halfW, (small ? cur.my : cur.ny) * halfH, cur.z);
    const fit = small ? Math.min(0.62, camera.aspect * 0.75) : Math.min(widthFit, camera.aspect < 1.35 ? 0.85 : 1);
    const sNow = small ? cur.ms : cur.s;
    system.scale.setScalar(Math.max(sNow, 0.001) * fit);
    system.visible = sNow > 0.01; // fully gone (no bloom speck) once shrunk away

    // pipeline lives at depth 0, anchored to the centre of the .flow-stage box so it
    // scrolls in with its section (never over the heading) and then stays put while sticky
    const halfH0 = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAM_Z;
    const halfW0 = halfH0 * camera.aspect;
    let px = small ? 0 : -0.46 * halfW0;
    let py = small ? 0.42 * halfH0 : -0.04 * halfH0;
    let onScreen = true;
    if (flowStage) {
      const r = flowStage.getBoundingClientRect();
      px = ((r.left + r.width / 2) / innerWidth * 2 - 1) * halfW0;
      py = -((r.top + r.height / 2) / innerHeight * 2 - 1) * halfH0;
      onScreen = r.bottom > 0 && r.top < innerHeight;
    }
    pipeline.update({
      dt, time, visibility: onScreen ? clamp(cur.p, 0, 1) : 0, target: flowProgress(), mx: mouse.x,
      x: px,
      y: py,
      scale: small ? 0.55 : camera.aspect < 1.35 ? 0.82 : 1,
    });

    // rotation: auto + drag inertia
    spin.rotation.y += (0.09 * dt * SPEED) + vel.y;
    spin.rotation.x = clamp(spin.rotation.x + vel.x, -0.9, 0.9);
    vel.x *= 0.9;
    vel.y *= 0.92;

    // core animation
    coreShell.rotation.y += dt * 0.35 * SPEED;
    coreShell.rotation.x += dt * 0.15 * SPEED;
    coreInner.rotation.y -= dt * 0.8 * SPEED;
    coreInner.rotation.z += dt * 0.4 * SPEED;
    const beat = 1 + Math.sin(time * 3) * 0.08 + (hovered === 'core' ? 0.25 : 0) + flash * 0.9;
    coreGlow.scale.setScalar(beat);
    edgeLines.material.opacity = 0.2 + flash * 0.75;
    bloom.strength = bloomBase + flash * 0.8;
    flash = Math.max(0, flash - dt * 0.8);
    rings.forEach((r) => { r.rotation.z += r.userData.speed * dt * SPEED; });
    disk.rotation.y -= dt * 0.12 * SPEED;

    // nodes float + focus scale
    nodes.forEach((n, i) => {
      n.g.position.set(n.base.x, n.base.y + Math.sin(time * 1.2 + n.phase) * 0.18, n.base.z);
      const active = hovered === i || focusIndex === i;
      if (n.pingDelay > 0 && (n.pingDelay -= dt) <= 0) {
        n.bump = 1;
        pulse(n.g.position, blueprint ? ACCENT : n.color, 0, 2.6);
      }
      n.bump = (n.bump ?? 0) * Math.max(0, 1 - dt * 3);
      n.scale += ((active ? 2.1 : 1) + n.bump * 1.6 - n.scale) * Math.min(1, dt * 10);
      n.g.scale.setScalar(n.scale);
      n.body.rotation.y += dt * 1.2 * SPEED;
      n.shell.rotation.y -= dt * 0.6 * SPEED;
      n.shell.material.opacity = active ? 1 : 0.55;
      n.el.classList.toggle('on', active);
      if (blueprint) n.body.material.color.copy(active || n.bump > 0.25 ? ACCENT : INK);
    });

    // edges follow nodes
    edges.forEach(([a, b], k) => {
      const A = endpoint(a);
      const B = endpoint(b);
      edgePos.set([A.x, A.y, A.z, B.x, B.y, B.z], k * 6);
    });
    edgeGeo.attributes.position.needsUpdate = true;

    // packets
    for (const p of packets) {
      p.t += dt * p.v * SPEED;
      if (p.t >= 1) spawnPacket(p);
      const [a, b] = edges[p.e];
      const t = Math.max(0, p.t); // negative t = queued (staggered broadcast)
      v.lerpVectors(endpoint(a), endpoint(b), p.dir > 0 ? t : 1 - t);
      pkPos.set([v.x, v.y, v.z], p.i * 3);
    }
    pkGeo.attributes.position.needsUpdate = true;

    // pulses
    for (let k = pulses.length - 1; k >= 0; k--) {
      const p = pulses[k];
      p.t += dt * 1.3;
      const t = Math.max(0, p.t);
      p.s.scale.setScalar(0.4 + t * p.size);
      p.s.material.opacity = p.t < 0 ? 0 : Math.max(0, 1 - p.t);
      if (p.t >= 1) {
        spin.remove(p.s);
        p.s.material.dispose();
        pulses.splice(k, 1);
      }
    }

    // background motion — grid speeds up with scroll velocity
    scrollVel += (Math.abs(scrollY - lastScroll) - scrollVel) * 0.1;
    lastScroll = scrollY;
    grid.position.z = (grid.position.z + dt * (0.6 + scrollVel * 0.08) * SPEED) % 2;
    stars.rotation.y = time * 0.008 + scrollY * 0.00012;
    stars.rotation.x = scrollY * 0.00005;

    // camera parallax
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // hover picking (only when the pointer is actually over the canvas)
    hovered = overCanvas && !dragging ? pick() : -1;
    canvas.classList.toggle('pointing', hovered !== -1 && !dragging);

    // render
    const idleOnPhone = small && sNow < 0.004 && cur.p < 0.01 && flash < 0.01;
    if (!idleOnPhone || !idleRendered) {
      if (useBloom) composer.render(); else renderer.render(scene, camera);
    }
    idleRendered = idleOnPhone;
    if (!shown) {
      shown = true;
      performance.mark('scene-ready');
      document.documentElement.classList.add('scene-ready');
    }

    // DOM overlays (after render so matrices are fresh)
    updateLabels();
    updateTip();
    pipeline.updateLabels(camera);

    // FPS + adaptive quality
    frames++;
    fpsT += dt;
    if (fpsT >= 1) {
      const fps = Math.round(frames / fpsT);
      if (fpsEl) fpsEl.textContent = String(fps).padStart(2, '0');
      if (fps < 40 && useBloom) {
        if (++slowSeconds >= 3) {
          useBloom = false;
          renderer.setPixelRatio(1);
          renderer.setSize(innerWidth, innerHeight);
        }
      } else slowSeconds = 0;
      frames = 0;
      fpsT = 0;
    }
  });

  function project(obj) {
    obj.getWorldPosition(v);
    const dist = v.distanceTo(camera.position);
    v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * innerWidth, y: (-v.y * 0.5 + 0.5) * innerHeight, dist, behind: v.z > 1 };
  }

  function updateLabels() {
    // labels fade out with the mesh when it shrinks away (e.g. during the flow section)
    const sNow = isSmall() ? cur.ms : cur.s;
    const alpha = clamp(cur.l, 0, 1) * clamp((sNow - 0.1) * 3, 0, 1);
    if (alpha < 0.02) {
      if (labelLayer.style.visibility !== 'hidden') labelLayer.style.visibility = 'hidden';
      return;
    }
    labelLayer.style.visibility = 'visible';
    labelLayer.style.opacity = alpha.toFixed(3);
    system.getWorldPosition(sysWorld);
    const sysDist = sysWorld.distanceTo(camera.position);
    const span = RADIUS * system.scale.x;
    // when the mesh is drawn small, only label the front-facing nodes to avoid a pile-up
    const minFront = system.scale.x < 0.75 ? 0.6 : 0;
    nodes.forEach((n) => {
      const p = project(n.body);
      const front = clamp((sysDist - p.dist) / span * 0.6 + 0.5, 0, 1);
      const active = n.el.classList.contains('on');
      const hidden = p.behind || (!active && front < minFront);
      n.el.style.opacity = hidden ? 0 : active ? 1 : (0.12 + front * 0.88).toFixed(3);
      n.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -190%)`;
      n.el.style.zIndex = active ? 10 : Math.round(front * 9);
    });
  }

  let tipKey = null;
  function updateTip() {
    if (hovered === -1) {
      if (tipKey !== null) { tip.classList.remove('show'); tipKey = null; }
      return;
    }
    const isCore = hovered === 'core';
    const n = isCore ? null : nodes[hovered];
    const key = isCore ? 'core' : n.d.label;
    if (key !== tipKey) {
      tipKey = key;
      if (isCore) {
        tip.style.setProperty('--c', '#00f0ff');
        tip.innerHTML = `<small>core // runtime</small><b>kaleab.engine</b><p>5+ years uptime · ${TEAM_COUNT} deployments. Click to broadcast packets to every service.</p>`;
      } else {
        tip.style.setProperty('--c', n.hex);
        tip.innerHTML = `<small>${SKILL_CATEGORIES[n.d.cat].label}</small><b>${n.d.label}</b><p>${n.d.info}</p>`;
      }
      tip.classList.add('show');
    }
    const p = project(isCore ? coreGlow : n.body);
    const x = clamp(p.x + 22, 8, innerWidth - 270);
    const y = clamp(p.y + 18, 8, innerHeight - 140);
    tip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

function emit(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.22, 'rgba(255,255,255,0.85)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeRingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.strokeStyle = '#fff';
  g.lineWidth = 4;
  g.shadowColor = '#fff';
  g.shadowBlur = 10;
  g.beginPath();
  g.arc(64, 64, 52, 0, Math.PI * 2);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
