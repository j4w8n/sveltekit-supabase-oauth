import { createSupabaseServerClient } from '$lib/supabase'

/*
** https://kit.svelte.dev/docs/hooks#server-hooks
*/
export const handle = async ({ event, resolve }) => {
  const cookieList = ['sb-user','sb-access-token','sb-refresh-token']
  let cookies = {}
  for (let i=0; i<cookieList.length; i++) {
    cookies[cookieList[i]] = event.cookies.get(cookieList[i]) ? JSON.parse(event.cookies.get(cookieList[i])) : null
  }

  if (cookies['sb-access-token']) {
    /* set access token for server client */
    createSupabaseServerClient(cookies['sb-access-token'])
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