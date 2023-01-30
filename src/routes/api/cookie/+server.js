export const POST = async ({ cookies, request }) => {
  const session = request.body ? await request.json() : null
  if (session) {
    const { refresh_token, access_token, user } = session
    const cookies_to_set = Object.entries({
      'sb-user': user,
      'sb-access-token': access_token,
      'sb-refresh-token': refresh_token
    })
    const cookie_options = {
      maxAge: 7200,
      path: '/',
      sameSite: 'strict'
    }
    const response = new Response(null)

    cookies_to_set.forEach(([name, value]) => {
      response.headers.append('set-cookie', cookies.serialize(name, JSON.stringify(value), cookie_options))
    })

    return response
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}

export const DELETE = ({ cookies }) => {
  cookies.delete('sb-access-token', { path: '/' })
  cookies.delete('sb-refresh-token', { path: '/' })
  cookies.delete('sb-user', { path: '/' })

  return new Response(null, { status: 204 })
}