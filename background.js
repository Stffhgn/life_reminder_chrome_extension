// Handles background tasks like timers and logic
console.log("Background script loaded.");

// Function to send a message to the active tab
function sendReminderToActiveTab(reminderText) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "showReminder",
                reminderText: reminderText
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Message delivery failed:", chrome.runtime.lastError.message);
                } else if (response?.status !== "success") {
                    console.error("Message was not processed by content script.");
                }
            });
        } else {
            console.log("No active tab found.");
        }
    });
}

// Listen for alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(`Alarm triggered: ${alarm.name}`);

    // Fetch reminders from storage to dynamically handle reminders
    chrome.storage.local.get("reminders", (data) => {
        const reminders = data.reminders || {};
        const reminder = reminders[alarm.name];
        if (reminder) {
            sendReminderToActiveTab(reminder.text);
        } else {
            console.log(`No reminder message found for alarm: ${alarm.name}`);
        }
    });
});

// Create context menus and set default reminders on extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated.");

    // Create context menus
    chrome.contextMenus.create({
        id: "trigger-drink-reminder",
        title: "Test Drink Reminder",
        contexts: ["action"]
    });
    chrome.contextMenus.create({
        id: "trigger-workout-reminder",
        title: "Test Workout Reminder",
        contexts: ["action"]
    });

    // Set default reminders if not already present
    chrome.storage.local.get("reminders", (data) => {
        if (!data.reminders) {
            const defaultReminders = {
                drinkReminder: { text: "Time to drink some water!", interval: 15 },
                workoutReminder: { text: "Time for a quick workout!", interval: 60 }
            };
            chrome.storage.local.set({ reminders: defaultReminders }, () => {
                console.log("Default reminders saved.");
            });

            // Set alarms for default reminders
            Object.keys(defaultReminders).forEach((key) => {
                const reminder = defaultReminders[key];
                chrome.alarms.create(key, { delayInMinutes: reminder.interval, periodInMinutes: reminder.interval });
            });
            console.log("Default alarms created.");
        }
    });
});

// Handle messages from the options page to update reminders
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateReminders") {
        const { reminders } = message;
        chrome.storage.local.set({ reminders }, () => {
            console.log("Reminders updated in storage:", reminders);

            // Clear existing alarms and recreate them
            chrome.alarms.clearAll(() => {
                Object.keys(reminders).forEach((key) => {
                    const reminder = reminders[key];
                    chrome.alarms.create(key, { delayInMinutes: reminder.interval, periodInMinutes: reminder.interval });
                });
                console.log("Alarms updated for new reminders.");
            });

            sendResponse({ status: "success" });
        });
        return true; // Keep the messaging channel open for asynchronous response
    }
});

// Handle context menu clicks (for testing)
chrome.contextMenus.onClicked.addListener((info) => {
    chrome.storage.local.get("reminders", (data) => {
        const reminders = data.reminders || {};
        switch (info.menuItemId) {
            case "trigger-drink-reminder":
                sendReminderToActiveTab(reminders.drinkReminder?.text || "Default Drink Reminder");
                break;
            case "trigger-workout-reminder":
                sendReminderToActiveTab(reminders.workoutReminder?.text || "Default Workout Reminder");
                break;
            default:
                console.error(`Unknown menu item ID: ${info.menuItemId}`);
        }
    });
});
