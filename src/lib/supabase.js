import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
export const supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export const setHeaders = (access_token) => {
  supabaseServerClient.headers.Authorization = `Bearer ${access_token}`
  supabaseServerClient.realtime.headers.Authorization = `Bearer ${access_token}`
  supabaseServerClient.rest.headers.Authorization = `Bearer ${access_token}`
}

export const signIn = async (provider) => {
  try {
    /*
    ** if logging in on a page other than `/`:
    ** to prevent a flash of content after login,
    ** set redirectTo equal to your app's login page
    */
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider, options: { redirectTo: 'http://localhost:5173/login' } })
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    if (error) console.error(error)
  } catch (error) {
    console.error(error)
  }
}