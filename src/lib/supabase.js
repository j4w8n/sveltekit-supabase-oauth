import { createClient } from '@supabase/supabase-js'
import { PUBLIC_BASE_URL, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { dev } from '$app/environment'

export const supabaseBrowserClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export let supabaseServerClient
export const createSupabaseServerClient = (access_token) => {
  supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      headers: { 'Authorization': `Bearer ${access_token}` },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  })
}

export const signIn = async (provider) => {
  try {
    /*
    ** if logging in on a page other than `/`:
    ** to prevent a flash of content after login,
    ** set redirectTo equal to your app's login page
    */

    const { error } = await supabaseClient.auth.signInWithOAuth(
      { provider, 
        options: { redirectTo: `${PUBLIC_BASE_URL}:${dev ? 5173 : 4173}/login` }
      }
    )
    if (error) console.error(error)
  } catch (err) {
    console.error(err)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    if (error) console.error(error)
  } catch (err) {
    console.error(err)
  }
}