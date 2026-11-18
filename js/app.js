// ─────────────────────────────────────────────────────────────
//  Clean, Fast, Readable Portfolio Renderer
//  Reads all content from js/data.js (single source of truth)
// ─────────────────────────────────────────────────────────────
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, SKILL_CATEGORIES, EDUCATION, ACHIEVEMENTS } from './data.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderProjects(filter = 'all') {
  const grid = $('#projects-grid');
  if (!grid) return;
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  grid.innerHTML = items
    .map((p) => {
      const primaryLabel = p.url?.includes('play.google')
        ? 'Google Play (Passenger) ↗'
        : p.url?.includes('linkedin')
          ? 'Watch Demo ↗'
          : p.url?.includes('github.com')
            ? 'View on GitHub ↗'
            : 'Live Preview ↗';

      const showCodeBtn = p.github && p.github !== p.url;

      return `
        <article class="project-card">
          <div class="project-thumb">
            <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
            ${p.badge ? `<span class="project-badge">${esc(p.badge)}</span>` : ''}
          </div>
          <div class="project-body">
            <p class="project-kicker">${esc(p.kicker)}</p>
            <h3>${esc(p.name)}</h3>
            <p class="project-desc">${esc(p.description)}</p>
            <ul class="project-highlights">
              ${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}
            </ul>
            <div class="tags">
              ${p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
            </div>
            <div class="project-links">
              ${p.url ? `<a class="btn sm primary" href="${esc(p.url)}" target="_blank" rel="noopener">${primaryLabel}</a>` : ''}
              ${p.driverUrl ? `<a class="btn sm" href="${esc(p.driverUrl)}" target="_blank" rel="noopener">Google Play (Driver) ↗</a>` : ''}
              ${showCodeBtn ? `<a class="btn sm" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
            </div>
          </div>
        </article>`;
    })
    .join('');
}

function renderExperience() {
  const container = $('#experience-list');
  if (!container) return;

  container.innerHTML = EXPERIENCE.map(
    (job) => `
      <article class="exp-card">
        <div class="exp-head">
          <h3>${esc(job.role)} <span class="exp-company">@ ${esc(job.company)}</span></h3>
          <span class="exp-period">${esc(job.period)}</span>
        </div>
        <p class="exp-meta">${esc(job.location)} · ${esc(job.type)} · ${esc(job.mode)}</p>
        <ul class="exp-points">
          ${job.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}
        </ul>
        <div class="tags" style="margin-bottom:0">
          ${job.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
        </div>
      </article>`
  ).join('');
}

function renderSkills() {
  const grid = $('#skills-grid');
  if (!grid) return;

  grid.innerHTML = Object.entries(SKILL_CATEGORIES)
    .map(([key, cat]) => {
      const items = SKILLS.filter((s) => s.cat === key);
      if (!items.length) return '';
      return `
        <div class="skill-card">
          <h3><span class="skill-dot"></span>${esc(cat.label)}</h3>
          <div class="skill-pills">
            ${items.map((s) => `<span class="skill-pill" title="${esc(s.info)}">${esc(s.label)}</span>`).join('')}
          </div>
        </div>`;
    })
    .join('');
}

function renderEducation() {
  const eduEl = $('#edu-card-content');
  if (eduEl) {
    eduEl.innerHTML = `
      <h3>${esc(EDUCATION.degree)}</h3>
      <p class="edu-sub">${esc(EDUCATION.school)} · ${esc(EDUCATION.period)}</p>
      <ul class="edu-list">
        <li><b>Cumulative GPA:</b> ${esc(EDUCATION.gpa)} (Top 1% Class Standing)</li>
        <li><b>National Exit Exam:</b> ${esc(EDUCATION.exitExam)}</li>
        <li><b>Relevant Coursework:</b> Mobile App Development, Algorithms, Data Structures, Software Engineering, Database Systems</li>
      </ul>`;
  }

  const achEl = $('#honors-list');
  if (achEl) {
    achEl.innerHTML = ACHIEVEMENTS.map(
      (a) => `<li><b>${esc(a.title)}</b> — ${esc(a.org)} (${esc(a.date)})</li>`
    ).join('');
  }
}

function initFilters() {
  const bar = $('#project-filters');
  if (!bar) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    $$('.filter-btn', bar).forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
}

function initTheme() {
  const btn = $('#theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('km-theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');

  const syncIcon = () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (btn) btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (btn) btn.textContent = isDark ? '☀' : '☾';
  };
  syncIcon();

  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('km-theme', next);
    syncIcon();
  });
}

function initMenu() {
  const btn = $('#menu-toggle');
  const links = $('#nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  $$('a', links).forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
}

function initCopyEmail() {
  const btn = $('#copy-email');
  const toast = $('#toast');
  if (!btn) return;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      showToast('Email copied: ' + PROFILE.email);
    } catch {
      showToast(PROFILE.email);
    }
  });
}

function init() {
  renderProjects('all');
  renderExperience();
  renderSkills();
  renderEducation();
  initFilters();
  initTheme();
  initMenu();
  initCopyEmail();
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
}

init();
