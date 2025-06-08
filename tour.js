// Sample tour packages data
const tourPackages = [
    {
        id: 1,
        title: "Royal Rajasthan Heritage Tour",
        destination: "rajasthan",
        duration: "8-14",
        days: 10,
        budget: "premium",
        type: "cultural",
        image: "Royal_Rajasthan_Heritage_Tour.jpg",
        description: "Explore the majestic palaces, forts, and vibrant culture of Rajasthan. Visit Jaipur, Udaipur, Jodhpur, and Jaisalmer.",
        highlights: ["Palace visits", "Desert safari", "Cultural shows", "Local cuisine", "Heritage hotels"],
        originalPrice: 85000,
        currentPrice: 72000,
        badge: "Popular"
    },
    {
        id: 2,
        title: "Kerala Backwaters Escape",
        destination: "kerala",
        duration: "4-7",
        days: 6,
        budget: "standard",
        type: "relaxation",
        image: "Kerala_Backwaters_Escape.jpg",
        description: "Cruise through tranquil backwaters, enjoy Ayurvedic treatments, and experience Kerala's natural beauty.",
        highlights: ["Houseboat stay", "Ayurvedic spa", "Tea plantation visit", "Spice gardens", "Beach relaxation"],
        originalPrice: 45000,
        currentPrice: 38000,
        badge: "Best Value"
    },
    {
        id: 3,
        title: "Goa Beach Paradise",
        destination: "goa",
        duration: "4-7",
        days: 5,
        budget: "standard",
        type: "relaxation",
        image: "Goa_Beach_Paradise.jpg",
        description: "Relax on pristine beaches, explore Portuguese heritage, and enjoy vibrant nightlife in Goa.",
        highlights: ["Beach activities", "Water sports", "Historical tours", "Local markets", "Sunset cruises"],
        originalPrice: 35000,
        currentPrice: 28000,
        badge: "Hot Deal"
    },
    {
        id: 4,
        title: "Himalayan Adventure Trek",
        destination: "himachal",
        duration: "8-14",
        days: 12,
        budget: "standard",
        type: "adventure",
        image: "Himalayan_Adventure_Trek.jpg",
        description: "Challenge yourself with trekking in the mighty Himalayas, visit ancient temples, and experience mountain culture.",
        highlights: ["Mountain trekking", "Temple visits", "Local villages", "Camping", "Photography"],
        originalPrice: 55000,
        currentPrice: 48000,
        badge: "Adventure"
    },
    {
        id: 5,
        title: "Golden Triangle Classic",
        destination: "golden-triangle",
        duration: "4-7",
        days: 7,
        budget: "standard",
        type: "cultural",
        image: "Golden_Triangle_Classic.jpg",
        description: "Discover India's most iconic destinations: Delhi, Agra, and Jaipur. Perfect introduction to Indian heritage.",
        highlights: ["Taj Mahal visit", "Red Fort", "Amber Palace", "Local cuisine", "Shopping tours"],
        originalPrice: 42000,
        currentPrice: 35000,
        badge: "Classic"
    },
    {
        id: 6,
        title: "Kashmir Valley Beauty",
        destination: "kashmir",
        duration: "4-7",
        days: 6,
        budget: "premium",
        type: "relaxation",
        image: "Kashmir_Valley_Beauty.jpg",
        description: "Experience the paradise on earth with Dal Lake, Mughal gardens, and snow-capped mountains.",
        highlights: ["Houseboat stay", "Shikara rides", "Mughal gardens", "Local handicrafts", "Mountain views"],
        originalPrice: 65000,
        currentPrice: 58000,
        badge: "Scenic"
    },
    {
        id: 7,
        title: "Uttarakhand Spiritual Journey",
        destination: "uttarakhand",
        duration: "8-14",
        days: 9,
        budget: "budget",
        type: "spiritual",
        image: "Uttarakhand_Spiritual_Journey.jpg",
        description: "Visit sacred temples, attend evening aarti, and find inner peace in the spiritual capital of India.",
        highlights: ["Temple visits", "Ganga aarti", "Yoga sessions", "Meditation", "Holy dips"],
        originalPrice: 25000,
        currentPrice: 18000,
        badge: "Spiritual"
    },
    {
        id: 8,
        title: "Romantic Kerala Honeymoon",
        destination: "kerala",
        duration: "4-7",
        days: 7,
        budget: "premium",
        type: "honeymoon",
        
        image: "Romantic_Kerala_Honeymoon.jpg",
        description: "Perfect romantic getaway with luxury resorts, private beaches, and couple spa treatments.",
        highlights: ["Luxury resorts", "Couple spa", "Private dining", "Sunset cruises", "Beach walks"],
        originalPrice: 95000,
        currentPrice: 82000,
        badge: "Romantic"
    }
];

let filteredPackages = [...tourPackages];

function renderPackages(packages) {
    const grid = document.getElementById('packagesGrid');
    const noResults = document.getElementById('noResults');
    
    if (packages.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    grid.innerHTML = packages.map(pkg => `
        <div class="package-card">
            <div class="package-image" style="background-image: url('${pkg.image}')">
                <div class="package-badge">${pkg.badge}</div>
            </div>
            <div class="package-content">
                <div class="package-title">${pkg.title}</div>
                <div class="package-duration">
                    <i class="fas fa-clock"></i>
                    ${pkg.days} Days / ${pkg.days - 1} Nights
                </div>
                <div class="package-description">${pkg.description}</div>
                <ul class="package-highlights">
                    ${pkg.highlights.map(highlight => `
                        <li><i class="fas fa-check"></i> ${highlight}</li>
                    `).join('')}
                </ul>
                <div class="package-price">
                    <div class="price-info">
                        <div class="current-price">₹${pkg.currentPrice.toLocaleString()}</div>
                        <div class="original-price">₹${pkg.originalPrice.toLocaleString()}</div>
                        <div class="per-person">per person</div>
                    </div>
                    <button class="book-btn" onclick="bookPackage(${pkg.id})">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function applyFilters() {
    const loading = document.getElementById('loading');
    const destination = document.getElementById('destination').value;
    const duration = document.getElementById('duration').value;
    const budget = document.getElementById('budget').value;
    const type = document.getElementById('type').value;

    loading.style.display = 'block';
    document.getElementById('packagesGrid').style.display = 'none';

    setTimeout(() => {
        filteredPackages = tourPackages.filter(pkg => {
            let matches = true;
            
            if (destination && pkg.destination !== destination) matches = false;
            if (duration && pkg.duration !== duration) matches = false;
            if (budget && pkg.budget !== budget) matches = false;
            if (type && pkg.type !== type) matches = false;
            
            return matches;
        });

        loading.style.display = 'none';
        document.getElementById('packagesGrid').style.display = 'grid';
        renderPackages(filteredPackages);
    }, 1000);
}

function clearFilters() {
    document.getElementById('destination').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('type').value = '';
    
    filteredPackages = [...tourPackages];
    renderPackages(filteredPackages);
}

function bookPackage(packageId) {
    const pkg = tourPackages.find(p => p.id === packageId);
    alert(`Thank you for your interest in "${pkg.title}"!\n\nYou will be redirected to our booking page where you can:\n• Select your travel dates\n• Choose room preferences\n• Add extra services\n• Complete your booking\n\nOur travel experts will contact you within 24 hours to confirm all details.`);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderPackages(filteredPackages);
});

// smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});