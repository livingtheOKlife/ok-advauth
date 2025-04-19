import { mailtrapClient, sender } from '../config/email.config.js'

import { VERIFICATION_EMAIL_TEMPLATE } from './templates/verificationEmail.template.js'

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]
  try {
    const res = mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
      category: 'Email Verification',
    })
  } catch (error) {
    console.error('Error sending verification email', error)
    throw new Error(`Error sending verification email: ${error}`)
  }
}

export default sendVerificationEmail
