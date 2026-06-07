import { supabase } from './supabase.js';

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}

export async function getProfile() {
  const user = await getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  return data;
}

export async function signUp({ email, password, fullName, currentResidence, expectedReturnDate }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });
  if (error) throw error;

  if (data.user) {
    await supabase.from('profiles').update({
      current_residence: currentResidence,
      expected_return_date: expectedReturnDate,
      full_name: fullName
    }).eq('id', data.user.id);
  }
  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChange(callback) {
  supabase.auth.onAuthStateChange((event, session) => {
    (async () => {
      callback(event, session);
    })();
  });
}

export function updateHeaderAuth(session) {
  const actions = document.querySelector('.header-actions');
  if (!actions) return;

  if (session) {
    actions.innerHTML = `
      <a class="btn btn-outline" href="dashboard.html">マイページ</a>
      <button class="btn btn-primary" id="logout-btn">ログアウト</button>
    `;
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        await signOut();
        window.location.href = 'index.html';
      });
    }
  } else {
    actions.innerHTML = `
      <a class="btn btn-outline" href="login.html">ログイン</a>
      <a class="btn btn-primary" href="signup.html">無料会員登録</a>
    `;
  }
}

export async function initAuth() {
  const session = await getSession();
  updateHeaderAuth(session);
  onAuthStateChange((event, session) => {
    updateHeaderAuth(session);
  });
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

export async function requireAdmin() {
  const profile = await getProfile();
  if (!profile || !profile.is_admin) {
    window.location.href = 'login.html';
    return null;
  }
  return profile;
}
