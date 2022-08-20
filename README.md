# sveltekit + supabase oauth

Setup OAuth with Supabase and SvelteKit.

## Breaking Changes

Compared to the [YouTube video](https://www.youtube.com/watch?v=R8e23-hrzFM).

### SvelteKit

- installing vite as a dev dependency
- creating a vite.config.js file
- changing HTTP methods to uppercase
- complete overhaul of routing => [migration guide](https://github.com/sveltejs/kit/discussions/5774)
- changes to various APIs => [docs](https://kit.svelte.dev/docs/load)
- deprecation of the SvelteKit `$session` store

## Other Changes

- I stopped sending the whole supabase session to /api/cookie. This started causing the browser cookie to be split into two cookies for some reason.
Resolution was to create a custom session object, being sure to list the `access_token` last. Keep in mind this also changed how I referenced this data. For example, in hooks.js I had to change the definition of `id`.
- Added `/login` and `/app` routes.

## notable features

- event.locals - securely stores the `access_token` for server-side requests.
- replaces the now deprecated SvelteKit `$session` store.