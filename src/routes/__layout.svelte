<script context="module">
  export const load = async ({ session }) => {
    return {
      props: {
        user: session
      }
    }
  }
</script>
<script>
  import { session } from '$app/stores'
  import { goto } from '$app/navigation'
  import { supabase, signIn, signOut } from '$lib/supabase'
  export let user

  supabase.auth.onAuthStateChange(async (event, sesh) => {
    if (event === 'SIGNED_IN') {
      const body = JSON.stringify(
        {
          access_token: sesh.access_token,
          avatar_url: sesh.user.user_metadata.avatar_url,
          expires_at: sesh.expires_at,
          id: sesh.user.id
        }
      )
      await fetch('/api/cookie', {
        method: 'POST',
        body
      })
      .then((res) => {
        if (res.status === 200) {
          // hydrate the sveltekit session store with data returned from supabase session
          $session = {
            access_token: sesh.access_token,
            avatar_url: sesh.user.user_metadata.avatar_url,
            id: sesh.user.id
          }
          // fixes trailing hash issue with link-and-back navigation
          goto('/')
        } else {
          console.error('Failed to set cookie', res)
          if (supabase.auth.session()) {
            signOut()
          }
        }
      })
      
      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can set the cookie like this, instead of calling a .js endpoint
      ** document.cookie = `session=${JSON.stringify(sesh)}; Path=/; Secure; SameSite=Strict; Expires=${new Date(sesh.expires_at * 1000).toUTCString()};`
      */

    } else if (event === 'SIGNED_OUT') {
      await fetch('/api/cookie', {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.status !== 204) console.error('failed to expire cookie', res)
        $session = false
      })

      /*
      ** https://developer.mozilla.org/en-US/docs/web/api/document/cookie
      ** For non-HttpOnly cookies, you can expire the cookie like this, instead of calling a .js endpoint
      ** document.cookie = `session=; Path=/; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`
      */
    }
  })
</script>

<nav style="border: solid; border-width: 0 0 2px">
  Navbar
  <a href="/">Home</a>
  {#if user}
  <img style="width: 32px; height: 32px; border-radius: 9999px;" src={user.avatar_url} alt="person_avatar">
  <button on:click={() => {signOut()}}>Logout</button>
  {:else}
  <button on:click={() => {signIn('github')}}>Github Login</button>
  {/if}
</nav>

<slot></slot>