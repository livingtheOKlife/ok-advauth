const menuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU_ACTIVE':
      return action.payload
    case 'SET_MENU_INACTIVE':
      return null
    default:
      return state
  }
}

export default menuReducer