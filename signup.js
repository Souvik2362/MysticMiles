// Form validation and submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    const btn = this.querySelector('.signup-btn');
    btn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        btn.classList.remove('loading');
        showSuccess();
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }, 2000);
});

// Password strength checker
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
    
    // Check password criteria
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

// Confirm password validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
});

// Form validation
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

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Show success message
function showSuccess() {
    const successDiv = document.getElementById('successMessage');
    successDiv.style.display = 'block';
}

// Social signup handlers
function socialSignup(provider) {
    alert(`Social signup with ${provider} would be implemented here`);
}

// Terms and privacy handlers
function showTerms() {
    alert('Terms of Service would be displayed here');
}

function showPrivacy() {
    alert('Privacy Policy would be displayed here');
}

// Add floating animation to form inputs
document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});