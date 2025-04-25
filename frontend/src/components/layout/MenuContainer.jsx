import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'

import { FaX } from 'react-icons/fa6'

import AlertContext from '../../context/alert/AlertContext'
import MenuContext from '../../context/menu/MenuContext'

function MenuContainer () {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const { menu, setMenuInactive } = useContext(MenuContext)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const [ logout ] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/')
      setMenuInactive()
    } catch (error) {
      setAlertActive(`Log out failed - ${error}`, 'error')
    }
  }
  return menu !== null &&
    <aside id="menu-container">
      <nav id="menu-nav">
        <ul className="menu-nav-list">
          {
            userInfo && !userInfo.user.isVerified && !pathMatchRoute('/verify-email') ? 
              <li className="menu-nav-item" onClick={() => {
                navigate('/verify-email')
                setMenuInactive()
              }}>Verify email</li>
            : userInfo && userInfo.user.isVerified ?
              <></>
            :
              <>
                {
                  !pathMatchRoute('/login') &&
                    <li className="menu-nav-item" onClick={() => {
                      navigate('/login')
                      setMenuInactive()
                    }}>Sign in</li>
                }
                {
                  !pathMatchRoute('/register') &&
                    <li className="menu-nav-item" onClick={() => {
                      navigate('/register')
                      setMenuInactive()
                    }}>Sign up</li>
                }
              </>
          }
          {
            !pathMatchRoute('/about') &&
              <li className="menu-nav-item" onClick={() => {
                navigate('/about')
                setMenuInactive()
              }}>About</li>
          }
          {
            userInfo &&
              <li className="menu-nav-item" onClick={() => {
                logoutHandler()
                navigate('/')
              }}>Logout</li>
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