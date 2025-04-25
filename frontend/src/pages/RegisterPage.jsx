import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash, FaSignature } from 'react-icons/fa6'

import { useCreateAccountMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

import AlertContext from '../context/alert/AlertContext'

import MainContainer from '../components/layout/MainContainer'

import FormWidget from '../components/shared/forms/formWidget'
import FormHeader from '../components/shared/forms/formHeader'
import FormProgressBar from '../components/shared/forms/formProgressBar'
import FormWindow from '../components/shared/forms/formWindow'
import FormDivider from '../components/shared/forms/FormDivider'
import FormControl from '../components/shared/forms/FormControl'
import FormSection from '../components/shared/forms/FormSection'
import TextInput from '../components/shared/forms/inputs/TextInput'
import EmailInput from '../components/shared/forms/inputs/EmailInput'
import PasswordInput from '../components/shared/forms/inputs/PasswordInput'
import Spinner from '../components/shared/Spinner'
import DateInput from '../components/shared/forms/inputs/DateInput'

function RegisterPage () {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    userInfo && navigate('/')
  }, [navigate, userInfo])
  const { setAlertActive } = useContext(AlertContext)
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    },
    mode: 'all'
  })
  const [formPosition, setFormPosition] = useState({
    firstSection: true,
    secondSection: false,
    thirdSection: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [createAccount, {isLoading}] = useCreateAccountMutation()
  const firstButton = () => {
    !getValues('username') ? setAlertActive('Please enter a username', 'error')
    : !getValues('email') ? setAlertActive('Please enter your email address', 'error')
    : !getValues('password') ? setAlertActive('Please enter a password', 'error')
    : !getValues('confirmPassword') ? setAlertActive('Please confirm your password', 'error')
    : errors.username ? setAlertActive(errors.username.message, 'error')
    : errors.email ? setAlertActive(errors.email.message, 'error')
    : errors.password ? setAlertActive(errors.password.message, 'error')
    : errors.confirmPassword ? setAlertActive(errors.confirmPassword.message, 'error')
    : setFormPosition({
        firstSection: false,
        secondSection: true,
        thirdSection: false,
    })
  }
  const secondButton = () => {
    !getValues('firstName') ? setAlertActive('Please enter your first name', 'error')
    : !getValues('lastName') ? setAlertActive('Please enter your surname', 'error')
    : !getValues('dateOfBirth') ? setAlertActive('Please enter your date of birth', 'error')
    : errors.firstName ? setAlertActive(errors.firstName.message, 'error')
    : errors.lastName ? setAlertActive(errors.lastName.message, 'error')
    : errors.dateOfBirth ? setAlertActive(errors.dateOfBirth.message, 'error')
    : setFormPosition({
        firstSection: false,
        secondSection: false,
        thirdSection: true,
    })
  }
  const onSubmit = async () => {
    !getValues('username') ? setAlertActive('Please enter a username', 'error')
    : !getValues('email') ? setAlertActive('Please enter your email address', 'error')
    : !getValues('password') ? setAlertActive('Please enter a password', 'error')
    : !getValues('confirmPassword') ? setAlertActive('Please confirm your password', 'error')
    : !getValues('firstName') ? setAlertActive('Please enter your first name', 'error')
    : !getValues('lastName') ? setAlertActive('Please enter your surname', 'error')
    : !getValues('dateOfBirth') ? setAlertActive('Please enter your date of birth', 'error')
    : errors.username ? setAlertActive(errors.username.message, 'error')
    : errors.email ? setAlertActive(errors.email.message, 'error')
    : errors.password ? setAlertActive(errors.password.message, 'error')
    : errors.confirmPassword ? setAlertActive(errors.confirmPassword.message, 'error')
    : errors.firstName ? setAlertActive(errors.firstName.message, 'error')
    : errors.lastName ? setAlertActive(errors.lastName.message, 'error')
    : errors.dateOfBirth && setAlertActive(errors.dateOfBirth.message, 'error')
    try {
      const res = await createAccount({
        username: getValues('username'),
        email: getValues('email'),
        password: getValues('password'),
        firstName: getValues('firstName'),
        lastName: getValues('lastName'),
        dateOfBirth: getValues('dateOfBirth'),
      }).unwrap()
      dispatch(setCredentials({...res}))
      setAlertActive(`Welcome, ${getValues('firstName')}!`, 'success')
      navigate('/')
    } catch (error) {
      setAlertActive(error.data.message, 'error')
    }
  }
  return (
    <MainContainer page='register-page'>
      <FormWidget onSubmit={handleSubmit(onSubmit)}>
        <FormHeader heading={formPosition.firstSection || formPosition.secondSection ? "Welcome!" : `Welcome, ${getValues('firstName')}!`} subheading={formPosition.firstSection || formPosition.secondSection ? "Enter your details below and we'll take it from there..." : "Check your details below, and sign up whenever you're ready..."} />
        <FormProgressBar formPosition={formPosition} />
        <FormWindow>
          <FormDivider formPosition={formPosition}>
            <FormSection>
              <FormControl>
                <label>Username</label>
                <input type='text' className={errors.username ? 'invalid' : ''} {
                  ...register('username', {
                    required: { value: true, message: 'Please enter a username' },
                    minLength: { value: 2, message: 'Username must be at least 2 characters' },
                    maxLength: { value: 16, message: 'Username must be no more than 16 characters' },
                    pattern: {
                      value: /^(?=[\w.-])(?:[\d_.-]*[a-zA-Z]){3}[\w.-]*$/,
                      message: "Usernames can only contain letters, numbers, and _ . -",
                    },
                  })
                } placeholder='Choose a username' />
                {
                  errors.username && <span className="input-text">{errors.username.message}</span>
                }
              </FormControl>
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
              <button type="button" className='btn md' onClick={firstButton}>
                Next
                <FaChevronRight />
              </button>
            </FormSection>
            <FormSection>
              <FormControl>
                <label>First name</label>
                <input type='text' className={errors.firstName ? 'invalid' : ''} {
                  ...register('firstName', {
                    required: { value: true, message: 'Please enter your first name' },
                    minLength: { value: 2, message: 'Your name must be at least 2 characters' },
                    maxLength: { value: 50, message: 'Your name must be no more than 50 characters' }
                  })
                } placeholder='Enter your first name' />
                {
                  errors.firstName && <span className="input-text">{errors.firstName.message}</span>
                }
              </FormControl>
              <FormControl>
                <label>Surname</label>
                <input type='text' className={errors.lastName ? 'invalid' : ''} {
                  ...register('lastName', {
                    required: { value: true, message: 'Please enter your surname' },
                    minLength: { value: 2, message: 'Surname must be at least 2 characters' },
                    maxLength: { value: 50, message: 'Surname must be no more than 50 characters' }
                  })
                } placeholder='Enter your surname' />
                {
                  errors.lastName && <span className="input-text">{errors.lastName.message}</span>
                }
              </FormControl>
              <FormControl>
                <label>Date of birth</label>
                <input type='date' className={errors.dateOfBirth ? 'invalid' : ''} {
                  ...register('dateOfBirth', {
                    required: { value: true, message: 'Please enter your date of birth' },
                  })
                } placeholder='dd/mm/yyyy' />
                {
                  errors.dateOfBirth && <span className="input-text">{errors.dateOfBirth.message}</span>
                }
              </FormControl>
              <button type="button" className='btn md' onClick={secondButton}>
                Next
                <FaChevronRight />
              </button>
              <button type="button" className='ghost-btn md' onClick={() => setFormPosition({
                firstSection: true,
                secondSection: false,
                thirdSection: false,
              })}>
                <FaChevronLeft />
                Go back
              </button>
            </FormSection>
            <FormSection>
              <div className="form-detail">
                <span className="form-text"><em>Username:</em></span>
                <span className="form-text">{getValues('username')}</span>
              </div>
              <div className="form-detail">
                <span className="form-text"><em>Email:</em></span>
                <span className="form-text">{getValues('email')}</span>
              </div>
              <div className="form-detail">
                <span className="form-text"><em>First name:</em></span>
                <span className="form-text">{getValues('firstName')}</span>
              </div>
              <div className="form-detail">
                <span className="form-text"><em>Surname:</em></span>
                <span className="form-text">{getValues('lastName')}</span>
              </div>
              <div className="form-detail">
                <span className="form-text"><em>Date of Birth:</em></span>
                <span className="form-text">{getValues('dateOfBirth')}</span>
              </div>
              {
                !isLoading ? 
                  <button type="submit" className='btn md'>
                    Sign up
                    <FaSignature />
                  </button>
                : <Spinner />
              }
              <button type="button" className='ghost-btn md' onClick={() => setFormPosition({
                firstSection: false,
                secondSection: true,
                thirdSection: false,
              })}>
                <FaChevronLeft />
                Go back
              </button>
            </FormSection>
          </FormDivider>
        </FormWindow>
        <span className="form-text">Already a member? <Link to='/login'>Sign in instead</Link></span>
      </FormWidget>
    </MainContainer>
  )
}

export default RegisterPage