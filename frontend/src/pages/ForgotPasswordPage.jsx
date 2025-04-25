import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { useForgotPasswordMutation } from '../slices/usersApiSlice'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/formWidget'
import FormHeader from '../components/shared/forms/formHeader'
import FormControl from '../components/shared/forms/FormControl'
import Spinner from '../components/shared/Spinner'

function ForgotPasswordPage() {
  const { userInfo } = useSelector((state) => state.auth)
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
  const [ forgotPassword, { isLoading } ] = useForgotPasswordMutation()
  const onSubmit = async () => {
    !getValues('email') ? setAlertActive('Please enter your email address', 'error')
    : errors.email && setAlertActive(errors.email.message, 'error')
    try {
      await forgotPassword({ email: getValues('email') }).unwrap()
      setAlertActive(`An email has been sent to you...`, 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='forgot-password-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormHeader heading='No worries!' subheading='Enter your email below, we will send you a link there...' />
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
        {
          !isLoading ? 
            <button type="submit" className='btn md'>Send help</button>
          : <Spinner />
        }
        <div className="form-text">Remember your password? <Link to='/login'>Sign in</Link></div>
        <div className="form-text">or...</div>
        <div className="form-text">Not a member? <Link to='/register'>Sign up instead</Link></div>
      </FormWidget>
    </MainContainer>
  )
}

export default ForgotPasswordPage