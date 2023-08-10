const addBtn = document.querySelector("#new-task-add");
const newInput = document.querySelector("#new-task-content");
const tasksList = document.querySelector(".tasks");
const values = []

function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("your-task");
    newDiv.innerHTML = `<div class="your-task-stats">
            <button class="your-task-status" name="your-task-status"> </button>
            <input type="text" class="your-task-content" name="your-task-content" value="${task}" readonly>
        </div>
        <div class="your-task-actions">
            <button class="your-task-change" name="your-task-change">EDIT</button>
            <button class="your-task-remove" name="your-task-remove">DELETE</button>
        </div>`;

    tasksList.appendChild(newDiv);
  });
  setupTaskActions();
}

function setupTaskActions() {
  var deleteTasks = document.querySelectorAll(".your-task-remove");
  for (var i = 0; i < deleteTasks.length; i++) {
    deleteTasks[i].addEventListener("click", function () {
      this.parentNode.parentNode.remove();
      removeTaskFromStorage(
        this.parentNode.previousElementSibling.querySelector(
          ".your-task-content"
        ).value
      );
    });
  }

  // ... (your existing code for strike and edit actions)
}

function removeTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((item) => item !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInStorage(previousContent, newContent) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(previousContent);
  if (index !== -1) {
    tasks[index] = newContent;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

addBtn.addEventListener("click", add_new_task);
document.addEventListener("DOMContentLoaded", loadTasksFromStorage);

function add_new_task() {
  var valueInput = newInput.value;
  if (!valueInput) {
    alert("Please enter a task to do!");
    return;
  }

  let newDiv = document.createElement("div");
  newDiv.classList.add("your-task");
  newDiv.innerHTML = `<div class="your-task-stats">
        <button class="your-task-status" name="your-task-status"> </button>
        <input type="text" class="your-task-content" name="your-task-content" value="${valueInput}" readonly>
    </div>
    <div class="your-task-actions">
        <button class="your-task-change" name="your-task-change">EDIT</button>
        <button class="your-task-remove" name="your-task-remove">DELETE</button>
    </div>`;

  tasksList.appendChild(newDiv);
  saveTaskToStorage(valueInput);
  newInput.value = "";
}

document.addEventListener("mousemove", checkTasks);

function checkTasks() {
  var undoneTasks = document.querySelectorAll(".your-task-remove");
  for (var i = 0; i < undoneTasks.length; i++) {
    undoneTasks[i].onclick = function () {
      this.parentNode.parentNode.remove();
    };
  }

  var strikeTasks = document.querySelectorAll(".your-task-status");
  for (var i = 0; i < strikeTasks.length; i++) {
    strikeTasks[i].onclick = function () {
      var changeText = this.parentNode.children[1];
      changeText.style.textDecoration = "line-through";
      changeText.style.fontStyle = "italic";
      var disableEdit = this.parentNode.parentNode.children[1].children[0];
      disableEdit.disabled = true;

      setupTaskActions();
    };
  }
  

  var editTasks = document.querySelectorAll(".your-task-change");
  var previousContent ="";
  for (var i = 0; i < editTasks.length; i++) {
    editTasks[i].onclick = function () {
      if (this.innerText == "EDIT") {
        var editText = this.parentNode.parentNode.children[0].children[1];
        console.log(editText.value);
        values[0] = editText.value;
        editText.removeAttribute("readonly");
        this.innerText = "SAVE";
        editText.focus();
      } else {
        var editText = this.parentNode.parentNode.children[0].children[1];
        values[1] = editText.value;
        editText.setAttribute("readonly", true);
        this.innerText = "EDIT";

        // Update the task in local storage
        updateTaskInStorage(values[0], values[1]);
      }
    };
  }
}
