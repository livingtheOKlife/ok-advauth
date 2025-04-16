import PropTypes from 'prop-types'

function MainContainer ({page, children}) {
  return (
    <main id="main-container" className={page}>
      <div className="main-wrapper">
        {children}
      </div>
    </main>
  )
}

MainContainer.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default MainContainer