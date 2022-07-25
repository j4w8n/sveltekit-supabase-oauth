# sveltekit + supabase oauth

setup oauth with supabase and sveltekit.

Recent breaking changes, compared to the [YouTube video](https://www.youtube.com/watch?v=R8e23-hrzFM).
Updated sveltekit to the latest version. This requires:

- installing vite as a dev dependency
- creating a vite.config.js file
- changing HTTP methods to uppercase

I also stopped sending the whole supabase session to /api/cookie. This started causing the browser cookie to be split into two cookies for some reason.
Resolution was to create a custom session object, being sure to list the access_token last. Keep in mind this also changed how I referenced this data. For example, in hooks.js I had to change the definitio of `id`.

## notable features

- event.locals - securely stores the access_token for server-side supabase db requests
- shadow endpoints - instead of exporting a `load` function in `<script context="module">`
- store - for reactivity of showing/hiding database info