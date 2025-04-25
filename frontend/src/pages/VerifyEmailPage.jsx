import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useVerifyEmailMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaChevronRight, FaPaperPlane, FaUserShield } from 'react-icons/fa6'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/formWidget'
import FormHeader from '../components/shared/forms/formHeader'
import FormControl from '../components/shared/forms/FormControl'
import NumberInput from '../components/shared/forms/inputs/NumberInput'
import Spinner from '../components/shared/Spinner'

function VerifyEmailPage () {
  const { userInfo } = useSelector((state) => state.auth)
	const userLoggedIn = userInfo.user
  const navigate = useNavigate()
	const dispatch = useDispatch()
	console.log(userInfo.user.isVerified)
  useEffect(() => {
    !userInfo && navigate('/')
		userInfo.user.isVerified === true && navigate('/')
  }, [navigate, userInfo])
  const { setAlertActive } = useContext(AlertContext)
  const [code, setCode] = useState(["", "", "", "", "", ""])
	const inputRefs = useRef([])
	const [ verifyEmail, { isLoading } ] = useVerifyEmailMutation()
	const handleChange = (i, value) => {
		const newCode = [...code]
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("")
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || ""
			}
			setCode(newCode)
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
			inputRefs.current[focusIndex].focus()
		} else {
			newCode[i] = value
			setCode(newCode)
			if (value && i < 5) {
				inputRefs.current[i + 1].focus()
			}
		}
	}
	const handleKeyDown = (i, e) => {
		if (e.key === "Backspace" && !code[i] && i > 0) {
			inputRefs.current[i - 1].focus()
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = code.join("")
		try {
			const res = await verifyEmail({ email: userLoggedIn.email, token }).unwrap()
			dispatch(setCredentials({...res}))
			setAlertActive('Email verified successfully', 'success')
			navigate("/")
		} catch (error) {
			setAlertActive(error.data.message, 'error')
		}
	}
  return (
    <MainContainer page='verify-email-page'>
      <FormWidget onSubmit={handleSubmit}>
        <FormHeader heading='Get Verified!' subheading='Enter your 6-digit code below...' />
        <FormControl>
          <div className="code-input">
          {
						code.map((digit, i) => (
							<NumberInput
								key={i}
                placeholder='*'
								ref={(el) => (inputRefs.current[i] = el)}
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(i, e.target.value)}
								onKeyDown={(e) => handleKeyDown(i, e)}
							/>
						))
					}
          </div>
        </FormControl>
        <span className="form-text">You haven't receive an email? <Link to='/resend-email' type="button">Resend email...</Link></span>
          {
            !isLoading ? 
              <button type="submit" className='btn md'>
                Verify Email
                <FaChevronRight />
              </button>
            : <Spinner />
          }
        <span className="form-text"><Link to='/' type="button">Skip for now</Link></span>
      </FormWidget>
    </MainContainer>
  )
}

export default VerifyEmailPage