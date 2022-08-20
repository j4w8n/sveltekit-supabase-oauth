import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const signIn = async (provider) => {
  try {
    /*
    ** to prevent a flash of content after login,
    ** set redirectTo equal to your app's login page
    */
    const { error } = await supabase.auth.signIn({ provider }, { redirectTo: 'http://localhost:5173/login' })
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}