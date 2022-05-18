<script>
  import { pages } from '../../stores/pages'
  export let svrPages = []
  $pages = svrPages
</script>

{#if $pages.length > 0}
<ul>
{#each $pages as page}
  <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
{/each}
</ul>
{/if}