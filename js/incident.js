// ─────────────────────────────────────────────────────────────
//  "Fix the incident" — a simulated on-call drill.
//  Kaleab Mezgebe — Real-Time Fleet Dispatch & Payment Surge
// ─────────────────────────────────────────────────────────────
import { track } from './analytics.js';

const root = document.getElementById('incident-app');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const SLO = 600;         // ms
const BASE_P95 = 4800;   // ms
const POINTS = 64;

const ACTIONS = [
  {
    id: 'backplane',
    label: 'Enable SignalR Redis backplane',
    cmd: 'builder.Services.AddSignalR().AddStackExchangeRedis(...)',
    good: true,
    log: '[signalr] Redis backplane enabled — connection pooling scales across cluster without dropped sockets',
    note: '<b>Backplane connected.</b> Socket connections are distributed across server nodes, preventing socket exhaustion on the main thread. In production at <b>Axumite Ride</b>, connection pooling maintained <b>sub-15ms live dispatch across thousands of concurrent mobile riders</b>.',
  },
  {
    id: 'delta',
    label: 'Enable client delta caching in BLoC',
    cmd: 'bloc: emit(CoordinateDeltaState)',
    good: true,
    log: '[mobile] BLoC now streams vector delta diffs instead of full coordinate telemetry',
    note: '<b>Delta caching active.</b> Passenger apps receive lightweight differential coordinates rather than full objects, reducing packet payloads by 80% and keeping mobile UI animations locked at 60 FPS.',
  },
  {
    id: 'queue',
    label: 'Queue payment webhooks to async worker',
    cmd: 'queue: telebirr-chapa-webhook',
    good: true,
    log: '[payments] Telebirr & Chapa webhooks acknowledged in 18ms; processing deferred to worker queue',
    note: '<b>Webhooks queued.</b> Financial verification no longer blocks synchronous ride matching. Payment confirmations resolve asynchronously without stalling the driver dispatch pipeline.',
  },
  {
    id: 'scale',
    label: 'Double client GPS polling rate',
    cmd: 'flutter: timer(Duration(milliseconds: 100))',
    good: false,
    log: '[mobile] clients polling at 10 Hz — socket buffer overflows, gateway CPU spikes to 99%',
    note: '<b>Thundering herd!</b> Flooding the server with 10x more requests from every active phone immediately overwhelms gateway buffers and doubles mobile battery drain.',
  },
  {
    id: 'restart',
    label: 'Restart dispatch server pods',
    cmd: 'kubectl rollout restart deployment/dispatch',
    good: false,
    log: '[ops] pods restarted — connections drop, 8,500 mobile apps reconnect simultaneously and choke gateway',
    note: '<b>Stampede effect.</b> Restarting drops all live sockets. Thousands of devices attempt reconnection simultaneously, recreating the bottleneck immediately.',
  },
];

const INTRO_LOG = [
  '[alert] p95 latency 4.8s > SLO 600ms — WebSocket /hub/dispatch/fleet',
  '[signalr] slow broadcast: 8,500 connected drivers generating 17,000 pings/sec',
  '[payments] 4.2% of ride requests timing out on Telebirr/Chapa webhook callback',
  '[hint] three fixes resolve this; the other two only treat symptoms',
];

if (root) init();

