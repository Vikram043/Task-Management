const fs = require('fs');
const path = require('path');

const TASK_FILE = path.join(__dirname, 'tasks.json');

// Helper: Load tasks
function loadTasks() {
  if (!fs.existsSync(TASK_FILE)) return [];
  const data = fs.readFileSync(TASK_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    console.log("⚠️ tasks.json is corrupted. Starting fresh.");
    return [];
  }
}

// Helper: Save tasks
function saveTasks(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

// Add a task
function addTask(title, dueDate) {
  const tasks = loadTasks();
  const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  const task = { id, title, dueDate, completed: false };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`✅ Task added: ID ${id} | ${title} | Due: ${dueDate}`);
}

// List all tasks
function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) return console.log("📭 No tasks found.");
  tasks.forEach(task => {
    const status = task.completed ? "✅" : "❌";
    console.log(`[${status}] ${task.id}. ${task.title} - Due: ${task.dueDate}`);
  });
}

// Delete task by ID
function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return console.log("❌ Task ID not found.");
  tasks.splice(index, 1);
  saveTasks(tasks);
  console.log(`🗑️ Task ${id} deleted.`);
}

// Mark task complete
function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return console.log("❌ Task ID not found.");
  task.completed = true;
  saveTasks(tasks);
  console.log(`✅ Task ${id} marked as completed.`);
}

module.exports = {
  addTask,
  listTasks,
  deleteTask,
  completeTask
};
