import { TaskManager } from './taskManager.js';

const initialTasks = [
  { id: '1', title: 'Setup GitHub Actions workflow (.github/workflows/build-and-test.yml)', priority: 'High', category: 'DevOps', completed: true },
  { id: '2', title: 'Write Vitest suite for HTML/CSS/JS code validation', priority: 'High', category: 'Testing', completed: true },
  { id: '3', title: 'Configure automatic build and test script in package.json', priority: 'Medium', category: 'DevOps', completed: true },
  { id: '4', title: 'Push sample project to GitHub repository', priority: 'High', category: 'DevOps', completed: false }
];

const manager = new TaskManager(initialTasks);
let currentFilter = 'all';
let currentSearch = '';

// DOM Elements
const taskListEl = document.getElementById('task-list');
const formEl = document.getElementById('add-task-form');
const titleInputEl = document.getElementById('task-title');
const prioritySelectEl = document.getElementById('task-priority');
const categorySelectEl = document.getElementById('task-category');
const searchInputEl = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Stats Elements
const statTotalEl = document.getElementById('stat-total');
const statCompletedEl = document.getElementById('stat-completed');
const statActiveEl = document.getElementById('stat-active');
const statRateEl = document.getElementById('stat-rate');

function renderStats() {
  const stats = manager.getStats();
  if (statTotalEl) statTotalEl.textContent = stats.total;
  if (statCompletedEl) statCompletedEl.textContent = stats.completed;
  if (statActiveEl) statActiveEl.textContent = stats.active;
  if (statRateEl) statRateEl.textContent = `${stats.completionPercentage}%`;
}

function renderTasks() {
  const filtered = manager.getFilteredTasks(currentFilter, currentSearch);
  renderStats();

  if (!taskListEl) return;

  if (filtered.length === 0) {
    taskListEl.innerHTML = `
      <div class="empty-state">
        ✨ No tasks found. Add a new task above!
      </div>
    `;
    return;
  }

  taskListEl.innerHTML = filtered.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-left">
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle">
        <span class="task-title">${escapeHtml(task.title)}</span>
      </div>
      <div class="task-meta">
        <span class="tag tag-priority-${task.priority}">${task.priority}</span>
        <span class="tag tag-category">${escapeHtml(task.category)}</span>
        <button class="btn-delete" data-action="delete" title="Delete Task">✕</button>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Event Listeners
if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInputEl.value.trim();
    const priority = prioritySelectEl.value;
    const category = categorySelectEl.value;

    if (title) {
      manager.addTask(title, priority, category);
      titleInputEl.value = '';
      renderTasks();
    }
  });
}

if (taskListEl) {
  taskListEl.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.task-item');
    if (!itemEl) return;

    const id = itemEl.dataset.id;
    const action = e.target.dataset.action;

    if (action === 'toggle') {
      manager.toggleTask(id);
      renderTasks();
    } else if (action === 'delete') {
      manager.deleteTask(id);
      renderTasks();
    }
  });
}

if (searchInputEl) {
  searchInputEl.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderTasks();
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Initial Render
renderTasks();
