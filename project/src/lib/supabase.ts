import { createClient } from '@supabase/supabase-js';

// Check if environment variables are properly configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here' || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('⚠️ Supabase environment variables not configured. Using fallback mode.');
}

// Create client with proper fallback handling
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database functions with fallback handling
export const saveContentToDatabase = async (content: any) => {
  if (!supabase) {
    console.warn('⚠️ Supabase not configured. Content will only be saved locally.');
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .upsert({ 
        id: 1, 
        content: content,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('❌ Error saving to database:', error);
      return false;
    }
    
    console.log('✅ Content saved to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Database save error:', error);
    return false;
  }
};

export const loadContentFromDatabase = async () => {
  if (!supabase) {
    console.warn('⚠️ Supabase not configured. Using local storage only.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single();
    
    if (error) {
      console.error('❌ Error loading from database:', error);
      return null;
    }
    
    return data?.content || null;
  } catch (error) {
    console.error('❌ Database load error:', error);
    return null;
  }
};

// Real-time subscription for content changes
export const subscribeToContentChanges = (callback: (content: any) => void) => {
  if (!supabase) {
    console.warn('⚠️ Supabase not configured. Real-time updates disabled.');
    return { unsubscribe: () => {} };
  }

  return supabase
    .channel('site_content_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'site_content'
      },
      (payload) => {
        if (payload.new && payload.new.content) {
          callback(payload.new.content);
        }
      }
    )
    .subscribe();
};