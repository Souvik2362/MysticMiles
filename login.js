document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('.login-btn');
    btn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        btn.classList.remove('loading');
        // Redirect to dashboard or home page
        window.location.href = 'index.html';
    }, 2000);
});

// Add floating animation to form inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});