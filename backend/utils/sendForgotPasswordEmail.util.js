import { mailtrapClient, sender } from '../config/email.config.js'

const sendForgotPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Forgotten Password',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
          <title>Forgotten Password</title>
        </head>
        <body style="font-family: Quicksand, sans-serif; line-height: 1.42; color: #000a14; max-width: 600px; margin: 0 auto; padding: 16px;">
          <a href="${resetURL}" style="background-color: #0466c8; color: #fafafa; padding: 12px 16px; text-decoration: none; border-radius: 5px; font-weight: 600;">Reset Password</a>
        </html>
      `,
      category: 'Password Reset',
    })
  } catch (error) {
    throw new Error(error)
  }
}

export default sendForgotPasswordEmail
