import { parse } from 'cookie'
import { supabase } from '$lib/supabase'

/*
** https://kit.svelte.dev/docs/hooks#handle
*/
export const handle = async ({ event, resolve }) => {
  /* if there are cookies named `session` and `user`, grab the info */
  const cookies = await parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null
  const user = cookies.user ? JSON.parse(cookies.user) : null

  /* set server-side auth for supabase */
  if (session) supabase.auth.setAuth(session.access_token)

  /*
  ** use event.locals to securely store session data, like access tokens, for use in js endpoints;
  ** or for user data on the server-side.
  ** `.user` here is arbitrary - use what you'd like.
  */
  event.locals.user = user

  const response = await resolve(event)
  return response
}