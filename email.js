const execute = async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(4000);        
    const composeButton = document.querySelector('[role="button"][gh="cm"]');

    composeButton.click();
    
    await delay(3000);

    // Fill in the recipient, subject, and email body
    function fillEmailForm() {
        // Wait for the compose window to become visible
        setTimeout(() => {
            let toField = document.querySelector('[name="to"]');
            let subjectField = document.querySelector('[name="subjectbox"]');
            let bodyField = document.querySelector('[role="textbox"]');

            if (toField && subjectField && bodyField) {
                toField.value = 'haradaniel734@gmail.com';
                subjectField.value = 'Test Email';
                bodyField.textContent = 'This is a test email sent from a Chrome extension.';

                // Trigger input events (necessary for some web applications to recognize the change)
                toField.dispatchEvent(new Event('input', { bubbles: true }));
                subjectField.dispatchEvent(new Event('input', { bubbles: true }));
                bodyField.dispatchEvent(new Event('input', { bubbles: true }));

                sendEmail(); // Attempt to click the send button
            }
        }, 3000); // Increase timeout if the compose window takes longer to appear
    }

    fillEmailForm();
}

execute();

