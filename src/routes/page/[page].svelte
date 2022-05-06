<script context="module">
  import { supabase } from '$lib/supabase'
  export const load = async ({ params, session }) => {
    if (session) {
      supabase.auth.setAuth(session.access_token)
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
              props: {
                page: found[0]
              }
            }
          } else {
            // not authorized for this subdomain
            return {
              status: 302,
              redirect: '/'
            }
          }
        } else {
          // no roles found
          return {
            status: 302,
            redirect: '/'
          }
        }
      } catch (error) {
        console.error(error)
        return {
          status: 302,
          redirect: '/'
        }
      }
    } else {
      // not logged in
      return {
        status: 302,
        redirect: '/'
      }
    }
  }
</script>

<script>
  export let page
</script>

<h1 class="h3">{page?.subdomain}</h1>