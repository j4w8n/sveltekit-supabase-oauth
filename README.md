# sveltekit + supabase oauth

A demo of Supabase OAuth with SvelteKit.

## Tech

- SvelteKit ^1.0
- Supabase ^2.0.0

## Notable Features

- sets server-side supabase client authentication in `hooks.server.js`.
- auth guards: server page requests are guarded by the `+layout.server.js` file under `/src/routes/(auth)`, client navigation is guarded by `+page.server.js` files in subdirectories.
- for now, replaces the old SvelteKit $session store with a secure version. This is not the only method available, but I'm trying out something other than `invaldiateAll()`.

## Roadmap

...You tell me.