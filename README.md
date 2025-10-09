# MysticMiles

A modern travel website for exploring India's incredible destinations, booking accommodations, and planning perfect trips.

## Features

- **User Authentication**: Secure signup and login with Supabase Auth
- **Tour Packages**: Browse and book curated tour packages from database
- **Hotel & Restaurant Bookings**: Make reservations with real-time database integration
- **Interactive Map**: Explore destinations on an interactive Leaflet map
- **Feedback System**: Share experiences and reviews
- **AI Chatbot**: Get instant travel assistance
- **Responsive Design**: Works seamlessly on all devices
- **Accessible**: WCAG compliant with proper ARIA labels

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Backend**: Supabase (PostgreSQL database, Authentication, Row Level Security)
- **Build Tool**: Vite
- **Maps**: Leaflet.js
- **Icons**: Font Awesome

## Project Structure

```
mysticmiles/
├── js/
│   ├── supabase-client.js   # Supabase client configuration
│   ├── auth.js               # Authentication functions
│   ├── booking.js            # Booking management
│   ├── feedback.js           # Feedback submission
│   ├── tour-packages.js      # Tour package queries
│   └── main.js               # Main app initialization
├── index.html                # Home page
├── login.html                # Login page
├── signup.html               # Signup page
├── tour.html                 # Tour packages page
├── about_us.html             # About page
├── style.css                 # Main styles
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env` file is pre-configured with Supabase credentials.

3. **Database Setup**
   The database schema has been created with the following tables:
   - `profiles` - User profile information
   - `tour_packages` - Available tour packages
   - `hotel_bookings` - Hotel booking requests
   - `restaurant_bookings` - Restaurant reservations
   - `tour_bookings` - Tour package bookings
   - `feedback` - User feedback and reviews

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Key Improvements Made

### Database & Backend
- Integrated Supabase for data persistence
- Created complete database schema with RLS policies
- Seeded tour packages data
- Implemented secure authentication

### Code Organization
- Refactored monolithic JavaScript into modular files
- Separated concerns (auth, booking, feedback, packages)
- Used ES6 modules for better maintainability
- Removed duplicated code

### Design & UX
- Implemented CSS variables for consistent theming
- Fixed navigation padding issues
- Removed purple/violet gradients (replaced with blue tones)
- Added active navigation states
- Improved visual hierarchy

### Functionality
- Real authentication (no more mock login)
- Actual database-backed bookings
- Tour packages loaded from database
- Search functionality works properly
- Forms submit to database

### Accessibility
- Added ARIA labels throughout
- Proper semantic HTML
- Keyboard navigation support
- Screen reader friendly

### Performance
- Added lazy loading for images
- Optimized build with Vite
- Minified assets
- Proper error handling

### Security
- Row Level Security policies on all tables
- Secure authentication with Supabase
- No exposed credentials in frontend code
- Proper form validation

## Usage

### For Users
1. **Sign Up**: Create an account to access booking features
2. **Browse**: Explore destinations and tour packages
3. **Book**: Make hotel, restaurant, or tour bookings
4. **Feedback**: Share your travel experiences

### For Developers
- All booking functions require authentication
- Use the modular JS files to extend functionality
- Follow existing patterns for consistency
- Run `npm run build` before deploying

## Security Notes

- Never commit `.env` file to version control
- All user data is protected with RLS policies
- Authentication tokens are handled by Supabase
- Forms validate on both client and server side

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2024 MysticMiles

## Team

- **Souvik Kar** - Project Lead & Developer
- **Moloy Malik** - Design Support
- **Suchandra Sardar** - Content Advisor
- **Soumyadip Naskar** - QA & Testing
- **Subhankar Gupta** - Logistics & Research
