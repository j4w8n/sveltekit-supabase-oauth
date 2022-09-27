import { setHeaders, supabaseServerClient } from '$lib/supabase'
import { get_cookies } from './utils/cookies'

/*
** https://kit.svelte.dev/docs/hooks#server-hooks-handle
*/
export const handle = async ({ event, resolve }) => {
  const cookies = get_cookies(event, ['tokens', 'user'])

  /* set Authorization headers for server-side `supabaseServerClient` */
  if (cookies.tokens) {
    /* v2 RC supabase-js client */
    setHeaders(cookies.tokens.access_token)

    /* v1 supabase-js client */
    //supabaseServerClient.auth.setSession(tokens.access_token)
  }
  
  event.locals.user = cookies.user

  const response = await resolve(event)
  return response
}

export function handleError({ error }) {
  return {
    message: error.message,
    code: error.code ?? 'UNKNOWN'
  }
}