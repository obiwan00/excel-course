import {CODES} from '@core/utils';

function toCell(row) {
  return function(_, col) {
    return `
      <div 
        class="cell"
        contenteditable=""
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}">
      </div>
    `
  }
}

function toColumn(colName, index) {
  return `
    <div class="column" data-type="resizeable" data-col="${index}">
        ${colName}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index = false) {
  const resizer = index ?'<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizeable">
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

export function createTable(rowsCount = 15, columnsCount) {
  const rows = []
  const cols = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(columnsCount)
        .fill('')
        // .map((_, index) => toCell(i, index))
        .map(toCell(i))
        .join('')
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}
