import PropTypes from 'prop-types'

function FormWidget ({onSubmit, children}) {
  return (
    <form className="form-widget" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

FormWidget.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default FormWidget