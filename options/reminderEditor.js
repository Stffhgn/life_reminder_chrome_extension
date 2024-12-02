// reminderEditor.js

import { saveReminderToStorage } from "./storage.js";
import { createReminderElement } from "./ui.js";

// Function to open the reminder editor pop-up
export function openReminderEditor(reminderName, intervalMinutes, notifyType, updateCallback) {
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
        <h2>Edit Reminder</h2>
        <label>
            Task Name:
            <input type="text" id="edit-task-name" value="${reminderName}">
        </label>
        <label>
            Interval (minutes):
            <input type="number" id="edit-interval" value="${intervalMinutes}">
        </label>
        <label>
            Notification Type:
            <select id="edit-notify-type">
                <option value="simple" ${notifyType === "simple" ? "selected" : ""}>Simple Notification</option>
                <option value="fullscreen" ${notifyType === "fullscreen" ? "selected" : ""}>Fullscreen Message</option>
                <option value="crazy" ${notifyType === "crazy" ? "selected" : ""}>Change All Words</option>
            </select>
        </label>
        <button id="save-reminder-btn">Save</button>
        <button id="cancel-reminder-btn">Cancel</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.getElementById("save-reminder-btn").addEventListener("click", () => {
        const updatedName = document.getElementById("edit-task-name").value.trim();
        const updatedInterval = parseInt(document.getElementById("edit-interval").value, 10);
        const updatedNotifyType = document.getElementById("edit-notify-type").value;

        if (updatedName && updatedInterval > 0) {
            saveReminderToStorage(updatedName, updatedInterval, updatedNotifyType, (reminders) => {
                updateCallback(updatedName, updatedInterval, updatedNotifyType, reminders);
            });
            document.body.removeChild(modal);
        } else {
            alert("Please provide valid inputs.");
        }
    });

    document.getElementById("cancel-reminder-btn").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}
