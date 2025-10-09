import { signIn } from './js/auth.js';

const loginForm = document.getElementById('loginForm');
const emailInput = loginForm.querySelector('input[type="email"]');
const passwordInput = loginForm.querySelector('input[type="password"]');

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = this.querySelector('.login-btn');
    const originalText = btn.textContent;
    btn.classList.add('loading');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const result = await signIn(email, password);

    if (result.success) {
        btn.textContent = 'Success! Redirecting...';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
        btn.textContent = originalText;

        alert(`Login failed: ${result.error}\n\nPlease check your credentials and try again.`);
    }
});

document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});
