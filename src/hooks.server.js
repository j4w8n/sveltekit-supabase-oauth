import { supabaseServerClient, createSupabaseServerClient } from '$lib/supabase'
import { get_cookies } from '$lib/utils'
import { refresh } from '$lib/refresh'

/*
** https://kit.svelte.dev/docs/hooks#server-hooks-handle
*/
export const handle = async ({ event, resolve }) => {
  await refresh(event)
  const cookies = get_cookies(event)

  if (cookies['sb-access-token']) {
    /* set access token for server client */

    /* v2 RC supabase-js */
    createSupabaseServerClient(cookies['sb-access-token'])

    /* v1 supabase-js */
    //supabaseServerClient.auth.setSession(cookies['sb-access-token'])
  }
  
  event.locals.user = cookies['sb-user']

  const response = await resolve(event)
  return response
}

export function handleError({ error }) {
  return {
    message: error.message,
    code: error.code ?? 'UNKNOWN'
  }
}