/**
 * Storage.js - LocalStorage management for Restored in Him
 * Handles persistence of user data, progress, and preferences
 */

// Streak management
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

// Points management
function getPoints() {
  return parseInt(localStorage.getItem('points') || '0');
}

function addPoints(amount) {
  let pts = getPoints();
  pts += amount;
  localStorage.setItem('points', pts);
  return pts;
}

// Module completion tracking
function getCompleted() {
  return JSON.parse(localStorage.getItem('completed') || '[]');
}

function markComplete(module) {
  const list = getCompleted();
  if (!list.includes(module)) {
    list.push(module);
    localStorage.setItem('completed', JSON.stringify(list));
    addPoints(100);
  }
}

function isModuleComplete(module) {
  return getCompleted().includes(module);
}

// Tier/difficulty selection
function getTier() {
  return localStorage.getItem('tier') || 'gentle';
}

function setTierLocal(tier) {
  localStorage.setItem('tier', tier);
}

// Checklist persistence
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

// Data export
function exportData() {
  const data = {
    exported: new Date().toISOString(),
    version: '1.0',
    streak: getStreak(),
    points: getPoints(),
    completed: getCompleted(),
    tier: getTier(),
    checklist: JSON.parse(localStorage.getItem('checklist') || '{}'),
    lastVisit: localStorage.getItem('lastVisit')
  };
  return JSON.stringify(data, null, 2);
}

function downloadExport() {
  const data = exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `restored-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Data import
function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (data.version !== '1.0') {
      throw new Error('Incompatible data version');
    }
    
    localStorage.setItem('streak', data.streak.toString());
    localStorage.setItem('points', data.points.toString());
    localStorage.setItem('completed', JSON.stringify(data.completed));
    localStorage.setItem('tier', data.tier);
    localStorage.setItem('checklist', JSON.stringify(data.checklist));
    localStorage.setItem('lastVisit', data.lastVisit);
    
    return true;
  } catch (err) {
    console.error('Import error:', err);
    return false;
  }
}

function triggerImport() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (importData(event.target.result)) {
        alert('Data imported successfully! Refresh the page to see changes.');
        location.reload();
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Clear all data (with confirmation)
function clearAllData() {
  if (confirm('Are you sure? This will delete all your progress, streaks, and saved data.')) {
    localStorage.clear();
    alert('All data cleared. Refresh the page.');
    location.reload();
  }
}
