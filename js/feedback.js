import { supabase, getCurrentUser } from './supabase-client.js';

export async function submitFeedback(feedbackData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Please login to submit feedback');
    }

    const { data, error } = await supabase
      .from('feedback')
      .insert([{
        user_id: user.id,
        feedback_type: feedbackData.type,
        rating: feedbackData.rating,
        title: feedbackData.title,
        message: feedbackData.message
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, feedback: data };
  } catch (error) {
    console.error('Feedback submission error:', error);
    return { success: false, error: error.message };
  }
}

export async function getPublishedFeedback(limit = 10, type = null) {
  try {
    let query = supabase
      .from('feedback')
      .select('*, profiles(first_name, last_name)')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('feedback_type', type);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, feedback: data };
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return { success: false, error: error.message };
  }
}
