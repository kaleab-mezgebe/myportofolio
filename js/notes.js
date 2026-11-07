// ─────────────────────────────────────────────────────────────
//  Notebook — writing, with a small interactive diagram for the
//  circular-dependency article.
// ─────────────────────────────────────────────────────────────
import { ARTICLES } from './data.js';
import { track } from './analytics.js';

const root = document.getElementById('notes');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

if (root && ARTICLES.length) {
  const a = ARTICLES[0];
  root.innerHTML = `
    <p class="sec-tag notes-tag">// notebook</p>
    <article class="note panel frame">
      <div class="note-text">
        <p class="kicker">${esc(a.platform)} article · software architecture</p>
        <h3>${esc(a.title)}</h3>
        <p class="note-summary">${esc(a.summary)}</p>
        <div class="tags">${a.tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join('')}</div>
        <a class="btn small" href="${esc(a.url)}" target="_blank" rel="noopener">Read on ${esc(a.platform)} ↗</a>
      </div>
      <figure class="note-demo cyclic" id="dep-demo">
        <svg viewBox="0 0 320 250" role="img" aria-labelledby="dep-cap">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
            </marker>
          </defs>
          <g class="edges">
            <line class="e ok" x1="92" y1="50" x2="226" y2="50" marker-end="url(#arr)"/>
            <line class="e ok" x1="244" y1="72" x2="176" y2="182" marker-end="url(#arr)"/>
            <line class="e cyc" x1="144" y1="182" x2="76" y2="72" marker-end="url(#arr)"/>
            <line class="e fix" x1="78" y1="70" x2="142" y2="112" marker-end="url(#arr)"/>
            <line class="e fix" x1="160" y1="178" x2="160" y2="146" marker-end="url(#arr)"/>
          </g>
          <g class="nodes">
            <g class="n"><circle cx="64" cy="50" r="26"/><text x="64" y="55">A</text></g>
            <g class="n"><circle cx="256" cy="50" r="26"/><text x="256" y="55">B</text></g>
            <g class="n"><circle cx="160" cy="206" r="26"/><text x="160" y="211">C</text></g>
            <g class="n s"><circle cx="160" cy="124" r="20"/><text x="160" y="129">S</text></g>
          </g>
        </svg>
        <figcaption id="dep-cap"></figcaption>
        <button type="button" class="btn small" id="dep-toggle">Break the cycle</button>
      </figure>
    </article>`;

  const demo = root.querySelector('#dep-demo');
  const cap = root.querySelector('#dep-cap');
  const btn = root.querySelector('#dep-toggle');
  const CAPTIONS = {
    cyclic: '<b class="bad">A → B → C → A.</b> None of them can be built, tested or changed alone — every change ripples around the loop.',
    fixed: '<b class="good">Extract what A and C share into S.</b> Every arrow now points one way: a graph with clear ownership you can reason about.',
  };
  const set = (cyclic) => {
    demo.classList.toggle('cyclic', cyclic);
    cap.innerHTML = cyclic ? CAPTIONS.cyclic : CAPTIONS.fixed;
    btn.textContent = cyclic ? 'Break the cycle' : 'Show the cycle';
  };
  btn.addEventListener('click', () => {
    const toCyclic = !demo.classList.contains('cyclic');
    set(toCyclic);
    track('notebook_engaged', {}, { once: true });
    track('notebook_toggle', { view: toCyclic ? 'cycle' : 'fixed' });
  });
  root.querySelector('.note-text .btn')?.addEventListener('click', () => track('notebook_article_click'));
  set(true);
}
