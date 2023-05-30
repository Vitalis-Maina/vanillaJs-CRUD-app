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

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <a href="#" onclick="deleteTask(${index});">Delete</a>
      <button onclick="editTask(${index});">Edit</button>
    `;
    taskList.appendChild(li);
  });
}

// Controller
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const description = descriptionInput.value;
  const task = { title, description };
  tasks.push(task);
  renderTasks();
  titleInput.value = '';
  descriptionInput.value = '';
});

function editTask(index) {
  const task = tasks[index];
  editTitleInput.value = task.title;
  editDescriptionInput.value = task.description;
  editForm.style.display = 'block';

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTitle = editTitleInput.value;
    const newDescription = editDescriptionInput.value;
    tasks[index].title = newTitle;
    tasks[index].description = newDescription;
    renderTasks();
    editForm.style.display = 'none';
    editTitleInput.value = '';
    editDescriptionInput.value = '';
  });

  cancelEditButton.addEventListener('click', () => {
    editForm.style.display = 'none';
    editTitleInput.value = '';
    editDescriptionInput.value = '';
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
