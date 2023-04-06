function getElement(attrib) {
  return document.querySelector(attrib);
}

function getElements(attrib) {
  return document.querySelectorAll(attrib);
}

function createTaskCard() {
  const tasks = getTasks();

  const tasksList = getElement('.section-tasks');
  tasksList.innerHTML = ''

  let output = "";

  if (tasks.length === 0) {
    output = `<p class="empty">Nothing here yet</p>`
    tasksList.innerHTML = output;
  } else {
    tasks.forEach((task) => {

      const isActive = task.active;

      output += `
        <div class="task-card">
          <p>
            <input type="checkbox" class="task" name="${'task_'+task.id}" id="${task.id}" ${!isActive && 'checked'}>
            <label for="${task.id}"></label>

            ${task.name} 
          </p>
          <button class="del-btn" id="${task.id}">X</button>
        </div>
      `;
  
      tasksList.innerHTML = output;
    });

    addListenerToTasks();
    addListenerToDeleteTaskButton();
  }
}

createTaskCard();


function addListenerToTasks() {
  const allTasks = getElements('.task');

  allTasks.forEach(task => {

    task.addEventListener('change', (e) => {
      const tasks = getTasks();
      
      const updatedTasks = tasks.map((task) => {
        if (task.id === Number(e.target.id)) {
          console.log(!task.active);
          task.active = !task.active;
        }
        
        return task;
      });
      
      localStorage.setItem(
        'tasks',
        JSON.stringify(updatedTasks)
      );

    });

  });
}

function addListenerToDeleteTaskButton() {
  const allBtns = getElements('.del-btn');

  allBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const tasks = getTasks();

      const filteredtasks = tasks.filter((task) => {
        if (task.id !== Number(e.target.id)) return task;
      });

      localStorage.setItem(
        'tasks',
        JSON.stringify(filteredtasks)
      );

      createTaskCard();
    });
  });
}

const btnSubmit = getElement('#btn-submit');

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const newTask = getElement('.new-task')

  if (!newTask.value) {
    newTask.classList += ' invalid-content';
    newTask.focus();

  } else {
    addTask(newTask.value);
  
    newTask.value = ''
    newTask.focus();
  
    createTaskCard();
  }
})

// Service Worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service Worker registered"))
      .catch(err => console.log("Service Worker not registered"));
  });
}