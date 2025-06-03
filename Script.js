// Initialize India Map
const map = L.map('india-map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for popular destinations
const destinations = [
    { name: 'Taj Mahal', coords: [27.1751, 78.0421] },
    { name: 'Kerala Backwaters', coords: [9.4981, 76.3388] },
    { name: 'Varanasi', coords: [25.3176, 82.9739] },
    { name: 'Jaipur', coords: [26.9124, 75.7873] },
    { name: 'Goa', coords: [15.2993, 74.1240] }
];

destinations.forEach(dest => {
    L.marker(dest.coords)
        .bindPopup(`<b>${dest.name}</b><br>Click to explore`)
        .addTo(map);
});

// Chatbot functionality
const chatIcon = document.querySelector('.chat-icon');
const chatWindow = document.querySelector('.chat-window');
let isChatOpen = false;

chatIcon.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatWindow.style.display = isChatOpen ? 'block' : 'none';
    if (isChatOpen && !chatWindow.hasChildNodes()) {
        initializeChat();
    }
});

function initializeChat() {
    chatWindow.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="background: #2196f3; color: white; padding: 10px; border-radius: 10px 10px 0 0;">
                <h3>MysticMiles Assistant</h3>
            </div>
            <div id="chat-messages" style="flex: 1; overflow-y: auto; padding: 10px;"></div>
            <div style="padding: 10px; border-top: 1px solid #eee;">
                <input type="text" id="chat-input" placeholder="Type your message..."
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
        </div>
    `;

    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            // Add user message
            addMessage('user', chatInput.value);
            // Simulate bot response
            setTimeout(() => {
                addMessage('bot', getBotResponse(chatInput.value));
            }, 1000);
            chatInput.value = '';
        }
    });
}

function addMessage(type, text) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '8px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.maxWidth = '80%';
    
    if (type === 'user') {
        messageDiv.style.marginLeft = 'auto';
        messageDiv.style.background = '#e3f2fd';
    } else {
        messageDiv.style.background = '#f5f5f5';
    }
            
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(input) {
    const responses = {
        'hello': 'Hi! How can I help you plan your trip to India?',
        'packages': 'We offer various tour packages starting from ₹20,000. Would you like to know more?',
        'hotels': 'We have partnerships with hotels across India. Which city are you planning to visit?',
        'default': 'I can help you with tour packages, hotel bookings, and travel information. What would you like to know?'
    };

    input = input.toLowerCase();
    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

// Mobile navigation toggle
const navToggle = document.createElement('button');
navToggle.innerHTML = '<i class="fas fa-bars"></i>';
navToggle.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: none;
`;

const nav = document.querySelector('nav');
const navList = document.querySelector('nav ul');

nav.insertBefore(navToggle, nav.firstChild);

navToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
});

// Responsive design adjustments
function adjustForMobile() {
    if (window.innerWidth <= 768) {
        navToggle.style.display = 'block';
        navList.style.display = 'none';
    } else {
        navToggle.style.display = 'none';
        navList.style.display = 'flex';
    }
}

window.addEventListener('resize', adjustForMobile);
adjustForMobile();
// Booking System
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.booking-content');
        
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.style.display = 'none');
        
    document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}-content`).style.display = 'block';
}

// Handle hotel booking form submission
document.getElementById('hotel-booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Hotel search initiated! This would connect to a booking API in production.');
});

// Handle restaurant booking form submission
document.getElementById('restaurant-booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Restaurant search initiated! This would connect to a booking API in production.');
});

// Feedback System
const starRating = document.querySelector('.star-rating');
const stars = starRating.querySelectorAll('i');
const ratingInput = document.getElementById('rating');

stars.forEach(star => {
    star.addEventListener('mouseover', function() {
        const rating = this.dataset.rating;
        updateStars(rating);
    });

    star.addEventListener('click', function() {
        const rating = this.dataset.rating;
        ratingInput.value = rating;
        updateStars(rating);
    });
});

starRating.addEventListener('mouseleave', function() {
    updateStars(ratingInput.value);
});

function updateStars(rating) {
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        star.classList.toggle('fas', starRating <= rating);
        star.classList.toggle('far', starRating > rating);
    });
}

document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your feedback! Your response has been recorded.');
    this.reset();
    updateStars(0);
});