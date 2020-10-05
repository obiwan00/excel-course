import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)

  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(event, {row, col}, maxRow, maxCol) {
  let nextRow = row
  let nextCol = col
  if ((event.code === 'Tab' && event.shiftKey) || event.code === 'ArrowLeft') {
    nextCol--
  } else if (event.code === 'Tab' || event.code === 'ArrowRight') {
    nextCol++
  } else if (event.code === 'ArrowUp') {
    nextRow--
  } else if (event.code === 'ArrowDown') {
    nextRow++
  } else if (event.code === 'Enter') {
    nextRow++
  }
  if (nextRow < maxRow && nextRow >= 0) row = nextRow
  if (nextCol < maxCol && nextCol >= 0) col = nextCol
  return `[data-id="${row}:${col}"]`
}
