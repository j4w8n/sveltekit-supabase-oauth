import { json } from '@sveltejs/kit'
import { serialize } from 'cookie'
/* 
** https://kit.svelte.dev/docs/web-standards#fetch-apis-request
*/

export const POST = async ({ request }) => {
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
    
    const user = serialize('user', user_data, {
      expires,
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: true
    })
    const tokens = serialize('session', token_data, {
      expires,
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: true
    })
    const headers = new Headers()
    headers.append('set-cookie', user)
    headers.append('set-cookie', tokens)
    
    return new Response (null, { headers })
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}

export const DELETE = () => {
  const user = serialize('user', '', {
    expires: new Date(0),
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: true
  })
  const tokens = serialize('session', '', {
    expires: new Date(0),
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: true
  })

  const headers = new Headers()
  headers.append('set-cookie', user)
  headers.append('set-cookie', tokens)

  return new Response (null, {
    status: 204,
    headers
  })
}