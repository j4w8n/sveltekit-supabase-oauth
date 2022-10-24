import { get_cookies, decode } from './utils'
import { error } from '@sveltejs/kit'
import { supabaseClient } from './supabase'

export const refresh = async (event) => {
  /* Check if sb-access-token jwt is expiring soon or has expired. If so, refresh. */
  const cookies = get_cookies(event)
  const access_token = cookies['sb-access-token']

  if (access_token) {
    const jwt = decode(access_token)
    const expires = jwt.exp - (Date.now() / 1000)

    if (expires < 120) {
      const refresh_token = cookies['sb-refresh-token']
      try {
        const { data, error: err } = await supabaseClient.auth.refreshSession({ refresh_token })

        if (err) {
          if (err.message === 'Invalid Refresh Token') {
            /* Delete cookies, therefore logging out the user */
            const response = new Response(null, { status: 204 })
            const expireOptions = {
              maxAge: 7200,
              path: '/',
              sameSite: true,
              maxAge: -1
            }
            const cookiesToSet = Object.entries({
              'sb-user': '',
              'sb-access-token': '',
              'sb-refresh-token': ''
            })
            cookiesToSet.forEach(([name, value]) => {
              response.headers.append('set-cookie', event.cookies.serialize(name, value, expireOptions))
            })
            return response
          }
          
          throw error(500, err)
        }
        if (data.session) {
          const refreshCookies = Object.entries({
            'sb-user': data.session.user,
            'sb-access-token': data.session.access_token,
            'sb-refresh-token': data.session.refresh_token
          })

          refreshCookies.forEach(([name, value]) => {
            event.cookies.set(name, JSON.stringify(value), {
              maxAge: 7200,
              path: '/',
              sameSite: true
            })
          })
        }
      } catch (/** @type {any} */ catchErr) {
        throw error(500, catchErr)
      }
    }
  }
}