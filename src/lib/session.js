import { error } from '@sveltejs/kit'

export const handleSession = async (event, session) => {
  if (event === 'SIGNED_OUT') {
    try {
      await fetch('/api/cookie', {
        method: 'DELETE',
        credentials: 'same-origin',
      })
    } catch (err) {
      throw error(500, err)
    }
    return { url: '/' }
  }
  if (event === 'SIGNED_IN') {
    try {
      await fetch('/api/cookie', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(session)
      })
    } catch (err) {
      throw error(500, err)
    }
    return { url: '/app' }
  }
  if (event === 'TOKEN_REFRESHED') {
    try {
      console.log('trying...')
      await fetch('/api/cookie', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(session)
      })
    } catch (err) {
      throw error(500, err)
    }
    return { url: false }
  }
  return { url: false }
}