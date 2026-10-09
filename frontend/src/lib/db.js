import { supabase } from './supabase';

/**
 * Creates or updates a user document in the database
 * Role should be either 'client' or 'pro'
 */
export const saveUserProfile = async (userId, data) => {
  const { error } = await supabase
    .from('users')
    .upsert({ 
      id: userId,
      email: data.email,
      display_name: data.displayName,
      role: data.role,
      updated_at: new Date()
    });
    
  if (error) throw error;
};

/**
 * Fetches the user profile including their role
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  
  if (data) {
    return {
      uid: data.id,
      email: data.email,
      displayName: data.display_name,
      role: data.role
    };
  }
  return null;
};

/**
 * Creates a new job posting
 */
export const createJob = async (clientData, jobData) => {
  const { error } = await supabase
    .from('jobs')
    .insert({
      client_id: clientData.uid,
      client_name: clientData.displayName || clientData.email,
      title: jobData.title,
      description: jobData.description,
      category: jobData.category,
      location: jobData.location,
      budget: jobData.budget,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    });
    
  if (error) throw error;
};

/**
 * Get jobs filtered by status or category
 */
export const getJobs = async (filters = {}) => {
  let query = supabase.from('jobs').select('*');
  
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};
