import {rootReducer} from './rootReducer'

describe('rootReducer', () => {
  let initState
  let action
  beforeEach(() => {
    initState = {
      tableName: 'Dft Name'
    }
    action = {
      type: 'CHANGE_TABLE_NAME',
      data: {
        value: 'New Name'
      }
    }
  })
  test('should be defined', () => {
    expect(rootReducer).toBeDefined()
  })
  /*
  * Returned state should be the new Object with
  * prev data and new or changed data
  * */
  test('should return NOT the same state.', () => {
    expect(rootReducer(initState, action)).not.toEqual(initState)
  })
  test('should change state.', () => {
    expect(rootReducer(initState, action).tableName).toBe('New Name')
  })
})
