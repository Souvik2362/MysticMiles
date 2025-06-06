document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder or hide
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
});
// Enhanced slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 6 seconds
    setInterval(nextSlide, 7000);
    
    // Smooth scroll for CTA button
    document.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Replace your existing map initialization code with this robust version:
function initializeMap() {
    try {
        const mapContainer = document.getElementById('india-map');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            mapContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Map could not be loaded. Please refresh the page.</p>';
            return;
        }

        // Your existing map code here...
        const map = L.map('india-map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // FIXED: Proper marker creation with enhanced popups
        const destinations = [
            { name: 'Taj Mahal', coords: [27.1751, 78.0421] },
            { name: 'Kerala Backwaters', coords: [9.4981, 76.3388] },
            { name: 'Varanasi', coords: [25.3176, 82.9739] },
            { name: 'Jaipur', coords: [26.9124, 75.7873] },
            { name: 'Goa', coords: [15.2993, 74.1240] }
        ];

        // FIXED: Custom icon definition (optional - only if you have custom icons)
        const customIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // FIXED: Proper marker creation loop
        destinations.forEach(dest => {
            L.marker(dest.coords, { icon: customIcon })
                .bindPopup(`
                    <div style="text-align: center; padding: 10px;">
                        <b style="font-size: 16px; color: #2196f3;">${dest.name}</b><br>
                        <button onclick="exploreDestination('${dest.name}')" 
                                style="margin-top: 10px; padding: 8px 16px; 
                                       background: #2196f3; color: white; 
                                       border: none; border-radius: 4px; 
                                       cursor: pointer;">
                            Explore Packages
                        </button>
                    </div>
                `)
                .addTo(map);
        });

        // Store map reference globally for resize function
        window.mapInstance = map;

    } catch (error) {
        console.error('Map initialization error:', error);
        const mapContainer = document.getElementById('india-map');
        if (mapContainer) {
            mapContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Map temporarily unavailable.</p>';
        }
    }
}

// Update the DOM ready event to use the new initialization function
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
});

// Update resize function to use the global map instance
function resizeMap() {
    if (window.mapInstance) {
        setTimeout(() => {
            window.mapInstance.invalidateSize();
        }, 100);
    }
}
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Enhanced Chatbot functionality
const chatIcon = document.querySelector('.chat-icon');
const chatWindow = document.querySelector('.chat-window');
let isChatOpen = false;
let isTyping = false;

chatIcon.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('visible', isChatOpen);
    if (isChatOpen && !document.getElementById('chat-input')) {
        initializeChat();
    }
});

function initializeChat() {
    chatWindow.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div class="chat-header">
                <h3>🌟 MysticMiles Assistant</h3>
                <button class="close-chat">&times;</button>
            </div>
            <div id="chat-messages"></div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chat-input" placeholder="Type your message...">
                <button class="send-button">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    const chatInput = document.getElementById('chat-input');
    const sendButton = document.querySelector('.send-button');

    // Send message function
    function sendMessage() {
        const userInput = chatInput.value.trim();
        if (userInput && !isTyping) {
            addMessage('user', userInput);
            chatInput.value = '';
            sendButton.disabled = true;
            
            showTypingIndicator();
            
            setTimeout(() => {
                hideTypingIndicator();
                addMessage('bot', getBotResponse(userInput));
                sendButton.disabled = false;
                chatInput.focus();
            }, 1500);
        }
    }

    // Event listeners
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    document.querySelector('.close-chat').addEventListener('click', () => {
        chatWindow.classList.remove('visible');
        isChatOpen = false;
    });

    // Welcome message
    setTimeout(() => {
        addMessage('bot', 'Welcome to MysticMiles! 🌟 I\'m here to help you plan amazing trips across India. How can I assist you today?');
    }, 500);

    chatInput.focus();
}

function addMessage(type, text) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    isTyping = true;
    const typingIndicator = document.querySelector('.typing-indicator');
    const messagesDiv = document.getElementById('chat-messages');
    typingIndicator.style.display = 'block';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator.style.display = 'none';
}

