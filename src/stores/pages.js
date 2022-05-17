import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase'

export const pages = writable([])

export const loadPages = async () => {
  try {
    let { data, error } = await supabase.from('roles').select('subdomain,role')
    if (error) {
      console.error('get pages error', error)
    }
    pages.set(data)
  } catch (error) {
    console.error(error)
  }
}