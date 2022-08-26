import { supabase } from '$lib/supabase'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, params }) {
  if (locals.user) {
    try {
      let { data: roles, error: errRoles } = await supabase.from('roles').select('subdomain')
      if (errRoles) {
        console.error('error fetching roles', errRoles)
      }
      if (roles.length > 0) {
        const found = roles.filter(item => {
          if (item.subdomain === params.page) return true
        })
        if (found.length > 0) {
          return {
            page: found[0]
          }
        } else {
          // not authorized for this subdomain, or not found
          throw redirect(307, '/app')
        }
      } else {
        // no roles found
        throw redirect(307, '/app')
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    // not logged in
    throw redirect(307, '/login')
  }
}