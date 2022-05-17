import { supabase } from '$lib/supabase'

export async function get(event) {
  const user = event.locals.user
  if (user) {
    supabase.auth.setAuth(user.access_token)
    try {
      let { data: roles, error: errRoles } = await supabase.from('roles').select('subdomain')
      if (errRoles) {
        console.error('error fetching roles', errRoles)
      }
      if (roles.length > 0) {
        const found = roles.filter(item => {
          if (item.subdomain === event.params.page) return true
        })
        if (found.length > 0) {
          return {
            body: {
              page: found[0]
            }
          }
        } else {
          // not authorized for this subdomain
          return {
            status: 302,
            headers: {
              location: '/'
            }
          }
        }
      } else {
        // no roles found
        return {
          status: 302,
          headers: {
            location: '/'
          }
        }
      }
    } catch (error) {
      console.error(error)
      return {
        status: 302,
        headers: {
          location: '/'
        }
      }
    }
  } else {
    // not logged in
    return {
      status: 302,
      headers: {
        location: '/'
      }
    }
  }
}