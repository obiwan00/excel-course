export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, file or trigger
  // notify listener if they are
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners =
          this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// Example
// const emitter = new Emitter()
// emitter.subscribe('Ivan', data => console.log('Sub data: ', data))
// emitter.emit('Ivan', 42)
// unsubscribe
// emitter.subscribe('Ivan', data => console.log('Sub data: ', data))()
// emitter.emit('Ivan', 43)
