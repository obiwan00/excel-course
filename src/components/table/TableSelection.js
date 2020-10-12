export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clean()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  clean() {
    this.group.map($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  multipleSelect($el) {
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  selectGroup($group = []) {
    this.clean()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) {
    this.group.map(el => el.css(style))
  }

  getStyles(styles = []) {
    return this.group.reduce((acc, el) => {
      const currentStyle = el.getStyles(styles)
      if (currentStyle) {
        acc.push(currentStyle)
      }
      return acc
    }, [])
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }
}
