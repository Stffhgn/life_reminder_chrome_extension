import { saveTaskToStorage } from "./storage.js";

// Function to open the task editor pop-up
export function openTaskEditor(taskName, taskDateTime, updateCallback) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "white";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "8px";
    modalContent.style.width = "400px";
    modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

    modalContent.innerHTML = `
        <h2>Edit Task</h2>
        <label>
            Task Name:
            <input type="text" id="edit-task-name" value="${taskName}">
        </label>
        <label>
            Due Date and Time:
            <input type="datetime-local" id="edit-task-datetime" value="${taskDateTime}">
        </label>
        <button id="save-task-btn">Save</button>
        <button id="cancel-task-btn">Cancel</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.getElementById("save-task-btn").addEventListener("click", () => {
        const updatedName = document.getElementById("edit-task-name").value.trim();
        const updatedDateTime = document.getElementById("edit-task-datetime").value;

        if (updatedName && updatedDateTime) {
            saveTaskToStorage(updatedName, updatedDateTime, (tasks) => {
                // Guard against undefined updateCallback
                if (typeof updateCallback === "function") {
                    updateCallback(updatedName, updatedDateTime, tasks);
                } else {
                    console.warn("updateCallback is not defined or not a function.");
                }
            });
            document.body.removeChild(modal);
        } else {
            alert("Please provide valid inputs.");
        }
    });

    document.getElementById("cancel-task-btn").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}
