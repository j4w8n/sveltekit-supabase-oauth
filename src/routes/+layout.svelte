<script>
  import { goto, invalidate } from '$app/navigation'
  import { handleSession } from '$lib/session'
  import { supabaseClient, signOut } from '$lib/supabase'
 
  export let data
  $: user = data.user

  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    console.log(event)
    const response = await handleSession(event, session)
    
    if (response.url) {
      console.log('invalidating...')
      await invalidate()
      console.log('goto...')
      goto(response.url)
    }
  })
</script>

<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
  <a href="/">Home</a>
  {#if user}
    <a href="/app">App</a>
    <img style="width: 32px; height: 32px; border-radius: 9999px;" src={user.avatar_url} alt="person_avatar">
    <button on:click={() => { signOut() }}>Logout</button>
  {:else}
    <a href='/login'>Login</a>
  {/if}
</nav>

<slot></slot>