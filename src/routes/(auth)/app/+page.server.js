import { supabaseServerClient } from '$lib/supabase'

export async function load({ parent }) {
  const { user }  = await parent()
  let pages = [], user_id = user?.user_id ?? null
  
  if (user) {
    try {
      let { data, error } = await supabaseServerClient.from('pages').select('subdomain')
      if (error) console.error('get pages error', error)

      pages = data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    pages,
    user_id
  }
}