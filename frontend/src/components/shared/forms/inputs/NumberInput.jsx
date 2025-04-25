import PropTypes from 'prop-types'

function NumberInput ({ placeholder, ref, maxLength, value, onChange, onKeyDown }) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      ref={ref}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

NumberInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  ref: PropTypes.func.isRequired,
  maxLength: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
}

export default NumberInput