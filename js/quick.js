// ─────────────────────────────────────────────────────────────
//  Quick view — a 30-second recruiter summary.
//  Opens from the nav, the hero, ⌘K, or a shareable ?view=quick link.
//  Printing the site always prints this summary (a résumé on demand).
// ─────────────────────────────────────────────────────────────
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, SKILL_CATEGORIES, EDUCATION, HIGHLIGHTS, ORIGIN, SOFOF_PROJECTS } from './data.js';
import { track } from './analytics.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const panel = document.getElementById('quick');
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
let lastFocus = null;

if (panel) init();

function init() {
  const roleLine = EXPERIENCE[0].roles
    ? `${EXPERIENCE[0].roles.map((r) => r.title).join(' & ')} · ${EXPERIENCE[0].company}`
    : `${EXPERIENCE[0].role} · ${EXPERIENCE[0].company}`;

  const skillRows = ['backend', 'data', 'infra', 'frontend', 'lang', 'lead']
    .filter((k) => SKILL_CATEGORIES[k])
    .map((k) => `<tr><th>${esc(SKILL_CATEGORIES[k].label)}</th><td>${SKILLS.filter((s) => s.cat === k).map((s) => esc(s.label)).join(' · ')}</td></tr>`)
    .join('');

  panel.innerHTML = `
    <div class="quick-bar">
      <span class="quick-tag"><b></b>recruiter view · 30-second summary</span>
      <div class="quick-actions">
        <button type="button" class="btn small" data-q="print">Print / save PDF</button>
        <button type="button" class="btn small primary" data-q="close">Explore full site →</button>
      </div>
    </div>
    <article class="quick-doc">
      <header class="q-head">
        <div>
          <h1 id="quick-title">${esc(PROFILE.name)}</h1>
          <p class="q-role">${esc(roleLine)}</p>
          <p class="q-meta">${esc(PROFILE.location)} · 5+ years · backend, microservices, databases, real-time systems</p>
        </div>
        <ul class="q-contact">
          <li><a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a></li>
          <li><a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener">linkedin.com/in/${esc(PROFILE.linkedinHandle)}</a></li>
          <li><a href="${esc(PROFILE.github)}" target="_blank" rel="noopener">github.com/${esc(PROFILE.githubHandle)}</a></li>
        </ul>
      </header>

      <section>
        <h2>Highlights</h2>
        <ul class="q-highlights">${HIGHLIGHTS.map((h) => `<li>${h}</li>`).join('')}</ul>
      </section>

      <section>
        <h2>Experience</h2>
        <table class="q-exp">
          ${EXPERIENCE.map((j) => `
            <tr>
              <td><b>${esc(j.roles ? j.roles.map((r) => r.title).join(' & ') : j.role)}</b> · ${esc(j.company)}<span>${esc(j.location)}</span></td>
              <td class="q-date">${esc(j.period)}</td>
            </tr>`).join('')}
        </table>
      </section>

      <section>
        <h2>Skills</h2>
        <table class="q-skills">${skillRows}</table>
      </section>

      <div class="q-two">
        <section>
          <h2>Projects</h2>
          <ul class="q-projects">${PROJECTS.map((p) => `<li><b>${esc(p.name)}</b> — ${esc(p.kicker)} · <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.url.replace(/^https?:\/\//, ''))}</a></li>`).join('')}
            <li><b>At SOFOF Tech</b> — ${SOFOF_PROJECTS.map((p) => `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>`).join(' · ')}</li></ul>
        </section>
        <section>
          <h2>Education</h2>
          <p><b>${esc(EDUCATION.degree)}</b><br>${esc(EDUCATION.school)} · ${esc(EDUCATION.period)}</p>
          <p class="q-origin"><b>Robotics & IoT:</b> ${ORIGIN.map((r) => esc(r.name)).join(', ')} — Robolution 2018 finalist.</p>
        </section>
      </div>
    </article>`;

  panel.addEventListener('click', (e) => {
    const q = e.target.closest('[data-q]')?.dataset.q;
    if (q === 'close') close();
    if (q === 'print') { track('resume_print', { via: 'quick_view' }); window.print(); }
  });
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    if (e.key === 'Tab') trapFocus(e);
  });

  document.querySelectorAll('[data-quick-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('quick:open', open);
  addEventListener('quick:print', () => { track('resume_print', { via: 'button' }); open(); setTimeout(() => window.print(), 250); });

  const params = new URLSearchParams(location.search);
  if (params.get('view') === 'quick') open();
}

function open() {
  if (!panel.hidden) return;
  lastFocus = document.activeElement;
  track('quick_view_open', { via: new URLSearchParams(location.search).get('view') === 'quick' ? 'link' : 'button' });
  panel.hidden = false;
  document.body.classList.add('quick-open');
  emit('scene:pause', { paused: true });
  setUrl(true);
  panel.scrollTop = 0;
  panel.querySelector('[data-q="close"]').focus({ preventScroll: true });
}

function close() {
  if (panel.hidden) return;
  panel.hidden = true;
  document.body.classList.remove('quick-open');
  emit('scene:pause', { paused: false });
  setUrl(false);
  lastFocus?.focus?.({ preventScroll: true });
}

function setUrl(on) {
  try {
    const url = new URL(location.href);
    if (on) url.searchParams.set('view', 'quick');
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
  } catch { /* history unavailable */ }
}

function trapFocus(e) {
  const f = [...panel.querySelectorAll('a, button')].filter((el) => !el.disabled);
  if (!f.length) return;
  const first = f[0];
  const last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
