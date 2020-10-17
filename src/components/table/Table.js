import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize}
  from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {CODES, defaultStyles} from '@/constants';
import {parse} from '@core/parce';

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
    return createTable(this.rowCount, this.colCount, this.store.getState())
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:keydown', data => {
      if (data === 'Enter') {
        this.selection.current.focus()
      }
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', this.selection.current)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize message: ', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
        this.selectCell($target)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    console.log('table input', $(event.target).text())
    const currentText = $(event.target).text()
    $(event.target).attr('data-value', currentText)
    this.updateTextInStore(currentText)
  }
}
