import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResize} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    }
  }

  onMousemove(event) {
    // console.log('mousemove', event)
  }

  onMouseup(event) {
    // console.log('mouseup', event)
  }
}
