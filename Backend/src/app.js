import 'dotenv/config';
import express from 'express'
import cors from 'cors'

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)
app.use(express.json({ limit: '128kb' }))
app.use(express.urlencoded({ extended: true, limit: '128kb' }))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './routes/user.route.js'
import itineraryRouter from './routes/itinerary.route.js'
app.use('/api/v2/user', userRouter)
app.use('/api/v2/itinerary', itineraryRouter)

export { app }