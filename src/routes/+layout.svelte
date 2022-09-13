<script>
  import { goto, invalidateAll } from '$app/navigation'
  import { handleSession } from '$lib/session'
  import { supabaseClient, signOut } from '$lib/supabase'

  export let data

  $: session = data.user

  supabaseClient.auth.onAuthStateChange(async (event, sesh) => {
    const sessionResponse = await handleSession(event, sesh)
    
    if (sessionResponse.url) {
      await invalidateAll()
      if (event === 'SIGNED_OUT') session = null
      if (event === 'SIGNED_IN') session = { avatar_url: sesh.user.user_metadata.avatar_url }
      goto(sessionResponse.url)
    }
  })
</script>

<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
  <a href="/">Home</a>
  {#if session}
    <a href="/app">App</a>
    <img style="width: 32px; height: 32px; border-radius: 9999px;" src={session.avatar_url} alt="person_avatar">
    <button on:click={() => { signOut() }}>Logout</button>
  {:else}
    <a href='/login'>Login</a>
  {/if}
</nav>

<slot></slot>