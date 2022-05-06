/* 
** https://kit.svelte.dev/docs/routing#endpoints-body-parsing
*/

export const post = async (event) => {
  const session = await event.request.json()
  if (session) {
    return {
      status: 200,
      headers: {
        'set-cookie': `session=${JSON.stringify(session)}; Path=/; HttpOnly; Secure; Expires=${new Date(session.expires_at * 1000).toUTCString()};`
      }
    }
  } else {
    return {
      status: 401
    }
  }
}
export const del = async (event) => {
  return {
    status: 204,
    headers: {
      'set-cookie': `session=; Path=/; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    }
  }
}