const dueDate = document.getElementById("dueDate");
const type = document.getElementById("type");
const taskList = document.getElementById("taskList");
const form = document.getElementById("newTaskForm");

function showForm()
{
    form.style.display = "block";
}

function hideForm()
{
    form.style.display = "none";
}

function setDueDate()
{
    const time = new Date;
    time.setDate(time.getDate() + 1);
    const year = String(time.getFullYear());
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate()).padStart(2, "0");
    const hour = String(time.getHours()).padStart(2, "0");
    const minute = String(time.getMinutes()).padStart(2, "0");

    if (type.value !== "One-Time") 
    {
        dueDate.type = "time";
        dueDate.value = `${hour}:${minute}`;
    } else 
    {
        dueDate.type = "datetime-local";
        dueDate.value = `${year}-${month}-${day}T${hour}:${minute}`
    }
}

type.addEventListener("change", setDueDate);

function getDueDate(dueDateVal) 
{
    const timeNow = new Date();
    const timeDue = new Date(dueDateVal);

    const diffTime = timeDue - timeNow; // returns in ms
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 1000 ms in a second, 60 seconds in a min etc etc

    if (diffDays === 1) {
        return "Tomorrow";
    } else if (diffDays === 7) {
        return "In a week";
    } else if (diffDays > 7) {
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        return `${weeks} week(s) : ${days} day(s)`
    } else {
        return `${diffDays} day(s)`
    }
}

function markComplete()
{

}

function createTask()
{
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const type = document.getElementById("type").value;

    const due = getDueDate(dueDate.value);

    if(!title || !desc || type === "Select type"){
        alert("All fields required.");
        return;
    }

    const newTask = document.createElement("li");
    newTask.className = "task-card"

    newTask.innerHTML = `
                        <label>${title}</label>
                        <p>${desc}
                        <p>Due: ${due}</p>
                        <p>Type: ${type}</p>
                        <button type="button" class="myBtn" onclick="markComplete();">Mark as complete</button>
                        `;

    taskList.appendChild(newTask);

    hideForm();
    form.reset();
}

