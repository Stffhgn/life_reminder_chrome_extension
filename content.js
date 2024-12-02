// Content script for LifeReminder
console.log("Content script loaded.");

// Function to display a fullscreen overlay with a confirmation prompt
function showFullscreenReminder(reminderText) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    // Add the reminder text
    const message = document.createElement("p");
    message.textContent = reminderText;
    message.style.fontSize = "1.5rem";
    message.style.marginBottom = "20px";
    overlay.appendChild(message);

    // Add the confirmation button
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "OK";
    confirmButton.style.padding = "10px 20px";
    confirmButton.style.fontSize = "1.2rem";
    confirmButton.style.color = "white";
    confirmButton.style.backgroundColor = "#007acc";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "5px";
    confirmButton.style.cursor = "pointer";
    confirmButton.addEventListener("click", () => overlay.remove());
    overlay.appendChild(confirmButton);

    document.body.appendChild(overlay);
}

// Listener to handle messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "showReminder") {
        console.log(`Reminder received: ${message.reminderText}`);

        if (message.reminderText === "fullscreen") {
            showFullscreenReminder(message.reminderText);
        } else {
            alert(message.reminderText);
        }

        sendResponse({ status: "success" });
    }
});


