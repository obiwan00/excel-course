const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, index) {
  return `
    <div class="cell" contenteditable="" data-col="${index}"></div>
  `
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

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(columnsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  const cells = new Array(columnsCount)
      .fill('')
      .map(toCell)
      .join('')

  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}
