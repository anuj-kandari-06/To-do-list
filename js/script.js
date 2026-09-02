let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


let CompletedCount = document.getElementById("CompletedCount");
let uncompletedCount =document.getElementById("uncompletedCount");


addBtn.addEventListener("click" , function() {
 
    let task = taskInput.value;
   if(task === ""){
    return;
   }

   taskList.innerHTML  += `
   <div class ="border rounded p-2 mb-2 d-flex  align-item-center">
   <input type ="checkbox" class ="form-check-input me-3" onchange ="completeTask(this)">
   <span class =flex-grow-1 task-text me-3 ">
      ${task}
      </span>

      <button class ="btn  btn-sm btn-danger me-2">
      Delete
      </button>

      <button class = "btn btn-sm btn-warning">
      Edit
      </button>

   </div>
   `;
   taskInput.value = "";
   updateCount();
});

function completeTask(checkbox){
    let taskText = checkbox.nextElementSibling;

    if(checkbox.checked){
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
    } else{
        taskText.style.textDecoration ="none";
        taskText.style.color ="black";
    }
     updateCount();
}

function updateCount(){
    let allTask =taskList.querySelectorAll(".form-check-input");

    let completed = 0;
    let uncompleted = 0;

    allTasks.forEach(function(checkbox){
        if (checkbox.checked){
            completed++;
        } else{
            uncompleted++;
        }
    });
    CompletedCount.textContent = completed;
    uncompletedCount.textContent = uncompleted;
}