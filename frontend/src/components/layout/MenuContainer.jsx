import { useContext } from 'react'

import MenuContext from '../../context/menu/MenuContext'

function MenuContainer () {
  const { menu } = useContext(MenuContext)
  return menu !== null &&
    <aside id="menu-container">
      MenuContainer
    </aside>
}

export default MenuContainer