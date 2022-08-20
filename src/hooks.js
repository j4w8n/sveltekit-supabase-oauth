import cookie from 'cookie'

/*
** https://kit.svelte.dev/docs/hooks#handle
*/
export const handle = async ({ event, resolve }) => {
  console.log('handle called for', event.url.pathname)
  
  // if there's a cookie named `session`, grab the info
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null
  
  /*
  ** use event.locals to securely store user data, like access tokens, for use in js endpoints.
  ** `.session` is arbitrary - use what you'd like.
  */
  event.locals.session = session
    ? {
        access_token: session.access_token,
        id: session.id,
        avatar_url: session.avatar_url
      }
    : null

  const response = await resolve(event)
  return response
}