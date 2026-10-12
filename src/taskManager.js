/**
 * Task Management Core Logic
 */

export class TaskManager {
  constructor(initialTasks = []) {
    this.tasks = [...initialTasks];
  }

  addTask(title, priority = 'Medium', category = 'General') {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title cannot be empty');
    }

    const newTask = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      return task;
    }
    return null;
  }

  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    return this.tasks.length < initialLength;
  }

  clearCompletedTasks() {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => !t.completed);
    return initialLength - this.tasks.length;
  }

  getFilteredTasks(filter = 'all', searchQuery = '') {
    return this.tasks.filter(task => {
      const matchesFilter =
        filter === 'all' ? true :
        filter === 'active' ? !task.completed :
        filter === 'completed' ? task.completed : true;

      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      active,
      completionPercentage
    };
  }
}
