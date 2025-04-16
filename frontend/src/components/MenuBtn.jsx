import { useContext } from 'react'

import MenuContext from '../context/menu/MenuContext'

function MenuBtn () {
  const {menu, setMenuActive, setMenuInactive} = useContext(MenuContext)
  return (
    <button type="button" className={`menu-btn ${menu !== null ? 'active' : ''}`} onClick={() => menu === null ? setMenuActive() : setMenuInactive()}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </button>
  )
}

export default MenuBtn