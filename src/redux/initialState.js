import {defaultStyles, defaultTableName} from '@/constants';

const dateOfCreation = new Date().toJSON()

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  tableName: defaultTableName,
  currentStyles: defaultStyles,
  stylesState: {},
  lastEdit: dateOfCreation,
  dateOfCreation
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : {...defaultState}
}
