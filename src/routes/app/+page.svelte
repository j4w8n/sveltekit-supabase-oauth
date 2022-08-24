<script>
  import { supabase } from '$lib/supabase'
  import { invalidate } from '$app/navigation'
  export let data

  let page_name
  const user_id = data.user_id
  $: console.log('page data', data)

  const add_page = async () => {
    const { data } = await supabase
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

<form on:submit|preventDefault={add_page}>
  <input bind:this={page_name} type="text">
  <button type="submit">Add</button>
</form>
<ul>
{#each data.pages as page}
  <li><a href="/page/{page.subdomain}">{page.subdomain}</a></li>
{/each}
</ul>