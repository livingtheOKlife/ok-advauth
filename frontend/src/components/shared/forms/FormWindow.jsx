import PropTypes from 'prop-types'

function FormWindow ({children}) {
  return (
    <section className="form-window">
      {children}
    </section>
  )
}

FormWindow.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormWindow