import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react';

import menuReducer from './MenuReducer'

const MenuContext = createContext()

export const MenuProvider = ({children}) => {
  const initialState = null
  const [state, dispatch] = useReducer(menuReducer, initialState)
  const setMenuActive = () => {
    dispatch({
      type: 'SET_MENU_ACTIVE',
    })
  }
  const setMenuInactive = () => {
    dispatch({
      type: 'SET_MENU_INACTIVE',
    })
  }
  return (
    <MenuContext.Provider value={{
      menu: state,
      setMenuActive,
      setMenuInactive,
      dispatch
    }}>
      {children}
    </MenuContext.Provider>
  )
}

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MenuContext