// script.js

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
document.getElementById('showAllBtn').addEventListener('click', showAllTasks);
document.getElementById('showActiveBtn').addEventListener('click', showActiveTasks);
document.getElementById('showCompletedBtn').addEventListener('click', showCompletedTasks);

let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  taskInput.value = ''; // Clear input after adding the task
}

function renderTasks(filter = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.toggle('completed', task.completed);
    
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} class="checkbox" data-id="${task.id}" />
      <span class="task-text">${task.text}</span>
      <button class="edit-btn" data-id="${task.id}">Edit</button>
      <button class="remove-btn" data-id="${task.id}">Remove</button>
    `;
    
    taskList.appendChild(taskItem);

    taskItem.querySelector('.checkbox').addEventListener('click', toggleTaskCompletion);
    taskItem.querySelector('.edit-btn').addEventListener('click', editTask);
    taskItem.querySelector('.remove-btn').addEventListener('click', removeTask);
  });
}

function toggleTaskCompletion(e) {
  const taskId = parseInt(e.target.getAttribute('data-id'));
  const task = tasks.find(t => t.id === taskId);
  task.completed = e.target.checked;
  renderTasks();
}

function editTask(e) {
  const taskId = parseInt(e.target.getAttribute('data-id'));
  const task = tasks.find(t => t.id === taskId);
  
  const newText = prompt('Edit your task:', task.text);
  if (newText) {
    task.text = newText;
    renderTasks();
  }
}

function removeTask(e) {
  const taskId = parseInt(e.target.getAttribute('data-id'));
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

function showAllTasks() {
  renderTasks('all');
}

function showActiveTasks() {
  renderTasks('active');
}

function showCompletedTasks() {
  renderTasks('completed');
}
