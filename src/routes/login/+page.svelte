<script>
  import { signIn } from '$lib/supabase'
</script>

<button style="margin-top: 12px;" on:click={() => { signIn('github') }}>Github Login</button>