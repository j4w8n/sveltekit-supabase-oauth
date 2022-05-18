<script>
  import { pages } from '../../stores/pages'
</script>

{#if pages.length > 0}
<ul>
{#each $pages as page}
  <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
{/each}
</ul>
{/if}