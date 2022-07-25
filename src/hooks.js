import cookie from 'cookie'

/*
** https://kit.svelte.dev/docs/hooks#handle
*/
export const handle = async ({ event, resolve }) => {
  // if there's a cookie named `session`, grab the info
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null
  
  /*
  ** use event.locals to securely store user data, like access tokens, for use in js endpoints.
  ** `.user` is arbitrary - use what you'd like.
  */
  event.locals.user = session
    ? {
        access_token: session.access_token,
        id: session.id
      }
    : null

  /*
  ** hydrate data, for use in getSession().
  ** this data is consequently available on the server-side via event.locals.session,
  ** but in this demo we don't use it anywhere else.
  ** we're doing this here to prevent needing to re-read cookies in getSession().
  ** notice we're not grabbing any access_tokens with session.user.
  */
  event.locals.session = session ? session.user : null

  const response = await resolve(event)
  return response
}

/*
** https://kit.svelte.dev/docs/hooks#getsession
*/
export const getSession = async (event) => {
  /*
  ** hydrate the sveltekit session store with data from the 'session' cookie via event.locals.session above.
  ** if you're not using sensitive data in event.locals.user, then you can use event.locals.user here instead
  ** and skip creating event.locals.session in handle().
  */
  return event.locals.session
}