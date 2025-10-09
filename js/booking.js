import { supabase, getCurrentUser } from './supabase-client.js';

export async function createHotelBooking(bookingData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Please login to make a booking');
    }

    const { data, error } = await supabase
      .from('hotel_bookings')
      .insert([{
        user_id: user.id,
        city: bookingData.city,
        check_in: bookingData.checkIn,
        check_out: bookingData.checkOut,
        guests: bookingData.guests,
        hotel_type: bookingData.hotelType
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, booking: data };
  } catch (error) {
    console.error('Hotel booking error:', error);
    return { success: false, error: error.message };
  }
}

export async function createRestaurantBooking(bookingData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Please login to make a booking');
    }

    const { data, error } = await supabase
      .from('restaurant_bookings')
      .insert([{
        user_id: user.id,
        city: bookingData.city,
        cuisine: bookingData.cuisine,
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        party_size: bookingData.partySize
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, booking: data };
  } catch (error) {
    console.error('Restaurant booking error:', error);
    return { success: false, error: error.message };
  }
}

export async function createTourBooking(packageId, travelDate, numberOfTravelers, totalPrice, specialRequests = '') {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Please login to make a booking');
    }

    const { data, error } = await supabase
      .from('tour_bookings')
      .insert([{
        user_id: user.id,
        package_id: packageId,
        travel_date: travelDate,
        number_of_travelers: numberOfTravelers,
        total_price: totalPrice,
        special_requests: specialRequests
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, booking: data };
  } catch (error) {
    console.error('Tour booking error:', error);
    return { success: false, error: error.message };
  }
}

export async function getUserBookings(userId, type = 'all') {
  try {
    const queries = [];

    if (type === 'all' || type === 'hotels') {
      const hotels = await supabase
        .from('hotel_bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      queries.push(hotels);
    }

    if (type === 'all' || type === 'restaurants') {
      const restaurants = await supabase
        .from('restaurant_bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      queries.push(restaurants);
    }

    if (type === 'all' || type === 'tours') {
      const tours = await supabase
        .from('tour_bookings')
        .select('*, tour_packages(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      queries.push(tours);
    }

    return { success: true, bookings: queries };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { success: false, error: error.message };
  }
}
