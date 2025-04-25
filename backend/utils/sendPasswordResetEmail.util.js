import { mailtrapClient, sender } from '../config/email.config.js'

import { PASSWORD_RESET_EMAIL_TEMPLATE } from './templates/passwordResetEmail.template.js'

const sendPasswordResetEmail = async (email) => {
  const recipient = [{ email }]
  try {
    const respone = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successful!',
      html: PASSWORD_RESET_EMAIL_TEMPLATE,
      category: 'Password Reset',
    })
  } catch (error) {
    throw new Error(error)
  }
}

export default sendPasswordResetEmail
