import { Outlet } from 'react-router-dom'

import HeaderContainer from './components/layout/HeaderContainer'
import MenuContainer from './components/layout/MenuContainer'
import FooterContainer from './components/layout/FooterContainer'
import AlertZeta from './components/layout/AlertZeta'

function App () {
  return (
    <div className="App">
      <h1>livingtheOKlife</h1>
      <HeaderContainer />
      <MenuContainer />
      <Outlet />
      <FooterContainer />
      <AlertZeta />
    </div>
  )
}

export default App
