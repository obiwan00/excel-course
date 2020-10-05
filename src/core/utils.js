export const CODES = {
  A: 65,
  Z: 90
}

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function camelCase(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.split(/[_/-]/g)
      .map((el, index) => {
        if (index) return capitalize(el)
        return el
      })
      .join('')
}
