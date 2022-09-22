# sveltekit + supabase oauth

A demo of Supabase OAuth with SvelteKit.

## Breaking Changes

### Supabase

- uses the v2 RC javascript client (`@supabase/supabase-js@rc`) (but you can still use v1; which is documented in the code)

### SvelteKit

A ton of recent changes, including:

- complete overhaul of routing => [migration guide](https://github.com/sveltejs/kit/discussions/5774)
- changes to various APIs => [docs](https://kit.svelte.dev/docs/load)
- deprecation of the SvelteKit `$session` store

## notable features

- sets server-side supabase client authentication in hooks.
- uses a [layout group](https://kit.svelte.dev/docs/advanced-routing#advanced-layouts-group) to guard all routes where the user should be authenticated in order to reach the route.