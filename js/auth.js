import { supabase } from './supabase-client.js';

export async function signUp(email, password, profileData) {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          birth_date: profileData.birthDate,
          gender: profileData.gender,
          newsletter_subscribed: profileData.newsletter || false
        }]);

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: error.message };
  }
}

export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

export function setupAuthListener(callback) {
  supabase.auth.onAuthStateChange((event, session) => {
    (async () => {
      if (callback) {
        await callback(event, session);
      }
    })();
  });
}

export async function updateAuthUI() {
  const { data: { user } } = await supabase.auth.getUser();
  const authButtons = document.querySelector('.auth-buttons');

  if (!authButtons) return;

  if (user) {
    const profile = await supabase
      .from('profiles')
      .select('first_name')
      .eq('user_id', user.id)
      .maybeSingle();

    const firstName = profile?.data?.first_name || 'User';

    authButtons.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px;">
        <span style="color: white;">Welcome, ${firstName}</span>
        <button id="logoutBtn" class="btn btn-secondary">Logout</button>
      </div>
    `;

    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
      await signOut();
      window.location.href = 'index.html';
    });
  } else {
    authButtons.innerHTML = `
      <a href="login.html" class="btn btn-secondary">Login</a>
      <a href="signup.html" class="btn btn-primary">Sign Up</a>
    `;
  }
}
