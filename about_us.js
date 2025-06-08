 // smooth scrolling animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.story-card, .team-card, .stat-card');
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                }
            });
        });
        observer.observe(stat);
    });
});

function animateNumber(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isRating = target.includes('/');
    
    let finalNumber;
    if (isPercentage) {
        finalNumber = parseInt(target.replace('%', ''));
    } else if (isRating) {
        finalNumber = parseFloat(target.split('/')[0]);
    } else {
        finalNumber = parseInt(target.replace(/[^\d]/g, ''));
    }
    
    let current = 0;
    const increment = finalNumber / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        if (isPercentage) {
            element.textContent = Math.round(current) + '%';
        } else if (isRating) {
            element.textContent = current.toFixed(1) + '/5';
        } else if (target.includes('+')) {
            element.textContent = Math.round(current).toLocaleString() + '+';
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
    }, 20);
}