import PropTypes from 'prop-types'

function FormSection ({children}) {
  return (
    <section className="form-section">
      {children}
    </section>
  )
}

FormSection.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormSection