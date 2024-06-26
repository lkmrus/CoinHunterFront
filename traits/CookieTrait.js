export class CookieTrait {
  static getCookie (name) {
    if (!document) {
      setTimeout(() => this.getCookie(name), 10000)
    }
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  static setCookie (name, value, options = {}) {
    options = {
      path: '/',
      ...options
    }

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (const optionKey in options) {
      updatedCookie += '; ' + optionKey
      const optionValue = options[optionKey]
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue
      }
    }

    document.cookie = updatedCookie
  }
}
