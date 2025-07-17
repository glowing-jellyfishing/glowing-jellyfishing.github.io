// Firebase password reset logic for reset-password.html

document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('reset-form');
    const resetMessage = document.getElementById('reset-message');

    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resetMessage.textContent = 'Password reset email sent! Check your inbox.';
                resetMessage.style.color = '#00b2ff';
            })
            .catch(error => {
                resetMessage.textContent = error.message;
                resetMessage.style.color = 'red';
            });
    });
});
