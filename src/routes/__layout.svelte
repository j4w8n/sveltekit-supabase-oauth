<script>
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import { supabase, signIn, signOut } from '$lib/supabase'
  import { pages, loadPages } from '../stores/pages'

  supabase.auth.onAuthStateChange(async (event, sesh) => {
    if (event === 'SIGNED_IN') {
      // set cookie
      const cookie = JSON.stringify(
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

      fetch('/api/cookie', {
        method: 'POST',
        body: cookie
      })
      .then(async (res) => {
        if (res.status === 200) {
          /*
          ** hydrate our page array.
          ** only needed if we're staying on the current page.
          ** example, we logged in from `/`, and after login we're staying on `/`
          */
          loadPages()

          /* 
          ** hydrate the sveltekit session store with non-sensitive data returned from the supabase session.
          ** note that `$session = sesh` would dangerously save the user's access_token in the session store.
          ** this is used for immediate post-login reactivity, because the `goto('/')` navigation below is client-side,
          ** therefore we can't get user data from the freshly stored cookie.
          ** for example, we show the user's avatar, and the Logout button instead of Login
          */
          $session = sesh.user

          /*
          ** fixes navigation issue with trailing hash.
          ** if removed, once you login there will be a `#` at the end of your url
          ** then if you click to another route, say /app, everything works
          ** but if you then click the browser's back button, the url changes but /app's content is still visible
          */
          goto('/', {
            // replaceState is optional here. it removes the `/#` page visit from your browser history
            replaceState: true
          })
        } else {
          console.error('Failed to set cookie', res)
          // optional, but might as well logout of supabase at this point
          signOut()
        }
      })
    } else if (event === 'SIGNED_OUT') {
      // clear data from the pages and session store.
      $pages = []
      $session = null

      // expire cookie
      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can expire the cookie like this, instead of calling a .js endpoint
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
    <img style="width: 32px; height: 32px; border-radius: 9999px;" src={$session.user_metadata.avatar_url} alt="person_avatar">
    <button on:click={() => { signOut() }}>Logout</button>
  {:else}
    <button on:click={() => { signIn('github') }}>Github Login</button>
  {/if}
</nav>

<slot></slot>