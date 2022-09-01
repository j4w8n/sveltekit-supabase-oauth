import { supabaseServerClient } from '$lib/supabase'
import { redirect, error } from '@sveltejs/kit'

export async function load({ params, parent }) {
  console.log('page load running')
  const { user }  = await parent()
  if (user) {
    try {
      var { data, error } = await supabaseServerClient.from('roles').select('subdomain')
      if (error) {
        console.error('error fetching roles', error)
      }
    } catch (error) {
      console.error(error)
    }
    if (data.length > 0) {
      const found = data.filter(item => {
        if (item.subdomain === params.page) return true
      })
      if (found.length > 0) {
        return {
          page: found[0]
        }
      } else {
        // not authorized for this subdomain, or subdomain not found
        throw redirect(303, '/app')
      }
    } else {
      // no roles found
      throw redirect(303, '/app')
    }
  } else {
    // not logged in
    throw redirect(303, '/login')
  }
}