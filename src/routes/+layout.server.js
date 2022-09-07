export const load = async ({ locals }) => {
  return locals.user ? { user: locals.user } : { user: null }
}