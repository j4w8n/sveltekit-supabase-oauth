/* 
** https://kit.svelte.dev/docs/web-standards#fetch-apis
*/

export const POST = async ({ cookies, request }) => {
  const session = request.body ? await request.json() : null
  if (session) {
    const { refresh_token, access_token, user } = session
    const options = {
      maxAge: 7200,
      path: '/',
      sameSite: true
    }
    cookies.set('sb-user', JSON.stringify(user), options)
    cookies.set('sb-access-token', JSON.stringify(access_token), options)
    cookies.set('sb-refresh-token', JSON.stringify(refresh_token), options)

    return new Response (null)
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}

export const DELETE = ({ cookies }) => {
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })
  cookies.delete('sb-user', { path: '/' })

  return new Response (null, { status: 204 })
}