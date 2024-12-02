// Custom logic for reminders

// Create a reminder with a specific name and interval
function setReminder(name, intervalMinutes) {
    if (intervalMinutes > 0) {
        chrome.alarms.create(name, {
            delayInMinutes: intervalMinutes,
            periodInMinutes: intervalMinutes
        });
        console.log(`Reminder "${name}" set for every ${intervalMinutes} minutes.`);
    } else {
        console.error("Invalid interval for reminder:", intervalMinutes);
    }
}

// Clear a specific reminder by name
function clearReminder(name) {
    chrome.alarms.clear(name, (wasCleared) => {
        if (wasCleared) {
            console.log(`Reminder "${name}" cleared.`);
        } else {
            console.error(`Failed to clear reminder "${name}".`);
        }
    });
}

// List all active reminders
function listReminders() {
    chrome.alarms.getAll((alarms) => {
        if (alarms.length === 0) {
            console.log("No active reminders.");
        } else {
            console.log("Active reminders:");
            alarms.forEach((alarm) => {
                console.log(`- ${alarm.name} (Next: ${new Date(alarm.scheduledTime)})`);
            });
        }
    });
}

// Update an existing reminder or create a new one
function updateReminder(name, intervalMinutes) {
    clearReminder(name);
    setReminder(name, intervalMinutes);
    console.log(`Reminder "${name}" updated to every ${intervalMinutes} minutes.`);
}

// Example usage (for testing)
// setReminder("testReminder", 1);   // Sets a test reminder for every 1 minute
// listReminders();                  // Lists all active reminders
// clearReminder("testReminder");    // Clears the test reminder

// Export functions for use in other scripts
export { setReminder, clearReminder, listReminders, updateReminder };
