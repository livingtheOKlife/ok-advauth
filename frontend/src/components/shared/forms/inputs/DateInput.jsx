import PropTypes from 'prop-types'

function DateInput ({name, value, placeholder, onChange}) {
  return (
    <input type="date" name={name} value={value} placeholder={placeholder} onChange={onChange} />
  )
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateInput