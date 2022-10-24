import { error } from '@sveltejs/kit'
import { setContext, getContext, hasContext } from 'svelte'
import { writable } from 'svelte/store'

const keys = { session: Symbol() }

const initSession = () => {
  setContext(keys.session, { session: writable() })

  return getContext(keys.session)
}

export const getSession = () => {
  return hasContext(keys.session) ? getContext(keys.session) : initSession()
}

export const handleSession = async (event, session, api) => {
  const setCookie = async (method, body = null) => {
    try {
      await fetch(api, {
        method,
        body
      })
    } catch (err) {
      console.log('set cookie error', err)
      throw error(500, err)
    }
  }
  if (event === 'SIGNED_OUT') {
    await setCookie('DELETE')
  }
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    await setCookie('POST', JSON.stringify(session))
  }
}