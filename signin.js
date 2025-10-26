document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signin-form');
    const errorMessage = document.getElementById('error-message');

    if (signInForm) {
        signInForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = signInForm.username.value;
            const password = signInForm.password.value;

            if (username === 'admin' && password === 'password') {
                // On successful login, redirect to the admin page.
                window.location.href = 'admin.html';
            } else {
                // On failure, display an error message.
                errorMessage.textContent = 'Invalid username or password.';
                errorMessage.style.display = 'block';
            }
        });
    }
});