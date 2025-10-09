import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://gqrobyxyqzemdvkyrali.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxcm9ieXh5cXplbWR2a3lyYWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMzA4NjcsImV4cCI6MjA3NTYwNjg2N30.PIlv_0kah5m_XeX9BCv9DYiwXU_oiUv5ezFyDcovxiI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error getting profile:', error);
    return null;
  }
  return data;
}

export async function checkAuthState() {
  const user = await getCurrentUser();
  return !!user;
}
