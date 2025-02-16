const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') {
    return action.payLoad.str
  }

  return state
}

export const changeFilter = str => {
  return {
    type: 'FILTER',
    payLoad: { str }
  }
}

export default filterReducer