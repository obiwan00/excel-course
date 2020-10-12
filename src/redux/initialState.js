import {storage} from '@core/utils';
import {defaultStyles, defaultTableName} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  tableName: 'New Table',
  currentStyles: defaultTableName,
  stylesState: {},
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState
