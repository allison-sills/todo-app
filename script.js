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

});

function renderTasks() {
    taskList.innerHTML = ""; // Clear existing list

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            // Remove task from its current position
            tasks.splice(index,1);

            if (task.completed){
                // Move to end
                tasks.push(task);
            } else {
                // Move back to original position
                tasks.splice(task.originalIndex, 0, task);
            }
            renderTasks();
        });

        // Create task text
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#999";
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        taskList.appendChild(li);
    });
}