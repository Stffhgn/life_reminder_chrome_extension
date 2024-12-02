// storage.js

// Save reminders to Chrome storage
export function saveReminderToStorage(reminderName, intervalMinutes, notifyType, callback) {
    chrome.storage.local.get("reminders", (data) => {
        const reminders = data.reminders || {};
        reminders[reminderName] = { text: reminderName, interval: intervalMinutes, notifyType };
        chrome.storage.local.set({ reminders }, () => {
            console.log(`Reminder ${reminderName} saved to storage.`);
            callback(reminders);
        });
    });
}

// Get all reminders from Chrome storage
export function getRemindersFromStorage(callback) {
    chrome.storage.local.get("reminders", (data) => {
        const reminders = data.reminders || {};
        callback(reminders);
    });
}

// Save tasks to Chrome storage
export function saveTaskToStorage(taskName, taskDateTime, callback) {
    chrome.storage.local.get("tasks", (data) => {
        const tasks = data.tasks || {};
        tasks[taskName] = { name: taskName, dateTime: taskDateTime };
        chrome.storage.local.set({ tasks }, () => {
            console.log(`Task ${taskName} saved to storage.`);
            if (callback) callback(tasks); // Ensure the callback exists before invoking it
        });
    });
}

// Get all tasks from Chrome storage
export function getTasksFromStorage(callback) {
    chrome.storage.local.get("tasks", (data) => {
        const tasks = data.tasks || {};
        callback(tasks);
    });
}

