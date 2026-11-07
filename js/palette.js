// ─────────────────────────────────────────────────────────────
//  Command palette — ⌘K / Ctrl+K anywhere, or the nav button.
// ─────────────────────────────────────────────────────────────
import { PROFILE } from './data.js';

const root = document.getElementById('palette');
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
const openUrl = (url) => window.open(url, '_blank', 'noopener');

const COMMANDS = [
  { group: 'Do', label: 'Quick view — 30-second summary', hint: 'recruiters', run: () => emit('quick:open') },
  { group: 'Do', label: 'Print / save summary as PDF', hint: 'résumé', run: () => emit('quick:print') },
  { group: 'Do', label: 'Copy email address', hint: PROFILE.email, run: copyEmail },
  { group: 'Do', label: 'Email Kaleab', hint: 'mailto', run: () => { location.href = `mailto:${PROFILE.email}`; } },
  { group: 'Do', label: 'Open LinkedIn', hint: 'in/' + PROFILE.linkedinHandle, run: () => openUrl(PROFILE.linkedin) },
  { group: 'Do', label: 'Open GitHub', hint: PROFILE.githubHandle, run: () => openUrl(PROFILE.github) },
  { group: 'Do', label: 'Start the incident drill', hint: 'on-call', run: () => go('incident') },
  { group: 'Do', label: 'Broadcast to all services', hint: '3D', run: () => { go('hero'); setTimeout(() => emit('scene:broadcast'), 500); } },
  { group: 'Do', label: 'Open the terminal', hint: 'shell', run: () => { go('terminal'); setTimeout(() => document.getElementById('term-input')?.focus({ preventScroll: true }), 600); } },
  ...[
    ['hero', 'Home'], ['about', 'About'], ['origin', 'Origin — robotics & IoT'], ['flow', 'Follow a request'], ['experience', 'Experience'],
    ['projects', 'Projects & writing'], ['incident', 'Fix the incident'], ['skills', 'Tech stack'],
    ['terminal', 'Terminal'], ['contact', 'Contact'],
  ].map(([id, label]) => ({ group: 'Go to', label, hint: `#${id}`, run: () => go(id) })),
];

if (root) init();

function init() {
  root.innerHTML = `
    <div class="pal-backdrop" data-close></div>
    <div class="pal-box" role="dialog" aria-modal="true" aria-label="Command palette">
      <div class="pal-input">
        <span aria-hidden="true">›</span>
        <input id="pal-q" type="text" placeholder="Type a command or section…" autocomplete="off" spellcheck="false"
          role="combobox" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list">
        <kbd>esc</kbd>
      </div>
      <ul id="pal-list" class="pal-list" role="listbox"></ul>
      <p class="pal-foot"><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> run · <kbd>esc</kbd> close</p>
    </div>`;

  const input = root.querySelector('#pal-q');
  const list = root.querySelector('#pal-list');
  let items = [];
  let sel = 0;
  let lastFocus = null;

  const score = (q, text) => {
    // subsequence match: every typed char appears in order
    q = q.toLowerCase(); text = text.toLowerCase();
    if (!q) return 1;
    if (text.includes(q)) return 3;
    let i = 0;
    for (const ch of text) if (ch === q[i]) i++;
    return i === q.length ? 1 : 0;
  };

  const draw = () => {
    const q = input.value.trim();
    items = COMMANDS
      .map((c) => ({ c, s: score(q, `${c.label} ${c.hint} ${c.group}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c);
    sel = Math.min(sel, Math.max(0, items.length - 1));
    let group = '';
    list.innerHTML = items.length
      ? items.map((c, i) => {
        const head = c.group !== group ? `<li class="pal-group" role="presentation">${esc((group = c.group))}</li>` : '';
        return `${head}<li role="option" id="pal-${i}" data-i="${i}" class="pal-item${i === sel ? ' sel' : ''}" aria-selected="${i === sel}">
          <span>${esc(c.label)}</span><small>${esc(c.hint)}</small></li>`;
      }).join('')
      : '<li class="pal-empty">No matches — try “linkedin”, “pdf” or “incident”.</li>';
    input.setAttribute('aria-activedescendant', items.length ? `pal-${sel}` : '');
    list.querySelector('.sel')?.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    if (!root.hidden) return;
    lastFocus = document.activeElement;
    root.hidden = false;
    input.value = '';
    sel = 0;
    draw();
    input.focus();
  };
  const close = () => {
    if (root.hidden) return;
    root.hidden = true;
    lastFocus?.focus?.({ preventScroll: true });
  };
  const run = (i) => {
    const c = items[i];
    if (!c) return;
    close();
    c.run();
  };

  input.addEventListener('input', () => { sel = 0; draw(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, items.length); draw(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + items.length) % Math.max(1, items.length); draw(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });
  list.addEventListener('mousemove', (e) => {
    const li = e.target.closest('.pal-item');
    if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; draw(); }
  });
  list.addEventListener('click', (e) => {
    const li = e.target.closest('.pal-item');
    if (li) run(+li.dataset.i);
  });
  root.querySelector('[data-close]').addEventListener('click', close);

  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (root.hidden) open(); else close();
    }
  });
  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('palette:open', open);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    emit('ui:toast', `copied → ${PROFILE.email}`);
  } catch {
    emit('ui:toast', PROFILE.email);
  }
}
