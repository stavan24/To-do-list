const todoInput = document.getElementById("todo-input");
const addtaskbtn = document.getElementById("add-task-btn");
const todolist = document.getElementById("todo-list");

// ❗ STOP if not on todo page
if (todoInput && addtaskbtn && todolist) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((t) => renderTask(t));

  addtaskbtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    todolist.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}


// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}


// ========== HAMBURGER ==========
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}


// ========== PROFILE LOGIC ==========
const nameText = document.getElementById("name-text");
const emailText = document.getElementById("email-text");
const editBtn = document.getElementById("edit-profile");
const saveBtn = document.getElementById("save-profile");
const editArea = document.querySelector(".edit-area");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");

// Load profile
if (nameText && emailText) {
  nameText.textContent = localStorage.getItem("name") || "User";
  emailText.textContent = localStorage.getItem("email") || "user@email.com";
}

// Show edit inputs
if (editBtn) {
  editBtn.addEventListener("click", () => {
    editArea.classList.remove("hidden");

    nameInput.placeholder = nameText.textContent;
    emailInput.placeholder = emailText.textContent;
  });
}

// Save profile
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    if (nameInput.value.trim()) {
      localStorage.setItem("name", nameInput.value.trim());
      nameText.textContent = nameInput.value.trim();
    }

    if (emailInput.value.trim()) {
      localStorage.setItem("email", emailInput.value.trim());
      emailText.textContent = emailInput.value.trim();
    }

    editArea.classList.add("hidden");
    nameInput.value = "";
    emailInput.value = "";
  });
}
