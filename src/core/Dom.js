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

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toUpperCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
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
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    if (this.hasClass(className)) {
      this.$el.classList.remove(className)
    }
    return this
  }

  hasClass(className) {
    const classList = Array.from(this.$el.classList)
    return Boolean(classList.filter(el => el === className).length)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
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
    return this
  }

  setProperty(propertyName, value, priority) {
    this.$el.style.setProperty(propertyName, value, priority)
    return this
  }

  attr(attribute, value) {
    if (!value) {
      return this.$el.getAttribute(attribute)
    } else {
      return this.$el.setAttribute(attribute, value)
    }
  }

  id(parser) {
    if (parser) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.$el.dataset.id
  }

  focus() {
    this.$el.focus()
    return this
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