// Enhanced bot logic
const cities = [
    'delhi', 'mumbai', 'kolkata', 'chennai', 'bangalore', 'bengaluru',
    'hyderabad', 'goa', 'agra', 'jaipur', 'pune', 'ahmedabad', 'surat',
    'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam',
    'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'coimbatore', 'madurai',
    'udaipur', 'rishikesh', 'manali', 'shimla', 'darjeeling', 'ooty',
    'kodaikanal', 'munnar', 'alleppey', 'cochin', 'mysore', 'hampi'
];

const responses = {
    greetings: [
        'Hello! Ready to explore incredible India? 🇮🇳',
        'Hi there! Where would you like to travel next? ✈️',
        'Welcome! I\'m excited to help you plan your perfect trip! 🌟',
        'Hey! Let\'s create some amazing travel memories together! 🗺️'
    ],
    packages: [
        'We have fantastic packages for all types of travelers! Would you like to explore:\n• Golden Triangle (Delhi-Agra-Jaipur)\n• Kerala Backwaters\n• Rajasthan Royal Tour\n• Hill Station Escapes\n• Beach Getaways',
        'Our tour packages cover every corner of India! From cultural heritage tours to adventure trips, beach holidays to mountain retreats. What interests you most?',
        'Great choice! We offer customized packages for solo travelers, couples, families, and groups. Tell me your preferred destination and I\'ll suggest the perfect package!'
    ],
    hotels: [
        'I can help you find the perfect accommodation! We partner with hotels ranging from budget-friendly stays to luxury resorts.',
        'Our hotel network covers all major Indian destinations. From heritage hotels in Rajasthan to beach resorts in Goa!',
        'Looking for a place to stay? I can help you find hotels that match your budget and preferences.'
    ],
    fallback: [
        'I\'m here to help with travel planning, hotel bookings, tour packages, and destination information. What would you like to know? 🤔',
        'I can assist you with booking accommodations, planning itineraries, or finding the best travel deals. How can I help? 😊',
        'Feel free to ask me about destinations, travel tips, bookings, or anything travel-related! I\'m here to help make your trip amazing! ✨'
    ]
};

function detectCity(input) {
    input = input.toLowerCase();
    return cities.find(city => input.includes(city));
}

