const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter button");
const dateDisplay = document.getElementById("date");

// Show current date
const today = new Date();
dateDisplay.textContent = today.toDateString();

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", e => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});
