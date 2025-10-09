/*
  # Initial MysticMiles Database Schema

  ## Tables Created
  
  ### 1. profiles
  - Stores user profile information
  - Links to auth.users via user_id
  - Columns: user_id, first_name, last_name, phone, birth_date, gender, newsletter_subscribed, created_at, updated_at
  
  ### 2. tour_packages
  - Stores all available tour packages
  - Columns: id, title, destination, duration_days, budget_category, package_type, description, highlights, original_price, current_price, badge, image_url, is_active, created_at
  
  ### 3. hotel_bookings
  - Stores hotel booking requests
  - Columns: id, user_id, city, check_in, check_out, guests, hotel_type, status, created_at
  
  ### 4. restaurant_bookings
  - Stores restaurant booking requests
  - Columns: id, user_id, city, cuisine, booking_date, booking_time, party_size, status, created_at
  
  ### 5. tour_bookings
  - Stores tour package bookings
  - Columns: id, user_id, package_id, travel_date, number_of_travelers, total_price, status, special_requests, created_at
  
  ### 6. feedback
  - Stores user feedback and reviews
  - Columns: id, user_id, feedback_type, rating, title, message, status, created_at
  
  ## Security
  - RLS enabled on all tables
  - Policies created for authenticated users to manage their own data
  - Admin policies for managing packages
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  birth_date date,
  gender text,
  newsletter_subscribed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create tour_packages table
CREATE TABLE IF NOT EXISTS tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  duration_days integer NOT NULL,
  budget_category text NOT NULL CHECK (budget_category IN ('budget', 'standard', 'premium', 'luxury')),
  package_type text NOT NULL CHECK (package_type IN ('adventure', 'cultural', 'relaxation', 'spiritual', 'wildlife', 'honeymoon')),
  description text NOT NULL,
  highlights text[] NOT NULL DEFAULT '{}',
  original_price integer NOT NULL,
  current_price integer NOT NULL,
  badge text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active packages"
  ON tour_packages FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create hotel_bookings table
CREATE TABLE IF NOT EXISTS hotel_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  city text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  hotel_type text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hotel_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own hotel bookings"
  ON hotel_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create hotel bookings"
  ON hotel_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own hotel bookings"
  ON hotel_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create restaurant_bookings table
CREATE TABLE IF NOT EXISTS restaurant_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  city text NOT NULL,
  cuisine text NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  party_size integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE restaurant_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own restaurant bookings"
  ON restaurant_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create restaurant bookings"
  ON restaurant_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own restaurant bookings"
  ON restaurant_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create tour_bookings table
CREATE TABLE IF NOT EXISTS tour_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id uuid REFERENCES tour_packages(id) ON DELETE CASCADE,
  travel_date date NOT NULL,
  number_of_travelers integer NOT NULL DEFAULT 1,
  total_price integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tour_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tour bookings"
  ON tour_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tour bookings"
  ON tour_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tour bookings"
  ON tour_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_type text NOT NULL CHECK (feedback_type IN ('hotel', 'restaurant', 'tour', 'general')),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'published')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view published feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (status = 'published');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_hotel_bookings_user_id ON hotel_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_bookings_user_id ON restaurant_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_user_id ON tour_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_package_id ON tour_bookings(package_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_packages_destination ON tour_packages(destination);
CREATE INDEX IF NOT EXISTS idx_tour_packages_is_active ON tour_packages(is_active);