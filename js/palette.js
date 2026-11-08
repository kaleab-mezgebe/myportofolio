// ─────────────────────────────────────────────────────────────
//  Command palette — ⌘K / Ctrl+K anywhere, or the nav button.
//  Kaleab Mezgebe — Frontend & Mobile Software Engineer
// ─────────────────────────────────────────────────────────────
import { PROFILE } from './data.js';

const root = document.getElementById('palette');
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
const openUrl = (url) => window.open(url, '_blank', 'noopener');

const copyEmail = () => {
  navigator.clipboard?.writeText(PROFILE.email).then(() => {
    const el = document.getElementById('toast');
    if (el) {
      el.textContent = 'Copied email to clipboard: ' + PROFILE.email;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 2200);
    }
  });
};

const COMMANDS = [
  { group: 'Do', label: 'Quick view — 30-second summary', hint: 'recruiters', run: () => emit('quick:open') },
  { group: 'Do', label: 'Print / save summary as PDF', hint: 'résumé', run: () => emit('quick:print') },
  { group: 'Do', label: 'Copy email address', hint: PROFILE.email, run: copyEmail },
  { group: 'Do', label: 'Email Kaleab', hint: 'mailto', run: () => { location.href = `mailto:${PROFILE.email}`; } },
  { group: 'Do', label: 'Open LinkedIn', hint: 'in/' + PROFILE.linkedinHandle, run: () => openUrl(PROFILE.linkedin) },
  { group: 'Do', label: 'Open GitHub', hint: PROFILE.githubHandle, run: () => openUrl(PROFILE.github) },
  { group: 'Do', label: 'Broadcast packets to 3D mesh', hint: '3D', run: () => { go('hero'); setTimeout(() => emit('scene:broadcast'), 500); } },
  { group: 'Do', label: 'Open interactive terminal', hint: 'shell', run: () => { go('terminal'); setTimeout(() => document.getElementById('term-input')?.focus({ preventScroll: true }), 600); } },
  ...[
    ['hero', 'Home'], ['about', 'About'], ['flow', 'Request Architecture'], ['experience', 'Experience'],
    ['projects', 'Projects'], ['skills', 'Tech Stack'],
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
      <div class="pal-list" id="pal-list" role="listbox"></div>
      <div class="pal-foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </div>`;

  const input = root.querySelector('#pal-q');
  const list = root.querySelector('#pal-list');
  let filtered = [...COMMANDS];
  let activeIdx = 0;

  const render = () => {
    if (!filtered.length) {
      list.innerHTML = '<p class="pal-empty">No matching commands.</p>';
      return;
    }
    let currentGroup = '';
    list.innerHTML = filtered.map((c, i) => {
      let head = '';
      if (c.group !== currentGroup) {
        currentGroup = c.group;
        head = `<div class="pal-group" role="presentation">${esc(currentGroup)}</div>`;
      }
      return `${head}
        <button type="button" class="pal-item${i === activeIdx ? ' active' : ''}" role="option" aria-selected="${i === activeIdx}" data-i="${i}">
          <span>${esc(c.label)}</span>
          ${c.hint ? `<span class="pal-hint">${esc(c.hint)}</span>` : ''}
        </button>`;
    }).join('');
    list.querySelector('.pal-item.active')?.scrollIntoView({ block: 'nearest' });
  };

  const execute = (idx) => {
    const c = filtered[idx];
    if (!c) return;
    close();
    c.run();
  };

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    filtered = q
      ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q) || c.group.toLowerCase().includes(q))
      : [...COMMANDS];
    activeIdx = 0;
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = (activeIdx + 1) % (filtered.length || 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = (activeIdx - 1 + (filtered.length || 1)) % (filtered.length || 1);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(activeIdx);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.pal-item');
    if (btn) execute(Number(btn.dataset.i));
  });

  root.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close') || e.target === root) close();
  });

  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      root.hidden ? open() : close();
    }
  });
}

function open() {
  if (!root.hidden) return;
  root.hidden = false;
  document.body.classList.add('pal-open');
  const input = root.querySelector('#pal-q');
  input.value = '';
  input.dispatchEvent(new Event('input'));
  input.focus();
}

function close() {
  if (root.hidden) return;
  root.hidden = true;
  document.body.classList.remove('pal-open');
}
