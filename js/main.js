import { updateAuthUI, setupAuthListener } from './auth.js';
import { createHotelBooking, createRestaurantBooking } from './booking.js';
import { submitFeedback } from './feedback.js';

document.addEventListener('DOMContentLoaded', async function() {
    await updateAuthUI();

    setupAuthListener(async (event, session) => {
        await updateAuthUI();
    });

    initializeImageErrorHandling();
    initializeSlideshow();
    initializeSmoothScroll();
    initializeMap();
    initializeChatbot();
    initializeBookingForms();
    initializeFeedbackForm();
    initializeNavigation();
});

function initializeImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
    });
}

function initializeSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 7000);
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initializeMap() {
    try {
        const mapContainer = document.getElementById('india-map');
        if (!mapContainer || typeof L === 'undefined') {
            if (mapContainer) {
                mapContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: #666;">Map temporarily unavailable.</p>';
            }
            return;
        }

        const map = L.map('india-map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const destinations = [
            { name: 'Taj Mahal', coords: [27.1751, 78.0421] },
            { name: 'Kerala Backwaters', coords: [9.4981, 76.3388] },
            { name: 'Varanasi', coords: [25.3176, 82.9739] },
            { name: 'Jaipur', coords: [26.9124, 75.7873] },
            { name: 'Goa', coords: [15.2993, 74.1240] }
        ];

        const customIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        destinations.forEach(dest => {
            L.marker(dest.coords, { icon: customIcon })
                .bindPopup(`
                    <div style="text-align: center; padding: 10px;">
                        <b style="font-size: 16px; color: #2196f3;">${dest.name}</b><br>
                        <a href="tour.html" style="display: inline-block; margin-top: 10px; padding: 8px 16px;
                               background: #2196f3; color: white; text-decoration: none;
                               border: none; border-radius: 4px;
                               cursor: pointer;">
                            Explore Packages
                        </a>
                    </div>
                `)
                .addTo(map);
        });

        window.mapInstance = map;
    } catch (error) {
        console.error('Map initialization error:', error);
    }
}

function initializeChatbot() {
    const chatIcon = document.querySelector('.chat-icon');
    const chatWindow = document.querySelector('.chat-window');
    let isChatOpen = false;
    let isTyping = false;

    chatIcon?.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatWindow.classList.toggle('visible', isChatOpen);
        if (isChatOpen && !document.getElementById('chat-input')) {
            setupChatWindow(chatWindow);
        }
    });

    function setupChatWindow(chatWindow) {
        chatWindow.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div class="chat-header">
                    <h3>MysticMiles Assistant</h3>
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
                    <input type="text" id="chat-input" placeholder="Type your message..." aria-label="Chat message input">
                    <button class="send-button" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;

        const chatInput = document.getElementById('chat-input');
        const sendButton = document.querySelector('.send-button');

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

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        sendButton.addEventListener('click', sendMessage);

        document.querySelector('.close-chat').addEventListener('click', () => {
            chatWindow.classList.remove('visible');
            isChatOpen = false;
        });

        setTimeout(() => {
            addMessage('bot', 'Welcome to MysticMiles! I\'m here to help you plan amazing trips across India. How can I assist you today?');
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
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
            document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
        }
    }

    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.style.display = 'none';
    }

    function getBotResponse(input) {
        input = input.toLowerCase();

        if (/\b(hello|hi|hey|namaste)\b/.test(input)) {
            return 'Hello! Ready to explore incredible India? How can I help you plan your perfect trip?';
        }

        if (/\b(package|tour|trip)\b/.test(input)) {
            return 'We have fantastic packages! Visit our <a href="tour.html" style="color: #2196f3; text-decoration: underline;">Tour Packages</a> page to explore all options.';
        }

        if (/\b(book|hotel|accommodation)\b/.test(input)) {
            return 'You can book hotels and restaurants right here on our site! Scroll down to the booking section or <a href="#booking" style="color: #2196f3; text-decoration: underline;">click here</a>.';
        }

        return 'I can help with travel planning, hotel bookings, tour packages, and destination information. What would you like to know?';
    }
}

function initializeBookingForms() {
    window.switchTab = function(tab) {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.booking-content');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');

        document.querySelector(`[onclick="switchTab('${tab}')"]`).classList.add('active');
        document.getElementById(`${tab}-content`).style.display = 'block';
    };

    const hotelForm = document.getElementById('hotel-booking-form');
    if (hotelForm) {
        hotelForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            const bookingData = {
                city: document.getElementById('hotel-city').value,
                checkIn: document.getElementById('check-in').value,
                checkOut: document.getElementById('check-out').value,
                guests: document.getElementById('guests').value,
                hotelType: document.getElementById('hotel-type').value
            };

            const result = await createHotelBooking(bookingData);

            if (result.success) {
                alert('Hotel booking request submitted successfully! We will contact you shortly with available options.');
                this.reset();
            } else {
                alert(`Booking failed: ${result.error}`);
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    const restaurantForm = document.getElementById('restaurant-booking-form');
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            const bookingData = {
                city: document.getElementById('restaurant-city').value,
                cuisine: document.getElementById('cuisine').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                partySize: document.getElementById('party-size').value
            };

            const result = await createRestaurantBooking(bookingData);

            if (result.success) {
                alert('Restaurant booking request submitted successfully! We will contact you shortly with available options.');
                this.reset();
            } else {
                alert(`Booking failed: ${result.error}`);
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        checkOutInput.min = today;

        checkInInput.addEventListener('change', function() {
            checkOutInput.min = this.value;
            if (checkOutInput.value && checkOutInput.value <= this.value) {
                checkOutInput.value = '';
            }
        });
    }
}

function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    if (!feedbackForm) return;

    const starRating = document.querySelector('.star-rating');
    const stars = starRating?.querySelectorAll('i');
    const ratingInput = document.getElementById('rating');

    stars?.forEach(star => {
        star.addEventListener('mouseover', function() {
            updateStars(this.dataset.rating);
        });

        star.addEventListener('click', function() {
            ratingInput.value = this.dataset.rating;
            updateStars(this.dataset.rating);
        });
    });

    starRating?.addEventListener('mouseleave', function() {
        updateStars(ratingInput.value);
    });

    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = star.dataset.rating;
            star.classList.toggle('fas', starRating <= rating);
            star.classList.toggle('far', starRating > rating);
        });
    }

    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const feedbackData = {
            type: document.getElementById('feedback-type').value,
            rating: parseInt(document.getElementById('rating').value),
            title: document.getElementById('feedback-title').value,
            message: document.getElementById('feedback-message').value
        };

        const result = await submitFeedback(feedbackData);

        if (result.success) {
            alert('Thank you for your feedback! Your response has been recorded.');
            this.reset();
            stars.forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
        } else {
            alert(`Feedback submission failed: ${result.error}`);
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = document.querySelector('.search-input').value.trim();
        if (searchTerm) {
            window.location.href = `tour.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
}
