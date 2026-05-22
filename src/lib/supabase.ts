import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseClient: any = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
  }
} else {
  console.warn('Supabase credentials missing in environment variables. Form submissions will fallback to simulated success.')
}

export const supabase = supabaseClient || {
  from: () => ({
    insert: async () => ({ error: new Error('Supabase credentials not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.') })
  })
}

