export const load = async ({ locals }) => {
  console.log('layout loading', locals.user)
  return locals.user ? { user: locals.user } : { user: null }
}