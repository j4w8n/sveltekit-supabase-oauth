Archiving. See updated version at https://github.com/j4w8n/sveltekit-supabase-ssr

# sveltekit + supabase oauth

A demo of Supabase OAuth with SvelteKit.

## Tech

- SvelteKit ^1.0
- Supabase ^2.0.0

## Notable Features

- sets server-side supabase client authentication in `hooks.server.js`.
- auth guards: server page requests are guarded by the `+layout.server.js` file under `/src/routes/(auth)`, client navigation is guarded by `+page.server.js` files in subdirectories.
- for now, replaces the old SvelteKit $session store with a secure version. This is not the only method available, but I'm trying out something other than `invaldiateAll()`.

## Setup

1. Clone the repo
2. Create a `.env` file in the root of your project with the following, and relevant data. `PUBLIC_BASE_URL` example, http://localhost.
  - PUBLIC_BASE_URL=
  - PUBLIC_SUPABASE_URL=
  - PUBLIC_SUPABASE_ANON_KEY=

## Roadmap

...You tell me.
