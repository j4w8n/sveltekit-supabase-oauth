export function get_cookies(event, cookies) {
  let data = {}
  for (let i=0; i<cookies.length; i++) {
    data[cookies[i]] = event.cookies.get(cookies[i]) ? JSON.parse(event.cookies.get(cookies[i])) : null
  }
  return data
}