import { supabase } from '$lib/supabase'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, parent }) {
  console.log('app loading')
  //if (!locals.user) throw redirect(307, '/')

  const { user }  = await parent()
  let pages = [], user_id = user?.user_id

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