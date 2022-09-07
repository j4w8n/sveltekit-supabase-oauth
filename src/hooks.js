import { setSupabaseHeaders } from '$lib/supabase'

/*
** https://kit.svelte.dev/docs/hooks#handle
*/
export const handle = async ({ event, resolve }) => {
  const tokens = JSON.parse(event.cookies.get('tokens') ?? null)
  const user = JSON.parse(event.cookies.get('user') ?? null)
  
  /* set server-side supabaseServerClient Authorization headers */
  await setSupabaseHeaders(tokens?.access_token)

  event.locals.user = user

  const response = await resolve(event)
  return response
}