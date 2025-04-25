import { mailtrapClient, sender } from '../config/email.config.js'

import { WELCOME_EMAIL_TEMPLATE } from './templates/welcomeEmail.template.js'

const sendWelcomeEmail = async (email, verificationToken) => {
  const recipient = [{ email }]
  try {
    const res = mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Welcome to OKadvauth',
      html: WELCOME_EMAIL_TEMPLATE.replace(),
      category: 'Welcome Email',
    })
  } catch (error) {
    console.error('Error sending verification email', error)
    throw new Error(`Error sending verification email: ${error}`)
  }
}

export default sendWelcomeEmail
