import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase'

export const pages = writable([])

export const loadPages = async () => {
  /*
  ** if needed, this is called on the client-side, so we don't need to set an access token
  */
  try {
    let { data, error } = await supabase.from('roles').select('subdomain,role')
    if (error) {
      console.error('get pages error', error)
    }
    
    // we're inside a function, so we can't reference the store with $ and must use set()
    pages.set(data)
  } catch (error) {
    console.error(error)
  }
}