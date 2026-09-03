let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


let CompletedCount = document.getElementById("CompletedCount");
let uncompletedCount = document.getElementById("uncompletedCount");


addBtn.addEventListener("click", function () {

    let task = taskInput.value;
    if (task === "") {
        return;
    }

    taskList.innerHTML += `
   <div class ="border rounded p-3 mb-3 d-flex  align-items-center">
   <input type ="checkbox" class ="form-check-input me-3" onchange ="completeTask(this)">
   <span class ="flex-grow-1 task-text me-3 ">
      ${task}
      </span>

      <button class ="btn  btn-sm btn-danger me-2" onclick = "deleteTask(this)">
      Delete
      </button>

      <button class = "btn btn-sm btn-warning" onclick = "editTask(this)">
      Edit
      </button>

   </div>
   `;
    taskInput.value = "";
    updateCount();
});

function completeTask(checkbox) {
    let taskText = checkbox.nextElementSibling;

    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
    } else {
        taskText.style.textDecoration = "none";
        taskText.style.color = "black";
    }
    updateCount();
}

function updateCount() {
    let allTask = taskList.querySelectorAll(".form-check-input");

    let completed = 0;
    let uncompleted = 0;

    allTask.forEach(function (checkbox) {
        if (checkbox.checked) {
            completed++;
        } else {
            uncompleted++;
        }
    });
    CompletedCount.textContent = completed;
    uncompletedCount.textContent = uncompleted;
}

function deleteTask(button) {
    button.parentElement.remove();
    updateCount();
}

function editTask(button) {
    let taskBox = button.parentElement;
    let taskText = taskBox.querySelector(".task-text");
    let checkbox = taskBox.querySelector("input[type='checkbox']");
    let oldTask = taskText.textContent.trim();

    checkbox.style.display= "none";
    // let newTask = prompt("Edit your task:", taskText.textContent.trim());

    taskText.innerHTML = `
 <input type = "text" class= "form-control edit-input" value="${oldTask}"> 

        // <button class="btn btn-success btn-sm mt-2"
        //         onclick="saveTask(this)">
        //     Save
        // </button>
    `;
 button.style.display = "none";

 letinput = taskText.querySelector(".edit-input");
 input.focus();
//  document.getElementById("editTask").focus();
    // if (newTask !== null && newTask.trim() !== "") {
    //     taskText.textContent = newTask;
    // }
}
function saveTask(button){
    let taskBox = button.parentElement.parentElement;
    let taskText = taskBox.querySelector(".task-text");
    let input = taskText.querySelector("#editTask");
    let newTask = input.value.trim();

    if(newTask === ""){
        return;
    }
    taskText.textContent = newTask;
}