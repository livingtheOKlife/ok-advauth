import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FaX } from 'react-icons/fa6'

import MenuContext from '../../context/menu/MenuContext'

function MenuContainer () {
  const { menu, setMenuInactive } = useContext(MenuContext)
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return menu !== null &&
    <aside id="menu-container">
      <nav id="menu-nav">
        <ul className="menu-nav-list">
          {
            !pathMatchRoute('/about') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/about')
                setMenuInactive()
              }}>About</li>
          }
        </ul>
        <button type="button" onClick={setMenuInactive}>
          Close
          <FaX />
        </button>
      </nav>
    </aside>
}

export default MenuContainer