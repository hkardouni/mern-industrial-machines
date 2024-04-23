import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import industriesRouter from './routes/industry.route.js'
import functionalitiesRouter from './routes/functionality.route.js'
import cookieParser from 'cookie-parser';


dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to the MongoDB')
}).catch((e) => {
    console.log(`${e} happend`);
})


const app = express()

app.use(express.json())
app.use(cookieParser())
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)
app.use('/api/industries', industriesRouter)
app.use('/api/functionalities', functionalitiesRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})