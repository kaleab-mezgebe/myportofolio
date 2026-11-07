// ─────────────────────────────────────────────────────────────
//  UI layer — content rendering, terminal, micro-interactions.
//  Kaleab Mezgebe — Frontend & Mobile Software Engineer
// ─────────────────────────────────────────────────────────────
import { PROFILE, EXPERIENCE, TEAM_COUNT, PROJECTS, SKILLS, SKILL_CATEGORIES, EDUCATION, ACHIEVEMENTS, FLOW, SOFOF_PROJECTS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
const SECTION_IDS = ['hero', 'about', 'origin', 'flow', 'experience', 'projects', 'incident', 'skills', 'terminal', 'contact'];

renderStatic();
renderFlow();
renderExperience();
renderProjects();
initProjectFilters();
renderSofof();
renderSkills();
boot();
typeRoles();
navigation();
reveals();
counters();
tilt();
cursor();
hud();
contact();
terminal();
checkResume();
loadScene();

// ═══════════════════════════════════════════════════════════
//  Boot sequence
// ═══════════════════════════════════════════════════════════
function boot() {
  const el = $('#boot');
  if (!el) return;
  const log = $('#boot-log');
  const bar = $('.boot-bar span', el);
  let seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch { /* storage blocked */ }

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    el.classList.add('done');
    try { sessionStorage.setItem('booted', '1'); } catch { /* ignore */ }
    setTimeout(() => el.remove(), 700);
  };
  if (seen || reduceMotion) return done();

  const lines = [
    '<span class="hi">kaleab-os</span> v5.0.0 — booting portfolio kernel',
    '',
    `<span class="ok">[  OK  ]</span> Mounting /dev/experience ............ ${TEAM_COUNT} nodes`,
    '<span class="ok">[  OK  ]</span> Initializing Flutter engine ........ 60 FPS ready',
    '<span class="ok">[  OK  ]</span> Connecting SignalR real-time hub ... :443 connected',
    '<span class="ok">[  OK  ]</span> Loading BLoC state machines ........ synchronized',
    '<span class="ok">[  OK  ]</span> Connecting PostgreSQL & Hive ........ OK',
    '<span class="ok">[  OK  ]</span> Starting Telebirr & Chapa gateway .. webhook active',
    '<span class="ok">[  OK  ]</span> Initializing WebGL renderer ........ three.js r160',
    '',
    '&gt;&gt; access granted. welcome.',
  ];
  let i = 0;
  const step = () => {
    if (finished) return;
    if (i >= lines.length) return setTimeout(done, 220);
    log.innerHTML += lines[i] + '\n';
    i++;
    bar.style.width = `${(i / lines.length) * 100}%`;
    setTimeout(step, lines[i - 1] ? 55 + Math.random() * 50 : 25);
  };
  step();
  el.addEventListener('click', done);
  addEventListener('keydown', done, { once: true });
}

// ═══════════════════════════════════════════════════════════
//  3D scene — loaded on demand once the page has painted
// ═══════════════════════════════════════════════════════════
function loadScene() {
  const html = document.documentElement;
  if (navigator.connection?.saveData) { html.classList.add('no-webgl'); return; }
  const go = () => import('./scene.js').catch((err) => {
    console.warn('[scene] failed to load 3D — using static background.', err);
    html.classList.add('no-webgl');
  });
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
  const start = () => idle(go, { timeout: 1200 });
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}

