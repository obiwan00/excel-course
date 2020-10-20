import {
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
}
  from './types';

export function rootReducer(receivedState, action) {
  let field
  let val
  const state = {...receivedState, lastEdit: new Date().toJSON()}
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      state[field] = value(state, field, action)
      return state
    case CHANGE_TEXT:
      field = 'dataState'
      state['currentText'] = action.data.value
      state[field] = value(state, field, action)
      return state
    case CHANGE_TABLE_NAME:
      state['tableName'] = action.data.value
      return state
    case CHANGE_STYLES:
      state['currentStyles'] = {
        ...state.currentStyles,
        ...action.data
      }
      return state
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      state[field] = val
      state['currentStyles'] = {
        ...state.currentStyles,
        ...action.data.value
      }
      return state
    default:
      return state
  }
}


function value(state, field, action) {
  const val = {...state[field]} || {}
  val[action.data.id] = action.data.value
  return val
}
