import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.prepare()
  }

  // Setup component before init
  prepare() {
  }

  // return template of component
  toHTML() {
    return ''
  }

  // notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // input of only changes of subscribed field
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // initialize component
  // add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // delete component
  // remove DOM listeners
  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
