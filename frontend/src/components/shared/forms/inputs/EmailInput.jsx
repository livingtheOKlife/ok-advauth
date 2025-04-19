import PropTypes from 'prop-types'

function EmailInput ({name, value, placeholder, onChange}) {
  return (
    <input type="email" name={name} value={value} placeholder={placeholder} onChange={onChange} />
  )
}

EmailInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default EmailInput