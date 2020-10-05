import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize}
  from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';
import {CODES} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  rowCount = 20
  colCount = CODES.Z - CODES.A + 1

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(this.rowCount, this.colCount)
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', data => {
      this.selection.current.text(data)
    })
    this.$on('formula:keydown', data => {
      if (data === 'Enter') {
        this.selection.current.focus()
      }
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', this.selection.current)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.$emit('table:select', $target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else if (event.metaKey) {
        this.selection.multipleSelect($target)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    if (isCell(event)) {
      const match = [
        // [key, shiftKey]
        {code: 'Enter', shiftKey: false},
        {code: 'Tab', shiftKey: false},
        {code: 'Tab', shiftKey: true},
        {code: 'ArrowUp', shiftKey: false},
        {code: 'ArrowDown', shiftKey: false},
        {code: 'ArrowRight', shiftKey: false},
        {code: 'ArrowLeft', shiftKey: false},
      ]
      const currentKey = match.filter(el => {
        return el.code === event.code && el.shiftKey === event.shiftKey
      })
      if (currentKey.length) {
        event.preventDefault()
        const id = this.selection.current.id(true)
        const $next = this.$root.find(
            nextSelector(event, id, this.rowCount, this.colCount)
        )
        this.selectCell($next)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
