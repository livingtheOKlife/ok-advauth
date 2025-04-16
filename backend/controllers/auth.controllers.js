import asyncHandler from 'express-async-handler'

import User from '../models/user.model.js'

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
