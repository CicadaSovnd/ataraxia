document.addEventListener('DOMContentLoaded', () => {
    const videoListInput = document.getElementById('video-list-input');
    const saveBtn = document.getElementById('save-video-list');
    const confirmationMsg = document.getElementById('save-confirmation');

    if (videoListInput && saveBtn && confirmationMsg) {
        // Load the saved list from localStorage into the textarea when the page loads.
        const savedList = localStorage.getItem('randomVideoList');
        if (savedList) {
            videoListInput.value = savedList;
        }

        // Add a click listener to the save button.
        saveBtn.addEventListener('click', () => {
            // Save the current content of the textarea to localStorage.
            localStorage.setItem('randomVideoList', videoListInput.value);

            // Show a confirmation message to the user.
            confirmationMsg.textContent = 'List saved successfully!';
            // The message will fade out automatically via CSS animation.
            confirmationMsg.classList.add('fade-out');
            setTimeout(() => confirmationMsg.classList.remove('fade-out'), 2000);
        });
    }
});