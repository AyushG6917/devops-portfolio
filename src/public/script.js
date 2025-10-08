const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const API_URL = "/tasks";

// Fetch and display tasks
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task!");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  taskInput.value = "";
  loadTasks();
});

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Load tasks on page load
loadTasks();
