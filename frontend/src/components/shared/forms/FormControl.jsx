import PropTypes from 'prop-types'

function FormControl ({children}) {
  return (
    <div className="form-control">
      {children}
    </div>
  )
}

FormControl.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormControl