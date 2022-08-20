<script>
  import { keys } from '$lib/keys'
  import { getContext } from 'svelte'
  export let data
  
  const { session } = getContext(keys.session)
  const { pages } = getContext(keys.pages)
  $pages = data.svrPages
</script>

{#if $session && $pages}
  {#if $pages.length > 0}
    <ul>
    {#each $pages as page}
      <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
    {/each}
    </ul>
  {/if}
{/if}