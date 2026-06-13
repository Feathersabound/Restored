// Navigation active state
function setNav(page) {
  document.querySelectorAll('.nt').forEach(n => n.classList.remove('on'));
  const el = document.querySelector(`.nt[data-page="${page}"]`);
  if (el) el.classList.add('on');
}

// Tier selector
function setTier(btn) {
  btn.closest('.tier').querySelectorAll('.tp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  const tier = btn.textContent.trim().toLowerCase();
  localStorage.setItem('tier', tier);
}

// Load saved tier
function loadTier() {
  const saved = localStorage.getItem('tier') || 'gentle';
  document.querySelectorAll('.tp').forEach(b => {
    if (b.textContent.trim().toLowerCase() === saved) b.classList.add('on');
    else b.classList.remove('on');
  });
}

// What/Why/How tabs
function whw(btn, id) {
  btn.closest('.whw').querySelectorAll('.wtab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.closest('.whw').querySelectorAll('.wcont').forEach(c => c.classList.remove('on'));
  document.getElementById(id).classList.add('on');
}

// Crisis situation switcher
function setSit(btn, id) {
  btn.closest('.tier').querySelectorAll('.tp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.sit-content').forEach(c => c.classList.remove('on'));
  const el = document.getElementById(id);
  if (el) el.classList.add('on');
}

// Gamification - streak
function getStreak() {
  return parseInt(localStorage.getItem('streak') || '0');
}

function updateStreak() {
  const last = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = getStreak();
  if (last === yesterday) streak++;
  else streak = 1;
  localStorage.setItem('streak', streak);
  localStorage.setItem('lastVisit', today);
}

function renderStreak() {
  const streak = getStreak();
  const el = document.getElementById('streak-num');
  if (el) el.textContent = streak > 0 ? streak + ' day streak 🔥' : 'Start your streak today';
}

// Module completion
function getCompleted() {
  return JSON.parse(localStorage.getItem('completed') || '[]');
}

function markComplete(module) {
  const list = getCompleted();
  if (!list.includes(module)) {
    list.push(module);
    localStorage.setItem('completed', JSON.stringify(list));
  }
  // Award points
  let pts = parseInt(localStorage.getItem('points') || '0');
  pts += 100;
  localStorage.setItem('points', pts);
  showCelebration();
}

function showCelebration() {
  const el = document.getElementById('celebration');
  if (!el) return;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

function getPoints() {
  return parseInt(localStorage.getItem('points') || '0');
}

function renderProgress() {
  const completed = getCompleted();
  const total = 12;
  const pct = Math.round((completed.length / total) * 100);

  // Progress bar
  document.querySelectorAll('#progress-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('#progress-pct').forEach(el => el.textContent = pct + '%');

  // Home page progress dots
  const dots = document.querySelectorAll('.pdot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('d', i < completed.length);
  });

  // Module cards - show completion tick
  document.querySelectorAll('[data-module]').forEach(mod => {
    const id = mod.getAttribute('data-module');
    const fill = mod.querySelector('.mod-prog-fill');
    const chev = mod.querySelector('.mod-chev');
    if (completed.includes(id)) {
      if (fill) fill.style.width = '100%';
      if (chev) chev.textContent = '✓';
      mod.style.opacity = '0.75';
    }
  });

  // Points display
  document.querySelectorAll('#points-display').forEach(el => el.textContent = getPoints() + ' pts');

  // Badge counts on journey page
  const badgeCount = document.getElementById('badge-count');
  if (badgeCount) badgeCount.textContent = '📍 ' + completed.length + ' modules complete';
  const badgePts = document.getElementById('badge-pts');
  if (badgePts) badgePts.textContent = '⭐ ' + getPoints() + ' pts';

  // Home page specific badges
  const homeStreak = document.getElementById('home-streak-badge');
  if (homeStreak) homeStreak.textContent = '🔥 ' + getStreak() + ' day streak';
  const homePts = document.getElementById('home-pts-badge');
  if (homePts) homePts.textContent = '⭐ ' + getPoints() + ' pts';
  const homeDone = document.getElementById('home-done-badge');
  if (homeDone) homeDone.textContent = '✅ ' + completed.length + ' modules done';
}

// Scripture memory
let currentVerse = 0;
const verses = [
  { ref: 'John 8:36', text: 'If the Son sets you free, you will be free indeed.' },
  { ref: 'Romans 8:1', text: 'There is now no condemnation for those who are in Christ Jesus.' },
  { ref: 'James 4:7', text: 'Submit to God, resist the devil, and he will flee from you.' },
  { ref: '1 Corinthians 6:18', text: 'Flee from sexual immorality. Every other sin a person commits is outside the body, but the sexually immoral person sins against his own body.' },
  { ref: 'Romans 12:2', text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.' },
  { ref: 'Psalm 119:9', text: 'How can a young person keep their way pure? By living according to your word.' },
  { ref: '2 Corinthians 10:5', text: 'We take captive every thought to make it obedient to Christ.' },
  { ref: 'Philippians 4:8', text: 'Whatever is true, whatever is noble, whatever is right, whatever is pure — think about such things.' },
  { ref: 'Galatians 2:20', text: 'I have been crucified with Christ. I no longer live, but Christ lives in me.' },
  { ref: 'Isaiah 54:17', text: 'No weapon formed against you shall prosper.' },
];

function loadVerse() {
  const v = verses[currentVerse % verses.length];
  const ref = document.getElementById('mem-ref');
  const text = document.getElementById('mem-text');
  if (ref) ref.textContent = v.ref;
  if (text) text.textContent = v.text;
}

function nextVerse(knew) {
  if (knew) {
    let pts = getPoints();
    pts += 10;
    localStorage.setItem('points', pts);
    renderProgress();
  }
  currentVerse++;
  loadVerse();
}

// Checklist saving
function saveChecklist() {
  const checks = {};
  document.querySelectorAll('input[type=checkbox]').forEach(cb => {
    checks[cb.id] = cb.checked;
  });
  localStorage.setItem('checklist', JSON.stringify(checks));
}

function loadChecklist() {
  const saved = JSON.parse(localStorage.getItem('checklist') || '{}');
  Object.entries(saved).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.checked = val;
  });
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  updateStreak();
  renderStreak();
  renderProgress();
  loadTier();
  loadChecklist();
  loadVerse();
});
