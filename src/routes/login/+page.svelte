<script>
  import { signIn } from '$lib/supabase'
  console.log('hit /login')
</script>

<button style="margin-top: 12px;" on:click={() => { signIn('github') }}>Github Login</button>