import { useContext } from 'react'

import { PiCheckCircle, PiExclamationMarkFill, PiXBold } from 'react-icons/pi'

import AlertContext from '../../context/alert/AlertContext' 

const AlertZeta = () => {
  const { alert, dispatch } = useContext(AlertContext)
  return alert !== null &&
    <aside id='alert-zeta' className={alert.type === 'error' ? 'error' : alert.type === 'success' ? 'success' : ''}>
      {alert.type === 'error' && <PiExclamationMarkFill className='alert-icon' />}
      {alert.type === 'success' && <PiCheckCircle className='alert-icon' />}
      <span className='alert-text'>{alert.msg}</span>
      <button className='alert-btn' onClick={() => dispatch({type: 'SET_ALERT_INACTIVE'})}>
        <PiXBold />
      </button>
      <div className="alert-progress-bg">
        <div className="alert-progress-bar"></div>
      </div>
    </aside>
}

export default AlertZeta