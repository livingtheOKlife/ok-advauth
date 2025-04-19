import PropTypes from 'prop-types'

function TextInput ({name, value, placeholder, onChange}) {
  return (
    <input type="text" name={name} value={value} placeholder={placeholder} onChange={onChange} />
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextInput