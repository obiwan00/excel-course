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

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (a === b) return true
  if (a === null || typeof a !== 'object' ||
      b === null || typeof b !== 'object') return false

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false
  }

  return true
  // if (typeof a === 'object' && typeof b === 'object') {
  //   return JSON.stringify(a) === JSON.stringify(b)
  // }
  // return a === b
}

export function camelToDashCase(string) {
  return string.replace(/[A-Z]/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join('; ')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function secondsToDate(date = new Date()) {
  date = new Date(date)
  const padZero = value => {
    return String(value).padStart(2, '0')
  }

  const dd = padZero(date.getDate())
  const mm = padZero(date.getMonth() + 1)
  const yyyy = date.getFullYear();
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())

  return `${hours}:${minutes} — ${dd}.${mm}.${yyyy}`
}

export function deleteState(stateId) {
  localStorage.removeItem(`excel:${stateId}`)
}

export function preventDefault(event) {
  event.preventDefault()
}
