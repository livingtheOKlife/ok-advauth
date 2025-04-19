import PropTypes from 'prop-types'

function FormDivider ({formPosition, children}) {
  return (
    <div className={`form-divider ${formPosition.firstSection ? 'first' : formPosition.secondSection ? 'second' : formPosition.thirdSection && 'third'}`}>
      {children}
    </div>
  )
}

FormDivider.propTypes = {
  formPosition: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default FormDivider