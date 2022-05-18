import { supabase } from '$lib/supabase'
import { pages } from '../stores/pages'

export async function get(event) {
  const user = event.locals.user
  if (user) {
    supabase.auth.setAuth(user.access_token)
    try {
      let { data, error } = await supabase.from('roles').select('subdomain,role')
      if (error) console.error('get pages error', error)
      $pages = data
    } catch (error) {
      console.error(error)
    }
  }
  return {
    status: 200
  }
}