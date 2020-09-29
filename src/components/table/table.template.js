const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell"></div>
  `
}

function toColumn(colName) {
  return `
    <div class="column">${colName}</div>
  `
}

function createRow(content, index = false) {
  return `
    <div class="row">
        <div class="row-info">${ index ? index : ''}</div>
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
