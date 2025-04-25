import express from 'express'

import {
  logout,
  register,
  verifyEmail,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/logout', logout)

export default router
