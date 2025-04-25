import asyncHandler from 'express-async-handler'
import crypto from 'crypto'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.util.js'
import sendVerificationEmail from '../utils/sendVerificationEmail.util.js'
import sendWelcomeEmail from '../utils/sendWelcomeEmail.util.js'
import sendForgotPasswordEmail from '../utils/sendForgotPasswordEmail.util.js'

const CLIENT_URL = process.env.CLIENT_URL

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName, dateOfBirth } =
    req.body
  if (
    !username ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !dateOfBirth
  ) {
    throw new Error('All fields are required')
  }
  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    res.status(400)
    throw new Error('Username already in use...')
  }
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    res.status(400)
    throw new Error('User already exists, try signing in...')
  }
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString()
  const user = await User.create({
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
  })
  if (user) {
    generateToken(res, user._id)
    // sendVerificationEmail(user.email, verificationToken)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  }
})

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, token } = req.body
  const user = await User.findOne({
    verificationToken: token,
  })
  if (!user) {
    res.status(400)
    throw new Error('Invalid or expired verification code')
  } else if (user.email !== email) {
    res.status(400)
    throw new Error('Invalid or expired verification code')
  } else {
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save()
    // await sendWelcomeEmail(user.email, user.fullName)
    res.status(200).json({
      success: true,
      message: 'Email successfully verified',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  }
})

export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'User logged out' })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      success: true,
      message: 'User logged in',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt
    await user.save()
    // sendForgotPasswordEmail(
    //   user.email,
    //   `${CLIENT_URL}/reset-password/${resetToken}`
    // )
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    })
  } else {
    res.status(401)
    throw new Error('User not found, try signing up...')
  }
})
