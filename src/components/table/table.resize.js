import {$} from '@core/Dom';

export function tableResize($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type=resizeable]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    $resizer.css({
      opacity: 1,
    })
    $resizer.setProperty('--wrapper-line-display', 'block')
    let delta
    let value

    document.onmousemove = e => {
      if (type === 'col') {
        delta = e.pageX - coords.right
        $resizer.css({right: (-delta - 2) + 'px'})
      } else {
        delta = e.pageY - coords.bottom
        $resizer.css({bottom: (-delta - 2) + 'px'})
      }
    }
    document.onmouseup = e => {
      document.onmousemove = null
      if (type === 'col') {
        value = coords.width + delta
        $resizer.css({right: '-2px'})
        $root.findAll(`[data-col='${$parent.data.col}']`)
            .forEach(el => {
              $(el).css({width: value + 'px'})
            })
      } else {
        value = coords.height + delta
        $resizer.css({bottom: '-2px'})
        $parent.css({height: value + 'px'})
      }
      resolve({
        value,
        type,
        id: $parent.data[type]
      })
      $resizer.css({
        opacity: 0,
      })
      $resizer.setProperty('--wrapper-line-display', 'none')
    }
  })
}
