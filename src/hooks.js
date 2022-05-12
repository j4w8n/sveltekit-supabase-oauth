import cookie from 'cookie'

export const handle = async ({ event, resolve}) => {
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null
  event.locals.user = session
    ? {
        access_token: session.access_token,
        avatar_url: session.user.user_metadata.avatar_url,
        id: session.user.id
      }
    : ''

  const response = await resolve(event)
  return response
}

export const getSession = async (event) => {
  // hydrate the session store with data from the 'session' cookie
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  return cookies.session ? JSON.parse(cookies.session) : false
}