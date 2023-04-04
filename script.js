
function getElement(attrib) {
  return document.querySelector(attrib);
}

function getElements(attrib) {
  return document.querySelectorAll(attrib);
}

function createElement() {
  const tasks = getTasks();

  const tasksList = getElement('.section-tasks');

  let output = "";

  if (tasks.length === 0) {
    output = `<p class="empity">Nothing here yet</p>`
    tasksList.innerHTML = output;
  }

  tasks.forEach((task) => {
    const isActive = task.active ? 'pending' : 'finished';

    output += `
      <div class="task-card">
        <p>${task.name} <input type="checkbox" class="task" name="${'task_'+task.id}" id="${task.id}" checked="${task.active}"></p>
      </div>
    `;

    tasksList.innerHTML = output;
  });
}



const btnSubmit = getElement('#btn-submit');

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const newTask = getElement('#new-task')

  console.log(newTask.value);

  addTask(newTask.value);

  newTask.value = ''
  newTask.focus();

  createElement();
})

createElement();


const allTasks = getElements('.task');

allTasks.forEach(task => {

  task.addEventListener('change', (e) => {
    const tasks = getTasks();

    const updatedTasks = tasks.map((task) => {
      if (task.id == e.target.id) {
        task.active = e.target.checked;
      }
      
      return task;
    });
    
    localStorage.setItem(
      'tasks',
      JSON.stringify(updatedTasks)
    );

    createElement();
  });

});


// Service Worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service Worker registered"))
      .catch(err => console.log("Service Worker not registered"));
  });
}