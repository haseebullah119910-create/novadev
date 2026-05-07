const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
let activeTheme = 'dark';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

themeToggle.addEventListener('click', () => {
  const root = document.documentElement;
  if (activeTheme === 'dark') {
    activeTheme = 'light';
    root.style.setProperty('--bg', '#f6f7fb');
    root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.92)');
    root.style.setProperty('--surface-strong', 'rgba(255, 255, 255, 0.98)');
    root.style.setProperty('--surface-soft', 'rgba(245, 247, 251, 0.72)');
    root.style.setProperty('--text', '#0f172a');
    root.style.setProperty('--muted', '#64748b');
    root.style.setProperty('--border', 'rgba(15, 23, 42, 0.08)');
    themeToggle.textContent = 'Dark';
    showToast('Light mode enabled');
  } else {
    activeTheme = 'dark';
    root.style.setProperty('--bg', '#070b14');
    root.style.setProperty('--surface', 'rgba(13, 18, 30, 0.92)');
    root.style.setProperty('--surface-strong', 'rgba(18, 24, 40, 0.98)');
    root.style.setProperty('--surface-soft', 'rgba(33, 41, 61, 0.72)');
    root.style.setProperty('--text', '#eef4ff');
    root.style.setProperty('--muted', '#a5b0de');
    root.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
    themeToggle.textContent = 'Light';
    showToast('Dark mode enabled');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  showToast('Welcome to NovaDev — built by Haseeb Ullah');
});
