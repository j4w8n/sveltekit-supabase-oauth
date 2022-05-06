import cookie from 'cookie' 

export const getSession = async (event) => {
  // hydrate the session store with data from the 'session' cookie
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  return cookies.session ? JSON.parse(cookies.session) : false
}