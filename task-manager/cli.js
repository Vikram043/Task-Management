const readline = require('readline');
const { addTask, listTasks, deleteTask, completeTask } = require('./taskManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  while (true) {
    console.log(`\nCommands: add | list | delete | complete | quit`);
    const cmd = await ask("Enter command: ");

    if (cmd === 'add') {
      const title = await ask("Enter title: ");
      const due = await ask("Enter due date (YYYY-MM-DD): ");
      addTask(title.trim(), due.trim());

    } else if (cmd === 'list') {
      listTasks();

    } else if (cmd === 'delete') {
      const id = parseInt(await ask("Enter task ID to delete: "));
      deleteTask(id);

    } else if (cmd === 'complete') {
      const id = parseInt(await ask("Enter task ID to complete: "));
      completeTask(id);

    } else if (cmd === 'quit') {
      console.log("👋 Goodbye!");
      rl.close();
      break;

    } else {
      console.log("❌ Unknown command.");
    }
  }
}

main();
