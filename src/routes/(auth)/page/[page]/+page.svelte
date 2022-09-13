<script>
  export let data
</script>

{#if data.page}
  <h1 class="h3">{data.page.subdomain}</h1>
{/if}