// ═══════════════════════════════════════════════════════════
//  Follow-the-request story (the 3D packet is driven by scene.js)
// ═══════════════════════════════════════════════════════════
function renderFlow() {
  const list = $('#flow-steps');
  if (!list) return;
  const pad = (n) => String(n).padStart(2, '0');
  list.innerHTML = FLOW.map((f, i) => `
    <li class="flow-step" data-i="${i}" style="--c:${f.color}">
      <article class="step-card panel">
        <p class="step-hop"><span>HOP ${pad(i + 1)}</span> · ${esc(f.stage)}</p>
        <h3>${esc(f.title)}</h3>
        <p class="step-tech">${esc(f.tech)}</p>
        <p class="step-story">${esc(f.story)}</p>
        <div class="step-foot">
          <span class="step-metric">${esc(f.metric)}</span>
          <span class="step-where">@ ${esc(f.where)}</span>
        </div>
      </article>
    </li>`).join('');

  const dots = $('#flow-dots');
  dots.innerHTML = ['client', ...FLOW.map((f) => f.stage)]
    .map((name, i) => `<i style="--c:${i ? FLOW[i - 1].color : '#ffffff'}" title="${esc(name)}"></i>`).join('');

  const steps = $$('.flow-step', list);
  const dotEls = $$('i', dots);
  const hopEl = $('#flow-hop');
  const nameEl = $('#flow-name');
  let last = -2;
  const update = () => {
    const mid = innerHeight / 2;
    let active = -1;
    let best = innerHeight * 0.42;
    steps.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < best) { best = d; active = i; }
    });
    const lastRect = steps[steps.length - 1].getBoundingClientRect();
    if (active === -1 && lastRect.bottom < mid) active = steps.length - 1;
    if (active === last) return;
    last = active;

    steps.forEach((el, i) => el.classList.toggle('active', i === active));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === active + 1));
    if (active >= 0) {
      hopEl.textContent = `HOP ${pad(active + 1)} / ${pad(FLOW.length)}`;
      nameEl.textContent = FLOW[active].stage;
      dotEls[active + 1]?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    } else {
      hopEl.textContent = `HOP 00 / ${pad(FLOW.length)}`;
      nameEl.textContent = 'CLIENT';
    }
  };
  addEventListener('scroll', update, { passive: true });
  update();
}

function renderStatic() {
  $('#edu-degree').textContent = EDUCATION.degree;
  $('#edu-school').textContent = `${EDUCATION.school} · ${EDUCATION.period} · CGPA ${EDUCATION.gpa}`;
  $('#achievements').innerHTML = ACHIEVEMENTS.map((a) => `
    <li><b>${esc(a.title)}</b> — ${esc(a.org)}<span>${esc(a.date)}</span></li>`).join('');
  $('#year').textContent = new Date().getFullYear();
  const dim = $('#bp-dim-label');
  if (dim) dim.textContent = `5+ YRS · 9+ PRODUCTION APPS · MIT HONORS (3.88 GPA)`;
  $('#exp-sub').textContent = `Production mobile and web engineering — newest first.`;
}

