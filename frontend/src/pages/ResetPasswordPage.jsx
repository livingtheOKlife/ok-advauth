import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { useResetPasswordMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaEye, FaEyeSlash } from 'react-icons/fa6'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/formWidget'
import FormHeader from '../components/shared/forms/formHeader'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

function ResetPasswordPage () {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    userInfo && navigate('/')
  }, [navigate, userInfo])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({ mode: 'all' })
  const [ resetPassword, { isLoading } ] = useResetPasswordMutation()
  const onSubmit = async () => {
    if (getValues('password') !== getValues('confirmPassword')) {
      setAlertActive('Passwords do not match', 'error')
    } else {
      try {
        const res = await resetPassword({token: token, password: getValues('password')}).unwrap()
        dispatch(setCredentials({...res}))
        setAlertActive('Password reset successfully!', 'success')
        navigate('/')
      } catch (error) {
        setAlertActive(error.data.message, 'error')
      }
    }
  }
  return (
    <MainContainer page='reset-password-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormHeader heading='Nearly there!' subheading='Enter your new password below' />
        <FormControl>
          <label>Password</label>
          <div className="icon-input">
            <input type={showPassword ? 'text' : 'password'} className={errors.password ? 'invalid' : ''} {
              ...register('password', {
                required: { value: true, message: 'Please enter a password' },
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 50, message: 'Password must be no more than 50 characters' },
                pattern: {
                  value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
                  message: 'Passwords must contain at least one uppercase, and one lowercase letter, one number, and one special character.'
                }
              })
            } placeholder='Choose a password' />
            <button type="button" className='input-btn' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          {
            errors.password && <span className="input-text">{errors.password.message}</span>
          }
        </FormControl>
        <FormControl>
          <label>Confirm password</label>
          <div className="icon-input">
            <input type={showConfirmPassword ? 'text' : 'password'} className={errors.confirmPassword ? 'invalid' : ''} {
              ...register('confirmPassword', {
                required: { value: true, message: 'Please confirm your password' },
                validate: (value) => value === getValues('password') || 'Passwords do not match'
              })
            } placeholder='Confirm your password' />
            <button type="button" className='input-btn' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {
                showConfirmPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          {
            errors.confirmPassword && <span className="input-text">{errors.confirmPassword.message}</span>
          }
        </FormControl>
        {
          !isLoading ? 
            <button type="submit" className='btn md'>
              Reset password
            </button>
          : <Spinner />
        }
      </FormWidget>
    </MainContainer>
  )
}

export default ResetPasswordPage