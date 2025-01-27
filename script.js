// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select the "Add Task" button, input field, and task list container
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage and display them
  function loadTasks() {
    // Get tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Clear existing task list
    taskList.innerHTML = "";

    // Create and display task items from the tasks array
    tasks.forEach(function(taskText) {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;

      // Create a "Remove" button for the task
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";

      // Add "remove-btn" class to the remove button using classList.add
      removeButton.classList.add("remove-btn");

      // Add functionality to remove the task when the "Remove" button is clicked
      removeButton.addEventListener("click", function () {
        removeTask(taskItem, taskText);
      });

      // Append the remove button to the task item
      taskItem.appendChild(removeButton);

      // Append the task item to the task list
      taskList.appendChild(taskItem);
    });
  }

  // Function to add a new task
  function addTask() {
    // Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create a new list item for the task
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Create a "Remove" button for the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    // Add "remove-btn" class to the remove button using classList.add
    removeButton.classList.add("remove-btn");

    // Add functionality to remove the task when the "Remove" button is clicked
    removeButton.addEventListener("click", function () {
      removeTask(taskItem, taskText);
    });

    // Append the remove button to the task item
    taskItem.appendChild(removeButton);

    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the task input field
    taskInput.value = "";

    // Save the task to Local Storage
    saveTaskToLocalStorage(taskText);
  }

  // Function to save tasks to Local Storage
  function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to remove a task from the list and Local Storage
  function removeTask(taskItem, taskText) {
    // Remove the task from the DOM
    taskList.removeChild(taskItem);

    // Remove the task from the tasks array in Local Storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Event listener for the Enter key in the task input field
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
