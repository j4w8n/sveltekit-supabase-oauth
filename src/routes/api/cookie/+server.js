import { json } from '@sveltejs/kit'
/* 
** https://kit.svelte.dev/docs/web-standards#fetch-apis-request
*/

export const POST = async ({ cookies, request }) => {
  const session = request.body ? await request.json() : null
  if (session) {
    const { refresh_token, access_token } = session
    const user_data = JSON.stringify(
      {
        avatar_url: session.user.user_metadata.avatar_url,
        id: session.user.id
      }
    )

    const options = {
      maxAge: 7200,
      path: '/',
      sameSite: true
    }
    cookies.set('user', user_data, options)
    cookies.set('tokens', JSON.stringify(
      {
        refresh_token,
        access_token
      }
    ), options)
    
    return new Response (null)
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}

export const DELETE = ({ cookies }) => {
  cookies.delete('tokens', { path: '/' })
  cookies.delete('user', { path: '/' })

  return new Response (null, { status: 204 })
}