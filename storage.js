const TASKS_ID = {
  get: () => {
    const id = localStorage.getItem('index');

    return Number(id);
  },

  set: (newId) => {
    localStorage.setItem('index', newId);
  }
}

const FILTER = {
  get: () => {
    const filter = localStorage.getItem('filter');

    return filter;
  },

  set: (newFilter) => {
    localStorage.setItem('filter', newFilter);
  }
}

function getTasks() {
  const tasks = localStorage.getItem(('tasks'));

  if (tasks) return JSON.parse(tasks);

  return [];
}

function addTask(task) {
  const tasks = localStorage.getItem('tasks');

  let id = TASKS_ID.get();

  const newTask = {
    id,
    name: task,
    active: true,
    date: new Date(),
  }

  TASKS_ID.set(++id);

  if (tasks) {
    const oldTasks = getTasks();

    oldTasks.push(newTask);

    localStorage.setItem(
      'tasks',
      JSON.stringify(oldTasks)
    );
  } else {
    localStorage.setItem(
      'tasks',
      JSON.stringify([newTask])
    );
  }
}

