import {toInlineStyles} from '@core/utils';
import {CODES, defaultStyles} from '@/constants';
import {parse} from '@core/parce';

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles(
        {
          ...defaultStyles,
          ...state.stylesState[id]
        }
    )
    return `
      <div 
        class="cell"
        contenteditable=""
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="${styles}; width: ${width};"
        data-value="${data}"
        >
        ${parse(data)}
      </div>
    `
  }
}

function toColumn({colName, index, width}) {
  return `
    <div class="column" data-type="resizeable" data-col="${index}"
      style="width: ${width};">
        ${colName}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index = false, state = {}) {
  const height = getHeight(state.rowState, index)
  const resizer = index ?'<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div 
    class="row" 
    data-type="resizeable" 
    data-row="${index}"
    style="height: ${height};"
    >
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(colName, index) {
    return {
      colName, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, columnsCount, state = {}) {
  const rows = []
  const cols = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')
  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(cells, row + 1, state))
  }
  return rows.join('')
}
