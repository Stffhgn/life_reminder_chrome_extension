// options.js

import { createTaskElement, createReminderElement } from "./ui.js";
import { saveTaskToStorage, getTasksFromStorage, saveReminderToStorage, getRemindersFromStorage } from "./storage.js";
import { openTaskEditor } from "./taskEditor.js";
import { openReminderEditor } from "./reminderEditor.js";


console.log("Options script loaded.");

// DOM Elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const addReminderBtn = document.getElementById("add-reminder-btn");
const reminderList = document.getElementById("reminder-list");

// Event Listeners
addTaskBtn.addEventListener("click", () => {
    const taskNameInput = document.getElementById("new-task-name");
    const taskDateTimeInput = document.getElementById("new-task-datetime");

    const taskName = taskNameInput.value.trim();
    const taskDateTime = taskDateTimeInput.value;

    if (taskName && taskDateTime) {
        saveTaskToStorage(taskName, taskDateTime, (tasks) => {
            const li = createTaskElement(taskName, taskDateTime, openTaskEditor);
            taskList.appendChild(li);
        });

        taskNameInput.value = "";
        taskDateTimeInput.value = "";
    } else {
        alert("Please enter a valid task name and date/time.");
    }
});

addReminderBtn.addEventListener("click", () => {
    const reminderNameInput = document.getElementById("new-reminder-name");
    const reminderIntervalInput = document.getElementById("new-reminder-interval");

    const reminderName = reminderNameInput.value.trim();
    const intervalMinutes = parseInt(reminderIntervalInput.value, 10);

    if (reminderName && intervalMinutes > 0) {
        saveReminderToStorage(reminderName, intervalMinutes, "simple", (reminders) => {
            const li = createReminderElement(reminderName, intervalMinutes, "simple", openReminderEditor);
            reminderList.appendChild(li);
        });

        reminderNameInput.value = "";
        reminderIntervalInput.value = "";
    } else {
        alert("Please enter a valid reminder name and interval.");
    }
});

getTasksFromStorage((tasks) => {
    Object.keys(tasks).forEach((key) => {
        const { name, dateTime } = tasks[key];
        const li = createTaskElement(name, dateTime, (updatedName, updatedDateTime, updatedTasks) => {
            // Update the UI or perform necessary actions
            console.log("Task updated:", updatedName, updatedDateTime, updatedTasks);
        });
        taskList.appendChild(li);
    });
});
