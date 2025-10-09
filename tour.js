import { getAllPackages, getFilteredPackages, getDurationRange, formatPrice } from './js/tour-packages.js';
import { createTourBooking } from './js/booking.js';
import { getCurrentUser } from './js/supabase-client.js';

let allPackages = [];

async function loadPackages() {
    const loadingDiv = document.getElementById('loading');
    const packagesGrid = document.getElementById('packagesGrid');

    loadingDiv.style.display = 'block';
    packagesGrid.style.display = 'none';

    const result = await getAllPackages();

    loadingDiv.style.display = 'none';
    packagesGrid.style.display = 'grid';

    if (result.success) {
        allPackages = result.packages;
        renderPackages(allPackages);
    } else {
        document.getElementById('noResults').style.display = 'block';
    }
}

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
            <div class="package-image" style="background-image: url('${pkg.image_url}')">
                <div class="package-badge">${pkg.badge || 'Available'}</div>
            </div>
            <div class="package-content">
                <div class="package-title">${pkg.title}</div>
                <div class="package-duration">
                    <i class="fas fa-clock"></i>
                    ${pkg.duration_days} Days / ${pkg.duration_days - 1} Nights
                </div>
                <div class="package-description">${pkg.description}</div>
                <ul class="package-highlights">
                    ${pkg.highlights.map(highlight => `
                        <li><i class="fas fa-check"></i> ${highlight}</li>
                    `).join('')}
                </ul>
                <div class="package-price">
                    <div class="price-info">
                        <div class="current-price">${formatPrice(pkg.current_price)}</div>
                        <div class="original-price">${formatPrice(pkg.original_price)}</div>
                        <div class="per-person">per person</div>
                    </div>
                    <button class="book-btn" onclick="bookPackage('${pkg.id}', '${pkg.title}', ${pkg.current_price})">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.applyFilters = async function() {
    const loading = document.getElementById('loading');
    const packagesGrid = document.getElementById('packagesGrid');
    const destination = document.getElementById('destination').value;
    const duration = document.getElementById('duration').value;
    const budget = document.getElementById('budget').value;
    const type = document.getElementById('type').value;

    loading.style.display = 'block';
    packagesGrid.style.display = 'none';

    const filters = {};
    if (destination) filters.destination = destination;
    if (duration) filters.duration = duration;
    if (budget) filters.budget = budget;
    if (type) filters.type = type;

    const result = await getFilteredPackages(filters);

    loading.style.display = 'none';
    packagesGrid.style.display = 'grid';

    if (result.success) {
        renderPackages(result.packages);
    } else {
        document.getElementById('noResults').style.display = 'block';
    }
};

window.clearFilters = function() {
    document.getElementById('destination').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('type').value = '';

    renderPackages(allPackages);
};

window.bookPackage = async function(packageId, packageTitle, price) {
    const user = await getCurrentUser();

    if (!user) {
        if (confirm('Please login to book a tour package. Would you like to go to the login page?')) {
            window.location.href = 'login.html';
        }
        return;
    }

    const travelDate = prompt(`When would you like to travel?\n\nPlease enter the date (YYYY-MM-DD):`);
    if (!travelDate) return;

    const travelers = prompt(`How many travelers? (1-10)`, '2');
    if (!travelers || travelers < 1 || travelers > 10) {
        alert('Please enter a valid number of travelers (1-10)');
        return;
    }

    const totalPrice = price * parseInt(travelers);
    const specialRequests = prompt(`Any special requests or requirements? (Optional)`, '');

    const result = await createTourBooking(packageId, travelDate, parseInt(travelers), totalPrice, specialRequests || '');

    if (result.success) {
        alert(`✓ Booking Confirmed!\n\nPackage: ${packageTitle}\nTravel Date: ${travelDate}\nTravelers: ${travelers}\nTotal Price: ₹${totalPrice.toLocaleString()}\n\nOur travel experts will contact you within 24 hours to confirm all details.`);
    } else {
        alert(`Booking failed: ${result.error}`);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadPackages();

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        const searchFilters = allPackages.filter(pkg =>
            pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (searchFilters.length > 0) {
            renderPackages(searchFilters);
        }
    }
});
