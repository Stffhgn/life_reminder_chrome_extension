// ui.js

// Function to create a reminder element in the DOM
export function createReminderElement(reminderName, intervalMinutes, notifyType, onEditCallback) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${reminderName} - every ${intervalMinutes} minutes (${notifyType})`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => onEditCallback(reminderName, intervalMinutes, notifyType));

    li.appendChild(span);
    li.appendChild(editBtn);
    return li;
}

// Function to create a task element in the DOM
export function createTaskElement(taskName, taskDateTime, onEditCallback) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${taskName} - Due: ${new Date(taskDateTime).toLocaleString()}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => onEditCallback(taskName, taskDateTime));

    li.appendChild(span);
    li.appendChild(editBtn);
    return li;
}