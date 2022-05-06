<script context="module">
  import { supabase } from '$lib/supabase'
  export const load = async ({ session }) => {
    let pages
    if (session) {
      supabase.auth.setAuth(session.access_token)
      try {
        let { data: authPages, error } = await supabase.from('roles').select('subdomain,role')
        if (error) console.error('get pages error', error)
        pages = authPages
      } catch (error) {
        console.error(error)
      }
    }
    return {
      props: {
        user: session,
        pages
      }
    }
  }
</script>
<script>
  export let pages, user
</script>

{#if user}
<p>Your Pages Are:</p>
<ul>
{#each pages as page}
  <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
{/each}
</ul>
{/if}