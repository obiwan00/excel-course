import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/Dom';
import {defaultTableName} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
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
                <button class="button">
                    <i class="material-icons">delete</i>
                </button>
                <button class="button">
                    <i class="material-icons">exit_to_app</i>
                </button>
            </div>
     `
  }

  storeChanged(changes) {
    console.log('tableName: ', changes)
  }

  onInput(event) {
    this.$dispatch(actions.changeTableName({
      value: $(event.target).text()
    }))
  }
}
