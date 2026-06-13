/**
 * App.js - Main application initialization for Restored in Him
 * Loads modular functionality from storage.js and ui.js
 * Handles page lifecycle and crisis resources
 */

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/sw.js').catch(err => {
    console.log('Service Worker registration failed (non-critical):', err);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Update visit tracking and streak
  updateStreak();
  
  // Render all UI elements
  renderStreak();
  renderProgress();
  updateProgressDots();
  loadTierUI();
  loadChecklist();
  loadVerse();
  applyContrast();
  
  // Set active navigation
  const currentPage = document.body.getAttribute('data-page') || 'home';
  setNav(currentPage);
  
  // Make checkboxes save automatically
  document.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', saveChecklist);
  });
  
  // Initialize data management UI
  setupDataManagement();
  
  // Initialize crisis resources display
  displayCrisisResources();
  
  console.log('✓ Restored in Him Initialized');
});

// Setup data management buttons
function setupDataManagement() {
  const settingsContainer = document.querySelector('.ab, [data-settings], .mbody');
  if (!settingsContainer || document.getElementById('data-mgmt')) return;
  
  const div = document.createElement('div');
  div.id = 'data-mgmt';
  div.style.padding = '14px';
  div.style.display = 'flex';
  div.style.gap = '8px';
  div.style.flexWrap = 'wrap';
  div.innerHTML = `
    <button class="btn gh" onclick="downloadExport()" title="Download your progress as JSON" style="flex:1;min-width:120px">💾 Export</button>
    <button class="btn gh" onclick="triggerImport()" title="Restore progress from file" style="flex:1;min-width:120px">📤 Import</button>
    <button class="btn gh" onclick="toggleContrast()" title="Increase contrast" style="flex:1;min-width:120px">👁️ Contrast</button>
  `;
  settingsContainer.appendChild(div);
}

// Display crisis resources
function displayCrisisResources() {
  const crisisSection = document.querySelector('[data-section="crisis"]');
  if (!crisisSection) return;
  
  const resourcesHTML = `
    <div style="padding:14px 14px 70px;">
      <div class="card" onclick="window.location.href='tel:988'" style="cursor:pointer;margin-bottom:12px;">
        <div class="card-label">🚨 Immediate Crisis</div>
        <div style="font-size:20px;font-weight:800;color:var(--red)">Call 988</div>
        <div style="font-size:12px;color:var(--grey-4);margin-top:6px">Suicide & Crisis Lifeline (24/7 Free)</div>
      </div>
      <div class="card" onclick="window.location.href='https://www.rainn.org'" style="cursor:pointer;margin-bottom:12px;">
        <div class="card-label">⚠️ Sexual Assault</div>
        <div style="font-size:18px;font-weight:800;color:var(--red)">1-800-656-4673</div>
        <div style="font-size:12px;color:var(--grey-4);margin-top:6px">RAINN • Confidential & Free</div>
      </div>
      <div class="card" onclick="window.location.href='sms:741741?body=HOME'" style="cursor:pointer;margin-bottom:12px;">
        <div class="card-label">💬 Text Support</div>
        <div style="font-size:18px;font-weight:800;color:var(--red)">Text HOME to 741741</div>
        <div style="font-size:12px;color:var(--grey-4);margin-top:6px">Crisis Text Line • Free & Confidential</div>
      </div>
      <div class="card" style="background:var(--gold-light);border-color:#FDE68A;">
        <div class="card-label" style="color:var(--gold)">ℹ️ You Are Not Alone</div>
        <div style="font-size:13px;color:#78350F;line-height:1.6">
          What you're experiencing is real. Professional help is available. God is with you. Reach out today.
        </div>
      </div>
    </div>
  `;
  crisisSection.innerHTML = resourcesHTML;
}

// Module completion
function completeModule(moduleId) {
  markComplete(moduleId);
  showCelebration();
  renderProgress();
}

// Save before leaving
window.addEventListener('beforeunload', () => {
  saveChecklist();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 'e') {
    e.preventDefault();
    downloadExport();
  }
  if (e.altKey && e.key === 'i') {
    e.preventDefault();
    triggerImport();
  }
});
