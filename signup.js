import { signUp } from './js/auth.js';

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const btn = this.querySelector('.signup-btn');
    const originalText = btn.textContent;
    btn.classList.add('loading');
    btn.disabled = true;
    btn.textContent = 'Creating account...';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const profileData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        birthDate: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        newsletter: document.getElementById('newsletter').checked
    };

    const result = await signUp(email, password, profileData);

    if (result.success) {
        btn.classList.remove('loading');
        showSuccess();

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
        btn.textContent = originalText;

        showError(result.error);
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    const strengthBar = strengthIndicator.querySelector('.strength-fill');

    if (password.length === 0) {
        strengthIndicator.style.display = 'none';
        return;
    }

    strengthIndicator.style.display = 'block';

    let strength = 0;
    let strengthClass = 'strength-weak';
    let strengthLabel = 'Weak';

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength >= 4) {
        strengthClass = 'strength-strong';
        strengthLabel = 'Strong';
    } else if (strength >= 2) {
        strengthClass = 'strength-medium';
        strengthLabel = 'Medium';
    }

    strengthIndicator.className = `password-strength ${strengthClass}`;
    strengthText.textContent = strengthLabel;
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;

    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
});

function validateForm() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (!firstName || !lastName || !email || !phone || !birthDate || !gender || !password || !confirmPassword) {
        showError('Please fill in all required fields');
        return false;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return false;
    }

    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return false;
    }

    if (!terms) {
        showError('Please accept the Terms of Service and Privacy Policy');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }

    return true;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'block';

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess() {
    const successDiv = document.getElementById('successMessage');
    successDiv.style.display = 'block';
}

window.socialSignup = function(provider) {
    alert(`Social signup with ${provider} is not yet implemented`);
}

window.showTerms = function() {
    alert('Terms of Service would be displayed here');
}

window.showPrivacy = function() {
    alert('Privacy Policy would be displayed here');
}

document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});
