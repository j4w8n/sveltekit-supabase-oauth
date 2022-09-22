import { setHeaders, supabaseServerClient } from '$lib/supabase'

/*
** https://kit.svelte.dev/docs/hooks#server-hooks-handle
*/
export const handle = async ({ event, resolve }) => {
  const tokens = event.cookies.get('tokens') ? JSON.parse(event.cookies.get('tokens')) : null
  const user = event.cookies.get('user') ? JSON.parse(event.cookies.get('user')) : null

  /* set Authorization headers for server-side `supabaseServerClient` */
  if (tokens) {
    /* v2 RC supabase-js client */
    setHeaders(tokens.access_token)

    /* v1 supabase-js client */
    //supabaseServerClient.auth.setSession(tokens.access_token)
  }
  
  event.locals.user = user

  const response = await resolve(event)
  return response
}

export function handleError({ error }) {
  return {
    message: error.message,
    code: error.code ?? 'UNKNOWN'
  }
}