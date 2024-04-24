const input = document.getElementById("input");
const btn = document.getElementById("btn");
const todoTaskcontainer = document.getElementById("todoTask");
const todo = JSON.parse(localStorage.getItem("todo")) || [];
const Tooltip = document.querySelectorAll(".tt");

let editIndex = null;

function handleSubmit(event) {
  event.preventDefault();
  if (input.value.trim() !== "") {
    if (editIndex !== null) {
      todo[editIndex].task = input.value.trim();
      editIndex = null;
      input.value = "";
      taskContainer();
    } else {
      addTodo();
    }
    input.focus();
  } else {
    alert("Please enter a task");
  }
}

function addTodo() {
  const taskInput = input.value.trim();
  if (taskInput) {
    const newTask = {
      task: taskInput,
      completed: false,
    };
    todo.push(newTask);
    taskContainer();
  }
}

function taskContainer() {
  todoTaskcontainer.innerHTML = "";
  const tasksHTML = todo.map((item, index) => {
    return `
      <div class="carding">
        <span id="task-${index}" style="color: ${
      item.completed ? "red" : "inherit"
    }; text-decoration: ${item.completed ? "line-through" : "none"};">${
      item.task
    }</span>
        <div class="btn-group d-flex  gap-1 text-center" align-items-center">
          <button onclick="deleteTask(${index})" data-bs-toggle="tooltip" data-bs-placement="left" title="delete button" class="border-0 px-2 py-1 rounded-pill bg-danger text-white">delete</button>
          <button onclick="editTask(${index})" data-bs-toggle="tooltip" data-bs-placement="left" title="edit button" class="border-0 px-2 py-1 rounded-pill bg-warning text-white">edit</button>
          <button onclick="completedTask(${index})" data-bs-toggle="tooltip" data-bs-placement="left" title="complete button" class="border-0 px-2 py-1 rounded-pill bg-success text-light">complete</button>
        </div>
      </div>
    `;
  });
  todoTaskcontainer.innerHTML = tasksHTML.join("");
  localStorage.setItem("todo", JSON.stringify(todo));
}

function deleteTask(index) {
  todo.splice(index, 1);
  taskContainer();
}

function completedTask(index) {
  const task = todo[index];
  task.completed = !task.completed;
  taskContainer();
}

function editTask(index) {
  input.value = todo[index].task;
  editIndex = index;
}

taskContainer();

Tooltip.forEach((tt) => {
  new bootstrap.Tooltip(tt);
});
