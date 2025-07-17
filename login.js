// Firebase Auth logic for login.html

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const githubBtn = document.getElementById('github-login');
    const anonBtn = document.getElementById('anon-login');
    const messageDiv = document.getElementById('login-message');

    // Email/Password login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                messageDiv.textContent = 'Logged in as ' + userCredential.user.email;
                messageDiv.style.color = '#00b2ff';
            })
            .catch(error => {
                messageDiv.textContent = error.message;
                messageDiv.style.color = 'red';
            });
    });

    // GitHub login
    githubBtn.addEventListener('click', function() {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                messageDiv.textContent = 'Logged in as ' + (result.user.displayName || result.user.email || 'GitHub user');
                messageDiv.style.color = '#00b2ff';
            })
            .catch(error => {
                messageDiv.textContent = error.message;
                messageDiv.style.color = 'red';
            });
    });

    // Anonymous login
    anonBtn.addEventListener('click', function() {
        firebase.auth().signInAnonymously()
            .then(() => {
                messageDiv.textContent = 'Logged in anonymously!';
                messageDiv.style.color = '#00b2ff';
            })
            .catch(error => {
                messageDiv.textContent = error.message;
                messageDiv.style.color = 'red';
            });
    });
});
