import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/message',messageRoutes)
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
    connectDB()
})