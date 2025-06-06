import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.config.js'

import { notFound, errorHandler } from './middleware/error.middleware.js'

import authRoutes from './routes/auth.routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.get('/', () => console.log('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is listening on port: ${PORT}`)
})
