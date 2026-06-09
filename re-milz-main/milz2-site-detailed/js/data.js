import { supabase } from './supabase.js';

export async function getJobs({ limit = 20, offset = 0, tags = [], search = '', locations = [], employmentTypes = [] } = {}) {
  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%,location.ilike.%${search}%`);
  }
  if (tags.length > 0) {
    query = query.overlaps('tags', tags);
  }
  if (employmentTypes.length > 0) {
    query = query.in('employment_type', employmentTypes);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let filtered = data || [];
  if (locations.length > 0) {
    filtered = filtered.filter(job =>
      locations.some(loc => job.location && job.location.includes(loc))
    );
  }

  return { jobs: filtered, total: locations.length > 0 ? filtered.length : (count || 0) };
}

export async function getJob(id) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getArticles({ limit = 20, offset = 0, category = '' } = {}) {
  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { articles: data || [], total: count || 0 };
}

export async function getArticle(id) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getCompanies({ category = '', categories = [], search = '', online = false, corporate = false, english = false, limit = 50 } = {}) {
  let query = supabase
    .from('support_companies')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name')
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }
  if (categories.length > 0) {
    query = query.in('category', categories);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`);
  }
  if (online) {
    query = query.eq('has_online_support', true);
  }
  if (corporate) {
    query = query.eq('has_corporate_support', true);
  }
  if (english) {
    query = query.eq('has_english_support', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getCompany(id) {
  const { data, error } = await supabase
    .from('support_companies')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getChecklistPhases() {
  const { data, error } = await supabase
    .from('checklist_phases')
    .select('*, checklist_items(*)')
    .order('order_index');
  if (error) throw error;
  return data || [];
}

export async function getUserProgress() {
  const { data, error } = await supabase
    .from('user_checklist_progress')
    .select('item_id, completed_at');
  if (error) throw error;
  return data || [];
}

export async function toggleChecklistItem(itemId, completed) {
  if (completed) {
    const { error } = await supabase
      .from('user_checklist_progress')
      .insert({ item_id: itemId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('user_checklist_progress')
      .delete()
      .eq('item_id', itemId);
    if (error) throw error;
  }
}

export async function submitInquiry({ name, email, category, title, message }) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert({ name, email, category, title, message });
  if (error) throw error;
  return data;
}

export async function getHomeStats() {
  const [jobsRes, companiesRes, articlesRes] = await Promise.all([
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('support_companies').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published')
  ]);
  return {
    jobs: jobsRes.count || 0,
    companies: companiesRes.count || 0,
    articles: articlesRes.count || 0
  };
}

export async function getCompanyCounts() {
  const { data, error } = await supabase
    .from('support_companies')
    .select('category');
  if (error) throw error;
  const counts = {};
  (data || []).forEach(row => {
    counts[row.category] = (counts[row.category] || 0) + 1;
  });
  return counts;
}
