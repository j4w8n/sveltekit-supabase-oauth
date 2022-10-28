import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

/* v2 supabase-js */
export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export let supabaseServerClient
export const createSupabaseServerClient = (access_token) => {
  supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      headers: { 'Authorization': `Bearer ${access_token}` }
    }
  })
}

/* v1 supabase-js */
// export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
//
// export const supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export const signIn = async (provider) => {
  try {
    /*
    ** if logging in on a page other than `/`:
    ** to prevent a flash of content after login,
    ** set redirectTo equal to your app's login page
    */

    /* v2 supabase-js */
    const { error } = await supabaseClient.auth.signInWithOAuth(
      { provider, 
        options: { redirectTo: 'http://localhost:5173/login' }
      }
    )
    /* v1 supabase-js */
    // const { error } = await supabaseClient.auth.signIn(
    //   { provider }, 
    //   { redirectTo: 'http://localhost:5173/login' }
    // )
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