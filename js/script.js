let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let CompletedCount = document.getElementById("completedCount");
let uncompletedCount = document.getElementById("uncompletedCount");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        taskList.innerHTML += `
<div class="border rounded p-3 mb-3 d-flex align-items-center task-box">
<input type="checkbox" class="form-check-input me-3 task-checkbox" ${task.completed ? "checked" : ""} onchange="completeTask(this,${index})">
<span class="flex-grow-1 task-text me-3" style="text-decoration:${task.completed ? "line-through" : "none"};color:${task.completed ? "gray" : "black"}">${task.text}</span>
<input type="text" class="form-control edit-input me-2" value="${task.text}" style="display:none;">
<button class="btn btn-sm btn-success save-btn me-2" onclick="saveTask(this,${index})" style="display:none;">Save</button>
<button class="btn btn-sm btn-danger me-2" onclick="deleteTask(${index})">Delete</button>
<button class="btn btn-sm btn-warning edit-btn" onclick="editTask(this)">Edit</button>
</div>`;
    });
    updateCount();
}

displayTasks();

addBtn.addEventListener("click", function () {
    let task = taskInput.value.trim();
    if (task === "") return;
    let newTask = { text: task, completed: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
});

function completeTask(checkbox, index) {
    tasks[index].completed = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function updateCount() {
    let completed = 0;
    let uncompleted = 0;
    tasks.forEach(function (task) {
        if (task.completed) {
            completed++;
        } else {
            uncompleted++;
        }
    });
    CompletedCount.textContent = completed;
    uncompletedCount.textContent = uncompleted;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(button) {
    let taskBox = button.closest(".task-box");
    let taskText = taskBox.querySelector(".task-text");
    let input = taskBox.querySelector(".edit-input");
    let checkbox = taskBox.querySelector(".task-checkbox");
    let editButton = taskBox.querySelector(".edit-btn");
    let saveButton = taskBox.querySelector(".save-btn");
    input.value = taskText.textContent.trim();
    taskText.style.display = "none";
    input.style.display = "block";
    checkbox.style.display = "none";
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    input.focus();
}

function saveTask(button, index) {
    let taskBox = button.closest(".task-box");
    let input = taskBox.querySelector(".edit-input");
    let newTask = input.value.trim();
    if (newTask === "") {
        input.focus();
        return;
    }
    tasks[index].text = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}