import PropTypes from 'prop-types'
import { useState } from 'react'

import { FaEye, FaEyeSlash } from 'react-icons/fa6'

function PasswordInput ({name, value, placeholder, onChange}) {
  const [visibility, setVisibility] = useState(false)
  return (
    <div className="icon-input">
      <input type={visibility ? 'text' : 'password'} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      <button type="button" className='input-btn' onClick={() => setVisibility(!visibility)}>
        {
          visibility ? <FaEyeSlash /> : <FaEye />
        }
      </button>
    </div>
  )
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PasswordInput