import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(event => {
      const method = getMethodName(event)
      if (!this[method]) {
        const name = this.name || ''
        throw Error(`Method ${method} is not implemented on ${name} component`)
      }
      this[method] = this[method].bind(this)
      // addEventListener
      this.$root.on(event, this[method])
    })
  }

  removeDOMListener() {
    this.listeners.forEach(event => {
      const method = getMethodName(event)
      console.log(this[method].bind(this))

      this.$root.off(event, this[method])
    })
  }
}

// input -> onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
