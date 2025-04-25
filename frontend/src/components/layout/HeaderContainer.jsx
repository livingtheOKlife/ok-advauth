import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'

import AlertContext from '../../context/alert/AlertContext'
import MenuContext from '../../context/menu/MenuContext'

import MenuBtn from '../MenuBtn'

function HeaderContainer () {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const { setMenuInactive } = useContext(MenuContext)
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
    } catch (error) {
      setAlertActive(`Log out failed - ${error}`, 'error')
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
            userInfo && !userInfo.user.isVerified && !pathMatchRoute('/verify-email') ? 
              <li className="main-nav-item" onClick={() => {
                navigate('/verify-email')
                setMenuInactive()
              }}>Verify email</li>
            : userInfo && userInfo.user.isVerified ?
              <></>
            :
              <>
                {
                  !pathMatchRoute('/login') &&
                    <li className="main-nav-item" onClick={() => {
                      navigate('/login')
                      setMenuInactive()
                    }}>Sign in</li>
                }
                {
                  !pathMatchRoute('/register') &&
                    <li className="main-nav-item" onClick={() => {
                      navigate('/register')
                      setMenuInactive()
                    }}>Sign up</li>
                }
              </>
          }
          {
            !pathMatchRoute('/about') &&
              <li className="main-nav-item" onClick={() => navigate('/about')}>About</li>
          }
          {
            userInfo &&
              <li className="main-nav-item" onClick={logoutHandler}>Logout</li>
          }
        </ul>
        <MenuBtn />
      </nav>
    </header>
  )
}

export default HeaderContainer