import PropTypes from 'prop-types'

function FormProgressBar ({formPosition}) {
  return (
    <div className="form-progress">
      <div className="form-progress-numbers">
        <span className="form-progress-number">1</span>
        <span className="form-progress-number">2</span>
        <span className="form-progress-number">3</span>
      </div>
      <div className="form-progress-bar">
        <div className={`form-progress-bar-fill ${formPosition.firstSection ? 'first' : formPosition.secondSection ? 'second' : formPosition.thirdSection && 'third'}`}></div>
      </div>
      <div className={`form-progress-ball ${formPosition.firstSection ? 'first' : formPosition.secondSection ? 'second' : formPosition.thirdSection && 'third'}`}>
        <div className="form-progress-ball-fill"></div>
      </div>
      <div className="form-progress-details">
        {
          formPosition.firstSection ?
            <span className="form-progress-detail">Account Details</span>
          : formPosition.secondSection ?
            <span className="form-progress-detail">Profile Information</span>
          : formPosition.thirdSection &&
            <span className="form-progress-detail">Email Verification</span>
        }
      </div>
    </div>
  )
}

export default FormProgressBar