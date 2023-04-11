/*  global FILTER, getTasks, addTask */

function getElement(attrib) {
  return document.querySelector(attrib);
}

function getElements(attrib) {
  return document.querySelectorAll(attrib);
}

function createCard(task, isActive) {
  return `
          <div class="task-card">
            <p>
              <input type="checkbox" class="task" name=task_"${task.id}" id="task_${task.id}" ${!isActive && 'checked'}>
              <label for="task_${task.id}"></label>

              ${task.name} 
            </p>
            <button class="del-btn" id="${task.id}">X</button>
          </div>
        `;
}

function createTaskCards(tasks) {
  const tasksList = getElement('.section-tasks');
  tasksList.innerHTML = '';

  let output = '';

  if (tasks.length === 0) {
    output = '<p class="empty">Nothing here yet</p>';
    tasksList.innerHTML = output;
  } else {
    tasks.forEach((task) => {
      output += createCard(task, task.active);

      tasksList.innerHTML = output;
    });

    addListenerToTasks();
    addListenerToDeleteTaskButton();
  }
}

function createInitialFilter() {
  const actualFilter = FILTER.get();

  if (!actualFilter) FILTER.set('all');
}

const FILTER_TASKS = {
  all: () => {
    const tasks = getTasks();

    createTaskCards(tasks);
  },
  active: () => {
    const tasks = getTasks();

    const filtered = tasks.filter((task) => task.active);

    createTaskCards(filtered);
  },
  completed: () => {
    const tasks = getTasks();

    const filtered = tasks.filter((task) => !task.active);

    createTaskCards(filtered);
  },
};

function addListenerToTasks() {
  const allTasks = getElements('.task');

  allTasks.forEach((task) => {
    task.addEventListener('change', (e) => {
      const tasks = getTasks();

      const updatedTasks = tasks.map((oldTask) => {
        const modifiedTask = oldTask;

        if (`task_${oldTask.id}` === e.target.id) {
          modifiedTask.active = !oldTask.active;
        }

        return modifiedTask;
      });

      localStorage.setItem(
        'tasks',
        JSON.stringify(updatedTasks),
      );

      FILTER_TASKS[FILTER.get()]();
    });
  });
}

createInitialFilter();

const actualFilter = FILTER.get();

FILTER_TASKS[actualFilter]();

function addListenerToDeleteTaskButton() {
  const allBtns = getElements('.del-btn');

  allBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const tasks = getTasks();

      const filteredtasks = tasks.filter((task) => task.id !== Number(e.target.id));

      localStorage.setItem(
        'tasks',
        JSON.stringify(filteredtasks),
      );

      FILTER_TASKS[FILTER.get()]();
    });
  });
}

const btnSubmit = getElement('#btn-submit');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const newTask = getElement('.new-task');

  if (!newTask.value) {
    newTask.classList += ' invalid-content';
    newTask.focus();
  } else {
    addTask(newTask.value);

    newTask.value = '';
    newTask.focus();

    FILTER_TASKS[actualFilter]();
  }
});

const filterBtns = getElements('.filter-btn');

filterBtns.forEach((button) => {
  const btn = button;

  if (btn.innerHTML === FILTER.get()) btn.className += ' active-filter';

  btn.addEventListener('click', (e) => {
    const filter = e.target.innerHTML;

    filterBtns.forEach((el) => {
      const elem = el;
      elem.className = 'filter-btn';
    });

    e.target.className += ' active-filter';

    FILTER.set(filter);
    FILTER_TASKS[filter]();
  });
});

// Service Worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('Service Worker', res.active.state))
      .catch((err) => console.log('Service Worker error', err));
  });
}