function shortHash(s) {
  let h = 2166136261;
  for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function highlight(text) {
  return esc(text).replace(/(\d+(?:\.\d+)?%|\d+M\+|sub-second|60 FPS|sub-15ms)/g, '<b class="metric">$1</b>');
}

function renderExperience() {
  const VISIBLE = matchMedia('(max-width: 900px)').matches ? 2 : 4;
  $('#timeline').innerHTML = EXPERIENCE.map((job, i) => {
    const points = job.points ?? [];
    const stack = job.stack ?? [];
    const extra = Math.max(0, points.length - VISIBLE);
    const meta = [job.location, job.mode, job.type].filter(Boolean).map(esc).join(' · ');
    const heading = `${esc(job.role)} <span class="at">@</span> <span class="co">${esc(job.company)}</span>`;
    return `
    <article class="commit reveal" style="--d:${Math.min(i, 3) * 70}ms">
      <span class="commit-dot"></span>
      <div class="commit-card panel frame">
        <div class="commit-meta">
          <span class="hash">commit ${shortHash(job.company + job.period)}</span>
          ${i === 0 ? '<span class="head">(HEAD → main)</span>' : ''}
          ${job.current ? '<span class="now">● current</span>' : ''}
          <span class="date">${esc(job.period)}</span>
        </div>
        <h3>${heading}</h3>
        <p class="loc">${meta}</p>
        ${job.products?.length ? `<p class="shipped"><span>Shipped</span>${job.products.map((pr) => `<span class="prod-badge">${esc(pr)}</span>`).join('')}</p>` : ''}
        ${points.length ? `<ul class="points">
          ${points.map((p, k) => `<li${k >= VISIBLE ? ' class="extra"' : ''}>${highlight(p)}</li>`).join('')}
        </ul>` : ''}
        ${stack.length || extra > 0 ? `<div class="commit-foot">
          <div class="tags">${stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          ${extra > 0 ? `<button class="more-btn" type="button" aria-expanded="false" data-more="${extra}">+ ${extra} more line${extra > 1 ? 's' : ''}</button>` : ''}
        </div>` : ''}
      </div>
    </article>`;
  }).join('');

  $$('.more-btn').forEach((btn) => btn.addEventListener('click', () => {
    const card = btn.closest('.commit');
    const open = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '− collapse' : `+ ${btn.dataset.more} more line${btn.dataset.more > 1 ? 's' : ''}`;
  }));
}

function renderProjects(category = 'all') {
  const grid = $('#project-grid');
  if (!grid) return;
  const filtered = category === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === category);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="reveal in" style="--d:${i * 70}ms">
      <article class="project panel frame tilt">
        <div class="win-bar"><i></i><i></i><i></i><span>~/projects/${esc(p.slug)}</span></div>
        ${p.image ? `<div class="project-img-wrap"><img src="${esc(p.image)}" alt="${esc(p.name)}" class="project-img" loading="lazy"></div>` : ''}
        <div class="project-body">
          <p class="kicker">${esc(p.kicker)}</p>
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.description)}</p>
          <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          <div class="tags">${p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="project-foot">
            <span class="status">${esc(p.badge || 'live in production')}</span>
            <div class="project-links">
              ${p.github ? `<a class="btn small ghost" href="${esc(p.github)}" target="_blank" rel="noopener">code ↗</a>` : ''}
              ${p.driverUrl ? `<a class="btn small ghost" href="${esc(p.driverUrl)}" target="_blank" rel="noopener">driver app ↗</a>` : ''}
              ${p.url ? `<a class="btn small" href="${esc(p.url)}" target="_blank" rel="noopener">${p.url.includes('play.google') ? 'play store ↗' : p.url.includes('linkedin') ? 'demo ↗' : 'visit site ↗'}</a>` : ''}
            </div>
          </div>
        </div>
        <div class="glare"></div>
      </article>
    </div>`).join('');
  tilt();
}

function initProjectFilters() {
  const container = $('#project-filters');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    $$('.filter-btn', container).forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
}

function renderSofof() {
  const el = $('#sofof');
  if (!el || !SOFOF_PROJECTS.length) return;
  el.innerHTML = `
    <p class="sec-tag sofof-tag">// production enterprise deployments</p>
    <div class="sofof-grid">
      ${SOFOF_PROJECTS.map((p, i) => `
        <article class="sofof-card panel reveal" style="--d:${i * 70}ms">
          <p class="kicker">${esc(p.kicker)}</p>
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.description)}</p>
          <a class="sofof-link" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Visit ${esc(p.name)}">${esc(p.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))} ↗</a>
        </article>`).join('')}
    </div>`;
}

function renderSkills() {
  const groups = Object.entries(SKILL_CATEGORIES).map(([key, cat]) => {
    const items = SKILLS.filter((s) => s.cat === key);
    return `
      <div class="skill-group reveal" style="--c:${cat.color}">
        <h3>${esc(cat.label)}</h3>
        <div class="chips">
          ${items.map((s) => `<button type="button" class="chip" data-skill="${esc(s.label)}">${s.node ? '<i>◆</i>' : ''}${esc(s.label)}</button>`).join('')}
        </div>
      </div>`;
  });
  $('#skill-groups').innerHTML = groups.join('');

  const readout = $('#skill-readout');
  const idle = readout.innerHTML;
  const byLabel = new Map(SKILLS.map((s) => [s.label, s]));
  const show = (s) => {
    const cat = SKILL_CATEGORIES[s.cat];
    readout.style.setProperty('--c', cat.color);
    readout.innerHTML = `<span class="prompt">&gt;</span> <b>${esc(s.label)}</b> <span class="dim">:: ${esc(cat.label)}</span><br>${esc(s.info)}`;
  };

  $$('.chip').forEach((chip) => {
    const s = byLabel.get(chip.dataset.skill);
    const enter = () => { show(s); emit('skill:focus', { label: s.label }); };
    const leave = () => { readout.innerHTML = idle; emit('skill:focus', { label: null }); };
    chip.addEventListener('mouseenter', enter);
    chip.addEventListener('focus', enter);
    chip.addEventListener('mouseleave', leave);
    chip.addEventListener('blur', leave);
    chip.addEventListener('click', () => { show(s); emit('skill:burst', { label: s.label }); ping(chip); });
  });

  const bBtn = $('#broadcast-btn');
  if (bBtn) {
    bBtn.addEventListener('click', () => {
      emit('scene:broadcast');
      ping(bBtn);
      readout.innerHTML = `<span class="prompt">&gt;</span> <b>broadcast()</b><br>Sending telemetry ping to all 3D service nodes.`;
    });
  }
}

function ping(el) {
  el.classList.add('ping');
  setTimeout(() => el.classList.remove('ping'), 350);
}

// ═══════════════════════════════════════════════════════════
//  Typewriter role in hero
// ═══════════════════════════════════════════════════════════
function typeRoles() {
  const el = $('#typed');
  if (!el || reduceMotion) return;
  const roles = PROFILE.roles;
  let r = 0;
  let ch = 0;
  let del = false;

  const tick = () => {
    const target = roles[r];
    if (del) {
      ch--;
      el.textContent = target.slice(0, ch);
      if (ch === 0) { del = false; r = (r + 1) % roles.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 35);
    } else {
      ch++;
      el.textContent = target.slice(0, ch);
      if (ch === target.length) { del = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 70);
    }
  };
  tick();
}

// ═══════════════════════════════════════════════════════════
//  Nav & scroll handling
// ═══════════════════════════════════════════════════════════
function navigation() {
  const links = $$('#nav-links a');
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const toggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const onScroll = () => {
    const scrollPos = window.scrollY + 180;
    let current = 'hero';
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    links.forEach((l) => l.classList.toggle('active', l.dataset.nav === current));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ═══════════════════════════════════════════════════════════
//  Reveal on scroll
// ═══════════════════════════════════════════════════════════
function reveals() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  $$('.reveal').forEach((el) => obs.observe(el));
}

// ═══════════════════════════════════════════════════════════
//  Stats counters animation
// ═══════════════════════════════════════════════════════════
function counters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const isDecimal = String(target).includes('.');
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const current = progress * target;
          el.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  $$('[data-count]').forEach((el) => obs.observe(el));
}

// ═══════════════════════════════════════════════════════════
//  Card 3D tilt & glare
// ═══════════════════════════════════════════════════════════
function tilt() {
  if (!finePointer || reduceMotion) return;
  $$('.tilt').forEach((card) => {
    const glare = card.querySelector('.glare');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(207,224,247,0.12), transparent 70%)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (glare) glare.style.opacity = '0';
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  Custom trailing cursor
// ═══════════════════════════════════════════════════════════
function cursor() {
  if (!finePointer || reduceMotion) return;
  const c = $('.cursor');
  if (!c) return;
  let mx = innerWidth / 2, my = innerHeight / 2;
  let cx = mx, cy = my;

  addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  const render = () => {
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  const hoverTargets = 'a, button, input, [role="button"], .chip';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) c.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) c.classList.remove('hover');
  });
}

// ═══════════════════════════════════════════════════════════
//  HUD telemetry overlays
// ═══════════════════════════════════════════════════════════
function hud() {
  const fpsEl = $('#hud-fps');
  const xyEl = $('#hud-xy');
  const scrollEl = $('#hud-scroll');
  const sectorEl = $('#hud-sector');
  const progressBar = $('#progress-bar');

  // FPS calculation
  let frames = 0, lastTime = performance.now();
  const fpsLoop = () => {
    frames++;
    const now = performance.now();
    if (now >= lastTime + 1000) {
      if (fpsEl) fpsEl.textContent = String(Math.round((frames * 1000) / (now - lastTime)));
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(fpsLoop);
  };
  requestAnimationFrame(fpsLoop);

  // Mouse XY
  if (finePointer) {
    addEventListener('mousemove', (e) => {
      if (!xyEl) return;
      const x = ((e.clientX / innerWidth) * 2 - 1).toFixed(3);
      const y = (-(e.clientY / innerHeight) * 2 + 1).toFixed(3);
      xyEl.textContent = `X ${x} · Y ${y}`;
    }, { passive: true });
  }

  // Scroll tracking & Sector
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
    if (scrollEl) scrollEl.textContent = `${String(pct).padStart(3, '0')}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;

    const mid = window.scrollY + innerHeight * 0.35;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid) {
        if (sectorEl) sectorEl.textContent = `SECTOR ${String(i).padStart(2, '0')} · ${s.id.toUpperCase()}`;
        break;
      }
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ═══════════════════════════════════════════════════════════
//  Contact & copy email toast
// ═══════════════════════════════════════════════════════════
function contact() {
  const btn = $('#copy-email');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard?.writeText(PROFILE.email).then(() => {
      toast('Copied email to clipboard: ' + PROFILE.email);
    }).catch(() => {
      toast('Email: ' + PROFILE.email);
    });
  });
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

