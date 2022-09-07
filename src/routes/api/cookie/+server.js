import { json } from '@sveltejs/kit'
/* 
** https://kit.svelte.dev/docs/web-standards#fetch-apis-request
*/

export const POST = async ({ cookies, request }) => {
  const session = request.body ? await request.json() : null
  if (session) {
    const expires = session.expires_at ? new Date(session.expires_at * 1000) : new Date(0)
    const user_data = JSON.stringify(
      {
        avatar_url: session.user.user_metadata.avatar_url,
        id: session.user.id
      }
    )
    const token_data = JSON.stringify(
      {
        refresh_token: session.refresh_token,
        access_token: session.access_token
      }
    )

    const user_options = {
      expires,
      path: '/',
      sameSite: true
    }
    const token_options = {
      expires,
      path: '/',
      sameSite: true
    }
    cookies.set('user', user_data, user_options)
    cookies.set('tokens', token_data, token_options)
    
    return new Response (null)
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}

export const DELETE = ({ cookies }) => {
  const user_options = {
    expires: new Date(0),
    path: '/',
    sameSite: true
  }
  const token_options = {
    expires: new Date(0),
    path: '/',
    sameSite: true
  }

  cookies.set('tokens', '', token_options)
  cookies.set('user', '', user_options)

  return new Response (null, { status: 204 })
}