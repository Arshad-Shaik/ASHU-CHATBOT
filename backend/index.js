import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';

const app = express()
dotenv.config()

const port = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database Connection code
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error)
})

//Routes
app.use("/bot/v1/", chatbotRoutes)

app.listen(port, () => {
  console.log(`Backend Server application listening on port ${port}`)
})
