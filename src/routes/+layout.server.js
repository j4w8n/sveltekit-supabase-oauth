export const load = ({ locals }) => {
  console.log('load called for layout')
  return locals.session ?
    {
      session: {
        avatar_url: locals.session.avatar_url
      }
    } : { session: null }
}