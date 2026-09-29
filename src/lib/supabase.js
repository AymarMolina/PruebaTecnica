import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, { auth: { persistSession: false } })
  : null

export async function createLead(lead) {
  if (!supabase) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }
  const { error } = await supabase.from('leads').insert(lead)
  if (error) throw error
}
