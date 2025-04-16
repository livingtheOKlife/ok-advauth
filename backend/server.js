import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', () => console.log('Server is ready'))

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
