import { supabase } from '$lib/supabase'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, parent }) {
  console.log('app/+page.server.js load running')
  //if (!locals.session) throw redirect(307, '/')

  const { session }  = await parent()
  let pages, user_id = session?.user_id

  supabase.auth.setAuth(locals.session?.access_token)
  try {
    let { data, error } = await supabase.from('pages').select('subdomain')
    if (error) console.error('get pages error', error)
    pages = data
  } catch (error) {
    console.error(error)
  }

  return {
    pages,
    user_id
  }
}