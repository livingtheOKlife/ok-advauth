import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FaTriangleExclamation, FaUserCheck } from 'react-icons/fa6'

import MainContainer from '../components/layout/MainContainer'

function ProfilePage () {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    !userInfo && navigate('/login')
  }, [navigate, userInfo])
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const date = new Date(userInfo.user.dateOfBirth).getDate()
  const month = new Date(userInfo.user.dateOfBirth).getMonth()
  const year = new Date(userInfo.user.dateOfBirth).getFullYear()
  const name = `${userInfo.user.firstName} ${userInfo.user.lastName}`
  const username = userInfo.user.username
  const email = userInfo.user.email
  const dateOfBirth = `${date} ${months[month]} ${year}`
  return (
    <MainContainer page='profile-page'>
      <div className="card">
        <section className="profile-section">
          <h3 className='profile-heading'>{name}</h3>
          <span className='profile-subheading'>@<em>{username}</em></span>
        </section>
        <dl className="profile-details-list">
          <li className="profile-details-list">
            <dt>
              {
                userInfo.user.isVerified !== true ? <FaTriangleExclamation className='red' /> : <FaUserCheck className='green' />
              }
              Email:
            </dt>
            <dd>{email}</dd>
          </li>
          <li className="profile-details-list">
            <dt>Date of Birth: </dt>
            <dd>{dateOfBirth}</dd>
          </li>
        </dl>
        {
          userInfo.user.isVerified !== true && <Link to='/verify-email' className='nav-link'>Verify your email</Link>
        }
      </div>
    </MainContainer>
  )
}

export default ProfilePage