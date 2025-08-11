const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTasks(); // Load saved tasks
});


const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {

    event.preventDefault(); // Prevents form from submitting and refreshing the page

    const inputValue = input.value.trim();

    if (inputValue === ""){
        errorMessage.textContent = "Please enter a task.";
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        originalIndex: tasks.length
    };

    // Add task to array
    tasks.push(task);
    console.log(tasks);
    // Clear input and error
    input.value = "";
    errorMessage.textContent = "";

    // Render task list
    renderTasks();
    saveTasks();

});

let currentFilter = "all";

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = ""; // Clear existing list

    // Sort tasks: incomplete first, completed last
    tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "incomplete") return !task.completed;
        return true; // 'all'
    }).sort((a,b) => a.completed - b.completed).forEach((task, index) => {
        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
            saveTasks(); // Save updated state
        });

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#999";
        }
        
        // Button container
        const buttonGroup = document.createElement("span");
        buttonGroup.style.marginLeft = "1rem";
        buttonGroup.style.display = "inline-flex";
        buttonGroup.style.gap = "0.3rem"; // space between buttons


        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.style.marginLeft = "1rem";
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index,1); // Remove task
            renderTasks();
            saveTasks(); // Save updated state
        })

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.style.marginLeft = "0.1rem";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== ""){
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        })

        
        // Add buttons to container
        buttonGroup.appendChild(deleteBtn);
        buttonGroup.appendChild(editBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}