export const load = ({ locals }) => {
  return locals.user ? { user: locals.user } : { user: null }
}