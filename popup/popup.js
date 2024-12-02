// Logic for popup
console.log("Popup script loaded.");

// DOM Elements
const setReminderBtn = document.getElementById("setReminder");
const manageTasksBtn = document.getElementById("manageTasks");

// Event Listener: Set Reminder
setReminderBtn.addEventListener("click", () => {
    // Example: Open options page to configure reminders
    chrome.runtime.openOptionsPage();
    console.log("Set Reminder clicked");
});

// Event Listener: Manage Tasks
manageTasksBtn.addEventListener("click", () => {
    // Example: Redirect to the options page to manage tasks
    chrome.runtime.openOptionsPage();
    console.log("Manage Tasks clicked");
});

// Function to check alarms and display status (optional feature)
function checkAlarms() {
    chrome.alarms.getAll((alarms) => {
        if (alarms.length > 0) {
            console.log("Active alarms:");
            alarms.forEach((alarm) => {
                console.log(`- ${alarm.name}`);
            });
        } else {
            console.log("No active alarms.");
        }
    });
}

// Initialize
checkAlarms();
