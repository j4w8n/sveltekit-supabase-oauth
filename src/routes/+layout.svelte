<script>
  import { page } from '$app/stores'
  import { keys } from '$lib/keys'
  import { getContext, setContext } from 'svelte'
  import { goto } from '$app/navigation'
  import { supabase, signOut } from '$lib/supabase'
  import { writable } from 'svelte/store'

  /* create scoped $session store */
  setContext(keys.session, { session: writable() })
  const { session } = getContext(keys.session)
  $session = $page.data.session

  /* create scoped $pages store */
  setContext(keys.pages, { pages: writable([]) })
  const { pages } = getContext(keys.pages)

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
          /* 
          ** Hydrate the $session store with non-sensitive data returned from the supabase session.
          ** This is used for immediate post-login reactivity.
          */
          $session = {
            avatar_url: sesh.user.user_metadata.avatar_url
          }

          /*
          ** Fixes navigation issue with trailing hash.
          ** If removed, once you login there will be a `#` at the end of your url.
          ** Then if you click to another route, say /app, everything works.
          ** But if you then click the browser's back button, the url changes but /app's content is still visible.
          */
          
          goto('/app', {
            // replaceState is optional here. It removes the `/app#` page visit from your browser history.
            replaceState: true
          })
        } else {
          console.error('Failed to set cookie', res)
          // Optional, but might as well logout of supabase at this point
          signOut()
        }
      })
    } else if (event === 'SIGNED_OUT') {
      // Clear data from the pages and session store.
      $pages = []
      $session = null

      // expire cookie
      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can expire the cookie like this, instead of calling a .js endpoint:
      ** document.cookie = `session=; Path=/; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
      */

      fetch('/api/cookie', {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.status !== 204) {
          console.error('failed to expire cookie', res)
        }
        goto('/')
      })
    }
  })
</script>

<nav style="border: solid; border-width: 0 0 2px; padding-bottom: 5px;">
  <a href="/">Home</a>
  {#if $session}
    <img style="width: 32px; height: 32px; border-radius: 9999px;" src={$session.avatar_url} alt="person_avatar">
    <button on:click={() => { signOut() }}>Logout</button>
  {:else}
    <a href='/login'>Login</a>
  {/if}
</nav>

<slot></slot>