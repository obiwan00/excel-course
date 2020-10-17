import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/Dom';
import {defaultTableName} from '@/constants';
import {debounce, deleteState} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['tableName'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const tableName = this.store.getState().tableName || defaultTableName
    return `
      <input type="text" class="input"
       value="${tableName}">
       <div class="wr-btn">
           <a href="/" class="button">
               <i class="material-icons">exit_to_app</i>
           </a>
           <button class="button" data-appointment="delete">
               <i class="material-icons" data-appointment="delete">delete</i>
           </button>
       </div>
     `
  }

  storeChanged(changes) {
  }

  onInput(event) {
    this.$dispatch(actions.changeTableName({
      value: $(event.target).text()
    }))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.appointment === 'delete') {
      const tableName = this.store.getState().tableName
      const decision = confirm(
          `Delete table ${tableName}`
      )
      if (decision) {
        deleteState(ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    }
  }
}
