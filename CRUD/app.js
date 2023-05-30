// Model
const tasks = [];

// View
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const editForm = document.getElementById('editForm');
const editTitleInput = document.getElementById('editTitleInput');
const editDescriptionInput = document.getElementById('editDescriptionInput');
const cancelEditButton = document.getElementById('cancelEditButton');
let currentEditIndex = null;

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const taskTitle = document.createElement('h3');
    const taskDescription = document.createElement('p');
    const deleteLink = document.createElement('a');
    const editButton = document.createElement('button');

    taskTitle.textContent = task.title;
    taskDescription.textContent = task.description;
    deleteLink.href = '#';
    deleteLink.textContent = 'Delete';
    editButton.textContent = 'Edit';

    deleteLink.addEventListener('click', () => {
      deleteTask(index);
    });

    editButton.addEventListener('click', () => {
      editTask(index);
    });

    li.appendChild(taskTitle);
    li.appendChild(taskDescription);
    li.appendChild(deleteLink);
    li.appendChild(editButton);

    taskList.appendChild(li);
  });
}

function addTask(title, description) {
  const task = { title, description };
  tasks.push(task);
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  editTitleInput.value = task.title;
  editDescriptionInput.value = task.description;
  currentEditIndex = index;
  editForm.style.display = 'block';
}

function saveEdit() {
  const newTitle = editTitleInput.value;
  const newDescription = editDescriptionInput.value;
  tasks[currentEditIndex].title = newTitle;
  tasks[currentEditIndex].description = newDescription;
  renderTasks();
  cancelEdit();
}

function cancelEdit() {
  editForm.style.display = 'none';
  editTitleInput.value = '';
  editDescriptionInput.value = '';
  currentEditIndex = null;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Controller
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  addTask(title, description);
  titleInput.value = '';
  descriptionInput.value = '';
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  saveEdit();
});

cancelEditButton.addEventListener('click', () => {
  cancelEdit();
});

renderTasks();
