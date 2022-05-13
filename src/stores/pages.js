import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase'

export const pages = writable([])

export const loadPages = async () => {
  try {
    let { data, error } = await supabase.from('roles').select('subdomain,role')
    if (error) {
      console.error('get pages error', error)
      return false
    }
    pages.set(data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}