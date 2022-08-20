import { supabase } from '$lib/supabase'
import { redirect } from '@sveltejs/kit'

export async function load({ parent, locals }) {
  console.log('load called for /app')
  let svrPages
  const { session } = await parent()

  if (!session) throw redirect(307, '/login')

  supabase.auth.setAuth(locals.session.access_token)
  try {
    let { data, error } = await supabase.from('roles').select('subdomain,role')
    if (error) console.error('get pages error', error)
    svrPages = data
  } catch (error) {
    console.error(error)
  }

  return {
    svrPages,
    session
  }
}