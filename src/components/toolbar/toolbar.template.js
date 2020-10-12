function createButton(button) {
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(button.value)}'
  `
  return `
      <button
       ${meta}
       class="button ${button.active ? 'active' : ''}"
      >
          <i ${meta} class="material-icons">${button.icon}</i>
      </button>
  `.trim()
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'},
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === '700',
      value: {fontWeight: state['fontWeight'] === '700' ? '400' : '700'},
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration: state['textDecoration'] === 'underline'
            ? 'none'
            : 'underline'
      },
    },
  ]

  return buttons.map(createButton).join('')
}
