// In contentScript.js


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    return true
});
