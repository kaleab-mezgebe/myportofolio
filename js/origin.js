// ─────────────────────────────────────────────────────────────
//  Origin — "from motors to microservices".
//  Each robot is a technical drawing split into two layers:
//    ground (track / ring / links)  and  body (the machine, lifted in 3D).
//  Pressing a control tilts the drawing from top view into an isometric
//  3D view and runs a small simulation of the machine.
//  .s = stroked part · .a = accent · .t = annotation · .m = motion path (invisible)
// ─────────────────────────────────────────────────────────────
import { ORIGIN, ORIGIN_PATH } from './data.js';
import { track } from './analytics.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const NS = 'http://www.w3.org/2000/svg';
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const DEG = 180 / Math.PI;

// ── drawings + simulations ────────────────────────────────────
const SCENES = {
  // ─ line follower: closed track, robot reads the line with 5 sensors
  line: {
    ground: `
      <path class="s track" d="M50,100 C50,45 120,35 160,60 C200,85 230,40 270,60 C300,78 292,150 250,155 C205,160 192,122 150,140 C110,158 50,160 50,100 Z"/>
      <path class="m" d="M50,100 C50,45 120,35 160,60 C200,85 230,40 270,60 C300,78 292,150 250,155 C205,160 192,122 150,140 C110,158 50,160 50,100 Z"/>
      <rect class="s a" x="14" y="182" width="8" height="8"/><text class="t" x="28" y="190">LINE SENSORS</text>
      <text class="t" x="188" y="190">PWM ← CONTROL LOOP</text>`,
    body: `
      <g class="lf">
        <rect class="s" x="-22" y="-13" width="40" height="26" rx="5"/>
        <rect class="s" x="-17" y="-18" width="13" height="5" rx="1.5"/>
        <rect class="s" x="-17" y="13" width="13" height="5" rx="1.5"/>
        <rect class="s" x="-12" y="-6" width="15" height="12" rx="1"/>
        <path class="s a" d="M19,-11 h3 v22 h-3"/>
        <circle class="sn" cx="22" cy="-8" r="1.7"/><circle class="sn" cx="22" cy="-4" r="1.7"/>
        <circle class="sn" cx="22" cy="0" r="1.7"/><circle class="sn" cx="22" cy="4" r="1.7"/>
        <circle class="sn" cx="22" cy="8" r="1.7"/>
      </g>`,
    controls: `
      <button type="button" class="rf-btn primary" data-act="run">▶ Run</button>
      <button type="button" class="rf-btn" data-act="reset">⟲ Reset</button>`,
    setup(ctx) {
      const path = ctx.q('.m');
      const L = path.getTotalLength();
      const bot = ctx.q('.lf');
      const sensors = [...ctx.body.querySelectorAll('.sn')];
      let d = 0;
      let err = 0;
      const heading = (at) => {
        const a = path.getPointAtLength(at % L);
        const b = path.getPointAtLength((at + 3) % L);
        return Math.atan2(b.y - a.y, b.x - a.x);
      };
      const place = () => {
        const p = path.getPointAtLength(d % L);
        const ang = heading(d);
        // the sensor array "sees" how the line bends just ahead → steering error
        err += (norm(heading(d + 16) - ang) * 1.6 - err) * 0.25;
        bot.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${(ang * DEG).toFixed(2)})`);
        const e = clamp(err, -1, 1);
        const centre = 2 + e * 2;
        sensors.forEach((s, i) => s.classList.toggle('on', Math.abs(i - centre) < 0.75));
        return e;
      };
      return {
        step(dt) {
          d += 72 * dt;
          const e = place();
          ctx.readout(`ERR ${e >= 0 ? '+' : ''}${e.toFixed(2)} · L ${Math.round(62 + e * 30)}% · R ${Math.round(62 - e * 30)}%`);
          return true;
        },
        reset() { d = 0; err = 0; place(); ctx.readout('IDLE · press run'); },
        action(a) {
          if (a === 'run') ctx.toggle();
          if (a === 'reset') { ctx.stop(); this.reset(); }
        },
      };
    },
  },

  // ─ sumo: search → attack → evade state machine
  sumo: {
    ground: `
      <circle class="s ring" cx="160" cy="104" r="86"/>
      <path class="s" d="M146,92 v-12 M174,92 v-12"/>
      <text class="t st" data-s="search" x="78" y="16">SEARCH</text>
      <text class="t" x="124" y="16">→</text>
      <text class="t st" data-s="attack" x="138" y="16">ATTACK</text>
      <text class="t" x="184" y="16">→</text>
      <text class="t st" data-s="evade" x="198" y="16">EVADE</text>`,
    body: `
      <g class="opp">
        <rect class="s" x="-14" y="-14" width="28" height="28" rx="3"/>
        <path class="s" d="M-5,-14 v28 M5,-14 v28"/>
      </g>
      <g class="sb">
        <path class="s a beam" d="M22,-5 H78 M22,5 H78"/>
        <rect class="s" x="-18" y="-16" width="30" height="32" rx="3"/>
        <path class="s a" d="M12,-18 L22,-12 V12 L12,18"/>
        <rect class="s" x="-14" y="-21" width="14" height="5" rx="1.5"/>
        <rect class="s" x="-14" y="16" width="14" height="5" rx="1.5"/>
        <circle class="s a" cx="17" cy="-14" r="2"/><circle class="s a" cx="17" cy="14" r="2"/>
      </g>`,
    controls: `
      <button type="button" class="rf-btn primary" data-act="run">▶ Fight</button>
      <button type="button" class="rf-btn" data-act="reset">⟲ New opponent</button>`,
    setup(ctx) {
      const CX = 160;
      const CY = 104;
      const R = 86;
      const botEl = ctx.q('.sb');
      const oppEl = ctx.q('.opp');
      const beam = ctx.q('.beam');
      const labels = [...ctx.ground.querySelectorAll('.st')];
      let bot;
      let opp;
      let state;
      let t;
      const draw = () => {
        botEl.setAttribute('transform', `translate(${bot.x.toFixed(2)} ${bot.y.toFixed(2)}) rotate(${(bot.a * DEG).toFixed(2)})`);
        oppEl.setAttribute('transform', `translate(${opp.x.toFixed(2)} ${opp.y.toFixed(2)}) rotate(${opp.r.toFixed(1)})`);
        oppEl.style.opacity = opp.o;
        labels.forEach((l) => l.classList.toggle('on', l.dataset.s === state));
      };
      const place = () => {
        bot = { x: 118, y: 104, a: 0 };
        let tries = 0;
        do {
          const ang = Math.random() * Math.PI * 2;
          const r = 20 + Math.random() * 34;
          opp = { x: CX + Math.cos(ang) * r, y: CY + Math.sin(ang) * r, r: Math.random() * 90, o: 1, out: false };
        } while (Math.hypot(opp.x - bot.x, opp.y - bot.y) < 58 && ++tries < 40);
        state = 'idle';
        t = 0;
        beam.classList.remove('on');
        draw();
      };
      return {
        step(dt) {
          if (state === 'idle') state = 'search';
          t += dt;
          const dx = opp.x - bot.x;
          const dy = opp.y - bot.y;
          const dist = Math.hypot(dx, dy);
          const diff = norm(Math.atan2(dy, dx) - bot.a);
          if (state === 'search') {
            bot.a += Math.sign(diff) * Math.min(Math.abs(diff), 2.2 * dt);
            beam.classList.toggle('on', Math.abs(diff) < 0.25);
            if (Math.abs(diff) < 0.03) state = 'attack';
          } else if (state === 'attack') {
            beam.classList.toggle('on', !opp.out);
            if (!opp.out) bot.a += clamp(diff, -1.5 * dt, 1.5 * dt);
            const v = 78 * dt;
            bot.x += Math.cos(bot.a) * v;
            bot.y += Math.sin(bot.a) * v;
            if (!opp.out && dist < 37) { opp.x += Math.cos(bot.a) * v; opp.y += Math.sin(bot.a) * v; }
            if (!opp.out && Math.hypot(opp.x - CX, opp.y - CY) > R + 6) opp.out = true;
            if (Math.hypot(bot.x - CX, bot.y - CY) > R - 26) state = 'evade';
          } else if (state === 'evade') {
            beam.classList.remove('on');
            bot.x -= Math.cos(bot.a) * 64 * dt;
            bot.y -= Math.sin(bot.a) * 64 * dt;
            if (Math.hypot(bot.x - CX, bot.y - CY) < 26) {
              if (opp.out) { state = 'done'; }
              else { state = 'search'; }
            }
          }
          if (opp.out) opp.o = Math.max(0, opp.o - dt * 1.6);
          draw();
          if (state === 'done') {
            labels.forEach((l) => l.classList.remove('on'));
            ctx.readout(`WIN · opponent out in ${t.toFixed(1)}s`);
            track('sumo_win', { seconds: Math.round(t) });
            return false;
          }
          ctx.readout(`STATE ${state.toUpperCase()} · t ${t.toFixed(1)}s`);
          return true;
        },
        reset() { place(); ctx.readout('IDLE · press fight'); },
        action(a) {
          if (a === 'run') { if (state === 'done') place(); ctx.toggle(); }
          if (a === 'reset') { ctx.stop(); this.reset(); }
        },
      };
    },
  },

  // ─ voice car: commands go into a job queue the car executes in order
  voice: {
    ground: `
      <rect class="s arena" x="80" y="26" width="228" height="160" rx="4"/>
      <rect class="s" x="22" y="88" width="14" height="26" rx="7"/>
      <path class="s" d="M29,114 v12 M20,126 h18"/>
      <g class="waves"><path class="s a" d="M46,94 Q53,101 46,108 M53,88 Q64,101 53,114 M60,82 Q75,101 60,120"/></g>
      <text class="t bubble" x="10" y="70">“…”</text>`,
    body: `
      <g class="car">
        <rect class="s" x="-26" y="-14" width="52" height="28" rx="7"/>
        <rect class="s" x="-20" y="-19" width="11" height="5" rx="1.5"/><rect class="s" x="9" y="-19" width="11" height="5" rx="1.5"/>
        <rect class="s" x="-20" y="14" width="11" height="5" rx="1.5"/><rect class="s" x="9" y="14" width="11" height="5" rx="1.5"/>
        <rect class="s" x="-8" y="-7" width="16" height="14" rx="1"/>
        <path class="s a" d="M30,0 h10 M35,-4 L40,0 L35,4"/>
      </g>`,
    controls: `
      <button type="button" class="rf-btn primary" data-act="forward">“forward”</button>
      <button type="button" class="rf-btn" data-act="left">“left”</button>
      <button type="button" class="rf-btn" data-act="right">“right”</button>
      <button type="button" class="rf-btn" data-act="stop">“stop”</button>`,
    setup(ctx) {
      const carEl = ctx.q('.car');
      const waves = ctx.q('.waves');
      const bubble = ctx.q('.bubble');
      const BOUNDS = { x0: 112, x1: 276, y0: 58, y1: 154 };
      let car;
      let queue = [];
      let cur = null;
      const draw = () => carEl.setAttribute('transform', `translate(${car.x.toFixed(2)} ${car.y.toFixed(2)}) rotate(${(car.a * DEG).toFixed(2)})`);
      const say = (word) => {
        bubble.textContent = `“${word}”`;
        waves.classList.remove('talk');
        void waves.getBoundingClientRect();
        waves.classList.add('talk');
      };
      return {
        step(dt) {
          if (!cur && queue.length) cur = { ...queue.shift(), p: 0 };
          if (!cur) { ctx.readout('IDLE · queue empty — say a command'); return false; }
          if (cur.kind === 'move') {
            const v = 70 * dt;
            const nx = car.x + Math.cos(car.a) * v;
            const ny = car.y + Math.sin(car.a) * v;
            if (nx < BOUNDS.x0 || nx > BOUNDS.x1 || ny < BOUNDS.y0 || ny > BOUNDS.y1) {
              ctx.readout('WALL · obstacle ahead → stop');
              cur = null;
              draw();
              return queue.length > 0;
            }
            car.x = nx; car.y = ny; cur.p += v;
            if (cur.p >= cur.dist) cur = null;
          } else {
            const w = 2.6 * dt * cur.dir;
            car.a += w;
            car.x += Math.cos(car.a) * 14 * dt;
            car.y += Math.sin(car.a) * 14 * dt;
            car.x = clamp(car.x, BOUNDS.x0, BOUNDS.x1);
            car.y = clamp(car.y, BOUNDS.y0, BOUNDS.y1);
            cur.p += Math.abs(w);
            if (cur.p >= Math.PI / 2) cur = null;
          }
          draw();
          ctx.readout(`QUEUE ${queue.length} · EXEC ${cur ? cur.label : 'done'}`);
          return true;
        },
        reset() {
          car = { x: 150, y: 106, a: 0 };
          queue = [];
          cur = null;
          bubble.textContent = '“…”';
          draw();
          ctx.readout('IDLE · say a command');
        },
        action(a) {
          say(a === 'forward' ? 'go forward' : a === 'left' ? 'turn left' : a === 'right' ? 'turn right' : 'stop');
          if (a === 'stop') { queue = []; cur = null; ctx.readout('STOP · queue cleared'); return; }
          const job = a === 'forward'
            ? { kind: 'move', dist: 56, label: 'MOVE 56' }
            : { kind: 'turn', dir: a === 'left' ? -1 : 1, label: a === 'left' ? 'TURN −90°' : 'TURN +90°' };
          // short delay = "speech → parse" before the job lands in the queue
          setTimeout(() => { queue.push(job); ctx.start(); }, 260);
        },
      };
    },
  },

  // ─ iot: devices stream readings to a server
  iot: {
    ground: `
      <path class="s a link" d="M66,48 C140,48 150,84 222,92"/>
      <path class="s a link" d="M66,102 H222"/>
      <path class="s a link" d="M66,156 C140,156 150,120 222,112"/>
      <path class="m" d="M66,48 C140,48 150,84 222,92"/>
      <path class="m" d="M66,102 H222"/>
      <path class="m" d="M66,156 C140,156 150,120 222,112"/>
      <text class="t" x="118" y="92">TELEMETRY →</text>
      <text class="t" x="236" y="160">SERVER</text>`,
    body: `
      <g class="dev"><rect class="s" x="22" y="34" width="44" height="28" rx="3"/><path class="s" d="M58,34 v-10"/><circle class="s a" cx="34" cy="48" r="4"/></g>
      <g class="dev"><rect class="s" x="22" y="88" width="44" height="28" rx="3"/><path class="s" d="M58,88 v-10"/><circle class="s a" cx="34" cy="102" r="4"/></g>
      <g class="dev"><rect class="s" x="22" y="142" width="44" height="28" rx="3"/><path class="s" d="M58,142 v-10"/><circle class="s a" cx="34" cy="156" r="4"/></g>
      <g class="srv">
        <rect class="s" x="222" y="68" width="76" height="68" rx="4"/>
        <path class="s" d="M232,86 H288 M232,102 H288 M232,118 H288"/>
        <circle class="led" cx="282" cy="78" r="2.6"/>
      </g>`,
    controls: `
      <button type="button" class="rf-btn primary" data-act="send">Send reading</button>
      <button type="button" class="rf-btn" data-act="stream" aria-pressed="false">Stream: off</button>`,
    setup(ctx) {
      const links = [...ctx.ground.querySelectorAll('.m')].map((p) => ({ p, L: p.getTotalLength() }));
      const devs = [...ctx.body.querySelectorAll('.dev')];
      const led = ctx.q('.led');
      const streamBtn = ctx.card.querySelector('[data-act="stream"]');
      let packets = [];
      let msgs = 0;
      let streaming = false;
      let timer = 0;
      const send = (k = Math.floor(Math.random() * 3)) => {
        const el = document.createElementNS(NS, 'circle');
        el.setAttribute('r', '3.4');
        el.setAttribute('class', 'pk');
        ctx.ground.appendChild(el);
        packets.push({ el, k, d: 0 });
        devs[k].classList.remove('flash');
        void devs[k].getBoundingClientRect();
        devs[k].classList.add('flash');
        ctx.start();
      };
      return {
        step(dt) {
          packets = packets.filter((pk) => {
            const link = links[pk.k];
            pk.d += 150 * dt;
            if (pk.d >= link.L) {
              pk.el.remove();
              msgs++;
              led.classList.remove('on');
              void led.getBoundingClientRect();
              led.classList.add('on');
              const temp = (21 + Math.random() * 6).toFixed(1);
              const hum = Math.round(40 + Math.random() * 20);
              ctx.readout(`MSGS ${msgs} · DEV-${pk.k + 1} ${temp}°C ${hum}%`);
              return false;
            }
            const pt = link.p.getPointAtLength(pk.d);
            pk.el.setAttribute('cx', pt.x.toFixed(2));
            pk.el.setAttribute('cy', pt.y.toFixed(2));
            return true;
          });
          if (streaming) {
            timer += dt;
            if (timer > 0.32) { timer = 0; send(); }
          }
          return streaming || packets.length > 0;
        },
        reset() {
          packets.forEach((pk) => pk.el.remove());
          packets = [];
          ctx.readout('IDLE · send a reading');
        },
        action(a) {
          if (a === 'send') send();
          if (a === 'stream') {
            streaming = !streaming;
            streamBtn.textContent = `Stream: ${streaming ? 'on' : 'off'}`;
            streamBtn.setAttribute('aria-pressed', String(streaming));
            if (streaming) { ctx.readout(`STREAMING · ${msgs} msgs so far`); ctx.start(); }
            else ctx.readout(`STOPPED · ${msgs} msgs received`);
          }
        },
      };
    },
  },
};

// ── shared animation loop (only runs while something is active) ──
const active = new Set();
let last = 0;
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  active.forEach((c) => {
    if (!c.visible) return;
    if (c.sim.step(dt) === false) c.stop();
  });
  if (active.size) requestAnimationFrame(loop);
}

// ── render ─────────────────────────────────────────────────────
const root = document.getElementById('origin-app');
if (root) render();

function render() {
  root.innerHTML = `
    <ol class="origin-path reveal" aria-label="Career path">
      ${ORIGIN_PATH.map((p, i) => `
        <li class="${i === ORIGIN_PATH.length - 1 ? 'now' : ''}">
          <span class="op-year">${esc(p.year)}</span>
          <b>${esc(p.label)}</b>
          <small>${esc(p.sub)}</small>
        </li>`).join('')}
    </ol>
    <div class="origin-grid">
      ${ORIGIN.map((r, i) => {
        const sc = SCENES[r.id];
        return `
        <article class="robot-card panel frame reveal" data-robot="${esc(r.id)}" style="--d:${(i % 2) * 90}ms">
          <figure class="robot-fig">
            <div class="rf-stage">
              <div class="rf-plane">
                <svg class="rf-ground" viewBox="0 0 320 200" role="img" aria-label="Technical drawing: ${esc(r.name)}">${sc?.ground ?? ''}</svg>
                <svg class="rf-body" viewBox="0 0 320 200" aria-hidden="true">${sc?.body ?? ''}</svg>
              </div>
            </div>
            <figcaption>FIG. ${String(i + 1).padStart(2, '0')} · <span class="rf-view">TOP VIEW</span></figcaption>
          </figure>
          ${sc ? `
          <div class="rf-controls">
            ${sc.controls}
            <button type="button" class="rf-btn ghost" data-act="view" aria-pressed="false">3D</button>
            <span class="rf-readout" aria-live="off"></span>
          </div>` : ''}
          <div class="robot-body">
            <p class="robot-badge">${esc(r.badge)}</p>
            <h3>${esc(r.name)}</h3>
            <p class="robot-what">${esc(r.what)}</p>
            <div class="robot-map">
              <span class="rm-from">${esc(r.from)}</span>
              <span class="rm-arrow" aria-hidden="true">→</span>
              <span class="rm-to">${esc(r.to)}</span>
            </div>
            <div class="tags">${r.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          </div>
        </article>`;
      }).join('')}
    </div>`;

  // normalise every stroke to length 1 so the "plotting" draw-in works on any shape
  root.querySelectorAll('.robot-fig .s').forEach((el, i) => {
    el.setAttribute('pathLength', '1');
    el.style.setProperty('--i', i % 14);
  });

  root.querySelectorAll('.robot-card').forEach(initCard);

  // reveal + pause simulations that scroll out of view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
      const c = e.target._ctrl;
      if (c) c.visible = e.isIntersecting;
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  root.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function initCard(card) {
  const scene = SCENES[card.dataset.robot];
  if (!scene) return;
  const ground = card.querySelector('.rf-ground');
  const body = card.querySelector('.rf-body');
  const plane = card.querySelector('.rf-plane');
  const stage = card.querySelector('.rf-stage');
  const readoutEl = card.querySelector('.rf-readout');
  const viewBtn = card.querySelector('[data-act="view"]');
  const runBtn = card.querySelector('[data-act="run"]');
  const viewLabel = card.querySelector('.rf-view');

  let lastText = '';
  let lastAt = 0;
  const ctrl = {
    visible: false,
    running: false,
    start() {
      if (ctrl.running) return;
      ctrl.running = true;
      set3d(true);
      if (runBtn) runBtn.textContent = runBtn.textContent.replace('▶', '❚❚');
      if (!active.size) { last = performance.now(); requestAnimationFrame(loop); }
      active.add(ctrl);
    },
    stop() {
      if (!ctrl.running) return;
      ctrl.running = false;
      active.delete(ctrl);
      if (runBtn) runBtn.textContent = runBtn.textContent.replace('❚❚', '▶');
    },
    toggle() { if (ctrl.running) ctrl.stop(); else ctrl.start(); },
  };
  card._ctrl = ctrl;

  const ctx = {
    card,
    ground,
    body,
    q: (sel) => body.querySelector(sel) || ground.querySelector(sel),
    readout(text) {
      const now = performance.now();
      if (text === lastText || (now - lastAt < 90 && !/^(WIN|IDLE|STOP|WALL|STREAM)/.test(text))) return;
      lastText = text;
      lastAt = now;
      readoutEl.textContent = text;
    },
    start: ctrl.start,
    stop: ctrl.stop,
    toggle: ctrl.toggle,
  };
  ctrl.sim = scene.setup(ctx);
  ctrl.sim.reset();

  // ── 2D ⇄ 3D view, pointer orbit while in 3D ──
  function set3d(on) {
    card.classList.toggle('is3d', on);
    viewBtn.setAttribute('aria-pressed', String(on));
    viewBtn.textContent = on ? '2D' : '3D';
    viewLabel.textContent = on ? 'ISOMETRIC' : 'TOP VIEW';
    if (!on) { plane.style.removeProperty('--rx'); plane.style.removeProperty('--rz'); }
  }
  stage.addEventListener('pointermove', (e) => {
    if (!card.classList.contains('is3d') || e.pointerType === 'touch') return;
    track('robot_orbit', { robot: card.dataset.robot }, { once: true });
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    plane.classList.add('orbit');
    plane.style.setProperty('--rx', `${(50 - py * 16).toFixed(1)}deg`);
    plane.style.setProperty('--rz', `${(-16 + px * 26).toFixed(1)}deg`);
  });
  stage.addEventListener('pointerleave', () => {
    plane.classList.remove('orbit');
    plane.style.removeProperty('--rx');
    plane.style.removeProperty('--rz');
  });

  card.querySelector('.rf-controls').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    const robot = card.dataset.robot;
    track('robot_engaged', { robot }, { once: true });
    track('robot_action', { robot, action: act });
    if (act === 'view') { set3d(!card.classList.contains('is3d')); return; }
    ctrl.sim.action(act);
  });
}
