// ============================================================================
// NOVADEV - AI DEVELOPER PRODUCTIVITY PLATFORM
// Script by Haseeb Ullah
// ============================================================================

// Theme Management with localStorage
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
let activeTheme = localStorage.getItem('novadevTheme') || 'dark';

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--bg', '#070b14');
    root.style.setProperty('--surface', 'rgba(13, 18, 30, 0.92)');
    root.style.setProperty('--surface-strong', 'rgba(18, 24, 40, 0.98)');
    root.style.setProperty('--surface-soft', 'rgba(33, 41, 61, 0.72)');
    root.style.setProperty('--text', '#eef4ff');
    root.style.setProperty('--muted', '#a5b0de');
    root.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
    themeToggle.textContent = 'Light';
  } else {
    root.style.setProperty('--bg', '#f6f7fb');
    root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.92)');
    root.style.setProperty('--surface-strong', 'rgba(255, 255, 255, 0.98)');
    root.style.setProperty('--surface-soft', 'rgba(245, 247, 251, 0.72)');
    root.style.setProperty('--text', '#0f172a');
    root.style.setProperty('--muted', '#64748b');
    root.style.setProperty('--border', 'rgba(15, 23, 42, 0.08)');
    themeToggle.textContent = 'Dark';
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

themeToggle.addEventListener('click', () => {
  activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('novadevTheme', activeTheme);
  applyTheme(activeTheme);
  showToast(`Switched to ${activeTheme} mode ✨`);
});

// ============================================================================
// JSON FORMATTER
// ============================================================================

const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const formatBtn = document.getElementById('formatBtn');
const compressBtn = document.getElementById('compressBtn');
const copyJsonBtn = document.getElementById('copyJsonBtn');

formatBtn?.addEventListener('click', () => {
  try {
    const input = jsonInput.value.trim();
    if (!input) {
      showToast('Please paste JSON first');
      return;
    }
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    jsonOutput.innerHTML = `<code>${escapeHtml(formatted)}</code>`;
    showToast('JSON formatted successfully ✓');
  } catch (error) {
    jsonOutput.innerHTML = `<code style="color: #ff6b6b;">❌ Invalid JSON: ${escapeHtml(error.message)}</code>`;
    showToast('Invalid JSON format');
  }
});

compressBtn?.addEventListener('click', () => {
  try {
    const input = jsonInput.value.trim();
    if (!input) {
      showToast('Please paste JSON first');
      return;
    }
    const parsed = JSON.parse(input);
    const compressed = JSON.stringify(parsed);
    jsonOutput.innerHTML = `<code>${escapeHtml(compressed)}</code>`;
    showToast('JSON compressed ✓');
  } catch (error) {
    showToast('Invalid JSON format');
  }
});

copyJsonBtn?.addEventListener('click', () => {
  const output = jsonOutput.textContent;
  if (!output || output.includes('Output appears here')) {
    showToast('No output to copy');
    return;
  }
  navigator.clipboard.writeText(output).then(() => {
    showToast('Copied to clipboard 📋');
  });
});

// ============================================================================
// JWT DECODER
// ============================================================================

const jwtInput = document.getElementById('jwtInput');
const jwtOutput = document.getElementById('jwtOutput');
const decodeBtn = document.getElementById('decodeBtn');

function decodeBase64(str) {
  try {
    return JSON.parse(atob(str));
  } catch (e) {
    return { error: 'Invalid Base64' };
  }
}

