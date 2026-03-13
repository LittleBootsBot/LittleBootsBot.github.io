/* ============================================================
   AI Content Generator — Premium Dashboard App
   ============================================================ */

(function() {
  'use strict';

  // ---- State ----
  const state = {
    activeType: 'blog',
    tone: 'professional',
    format: 'markdown',
    length: 2,
    generating: false,
    history: JSON.parse(localStorage.getItem('acg-history') || '[]'),
    usage: JSON.parse(localStorage.getItem('acg-usage') || '{"count":0,"words":0,"date":"","types":{}}'),
    theme: localStorage.getItem('acg-theme') || 'dark',
    prefs: JSON.parse(localStorage.getItem('acg-prefs') || '{}'),
  };

  const typeLabels = {
    blog: 'Blog Post', social: 'Social Media', readme: 'README',
    marketing: 'Marketing', docs: 'Documentation'
  };

  const typeIcons = {
    blog: '\u270F\uFE0F', social: '\uD83D\uDCF1', readme: '\uD83D\uDCC4',
    marketing: '\u26A1', docs: '\uD83D\uDCDA'
  };

  const typeColors = {
    blog: 'rgba(99,132,255,0.12)', social: 'rgba(52,211,153,0.12)',
    readme: 'rgba(251,191,36,0.12)', marketing: 'rgba(236,72,153,0.12)',
    docs: 'rgba(168,85,247,0.12)'
  };

  // ---- Init ----
  function init() {
    applyTheme();
    restorePrefs();
    bindTypeCards();
    bindToneChips();
    bindFormatBtns();
    bindForm();
    bindActions();
    bindThemeToggle();
    bindKeyboardShortcuts();
    bindDragDrop();
    animateStats();
    renderHistory();
    updateUsageRing();
    animateCounters();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animation = 'fadeUp 0.6s var(--ease-out) both';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stats-card, .history-item').forEach(el => observer.observe(el));
  }

  // ---- Theme ----
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
  }

  function bindThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('acg-theme', state.theme);
      applyTheme();
      showToast(state.theme === 'light' ? 'Switched to light mode' : 'Switched to dark mode', 'info');
    });
  }

  // ---- Preferences ----
  function restorePrefs() {
    if (state.prefs.tone) {
      state.tone = state.prefs.tone;
      document.querySelectorAll('#tone-chips .chip').forEach(c => {
        c.classList.toggle('active', c.dataset.tone === state.tone);
      });
    }
    if (state.prefs.format) {
      state.format = state.prefs.format;
      document.querySelectorAll('.format-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.format === state.format);
      });
    }
    if (state.prefs.length) {
      state.length = state.prefs.length;
      const slider = document.getElementById('length');
      if (slider) slider.value = state.length;
    }
  }

  function savePrefs() {
    state.prefs = { tone: state.tone, format: state.format, length: state.length };
    localStorage.setItem('acg-prefs', JSON.stringify(state.prefs));
  }

  // ---- Type Cards ----
  function bindTypeCards() {
    document.querySelectorAll('.type-card').forEach(card => {
      card.addEventListener('click', () => selectType(card.dataset.type));
    });
  }

  function selectType(type) {
    state.activeType = type;
    document.querySelectorAll('.type-card').forEach(c => c.classList.toggle('active', c.dataset.type === type));

    const titleEl = document.getElementById('form-title');
    if (titleEl) {
      const svgMap = {
        blog: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
        social: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768M15.232 11.232L20 4"/></svg>',
        readme: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        marketing: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        docs: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
      };
      titleEl.innerHTML = (svgMap[type] || '') + ' ' + typeLabels[type];
    }
  }

  // ---- Chips & Buttons ----
  function bindToneChips() {
    document.querySelectorAll('#tone-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#tone-chips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.tone = chip.dataset.tone;
        savePrefs();
      });
    });
  }

  function bindFormatBtns() {
    document.querySelectorAll('.format-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.format = btn.dataset.format;
        savePrefs();
      });
    });
  }

  // ---- Form ----
  function bindForm() {
    const form = document.getElementById('gen-form');
    const slider = document.getElementById('length');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); generate(); });
    if (slider) slider.addEventListener('input', () => { state.length = parseInt(slider.value); savePrefs(); });
  }

  // ---- Generate ----
  async function generate() {
    if (state.generating) return;

    const topic = document.getElementById('topic')?.value?.trim();
    if (!topic) {
      showToast('Please enter a topic first', 'error');
      document.getElementById('topic')?.focus();
      return;
    }

    state.generating = true;
    const btn = document.getElementById('generate-btn');
    const empty = document.getElementById('output-empty');
    const loading = document.getElementById('output-loading');
    const result = document.getElementById('output-result');

    btn?.classList.add('loading');
    if (empty) empty.hidden = true;
    if (result) result.hidden = true;
    if (loading) loading.hidden = false;

    // Animate loading steps
    const steps = document.querySelectorAll('#loading-steps .loading-step');
    for (let i = 0; i < steps.length; i++) {
      await delay(600 + Math.random() * 400);
      steps.forEach((s, j) => {
        s.classList.toggle('active', j === i);
        s.classList.toggle('done', j < i);
      });
    }
    await delay(500);

    const params = {
      topic,
      audience: document.getElementById('audience')?.value || '',
      tone: state.tone,
      length: state.length,
      keywords: document.getElementById('keywords')?.value || '',
      context: document.getElementById('context')?.value || '',
      cta: document.getElementById('cta')?.value || '',
    };

    const content = getSampleContent(state.activeType, params);
    const rendered = renderMarkdown(content);

    if (loading) loading.hidden = true;
    if (result) result.hidden = false;

    const contentEl = document.getElementById('result-content');
    if (contentEl) contentEl.innerHTML = rendered;

    const typeEl = document.getElementById('result-type');
    if (typeEl) typeEl.textContent = typeLabels[state.activeType];

    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const wordsEl = document.getElementById('result-words');
    if (wordsEl) wordsEl.textContent = wordCount + ' words';

    btn?.classList.remove('loading');
    state.generating = false;

    updateUsage(wordCount);
    addToHistory(state.activeType, topic, content, wordCount);
    showToast('Content generated successfully!', 'success');
    launchConfetti();
  }

  // ---- Actions ----
  function bindActions() {
    document.getElementById('copy-btn')?.addEventListener('click', copyOutput);
    document.getElementById('download-btn')?.addEventListener('click', downloadOutput);
    document.getElementById('regenerate-btn')?.addEventListener('click', generate);
    document.getElementById('clear-history')?.addEventListener('click', clearHistory);
  }

  async function copyOutput() {
    const contentEl = document.getElementById('result-content');
    if (!contentEl) return;
    const text = contentEl.innerText;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.classList.add('copied');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>';
      setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
    }
    showToast('Copied to clipboard!', 'success');
  }

  function downloadOutput() {
    const contentEl = document.getElementById('result-content');
    if (!contentEl) return;
    const text = contentEl.innerText;
    const ext = state.format === 'html' ? 'html' : state.format === 'text' ? 'txt' : 'md';
    const filename = `${state.activeType}-${Date.now()}.${ext}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, 'success');
  }

  // ---- Keyboard Shortcuts ----
  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('shortcuts-modal');

      if (e.key === 'Escape') {
        if (modal && !modal.hidden) { modal.hidden = true; return; }
      }

      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        if (modal) modal.hidden = !modal.hidden;
        return;
      }

      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault(); generate(); return;
      }

      if (e.ctrlKey && e.key === 'c' && !window.getSelection().toString()) {
        e.preventDefault(); copyOutput(); return;
      }

      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); savePrefs(); showToast('Preferences saved', 'info'); return;
      }

      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault(); document.getElementById('topic')?.focus(); return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && !e.target.isContentEditable) {
        const typeKeys = { '1': 'blog', '2': 'social', '3': 'readme', '4': 'marketing', '5': 'docs' };
        if (typeKeys[e.key]) { e.preventDefault(); selectType(typeKeys[e.key]); }
      }
    });
  }

  // ---- Drag & Drop ----
  function bindDragDrop() {
    const dropZone = document.getElementById('drop-zone');
    let dragCounter = 0;

    document.addEventListener('dragenter', (e) => {
      e.preventDefault(); dragCounter++;
      if (dropZone) dropZone.hidden = false;
    });

    document.addEventListener('dragleave', (e) => {
      e.preventDefault(); dragCounter--;
      if (dragCounter <= 0 && dropZone) { dropZone.hidden = true; dragCounter = 0; }
    });

    document.addEventListener('dragover', (e) => e.preventDefault());

    document.addEventListener('drop', (e) => {
      e.preventDefault(); dragCounter = 0;
      if (dropZone) dropZone.hidden = true;

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const ctx = document.getElementById('context');
            if (ctx) { ctx.value = ev.target.result.slice(0, 2000); ctx.dispatchEvent(new Event('input')); }
            showToast(`Loaded ${file.name}`, 'success');
            const details = document.querySelector('.advanced-section');
            if (details) details.open = true;
          };
          reader.readAsText(file);
        } else {
          showToast('Please drop a text file (.txt, .md, .json)', 'error');
        }
      }
    });
  }

  // ---- Toast ----
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = {
      success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    toast.innerHTML = (icons[type] || icons.info) + '<span>' + escapeHtml(message) + '</span>';
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ---- Confetti ----
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#6384ff', '#a855f7', '#ec4899', '#34d399', '#fbbf24', '#f87171'];
    const particles = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: -(Math.random() * 14 + 6),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.3,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx; p.vy += p.gravity; p.y += p.vy;
        p.rotation += p.rotationSpeed; p.vx *= 0.99; p.opacity -= 0.008;

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          } else {
            ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 180) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  // ---- Usage Stats ----
  function updateUsage(newWords) {
    const today = new Date().toISOString().split('T')[0];
    if (state.usage.date !== today) { state.usage.count = 0; state.usage.date = today; }
    state.usage.count++;
    state.usage.words += (newWords || 0);
    state.usage.types[state.activeType] = (state.usage.types[state.activeType] || 0) + 1;
    localStorage.setItem('acg-usage', JSON.stringify(state.usage));
    updateUsageRing();
    updateStatsCards();
  }

  function updateUsageRing() {
    const today = new Date().toISOString().split('T')[0];
    if (state.usage.date !== today) state.usage.count = 0;

    const max = 5;
    const count = state.usage.count;
    const pct = Math.min(1, count / max);

    const countEl = document.getElementById('usage-count');
    const maxEl = document.getElementById('usage-max');
    const fillEl = document.getElementById('usage-ring-fill');

    if (countEl) countEl.textContent = count;
    if (maxEl) maxEl.textContent = max;
    if (fillEl) fillEl.style.strokeDashoffset = 326.73 * (1 - pct);
  }

  function updateStatsCards() {
    const wordsEl = document.getElementById('total-words');
    const typeEl = document.getElementById('fav-type');
    const timeEl = document.getElementById('time-saved');

    if (wordsEl) animateNumber(wordsEl, state.usage.words);
    if (typeEl) {
      const favType = Object.entries(state.usage.types).sort((a, b) => b[1] - a[1])[0];
      typeEl.textContent = favType ? typeLabels[favType[0]] || favType[0] : 'None';
    }
    if (timeEl) timeEl.textContent = Math.round(state.usage.words / 50) + ' min';
  }

  function animateStats() { updateStatsCards(); }

  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      animateNumber(el, parseInt(el.dataset.count));
    });
  }

  function animateNumber(el, target) {
    const duration = 1000;
    const start = parseInt(el.textContent) || 0;
    const diff = target - start;
    if (diff === 0) { el.textContent = target; return; }
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + diff * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- History ----
  function addToHistory(type, topic, content, wordCount) {
    state.history.unshift({
      id: Date.now(), type, topic, content, wordCount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    if (state.history.length > 20) state.history.pop();
    localStorage.setItem('acg-history', JSON.stringify(state.history));
    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) return;

    if (state.history.length === 0) {
      list.innerHTML = '<div class="history-empty"><p>Your generated content will appear here. Start creating to build your library.</p></div>';
      return;
    }

    list.innerHTML = state.history.map((item, i) => `
      <div class="history-item" data-index="${i}" style="animation-delay: ${i * 50}ms">
        <div class="history-icon" style="background: ${typeColors[item.type] || 'var(--accent-soft)'}">
          ${typeIcons[item.type] || '\uD83D\uDCDD'}
        </div>
        <div class="history-info">
          <div class="history-title">${escapeHtml(item.topic)}</div>
          <div class="history-meta">${typeLabels[item.type] || item.type} &middot; ${item.wordCount} words &middot; ${item.time}</div>
        </div>
        <div class="history-actions">
          <button class="history-action-btn" title="Copy" data-action="copy" data-index="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
          <button class="history-action-btn" title="Delete" data-action="delete" data-index="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.history-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index);
        if (btn.dataset.action === 'copy') {
          navigator.clipboard?.writeText(state.history[idx]?.content || '');
          showToast('Copied to clipboard!', 'success');
        } else if (btn.dataset.action === 'delete') {
          state.history.splice(idx, 1);
          localStorage.setItem('acg-history', JSON.stringify(state.history));
          renderHistory();
          showToast('Removed from history', 'info');
        }
      });
    });

    list.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index);
        const entry = state.history[idx];
        if (!entry) return;
        selectType(entry.type);
        const topicEl = document.getElementById('topic');
        if (topicEl) { topicEl.value = entry.topic; topicEl.dispatchEvent(new Event('input')); }

        const contentEl = document.getElementById('result-content');
        const resultEl = document.getElementById('output-result');
        const emptyEl = document.getElementById('output-empty');
        const loadEl = document.getElementById('output-loading');

        if (emptyEl) emptyEl.hidden = true;
        if (loadEl) loadEl.hidden = true;
        if (resultEl) resultEl.hidden = false;
        if (contentEl) contentEl.innerHTML = renderMarkdown(entry.content);

        const typeEl = document.getElementById('result-type');
        if (typeEl) typeEl.textContent = typeLabels[entry.type];
        const wordsEl = document.getElementById('result-words');
        if (wordsEl) wordsEl.textContent = entry.wordCount + ' words';

        smoothScroll('#generator');
        showToast('Loaded from history', 'info');
      });
    });
  }

  function clearHistory() {
    state.history = [];
    localStorage.removeItem('acg-history');
    renderHistory();
    showToast('History cleared', 'info');
  }

  // ---- Markdown Renderer ----
  function renderMarkdown(md) {
    if (!md) return '<p style="color:var(--text-muted)">No content yet.</p>';

    let html = md
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    html = html.replace(/(<li>[\s\S]*?<\/li>(?:<br>)?)+/g, match =>
      '<ul>' + match.replace(/<br>/g, '') + '</ul>'
    );

    return '<div>' + html + '</div>';
  }

  // ---- Sample Content ----
  function getSampleContent(type, p) {
    const generators = { blog: blogSample, social: socialSample, readme: readmeSample, marketing: marketingSample, docs: docsSample };
    return (generators[type] || generators.blog)(p);
  }

  function blogSample(p) {
    const topic = p.topic || 'Modern Web Development';
    return `# ${topic}

## Introduction

In today's rapidly evolving tech landscape, staying ahead means embracing change. This post explores the key principles and practices that define ${topic.toLowerCase()} in ${new Date().getFullYear()}.

## Why This Matters

The landscape continues to shift dramatically. Teams that adapt early gain significant competitive advantages:

- **Faster iteration cycles** \u2014 Ship features in days, not months
- **Better developer experience** \u2014 Happy developers write better code
- **Improved reliability** \u2014 Modern tooling catches issues before production

## Key Concepts

### 1. Start with the Fundamentals

Before diving into advanced topics, ensure your foundation is solid. Understanding core principles makes everything else click into place.

### 2. Embrace Automation

> "Any task you do more than twice should be automated." \u2014 Anonymous

Automation isn't just about saving time \u2014 it's about consistency and reducing cognitive overhead.

### 3. Measure Everything

You can't improve what you don't measure. Set up observability from day one:

- Performance metrics and benchmarks
- Error rates and resolution times
- User engagement patterns and feedback loops

## Practical Steps

1. Audit your current workflow for bottlenecks
2. Identify the highest-impact automation opportunities
3. Implement incrementally \u2014 don't try to change everything at once
4. Gather feedback and iterate continuously

## Conclusion

${topic} isn't just a trend \u2014 it's the new baseline. Start small, stay consistent, and the compound benefits will transform your work.

---

*What's your experience with ${topic.toLowerCase()}? Share your thoughts in the comments below.*`;
  }

  function socialSample(p) {
    const topic = p.topic || 'AI tools for developers';
    return `# Twitter/X Thread

\uD83E\uDDF5 Thread: Everything I know about ${topic}

1/ The landscape of ${topic} has changed dramatically in the past year. Here's what actually works (and what's hype):

2/ First, the fundamentals haven't changed. Good engineering practices still matter. AI tools amplify your skills \u2014 they don't replace them.

3/ The tools that have genuinely improved my workflow:
- AI-powered code completion
- Automated test generation
- Smart documentation tools

4/ But here's what most people get wrong: they try to use AI for EVERYTHING. The key is knowing when to use it and when to rely on your own expertise.

5/ My rule of thumb: Use AI for the boring parts. Keep the creative, architectural decisions human.

6/ The ROI is real. I've measured a 40% reduction in time spent on boilerplate code and documentation.

7/ Hot take: In 2 years, not using AI tools as a developer will be like not using an IDE. It's becoming table stakes.

8/ Want to get started? Don't try everything at once. Pick ONE tool, master it, then expand.

9/ The best investment? Learning prompt engineering. It's the new "learning to Google effectively."

10/ That's a wrap! If you found this useful, give it a retweet. Follow for more developer productivity tips. \uD83D\uDE80`;
  }

  function readmeSample(p) {
    const name = p.topic || 'my-awesome-project';
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return `# ${name}

> A powerful, modern toolkit for building amazing applications

## Overview

${name} is a comprehensive solution that helps developers build, test, and deploy applications faster. Built with modern best practices and a focus on developer experience.

## Features

- **Fast Setup** \u2014 Get running in under 2 minutes
- **Type Safe** \u2014 Full TypeScript support out of the box
- **Extensible** \u2014 Plugin architecture for custom workflows
- **Well Tested** \u2014 95%+ code coverage

## Quick Start

\`\`\`bash
# Install
pip install ${slug}

# Initialize a new project
${slug} init my-app

# Start development
${slug} dev
\`\`\`

## Contributing

Contributions are welcome! Please read our Contributing Guide for details.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing\`)
5. Open a Pull Request

## License

MIT License \u2014 see LICENSE for details.`;
  }

  function marketingSample(p) {
    const topic = p.topic || 'AI Content Generator';
    return `# ${topic} \u2014 Landing Page Copy

## Hero Section

### Turn Ideas Into Content in Seconds

Stop staring at blank pages. ${topic} transforms your thoughts into polished blog posts, social threads, documentation, and marketing copy \u2014 all from a single command.

**Trusted by 10,000+ developers and creators worldwide**

[Get Started Free] [See Demo]

---

## Value Propositions

### Write 10x Faster
Generate professional content in seconds, not hours. Our AI understands context, tone, and audience to deliver ready-to-publish results.

### Stay On Brand
Train custom voice profiles that match your brand's personality. Every piece of content sounds authentically you.

### One Tool, All Content Types
Blog posts. Social threads. READMEs. Marketing copy. Email campaigns. Technical docs. All from one powerful tool.

---

## Social Proof

> "Cut our content creation time by 80%. We ship more blog posts in a week than we used to in a month."
> \u2014 Sarah Chen, Head of Content at TechCo

> "The README generator alone saved our team 20 hours on our last project launch."
> \u2014 Marcus Wright, Senior Developer

---

## Call to Action

### Ready to Transform Your Content Workflow?

Join thousands of developers and creators who've already made the switch.

- Free tier: 5 generations/day, no credit card required
- Pro: $9/month for unlimited generations + all content types
- Enterprise: $29/month for teams with priority support

[Start Free Today]`;
  }

  function docsSample(p) {
    const topic = p.topic || 'API Reference';
    return `# ${topic}

## Overview

This document provides a comprehensive reference for the AI Content Generator API. All endpoints accept JSON and return JSON responses.

## Authentication

All API requests require authentication via an API key passed in the \`Authorization\` header:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Generate Content

\`POST /api/v1/generate\`

Generate content based on the provided parameters.

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | yes | Content type: blog, social, readme, marketing, docs |
| topic | string | yes | The subject of the content |
| tone | string | no | Tone: technical, casual, professional, friendly |
| format | string | no | Output format: markdown, html, plain |

## Rate Limits

| Tier | Requests/min | Generations/day |
|------|-------------|-----------------|
| Free | 10 | 5 |
| Pro | 30 | Unlimited |
| Enterprise | 60 | Unlimited |

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 429 | Rate limit exceeded |
| 500 | Internal server error |`;
  }

  // ---- Utilities ----
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function smoothScroll(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.smoothScroll = smoothScroll;

  // ---- Boot ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
