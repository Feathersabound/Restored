/**
 * UI.js - User interface interactions for Restored in Him
 * Handles navigation, tab switching, buttons, and visual feedback
 */

// Navigation active state
function setNav(page) {
  document.querySelectorAll('.nt').forEach(n => n.classList.remove('on'));
  const el = document.querySelector(`.nt[data-page="${page}"]`);
  if (el) el.classList.add('on');
}

// Tier/difficulty selector
function setTier(btn) {
  btn.closest('.tier').querySelectorAll('.tp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  const tier = btn.textContent.trim().toLowerCase();
  setTierLocal(tier);
}

// Load and display saved tier
function loadTierUI() {
  const saved = getTier();
  document.querySelectorAll('.tp').forEach(b => {
    if (b.textContent.trim().toLowerCase() === saved) b.classList.add('on');
    else b.classList.remove('on');
  });
}

// What/Why/How tabbed content
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

// Display streak
function renderStreak() {
  const el = document.getElementById('streak-num');
  if (el) el.textContent = getStreak() + ' day streak 🔥';
  
  const badge = document.getElementById('home-streak-badge');
  if (badge) badge.textContent = '🔥 ' + getStreak() + ' day streak';
}

// Display celebration overlay
function showCelebration() {
  const el = document.getElementById('celebration');
  if (!el) return;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// Render overall progress
function renderProgress() {
  const completed = getCompleted();
  const total = 12;
  const pct = Math.round((completed.length / total) * 100);

  // Update progress bars
  const fills = document.querySelectorAll('#progress-fill');
  fills.forEach(fill => fill.style.width = pct + '%');

  // Update percentage text
  const pctEl = document.getElementById('progress-pct');
  if (pctEl) pctEl.textContent = pct + '%';

  // Update module progress indicators
  document.querySelectorAll('.mod[data-module]').forEach(mod => {
    const id = mod.getAttribute('data-module');
    const prog = mod.querySelector('.mod-prog-fill');
    if (prog && completed.includes(id)) prog.style.width = '100%';
  });

  // Update points display
  const pts = document.getElementById('points-display');
  if (pts) pts.textContent = getPoints() + ' pts';

  // Update home badges
  const doneBadge = document.getElementById('home-done-badge');
  if (doneBadge) doneBadge.textContent = '✅ ' + completed.length + ' modules done';

  const ptsBadge = document.getElementById('home-pts-badge');
  if (ptsBadge) ptsBadge.textContent = '⭐ ' + getPoints() + ' pts';
}

// Progress dots (7-day view)
function updateProgressDots() {
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    const dayLetter = ['S','M','T','W','T','F','S'][date.getDay()];
    const dot = document.getElementById(`pd${i + 1}`);
    if (dot) {
      dot.textContent = dayLetter;
      // Mark today as "today" (t class) and yesterday if streaking
      if (date.toDateString() === today.toDateString()) {
        dot.className = 'pdot t';
      }
    }
  }
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
  { ref: 'Isaiah 54:17', text: 'No weapon formed against you shall prosper.' }
];

function loadVerse() {
  const v = verses[currentVerse % verses.length];
  const ref = document.getElementById('mem-ref');
  const text = document.getElementById('mem-text');
  if (ref) ref.textContent = v.ref;
  if (text) text.textContent = '"' + v.text + '"';
}

function nextVerse(knew) {
  if (knew) {
    addPoints(10);
    renderProgress();
  }
  currentVerse++;
  loadVerse();
}

// Accessibility - Toggle high contrast mode
let highContrast = localStorage.getItem('highContrast') === 'true';

function toggleContrast() {
  highContrast = !highContrast;
  localStorage.setItem('highContrast', highContrast);
  applyContrast();
}

function applyContrast() {
  if (highContrast) {
    document.documentElement.style.filter = 'contrast(1.2)';
  } else {
    document.documentElement.style.filter = 'contrast(1)';
  }
}

// Check for keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Tab key for navigation
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
  
  // Escape to close modals
  if (e.key === 'Escape') {
    const celebration = document.getElementById('celebration');
    if (celebration && celebration.style.display === 'flex') {
      celebration.style.display = 'none';
    }
  }
});

// Show keyboard nav styles on mouse away
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
