import { redirect } from '@sveltejs/kit'
import { supabaseServerClient } from '$lib/supabase'

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(307, '/login')

  /* use the server client */
  //let { data, error } = await supabaseServerClient.from('').select('')
}