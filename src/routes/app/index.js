import { supabase } from '$lib/supabase'

/*
** Feel free to use GET({ locals }) instead of GET(event).
** If you do this, then you'd remove 'event' from your 'locals.session' declaration.
** I'm using event, to clarify that our session info here is coming
** from what we set in the hooks.js handle function with event.locals.session
*/
export async function GET(event) {
  let svrPages
  const session = event.locals.session
  if (session) {
    supabase.auth.setAuth(session.access_token)
    try {
      let { data, error } = await supabase.from('roles').select('subdomain,role')
      if (error) console.error('get pages error', error)
      svrPages = data
    } catch (error) {
      console.error(error)
    }
  }
  return {
    status: 200,
    body: {
      svrPages
    }
  }
}