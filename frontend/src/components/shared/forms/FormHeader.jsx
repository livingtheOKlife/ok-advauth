import PropTypes from 'prop-types'

function FormHeader ({heading, subheading}) {
  return (
    <header className="form-header">
      <h3 className="form-heading">{heading}</h3>
      <span className="form-subheading">{subheading}</span>
    </header>
  )
}

FormHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired
}

export default FormHeader