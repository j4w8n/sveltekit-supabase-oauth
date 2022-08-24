export const load = ({ locals }) => {
  console.log('+layout.server.js load running')
  return locals.session ?
    {
      session: {
        avatar_url: locals.session.avatar_url,
        user_id: locals.session.id
      }
    } : { session: null }
}