# sveltekit + supabase oauth

A demo of Supabase OAuth with SvelteKit.

## Breaking Changes

### Supabase

- uses the v2 javascript client (`@supabase/supabase-js@rc`) (but you can still use v1; which is documented in the code)

### SvelteKit

A ton of recent changes, including:

- complete overhaul of routing => [migration guide](https://github.com/sveltejs/kit/discussions/5774)
- changes to various APIs => [docs](https://kit.svelte.dev/docs/load)
- deprecation of the SvelteKit `$session` store

## Notable Features

- sets server-side supabase client authentication in `hooks.server.js`.
- auth guards: server page requests are guarded by the `+layout.server.js` file under `/src/routes/(auth)`, client navigation is guarded by `+page.server.js` files in subdirectories.
- for now, replaces the old $session store with a secure version. This is not the only method available, but I'm trying out something other than `invaldiateAll()`.

## Roadmap

...You tell me.