import { error } from '@sveltejs/kit'
import { setContext, getContext } from 'svelte'
import { writable } from 'svelte/store'

const keys = { session: Symbol() }

export const initSession = () => {
  return setContext(keys.session, { session: writable() })
}

export const getSession = () => {
  return getContext(keys.session)
}

export const handleSession = async (event, session, api) => {
  const setCookie = async (method, body = null) => {
    try {
      await fetch(api, {
        method,
        body
      })
    } catch (err) {
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