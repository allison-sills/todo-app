const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = [];

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
        completed: false
    };

    // Add task to array
    tasks.push(task);
    console.log(tasks);
    // Clear input and error
    input.value = "";
    errorMessage.textContent = "";

    // Render task list
    renderTasks();

});

function renderTasks() {
    taskList.innerHTML = ""; // Clear existing list

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}