(function() {
  var taskInput = document.getElementById("new-task");
  var addButton = document.getElementById("add");
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");
  var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  var completedList = JSON.parse(localStorage.getItem("completedList")) || [];

  var todoLength = todoList.length;
  for (var todo = 0; todo < todoLength; todo++) {
    incompleteTasksHolder.appendChild(createNewTaskElement(todoList[todo]));
  }

  var completedTodoLength = completedList.length;
  for (var todo = 0; todo < completedTodoLength; todo++) {
    incompleteTasksHolder.appendChild(createNewTaskElement(todoList[todo]));
  }

  function createNewTaskElement(taskString, arr) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  var addTask = function() {
    const inputValue = taskInput.value;
    document.getElementById("demo").innerHTML = inputValue
      ? ""
      : "Please Enter Something!!!";
    if (inputValue) {
      todoList.push(inputValue);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      listItem = createNewTaskElement(inputValue);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      taskInput.value = "";
    }
  };

  var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      label.innerText = editInput.value;
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
  };

  var deleteTask = function(el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
  };

  var taskCompleted = function(el) {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  addButton.addEventListener("click", addTask);

  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
})();
