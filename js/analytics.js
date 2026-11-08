// ─────────────────────────────────────────────────────────────
//  Privacy-friendly analytics (cookieless, no consent banner needed).
//  Provider + ID live in ANALYTICS (js/data.js); nothing loads until set.
//
//  track(name, props, { once })  — once: count at most once per page view
//  Respects Do-Not-Track / Global Privacy Control.
//  Debug locally with  ?debug-analytics  → events print to the console
//  and collect in window.__analytics.
// ─────────────────────────────────────────────────────────────
import { ANALYTICS } from './data.js';

const debug = new URLSearchParams(location.search).has('debug-analytics');
const optedOut = navigator.globalPrivacyControl === true
  || navigator.doNotTrack === '1' || window.doNotTrack === '1';
const onAllowedHost = !ANALYTICS.domains?.length || ANALYTICS.domains.includes(location.hostname);
const configured = (ANALYTICS.provider === 'umami' && ANALYTICS.id)
  || (ANALYTICS.provider === 'goatcounter' && ANALYTICS.goatcounter);
const enabled = Boolean(configured) && onAllowedHost && !optedOut;

const queue = [];
const seen = new Set();
let ready = false;
if (debug) window.__analytics = [];

export function track(name, props = {}, { once = false } = {}) {
  if (once) {
    const key = `${name}|${JSON.stringify(props)}`;
    if (seen.has(key)) return;
    seen.add(key);
  }
  if (debug) {
    window.__analytics.push({ name, props });
    console.info('[analytics]', name, props);
  }
  if (!enabled) return;
  if (ready) send(name, props);
  else queue.push([name, props]);
}

function send(name, props) {
  try {
    if (ANALYTICS.provider === 'umami') {
      window.umami?.track(name, props);
    } else if (ANALYTICS.provider === 'goatcounter') {
      const suffix = Object.values(props).filter((v) => typeof v === 'string').join('/');
      window.goatcounter?.count({ path: `event/${name}${suffix ? `/${suffix}` : ''}`, title: name, event: true });
    }
  } catch { /* analytics must never break the page */ }
}

function loadProvider() {
  const s = document.createElement('script');
  s.defer = true;
  if (ANALYTICS.provider === 'umami') {
    s.src = 'https://cloud.umami.is/script.js';
    s.dataset.websiteId = ANALYTICS.id;
    s.dataset.doNotTrack = 'true';
    if (ANALYTICS.domains?.length) s.dataset.domains = ANALYTICS.domains.join(',');
  } else {
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = ANALYTICS.goatcounter;
  }
  s.onload = () => {
    ready = true;
    queue.splice(0).forEach(([n, p]) => send(n, p));
  };
  document.head.appendChild(s);
}

// load after the page is up so analytics never competes with first paint
if (enabled) {
  const start = () => (window.requestIdleCallback || ((cb) => setTimeout(cb, 300)))(loadProvider, { timeout: 2000 });
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}

// ── section views: the denominator for "saw it" vs "used it" ──
const WATCH = { flow: 'request_flow', experience: 'experience', projects: 'projects', skills: 'skills', terminal: 'terminal', contact: 'contact' };
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    track('section_view', { section: WATCH[e.target.id] }, { once: true });
    io.unobserve(e.target);
  });
}, { threshold: 0.35 });
Object.keys(WATCH).forEach((id) => {
  const el = document.getElementById(id);
  if (el) io.observe(el);
});