function init() {
  root.innerHTML = `
    <div class="inc panel frame">
      <div class="inc-head">
        <div>
          <p class="inc-id">INCIDENT #4021 · simulated drill</p>
          <h3>Fleet dispatch & payment stream latency surge</h3>
        </div>
        <span class="inc-status" id="inc-status">SEV-2 · FIRING</span>
      </div>

      <div class="inc-grid">
        <figure class="inc-chart">
          <figcaption><span>p95 latency · live</span><span class="inc-slo">— SLO 600ms</span></figcaption>
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Live p95 latency chart">
            <defs>
              <linearGradient id="inc-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stop-color="currentColor" stop-opacity="0.35"/>
                <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <g class="inc-gridlines">${[0, 1, 2, 3, 4].map((i) => `<line x1="0" x2="600" y1="${i * 55}" y2="${i * 55}"/>`).join('')}</g>
            <line class="inc-slo-line" x1="0" x2="600" y1="${y(SLO)}" y2="${y(SLO)}"/>
            <path class="inc-area" id="inc-area" fill="url(#inc-fill)"/>
            <path class="inc-line" id="inc-line"/>
          </svg>
        </figure>
        <div class="inc-tiles">
          <div class="inc-tile"><span>p95 latency</span><b id="t-p95">—</b></div>
          <div class="inc-tile"><span>Socket load</span><b id="t-db">—</b></div>
          <div class="inc-tile"><span>Error rate</span><b id="t-err">—</b></div>
          <div class="inc-tile"><span>Infra cost</span><b id="t-cost">1.0×</b></div>
        </div>
      </div>

      <div class="inc-bottom">
        <div class="inc-log" id="inc-log" role="log" aria-live="polite" aria-label="Incident log" tabindex="0"></div>
        <div class="inc-actions">
          <p class="inc-ask">Pick a fix:</p>
          <div class="inc-btns">
            ${ACTIONS.map((a) => `<button type="button" class="btn inc-act" data-act="${a.id}"><b>${a.label}</b><code>${a.cmd}</code></button>`).join('')}
          </div>
          <div class="inc-note" id="inc-note">Production is degraded. Read the log, then choose what to do.</div>
        </div>
      </div>
    </div>`;

  const els = {
    status: root.querySelector('#inc-status'),
    log: root.querySelector('#inc-log'),
    note: root.querySelector('#inc-note'),
    line: root.querySelector('#inc-line'),
    area: root.querySelector('#inc-area'),
    svg: root.querySelector('.inc-chart svg'),
    p95: root.querySelector('#t-p95'),
    db: root.querySelector('#t-db'),
    err: root.querySelector('#t-err'),
    cost: root.querySelector('#t-cost'),
  };

  let state = { backplane: false, delta: false, queue: false, scale: false };
  let series;
  let latency;
  let blip = 0;
  let steps = 0;
  let resolved = false;

  const reset = () => {
    state = { backplane: false, delta: false, queue: false, scale: false };
    latency = BASE_P95;
    series = Array.from({ length: POINTS }, () => BASE_P95 * (0.95 + Math.random() * 0.1));
    blip = 0;
    steps = 0;
    resolved = false;
    els.log.innerHTML = '';
    INTRO_LOG.forEach((l) => log(l, l.startsWith('[alert]') ? 'bad' : ''));
    els.note.innerHTML = 'Production is degraded. Read the log, then choose what to do.';
    els.status.textContent = 'SEV-2 · FIRING';
    els.status.className = 'inc-status';
    root.querySelectorAll('.inc-act').forEach((b) => { b.disabled = false; b.classList.remove('done', 'meh'); });
    root.querySelector('.inc-reset')?.remove();
    render();
  };

  const targets = () => {
    let p95 = BASE_P95;
    if (state.backplane) p95 /= 3.2;
    if (state.delta) p95 *= 0.28;
    if (state.scale) p95 *= 1.3;
    const db = state.delta ? 18 : state.backplane ? 35 : 92;
    const err = state.queue ? 0.05 : 4.2;
    return { p95, db: Math.max(8, db + (state.scale ? 15 : 0)), err };
  };

  function log(text, cls = '') {
    const t = new Date().toTimeString().slice(0, 8);
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = `${t} ${text}`;
    els.log.appendChild(d);
    els.log.scrollTop = els.log.scrollHeight;
  }

  function act(id) {
    if (resolved) return;
    const a = ACTIONS.find((x) => x.id === id);
    const btn = root.querySelector(`[data-act="${id}"]`);
    steps++;
    track('drill_started', {}, { once: true });
    track('drill_action', { fix: id, correct: a.good ? 'yes' : 'no' });
    log(a.log, a.good ? 'good' : 'meh');
    els.note.innerHTML = a.note;
    if (id === 'restart') {
      blip = 6;
      return;
    }
    state[id] = true;
    btn.disabled = true;
    btn.classList.add(a.good ? 'done' : 'meh');
    if (state.backplane && state.delta && state.queue) resolve();
  }

  function resolve() {
    resolved = true;
    track('drill_resolved', { steps, traps: state.scale ? 'used' : 'avoided' });
    setTimeout(() => {
      log(`[alert] resolved — p95 under SLO (sub-500ms), errors < 0.1%`, 'good');
      els.status.textContent = 'RESOLVED';
      els.status.className = 'inc-status ok';
      els.note.innerHTML = `<b>Resolved in ${steps} action${steps > 1 ? 's' : ''}.</b> Backplane → delta caching → async queueing is the core architecture I use at <b>Niyat Consultancy / Axumite Ride</b>: distribute connection state, optimize client payloads, and decouple third-party webhooks from real-time dispatch.`;
      const again = document.createElement('button');
      again.type = 'button';
      again.className = 'btn small inc-reset';
      again.textContent = 'Run the drill again';
      again.addEventListener('click', () => { track('drill_replay'); reset(); });
      els.note.appendChild(again);
      root.querySelectorAll('.inc-act').forEach((b) => { b.disabled = true; });
    }, 900);
  }

  function render() {
    const pts = series.map((v, i) => `${(i / (POINTS - 1)) * 600},${y(v).toFixed(1)}`);
    els.line.setAttribute('d', `M${pts.join('L')}`);
    els.area.setAttribute('d', `M0,220L${pts.join('L')}L600,220Z`);
    const healthy = latency < SLO;
    els.svg.classList.toggle('healthy', healthy);
    const t = targets();
    els.p95.textContent = latency >= 1000 ? `${(latency / 1000).toFixed(1)}s` : `${Math.round(latency)}ms`;
    els.p95.className = healthy ? 'ok' : 'bad';
    els.db.textContent = `${Math.round(t.db)}%`;
    els.db.className = t.db > 70 ? 'bad' : t.db > 35 ? 'warn' : 'ok';
    els.err.textContent = `${t.err.toFixed(1)}%`;
    els.err.className = t.err > 0.5 ? 'bad' : 'ok';
    els.cost.textContent = state.scale ? '1.8×' : '1.0×';
    els.cost.className = state.scale ? 'warn' : '';
  }

  function tick() {
    const t = targets();
    let goal = t.p95;
    if (blip > 0) { goal = t.p95 * 0.35; blip--; }
    const noise = reduceMotion ? 0 : (Math.random() - 0.5) * goal * 0.12;
    latency += (goal - latency) * 0.22 + noise;
    latency = Math.max(80, latency);
    series.push(latency);
    series.shift();
    render();
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('.inc-act');
    if (b && !b.disabled) act(b.dataset.act);
  });

  let timer = null;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) timer = setInterval(tick, 320);
    else if (!entry.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }).observe(root);

  reset();
}

function y(ms) {
  return 220 - Math.min(5000, Math.max(0, ms)) / 5000 * 210;
}

