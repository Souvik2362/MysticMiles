import { supabase } from './supabase-client.js';

export async function getAllPackages() {
  try {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, packages: data };
  } catch (error) {
    console.error('Error fetching packages:', error);
    return { success: false, error: error.message };
  }
}

export async function getFilteredPackages(filters) {
  try {
    let query = supabase
      .from('tour_packages')
      .select('*')
      .eq('is_active', true);

    if (filters.destination) {
      query = query.eq('destination', filters.destination);
    }

    if (filters.budget) {
      query = query.eq('budget_category', filters.budget);
    }

    if (filters.type) {
      query = query.eq('package_type', filters.type);
    }

    if (filters.duration) {
      const [min, max] = filters.duration.split('-').map(Number);
      if (max) {
        query = query.gte('duration_days', min).lte('duration_days', max);
      } else {
        query = query.gte('duration_days', min);
      }
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, packages: data };
  } catch (error) {
    console.error('Error filtering packages:', error);
    return { success: false, error: error.message };
  }
}

export async function getPackageById(id) {
  try {
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return { success: true, package: data };
  } catch (error) {
    console.error('Error fetching package:', error);
    return { success: false, error: error.message };
  }
}

export function getDurationRange(days) {
  if (days <= 3) return '1-3';
  if (days <= 7) return '4-7';
  if (days <= 14) return '8-14';
  return '15+';
}

export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}