decodeBtn?.addEventListener('click', () => {
  const token = jwtInput.value.trim();
  if (!token) {
    showToast('Please paste a JWT token');
    return;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    jwtOutput.innerHTML = `<code style="color: #ff6b6b;">❌ Invalid JWT format (must have 3 parts)</code>`;
    showToast('Invalid JWT format');
    return;
  }

  try {
    const header = decodeBase64(parts[0]);
    const payload = decodeBase64(parts[1]);

    let output = '📋 HEADER:\n';
    output += JSON.stringify(header, null, 2) + '\n\n';
    output += '📦 PAYLOAD:\n';
    output += JSON.stringify(payload, null, 2) + '\n\n';

    if (payload.exp) {
      const expiryDate = new Date(payload.exp * 1000);
      const now = new Date();
      output += `⏰ EXPIRY: ${expiryDate.toISOString()}\n`;
      output += `⏱️  ${expiryDate > now ? '✓ Valid' : '❌ Expired'}`;
    }

    jwtOutput.innerHTML = `<code>${escapeHtml(output)}</code>`;
    showToast('JWT decoded successfully ✓');
  } catch (error) {
    jwtOutput.innerHTML = `<code style="color: #ff6b6b;">❌ Error: ${escapeHtml(error.message)}</code>`;
    showToast('Failed to decode JWT');
  }
});

// ============================================================================
// AI ASSISTANT (MOCK)
// ============================================================================

const aiInput = document.getElementById('aiInput');
const aiOutput = document.getElementById('aiOutput');
const sendBtn = document.getElementById('sendBtn');

// Mock AI responses
const aiResponses = {
  email: `// Email validation function
function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

// Usage
console.log(validateEmail('user@example.com')); // true`,
  
  async: `// Async/await best practices
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,

  api: `// RESTful API endpoint handler
app.post('/api/data', async (req, res) => {
  try {
    const { body } = req;
    const data = await processData(body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});`,

  react: `// React component with hooks
import React, { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Increment: {count}
    </button>
  );
}`
};

sendBtn?.addEventListener('click', () => {
  const prompt = aiInput.value.trim().toLowerCase();
  if (!prompt) {
    showToast('Please enter a prompt');
    return;
  }

  let response = aiResponses.async;
  
  if (prompt.includes('email') || prompt.includes('valid')) {
    response = aiResponses.email;
  } else if (prompt.includes('api') || prompt.includes('endpoint')) {
    response = aiResponses.api;
  } else if (prompt.includes('react') || prompt.includes('component')) {
    response = aiResponses.react;
  }

  aiOutput.innerHTML = `<code>💡 AI Suggestion (Mock):\n\n${escapeHtml(response)}</code>`;
  showToast('GPT-Dev processed your request ✓');
  aiInput.value = '';
});

// ============================================================================
// TOOL TABS SWITCHING
// ============================================================================

const tabButtons = document.querySelectorAll('.tab-btn');
const toolPanels = document.querySelectorAll('.tool-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tool = button.dataset.tool;
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    toolPanels.forEach(panel => panel.classList.remove('active'));
    
    button.classList.add('active');
    document.getElementById(`${tool}-tool`)?.classList.add('active');
  });
});

// ============================================================================
// DYNAMIC DASHBOARD
// ============================================================================

function generateDashboardStats() {
  const baseScore = Math.floor(Math.random() * 20) + 75;
  const score = Math.min(100, baseScore);
  const tasks = Math.floor(Math.random() * 15) + 12;
  const reviews = Math.floor(Math.random() * 18) + 15;
  const streak = Math.floor(Math.random() * 10) + 5;

  const activityEl = document.getElementById('activityScore');
  const tasksEl = document.getElementById('tasksClosed');
  const reviewsEl = document.getElementById('codeReviews');
  const streakEl = document.getElementById('streak');

  if (activityEl) activityEl.textContent = `${score}/100`;
  if (tasksEl) tasksEl.textContent = tasks;
  if (reviewsEl) reviewsEl.textContent = reviews;
  if (streakEl) streakEl.textContent = `${streak} days`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  applyTheme(activeTheme);
  generateDashboardStats();
  showToast('Welcome to NovaDev — built by Haseeb Ullah 🚀');
});

// Regenerate dashboard stats every 30 seconds for dynamic effect
setInterval(generateDashboardStats, 30000);
