import 'dotenv/config'              
import express      from 'express'
import mongoose     from 'mongoose'
import cors         from 'cors'

import authRoutes   from './routes/auth.js'
import userRoutes   from './routes/users.js'
import postRoutes   from './routes/posts.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth',  authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(` Server listening on port ${PORT}`))
