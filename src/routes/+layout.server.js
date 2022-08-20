export const load = ({ locals }) => {
  return locals.session ?
    {
      session: {
        avatar_url: locals.session.avatar_url
      }
    } : { session: null }
}