class Dom {
  constructor(selector) {
    // dom node
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  addClass(className) {
    return $(this.$el.classList.add(className))
  }

  removeClass(className) {
    return $(this.$el.classList.remove(className))
  }

  hasClass(className) {
    const classList = Array.from(this.$el.classList)
    return Boolean(classList.filter(el => el === className).length)
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  /*
  *   {
  *     height: '20px',
  *     width: '30px',
  *     backgroundColor: 'red',
  *   }
  * */
  css(styles) {
    Object.keys(styles)
        .forEach((el => {
          this.$el.style[el] = styles[el]
        }))
    return $(this.$el)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

