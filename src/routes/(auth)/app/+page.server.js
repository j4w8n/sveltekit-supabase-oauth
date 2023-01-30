import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
  if (!locals.session.user) throw redirect(307, '/login')
}