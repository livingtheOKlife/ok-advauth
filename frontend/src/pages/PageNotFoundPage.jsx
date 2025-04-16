import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

function PageNotFoundPage () {
  return (
    <MainContainer page='page-not-found-page'>
      <h3>Whoops!</h3>
      <span>404 Error: Page not found.</span>
      <Link to='/'>Return home</Link>
    </MainContainer>
  )
}

export default PageNotFoundPage