// Firebase Auth logic for login.html

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const githubBtn = document.getElementById('github-login');
    const anonBtn = document.getElementById('anon-login');
    const messageDiv = document.getElementById('login-message');
    const emailLinkForm = document.getElementById('email-link-form');
    const emailLinkInput = document.getElementById('email-link');
    // Email Link (passwordless) sign-in
    if (emailLinkForm) {
        emailLinkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailLinkInput.value;
            // Use the deployed site URL and ensure it's in Firebase Auth authorized domains
            const actionCodeSettings = {
                url: 'https://glowing-jellyfishing.github.io/login.html', // Must match authorized domain
                handleCodeInApp: true,
                // Optional: add iOS/Android if you have mobile apps
                // iOS: { bundleId: 'com.example.ios' },
                // android: { packageName: 'com.example.android', installApp: true, minimumVersion: '12' }
            };
            firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
                .then(() => {
                    window.localStorage.setItem('emailForSignIn', email);
                    messageDiv.textContent = 'Sign-in link sent! Check your email.';
                    messageDiv.style.color = '#00b2ff';
                })
                .catch(error => {
                    messageDiv.textContent = error.message;
                    messageDiv.style.color = 'red';
                });
        });
    }

    // Complete sign-in if coming from email link
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        firebase.auth().signInWithEmailLink(email, window.location.href)
            .then(result => {
                messageDiv.textContent = 'Signed in as ' + (result.user.email || 'user') + ' (passwordless)';
                messageDiv.style.color = '#00b2ff';
                window.localStorage.removeItem('emailForSignIn');
            })
            .catch(error => {
                messageDiv.textContent = error.message;
                messageDiv.style.color = 'red';
            });
    }

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
