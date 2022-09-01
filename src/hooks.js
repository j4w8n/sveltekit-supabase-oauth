import { parse } from 'cookie'
import { setSupabaseHeaders } from '$lib/supabase'

/*
** https://kit.svelte.dev/docs/hooks#handle
*/
export const handle = async ({ event, resolve }) => {
  const cookies = parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null
  const user = cookies.user ? JSON.parse(cookies.user) : null

  /* set server-side supabaseServerClient Authorization headers */
  await setSupabaseHeaders(session?.access_token)

  event.locals.user = user

  const response = await resolve(event)
  return response
}