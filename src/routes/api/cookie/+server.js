/* 
** https://kit.svelte.dev/docs/routing#endpoints-body-parsing
*/

export const POST = async ({ request }) => {
  const session = request.body ? await request.json() : null
  if (session) {
    return new Response (null, {
      headers: {
        'set-cookie': `session=${JSON.stringify(session)}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${session.expires_at ? new Date(session.expires_at * 1000).toUTCString() : 'Thu, 01 Jan 1970 00:00:00 UTC'};`
      }
    })
  } else {
    return new Response('Expecting JSON body, but body was null.', { status: 400 })
  }
}
export const DELETE = () => {
  return new Response (null, {
    status: 204,
    headers: {
      'set-cookie': `session=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }
  })
}