const taskInput = document.querySelector("#taskInput");
const taskDateTime = document.querySelector("#taskDateTime");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const dateTime = taskDateTime.value;

    if (taskText === "" || dateTime === "") {
        alert("Please enter both task and date/time");
        return;
    }

    const task = {
        text: taskText,
        dateTime: dateTime,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = "";
    taskDateTime.value = "";
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskInfo = document.createElement("span");
        taskInfo.innerHTML = `${task.text} <br><small>${task.dateTime}</small>`;
        if (task.completed) taskInfo.classList.add("completed");

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "✓";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}
