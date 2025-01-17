import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use('/api/v1/user',userRoutes)
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
    connectDB()
})