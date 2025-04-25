import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import { FaEye, FaEyeSlash, FaSignature } from 'react-icons/fa6'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/formWidget'
import FormHeader from '../components/shared/forms/formHeader'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

function LoginPage () {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    userInfo && navigate('/')
  }, [navigate, userInfo])
  const { setAlertActive } = useContext(AlertContext)
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({ mode: 'all' })
  const [showPassword, setShowPassword] = useState(false)
  const [ login, { isLoading } ] = useLoginMutation()
  const onSubmit = async () => {
    !getValues('email') ? setAlertActive('Please enter your email address', 'error')
    : !getValues('password') ? setAlertActive('Please enter a password', 'error')
    : errors.email ? setAlertActive(errors.email.message, 'error')
    : errors.password && setAlertActive(errors.password.message, 'error')
    try {
      const res = await login({ email: getValues('email'), password: getValues('password') }).unwrap()
      dispatch(setCredentials({...res}))
      setAlertActive(`Welcome back, ${res.user.firstName}!`, 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='login-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormHeader heading='Welcome back!' subheading='Enter your details below, we will handle the rest...' />
        <FormControl>
          <label>Email</label>
          <input type='email' className={errors.email ? 'invalid' : ''} {
            ...register('email', {
              required: {
                value: true,
                message: 'Please enter your email address'
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })
          } placeholder='Enter your email address' />
          {
            errors.email && <span className="input-text">{errors.email.message}</span>
          }
        </FormControl>
        <FormControl>
          <label>Password</label>
          <div className="icon-input">
            <input type={showPassword ? 'text' : 'password'} className={errors.password ? 'invalid' : ''} {
              ...register('password', {
                required: { value: true, message: 'Please enter your password' },
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                maxLength: { value: 50, message: 'Password must be no more than 50 characters' },
                pattern: {
                  value: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
                  message: 'Passwords must contain at least one uppercase, and one lowercase letter, one number, and one special character.'
                }
              })
            } placeholder='Enter your password' />
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
        <div className="form-text"><Link to='/forgot-password'>Forgot password</Link></div>
        {
          !isLoading ? 
            <button type="submit" className='btn md'>
              Sign up
              <FaSignature />
            </button>
          : <Spinner />
        }
        <div className="form-text">Not a member? <Link to='/register'>Sign up instead</Link></div>
      </FormWidget>
    </MainContainer>
  )
}

export default LoginPage