function detectDates(input) {
    const regex = /(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})|(\d{1,2}\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)|((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{1,2})|(\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)|((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{1,2}(st|nd|rd|th)?)|(\d{4}-\d{1,2}-\d{1,2})|(\d{1,2}-\d{1,2}-\d{4})|(\d{1,2}\/\d{1,2}\/\d{2,4})|(\d{1,2}\.\d{1,2}\.\d{2,4})|(today|tomorrow|next week|this weekend|next month)|(check.?in|check.?out).{0,20}(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/gi;
    return input.match(regex);
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function getBotResponse(input) {
    input = input.toLowerCase();
    const city = detectCity(input);
    const dates = detectDates(input);

    // Greetings
    if (/\b(hello|hi|hey|good morning|good afternoon|good evening|namaste)\b/.test(input)) {
        return getRandomResponse(responses.greetings);
    }

    // Package inquiries
    if (/\b(package|tour|trip|itinerary|plan|vacation|holiday)\b/.test(input)) {
        return getRandomResponse(responses.packages);
    }

    // Hotel bookings
    if (/\b(book.*hotel|hotel.*book|accommodation|stay|room|booking)\b/.test(input)) {
        if (city && dates) {
            const cityName = city.charAt(0).toUpperCase() + city.slice(1);
            return `Perfect! I found great options for ${cityName} on ${dates.join(', ')}. Our partners offer:\n• Luxury Hotels (₹5000+/night)\n• Mid-range Hotels (₹2000-5000/night)\n• Budget Hotels (₹800-2000/night)\n\nWhich category interests you? 🏨`;
        } else if (city) {
            const cityName = city.charAt(0).toUpperCase() + city.slice(1);
            return `Excellent choice! ${cityName} has amazing hotels. When are you planning to visit? Please share your travel dates so I can check availability and prices. 📅`;
        } else if (dates) {
            return `Great! I see you're planning to travel on ${dates.join(', ')}. Which city or destination are you considering? 🏙️`;
        } else {
            return getRandomResponse(responses.hotels) + ' Which destination and dates work for you?';
        }
    }

    // General hotel inquiries
    if (/\b(hotel|accommodation|resort|lodge)\b/.test(input)) {
        return getRandomResponse(responses.hotels);
    }

    // Price inquiries
    if (/\b(price|cost|rate|budget|cheap|expensive|afford)\b/.test(input)) {
        return 'Our prices are very competitive! 💰\n• Budget packages start from ₹5,000 per person\n• Mid-range packages: ₹10,000-25,000 per person\n• Luxury packages: ₹30,000+ per person\n\nPrices vary by destination, season, and duration. Tell me your destination and I\'ll give you exact quotes!';
    }

    // Destination-specific queries
    if (city) {
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        const destinationInfo = {
            'Delhi': 'Delhi is incredible! Home to Red Fort, India Gate, and amazing street food. Best time to visit: October-March. 🏛️',
            'Mumbai': 'Mumbai never sleeps! Gateway of India, Marine Drive, Bollywood tours. Great year-round destination! 🌊',
            'Goa': 'Goa is paradise! Beautiful beaches, Portuguese architecture, vibrant nightlife. Perfect for relaxation! 🏖️',
            'Jaipur': 'The Pink City! Amber Fort, City Palace, Hawa Mahal. Rich in royal heritage and culture! 👑',
            'Agra': 'Home to the magnificent Taj Mahal! A UNESCO World Heritage site that\'s absolutely breathtaking! 🕌',
            'Kerala': 'God\'s Own Country! Backwaters, houseboats, spice plantations, and Ayurvedic treatments! 🌴',
            'Rajasthan': 'Land of kings! Palaces, forts, desert safaris, and rich cultural heritage! 🐪'
        };
        
        return destinationInfo[cityName] || `${cityName} is a wonderful destination! I can help you plan an amazing trip there. Would you like information about hotels, attractions, or tour packages? 🗺️`;
    }

    // Thank you responses
    if (/\b(thank|thanks|appreciate)\b/.test(input)) {
        return 'You\'re very welcome! I\'m always here to help make your travel dreams come true! Is there anything else you\'d like to know? 😊✈️';
    }

    // Goodbye responses
    if (/\b(bye|goodbye|see you|take care)\b/.test(input)) {
        return 'Safe travels and happy journey planning! Feel free to come back anytime you need travel assistance. Have a wonderful day! 👋🌟';
    }

    return getRandomResponse(responses.fallback);
}

document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const searchTerm = document.querySelector('.search-input').value.trim();
    
    if (searchTerm) {
        // Open chatbot with search query
        const chatIcon = document.querySelector('.chat-icon');
        if (chatIcon && !isChatOpen) {
            chatIcon.click();
        }
        
        setTimeout(() => {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.value = `I'm looking for ${searchTerm}`;
                const sendButton = document.querySelector('.send-button');
                if (sendButton) {
                    sendButton.click();
                }
            }
        }, 1000);
        
        // Clear search input
        document.querySelector('.search-input').value = '';
    }
});



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
// Form Validation Function
function validateBookingForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Update form submissions - Replace your existing hotel booking form handler with this:
document.getElementById('hotel-booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateBookingForm('hotel-booking-form')) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = 'Searching...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Hotel search initiated! This would connect to a booking API in production.');
            submitBtn.innerHTML = 'Search Hotels';
            submitBtn.disabled = false;
        }, 2000);
    } else {
        alert('Please fill in all required fields.');
    }
});


// Handle restaurant booking form submission
document.getElementById('restaurant-booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Restaurant search initiated! This would connect to a booking API in production.');
});

// Date Validation for Check-in/Check-out
document.getElementById('check-in').addEventListener('change', function() {
    const checkOut = document.getElementById('check-out');
    checkOut.min = this.value;
    
    // Clear check-out if it's before check-in
    if (checkOut.value && checkOut.value <= this.value) {
        checkOut.value = '';
    }
});

// Set minimum date to today for both fields
const today = new Date().toISOString().split('T')[0];
document.getElementById('check-in').min = today;
document.getElementById('check-out').min = today;


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

// Add this new function for resetting star ratings
function resetStarRating() {
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
    
    ratingInput.value = '';
}

document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your feedback! Your response has been recorded.');
        this.reset();
        resetStarRating(); // Proper reset
        
        submitBtn.innerHTML = 'Submit Feedback';
        submitBtn.disabled = false;
    }, 1500);
});