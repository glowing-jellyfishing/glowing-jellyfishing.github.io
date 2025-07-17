// Firebase signup logic for signup.html

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                signupMessage.textContent = 'Account created! Welcome, ' + userCredential.user.email;
                signupMessage.style.color = '#00b2ff';
            })
            .catch(error => {
                signupMessage.textContent = error.message;
                signupMessage.style.color = 'red';
            });
    });
});
