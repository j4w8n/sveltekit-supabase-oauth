export const decode = (token) => {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('JWT is not valid: not a JWT structure')
  }

  if (!base64UrlRegex.test(parts[1])) {
    throw new Error('JWT is not valid: payload is not in base64url format')
  }

  const base64Url = parts[1]
  const buffer = Buffer.from(base64Url, 'base64')
  return JSON.parse(buffer.toString())
}

export function get_cookies(event) {
  const cookieList = ['sb-user','sb-access-token','sb-refresh-token']
  let data = {}
  for (let i=0; i<cookieList.length; i++) {
    data[cookieList[i]] = event.cookies.get(cookieList[i]) ? JSON.parse(event.cookies.get(cookieList[i])) : null
  }
  return data
}