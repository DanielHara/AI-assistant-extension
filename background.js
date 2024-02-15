chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: 'https://mail.google.com/mail/u/0/#inbox' }, function(newTab) {
      // After the tab has been created, inject the content script into it
      chrome.scripting.executeScript({
        target: {tabId: newTab.id},
        files: ['email.js']
      });
    });
  });
