import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()
    this.unsubscribers = []
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