function checkResume() {
  $('#cv-link')?.addEventListener('click', () => {
    // Open resume or trigger PDF print
    const link = document.createElement('a');
    link.href = PROFILE.resume;
    link.download = "Kaleab_Mezgebe_CV.pdf";
    link.target = '_blank';
    link.click();
  });
}

// ═══════════════════════════════════════════════════════════
//  Interactive terminal
// ═══════════════════════════════════════════════════════════
function terminal() {
  const out = $('#term-out');
  const input = $('#term-input');
  const form = $('#term-form');
  if (!out || !input || !form) return;
  const history = [];
  let hIdx = 0;

  const print = (html = '', cls = '') => {
    const d = document.createElement('div');
    d.className = `ln ${cls}`;
    d.innerHTML = html;
    out.appendChild(d);
  };
  const printLines = (lines) => lines.forEach((l) => (Array.isArray(l) ? print(l[0], l[1]) : print(l)));
  const link = (href, text = href) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  const pad = (s, n) => s + ' '.repeat(Math.max(1, n - s.length));

  const FILES = {
    'about.txt': () => [PROFILE.summary],
    'experience.log': () => cmds.experience(),
    'skills.json': () => {
      const obj = {};
      Object.entries(SKILL_CATEGORIES).forEach(([k, c]) => { obj[c.label] = SKILLS.filter((s) => s.cat === k).map((s) => s.label); });
      return [`<span class="a">${esc(JSON.stringify(obj, null, 2))}</span>`];
    },
    'contact.md': () => cmds.contact(),
    'resume.pdf': () => [['Resume file: <span class="c">assets/Kaleab_Mezgebe_CV.pdf</span> — try <span class="c">open cv</span>', 'dim']],
  };

  const cmds = {
    help: () => [
      ['available commands:', 'dim'],
      ...[
        ['whoami', 'who is this engineer'],
        ['about', 'short background summary'],
        ['experience', 'career timeline'],
        ['projects', 'verified production apps'],
        ['skills', 'tech stack by category'],
        ['education', 'academic honors & degree'],
        ['achievements', 'awards & distinctions'],
        ['contact', 'ways to get in touch'],
        ['neofetch', 'system info'],
        ['ls / cat <file>', 'browse files'],
        ['open <target>', 'github | linkedin | email | cv | axumite | shemeta'],
        ['goto <section>', 'scroll to a section'],
        ['history / clear', 'terminal utilities'],
        ['sudo hire-kaleab', 'send direct hiring proposal'],
      ].map(([c, d]) => `  <span class="c">${esc(pad(c, 18))}</span><span class="dim">${esc(d)}</span>`),
      ['tip: ↑/↓ for history, tab to autocomplete', 'dim'],
    ],
    whoami: () => [
      `<span class="ok">${esc(PROFILE.name)}</span>`,
      `${esc(PROFILE.title)} @ ${esc(PROFILE.company)} · ${esc(PROFILE.location)}`,
      ['mobile · flutter · react · typescript · real-time signalr · fintech', 'dim'],
    ],
    about: () => [PROFILE.summary],
    experience: () => EXPERIENCE.map((j) =>
      `<span class="a">${esc(pad(j.period, 22))}</span><span class="ok">${esc(j.role)}</span> <span class="m">@</span> <span class="c">${esc(j.company)}</span>`),
    projects: () => PROJECTS.flatMap((p) => [
      `<span class="c">▸ ${esc(p.name)}</span> <span class="dim">— ${esc(p.kicker)}</span>`,
      `  ${esc(p.description)}`,
      `  <span class="dim">stack:</span> ${esc(p.stack.join(', '))}`,
      `  ${link(p.url)}`,
      '',
    ]),
    skills: () => Object.entries(SKILL_CATEGORIES).map(([k, c]) =>
      `<span style="color:${c.color}">${esc(pad(c.label, 20))}</span>${esc(SKILLS.filter((s) => s.cat === k).map((s) => s.label).join(' · '))}`),
    education: () => [
      `<span class="ok">${esc(EDUCATION.degree)}</span>`,
      `${esc(EDUCATION.school)}`,
      [`${EDUCATION.period} · ${EDUCATION.location}`, 'dim'],
      [`GPA: ${EDUCATION.gpa} · Exit Exam: ${EDUCATION.exitExam}`, 'dim'],
    ],
    achievements: () => ACHIEVEMENTS.map((a) => `<span class="a">★</span> ${esc(a.title)} <span class="dim">— ${esc(a.org)}, ${esc(a.date)}</span>`),
    contact: () => [
      `<span class="dim">email   </span> <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>`,
      `<span class="dim">phone   </span> ${esc(PROFILE.phone)}`,
      `<span class="dim">github  </span> ${link(PROFILE.github, `@${PROFILE.githubHandle}`)}`,
      `<span class="dim">linkedin</span> ${link(PROFILE.linkedin, `in/${PROFILE.linkedinHandle}`)}`,
    ],
    neofetch: () => {
      const art = [
        '   ┌──────────────┐ ',
        '   │ &gt;_           │ ',
        '   │   kaleab-os  │ ',
        '   │              │ ',
        '   └──────┬───────┘ ',
        '      ────┴────     ',
        '                    ',
        '                    ',
      ];
      const info = [
        `<span class="ok">kaleab</span>@<span class="ok">portfolio</span>`,
        '<span class="dim">─────────────────</span>',
        `<span class="c">OS</span>       ${esc(PROFILE.title)}`,
        `<span class="c">Uptime</span>   5+ years production`,
        `<span class="c">Host</span>     ${esc(PROFILE.location)}`,
        `<span class="c">Shell</span>    Dart / TypeScript / Python`,
        `<span class="c">Stack</span>    Flutter · React · SignalR · BLoC · FastAPI`,
        `<span class="c">Honors</span>   MIT CGPA 3.88 · Exit Exam 86 (Top Tier)`,
      ];
      return [
        ...art.map((a, i) => `<span class="m">${a}</span>${info[i] ?? ''}`),
        '<span style="color:#00f0ff">███</span><span style="color:#39ff88">███</span><span style="color:#ffb800">███</span><span style="color:#ff2bd6">███</span><span style="color:#9d8cff">███</span>',
      ];
    },
    ls: () => [Object.keys(FILES).map((f) => (f.endsWith('.pdf') ? `<span class="m">${f}</span>` : `<span class="c">${f}</span>`)).join('   ')],
    cat: (arg) => {
      if (!arg) return [['usage: cat &lt;file&gt; — try ls', 'err']];
      const f = FILES[arg];
      return f ? f() : [[`cat: ${esc(arg)}: no such file`, 'err']];
    },
    open: (arg = '') => {
      const a = arg.toLowerCase();
      const key = a.replace(/[^a-z0-9]/g, '');
      const project = key ? PROJECTS.find((p) => p.slug.replace(/-/g, '').includes(key)) : null;
      const targets = {
        github: PROFILE.github,
        linkedin: PROFILE.linkedin,
        email: `mailto:${PROFILE.email}`,
        mail: `mailto:${PROFILE.email}`,
        cv: PROFILE.resume,
        resume: PROFILE.resume,
      };
      const url = targets[a] ?? project?.url;
      if (!url) return [['usage: open github | linkedin | email | cv | axumite | shemeta | ai', 'err']];
      window.open(url, url.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
      return [[`opening ${url} …`, 'ok']];
    },
    goto: (arg = '') => {
      const id = SECTION_IDS.find((s) => s.startsWith(arg.toLowerCase())) ?? (arg === 'stack' ? 'skills' : null);
      if (!id || !arg) return [[`usage: goto ${SECTION_IDS.join(' | ')}`, 'err']];
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      return [[`→ ${id}`, 'ok']];
    },
    history: () => history.map((h, i) => `<span class="dim">${String(i + 1).padStart(4)}</span>  ${esc(h)}`),
    date: () => [new Date().toString()],
    echo: (...args) => [esc(args.join(' '))],
    clear: () => { out.innerHTML = ''; return []; },
    sudo: (arg) => {
      if (arg === 'hire-kaleab' || arg === 'hire' || arg === 'hire-faruk') {
        setTimeout(() => { location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Engineering Opportunity for Kaleab Mezgebe")}`; }, 1600);
        return [
          ['[sudo] password for recruiter: ********', 'dim'],
          ['verifying offer letter …', 'dim'],
          ['✔ access granted. opening mail client to kaleabmezgebe4@gmail.com …', 'ok'],
        ];
      }
      return [['nice try. this incident will be reported. 👀', 'err']];
    },
    exit: () => [['there is no escape. try "contact" instead.', 'dim']],
  };
  cmds.stack = cmds.skills;
  cmds.work = cmds.experience;
  cmds.cls = cmds.clear;

  const run = (raw) => {
    const line = raw.trim();
    print(`<span class="p">kaleab@portfolio</span>:<span class="p2">~</span>$ ${esc(line)}`);
    if (line) {
      history.push(line);
      hIdx = history.length;
      const [name, ...args] = line.split(/\s+/);
      const fn = cmds[name.toLowerCase()];
      if (fn) printLines(fn(...args));
      else print(`zsh: command not found: ${esc(name)} — type <span class="c">help</span>`, 'err');
    }
    out.scrollTop = out.scrollHeight;
  };

  printLines([
    ['Last login: ' + new Date().toDateString() + ' on ttys001', 'dim'],
    `Welcome to <span class="c">kaleab-os</span>. Type <span class="c">help</span> to list commands.`,
    '',
  ]);

  form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      hIdx = Math.max(0, hIdx - 1);
      input.value = history[hIdx];
    } else if (e.key === 'ArrowDown' && history.length) {
      e.preventDefault();
      hIdx = Math.min(history.length, hIdx + 1);
      input.value = history[hIdx] ?? '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const [name, arg] = input.value.split(/\s+/);
      if (arg !== undefined && name === 'cat') {
        const f = Object.keys(FILES).find((k) => k.startsWith(arg));
        if (f) input.value = `cat ${f}`;
      } else {
        const match = Object.keys(cmds).filter((c) => c.startsWith(name));
        if (match.length === 1) input.value = match[0] + ' ';
        else if (match.length > 1) print(match.join('   '), 'dim');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      out.innerHTML = '';
    }
  });

  $('#term')?.addEventListener('click', (e) => {
    if (!e.target.closest('a') && !getSelection().toString()) input.focus({ preventScroll: true });
  });
  $$('[data-cmd]').forEach((b) => b.addEventListener('click', () => {
    run(b.dataset.cmd);
    input.focus({ preventScroll: true });
  }));
}
