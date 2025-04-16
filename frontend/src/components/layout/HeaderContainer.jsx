import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import MenuContext from '../../context/menu/MenuContext'

import MenuBtn from '../MenuBtn'

function HeaderContainer () {
  const { setMenuInactive } = useContext(MenuContext)
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <header id="header-container">
      <nav id="main-nav">
        <Link to='/' onClick={setMenuInactive}>
          <span className="logo"><em>OK</em>advauth</span>
        </Link>
        <ul className="main-nav-list">
          {
            !pathMatchRoute('/page-not-found') &&
              <li className="main-nav-item" onClick={() => navigate('/page-not-found')}>Page not found</li>
          }
          {
            !pathMatchRoute('/about') &&
              <li className="main-nav-item" onClick={() => navigate('/about')}>About</li>
          }
        </ul>
        <MenuBtn />
      </nav>
    </header>
  )
}

export default HeaderContainer