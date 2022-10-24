<script>
  import { goto } from '$app/navigation'
  import { getSession, handleSession } from '$lib/session'
  import { supabaseClient, signOut } from '$lib/supabase'
  import { page } from '$app/stores'
  
  const { session } = getSession()

  /* hydrate the store on data refresh */
  $session = $page.data.user

  supabaseClient.auth.onAuthStateChange(async (event, seshun) => {
    await handleSession(event, seshun, 'http://localhost:5173/api/cookie')
    
    if (event === 'SIGNED_OUT') {
      $session = null
      goto('/')
    }
    if (event === 'SIGNED_IN') {
      $session = seshun.user
      goto('/app')
    }
  })
</script>

<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
  <a href="/">Home</a>
  {#if $session}
    <a href="/app">App</a>
    <a href="/admin">Admin</a>
    <img style="width: 32px; height: 32px; border-radius: 9999px;" src={$session.user_metadata.avatar_url} alt="person_avatar">
    <button on:click={() => { signOut() }}>Logout</button>
  {:else}
    <a href='/login'>Login</a>
  {/if}
</nav>

<slot></slot>