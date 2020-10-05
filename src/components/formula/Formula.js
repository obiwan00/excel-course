import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $el => {
      this.$formula.text($el.text())
    })
    this.$on('table:input', $el => {
      this.$formula.text($el.text())
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable="true" spellcheck="false">
    </div>
    `
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const match = [
      {code: 'Enter', shiftKey: false},
      {code: 'Tab', shiftKey: false}
    ]
    const currentKey = match.filter(el => {
      return el.code === event.code && el.shiftKey === event.shiftKey
    })
    if (currentKey.length) {
      event.preventDefault()
      if (event.code === 'Enter' || event.code === 'Tab') {
        this.$emit('formula:keydown', 'Enter')
      }
    }
  }
}
