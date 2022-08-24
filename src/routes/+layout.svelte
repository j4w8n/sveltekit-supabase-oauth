<script>
  import { goto, invalidate } from '$app/navigation'
  import { supabase, signOut } from '$lib/supabase'
 
  export let data
  $: session = data.session
  $: console.log('+layout.svelte data', data)

  supabase.auth.onAuthStateChange(async (event, sesh) => {
    if (event === 'SIGNED_IN') {
      /*
      ** Build cookie data with returned session data from Supabase
      ** Declare the access_token last. Otherwise you may risk breaking cookie behavior
      */
      const cookie_data = JSON.stringify(
        {
          avatar_url: sesh.user.user_metadata.avatar_url,
          expires_at: sesh.expires_at,
          id: sesh.user.id,
          access_token: sesh.access_token
        }
      )

      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can set the cookie like this, instead of calling a .js endpoint
      ** document.cookie = `session=${JSON.stringify(body)}; Path=/; Secure; SameSite=Strict; Expires=${sesh.expires_at ? new Date(sesh.expires_at * 1000).toUTCString() : 'Thu, 01 Jan 1970 00:00:00 UTC'};`
      */

      /* Set the cookie */
      fetch('/api/cookie', {
        method: 'POST',
        body: cookie_data
      })
      .then(async (res) => {
        if (res.status === 200) {
          await invalidate()
          goto('/app')
        } else {
          console.error('Failed to set cookie', res)
          // Might as well logout of supabase at this point
          signOut()
        }
      })
    } else if (event === 'SIGNED_OUT') {
      // expire cookie
      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can expire the cookie like this, instead of calling a .js endpoint:
      ** document.cookie = `session=; Path=/; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
      */

      fetch('/api/cookie', {
        method: 'DELETE'
      })
      .then(async (res) => {
        if (res.status !== 204) {
          console.error('failed to expire cookie', res)
        }
        await invalidate()
        goto('/')
      })
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