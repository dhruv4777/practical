import { describe, it, expect, beforeEach } from 'vitest';
import { TaskManager } from '../src/taskManager.js';

describe('TaskManager Unit Tests', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager([
      { id: '1', title: 'Setup GitHub Actions', priority: 'High', category: 'DevOps', completed: false },
      { id: '2', title: 'Write Vitest Unit Tests', priority: 'High', category: 'Testing', completed: true },
      { id: '3', title: 'Design Modern UI', priority: 'Medium', category: 'Frontend', completed: false }
    ]);
  });

  it('should initialize with initial tasks', () => {
    expect(taskManager.tasks.length).toBe(3);
  });

  it('should add a new task successfully', () => {
    const newTask = taskManager.addTask('Deploy Web App', 'High', 'Deployment');
    expect(newTask.title).toBe('Deploy Web App');
    expect(newTask.completed).toBe(false);
    expect(taskManager.tasks.length).toBe(4);
  });

  it('should throw an error if task title is empty', () => {
    expect(() => taskManager.addTask('')).toThrow('Task title cannot be empty');
    expect(() => taskManager.addTask('   ')).toThrow('Task title cannot be empty');
  });

  it('should toggle task completion status', () => {
    const toggled = taskManager.toggleTask('1');
    expect(toggled.completed).toBe(true);

    const toggledAgain = taskManager.toggleTask('1');
    expect(toggledAgain.completed).toBe(false);
  });

  it('should delete a task by ID', () => {
    const success = taskManager.deleteTask('2');
    expect(success).toBe(true);
    expect(taskManager.tasks.length).toBe(2);
    expect(taskManager.tasks.find(t => t.id === '2')).toBeUndefined();
  });

  it('should filter tasks accurately', () => {
    const activeTasks = taskManager.getFilteredTasks('active');
    expect(activeTasks.length).toBe(2);

    const completedTasks = taskManager.getFilteredTasks('completed');
    expect(completedTasks.length).toBe(1);
    expect(completedTasks[0].id).toBe('2');
  });

  it('should search tasks by title or category', () => {
    const searchResult = taskManager.getFilteredTasks('all', 'DevOps');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].title).toBe('Setup GitHub Actions');
  });

  it('should calculate task stats correctly', () => {
    const stats = taskManager.getStats();
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(1);
    expect(stats.active).toBe(2);
    expect(stats.completionPercentage).toBe(33);
  });

  it('should clear all completed tasks', () => {
    const removedCount = taskManager.clearCompletedTasks();
    expect(removedCount).toBe(1);
    expect(taskManager.tasks.length).toBe(2);
    expect(taskManager.tasks.some(t => t.completed)).toBe(false);
  });
});
