import { supabase } from '$lib/supabase'

export async function GET(event) {
  let svrPages
  const user = event.locals.user
  if (user) {
    supabase.auth.setAuth(user.access_token)
    try {
      let { data, error } = await supabase.from('roles').select('subdomain,role')
      if (error) console.error('get pages error', error)
      svrPages = data
    } catch (error) {
      console.error(error)
    }
  }
  return {
    status: 200,
    body: {
      svrPages
    }
  }
}