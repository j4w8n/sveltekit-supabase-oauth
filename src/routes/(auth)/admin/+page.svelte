<script>
  import { getSession } from '$lib/session'
  const { session } = getSession()
</script>

{#if $session}
  <h1>Welcome to /admin!</h1>
  <h4>The $session store is working across pages.</h4>
  <h4>Your id is {$session.id}</h4>
{/if}