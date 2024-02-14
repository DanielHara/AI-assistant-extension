async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


const execute = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    /*
    const createdTab = await chrome.tabs.create({
        url: 'https://docs.google.com/document/create'
    });
    */
    
    await delay(2000);

    const currentTab = await getCurrentTab();
    
    chrome.scripting.executeScript({
        // target: { tabId: createdTab.id },
        target: { tabId: currentTab.id },
        func: async () => {
          // write your code here
            function simulateTyping(element, text, delayBetweenKeystrokes) {
                let i = 0;
                const interval = setInterval(() => {
                    if (i >= text.length) {
                        const button = document.querySelector('input');
                        console.log('button', button);
                        button.click();

                        clearInterval(interval);
                    } else {
                        // Simulate key down, key press, and key up events
                        const keyCode = text.charCodeAt(i);
                        const key = text[i];
                        triggerKeyEvent(element, 'keydown', keyCode, key);
                        triggerKeyEvent(element, 'keypress', keyCode, key);
                        // For input and textarea, directly setting the value might be necessary
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.value += text[i];
                            // Trigger input event to ensure any attached event listeners react appropriately
                            triggerInputEvent(element);
                        }
                        triggerKeyEvent(element, 'keyup', keyCode, key);
                        i++;
                    }
                }, delayBetweenKeystrokes);
            }
            
            function triggerKeyEvent(element, eventType, keyCode, key) {
                const event = new KeyboardEvent(eventType, {
                    key: key,
                    keyCode: keyCode,
                    charCode: keyCode, // Deprecated but included for compatibility
                    bubbles: true
                });
                element.dispatchEvent(event);
            }
            
            function triggerInputEvent(element) {
                const event = new Event('input', { bubbles: true });
                element.dispatchEvent(event);
            }

            // Actual instructions

            const body = document.querySelector('body');
            body.click();
    
            const element = document.querySelector('textarea');

            const textToType = "Hello, world!";
            const delayBetweenKeystrokes = 100; // Milliseconds
    
            simulateTyping(element, textToType, delayBetweenKeystrokes);
        },
      });
}

execute();

