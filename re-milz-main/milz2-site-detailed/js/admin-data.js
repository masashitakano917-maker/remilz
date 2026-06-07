import { supabase } from './supabase.js';

export async function getAdminStats() {
  const [inquiriesRes, usersRes, jobsRes, articlesRes] = await Promise.all([
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('status', 'published')
  ]);
  return {
    pendingInquiries: inquiriesRes.count || 0,
    totalUsers: usersRes.count || 0,
    activeJobs: jobsRes.count || 0,
    totalArticles: articlesRes.count || 0
  };
}

export async function getAllJobs({ status = '', limit = 50 } = {}) {
  let query = supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createJob(job) {
  const { data, error } = await supabase
    .from('jobs')
    .insert(job)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateJob(id, updates) {
  const { data, error } = await supabase
    .from('jobs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteJob(id) {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
}

export async function getAllArticles({ status = '', limit = 50 } = {}) {
  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createArticle(article) {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateArticle(id, updates) {
  const { data, error } = await supabase
    .from('articles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteArticle(id) {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}

export async function getAllCompanies({ category = '', limit = 100 } = {}) {
  let query = supabase
    .from('support_companies')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createCompany(company) {
  const { data, error } = await supabase
    .from('support_companies')
    .insert(company)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateCompany(id, updates) {
  const { data, error } = await supabase
    .from('support_companies')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteCompany(id) {
  const { error } = await supabase.from('support_companies').delete().eq('id', id);
  if (error) throw error;
}

export async function getAllInquiries({ status = '', limit = 50 } = {}) {
  let query = supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function updateInquiryStatus(id, status) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllUsers({ limit = 100 } = {}) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}
