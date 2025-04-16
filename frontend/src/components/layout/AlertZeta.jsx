import { useContext } from 'react'

import AlertContext from '../../context/alert/AlertContext'

function AlertZeta () {
  const { alert } = useContext(AlertContext)
  return alert !== null &&
    <aside id="alert-zeta">
      AlertZeta
    </aside>
}

export default AlertZeta