export const load = ({ locals }) => {
  const user = locals.session.user
  return {
    user
  }
}