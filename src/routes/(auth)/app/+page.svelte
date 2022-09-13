<script>
  import { supabaseClient } from '$lib/supabase'
  import { invalidate } from '$app/navigation'
  import { page } from '$app/stores'

  let page_name
  const user_id = $page.data.user_id

  const add_page = async () => {
    const { data } = await supabaseClient
      .from('pages')
      .insert([
        { subdomain: page_name.value, user_id },
      ])

    if (data) {
      page_name.value = ""
      invalidate('/app')
    }
  }
</script>

<a href="page/not">not</a>
{#if $page.data.pages.length > 0}
  <form on:submit|preventDefault={add_page}>
    <input bind:this={page_name} type="text">
    <button type="submit">Add</button>
  </form>
  <ul>
  {#each $page.data.pages as page}
    <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
  {/each}
  </ul>
{/if}