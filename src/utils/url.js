export function isLocal() {
  return /(localhost|127\.|192\.)/.test(location.host)
}

export function getOrigin() {
  if (isLocal()) {
    return 'https://new.icity24.xyz'
  } else {
    return location.origin
  }
}

export function getFullURL(url) {
  if (url.startsWith('/')) {
    if (isLocal()) {
      return '/api' + url
    } else {
      return url
    }
  } else {
    return url
  }
}
