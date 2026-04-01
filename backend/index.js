// // backend/index.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import chatbotRoutes from './routes/chatbot.route.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4002;
// const express = require("express");
// const cors = require("cors"); 
// // ✅ CORS — this single line handles EVERYTHING including preflight OPTIONS
// app.use(cors({
//     origin: [
//         'https://ashu-chatbot.vercel.app',
//         'http://localhost:5173',
//         'http://localhost:5174'
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));

// // ✅ Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ MongoDB Connection
// const connectDB = async () => {
//     try {
//         if (mongoose.connection.readyState === 1) {
//             return;
//         }
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('✅ MongoDB connected successfully');
//     } catch (error) {
//         console.error('❌ MongoDB connection error:', error.message);
//     }
// };

// connectDB();

// // ✅ Reconnect on each request (for Vercel serverless)
// app.use(async (req, res, next) => {
//     try {
//         if (mongoose.connection.readyState !== 1) {
//             await connectDB();
//         }
//         next();
//     } catch (error) {
//         console.error('DB middleware error:', error.message);
//         next();
//     }
// });

// // ✅ Health check
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: '🤖 ASHU THE GREAT CHATBOT API is running!',
//         status: 'active',
//         endpoint: 'POST /bot/v1/message'
//     });
// });

// // ✅ Routes
// app.use('/bot/v1/', chatbotRoutes);

// // ✅ Local development only
// if (!process.env.VERCEL) {
//     app.listen(port, () => {
//         console.log(`🚀 Server listening on port ${port}`);
//     });
// }

// export default app;























// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

// ✅ CORS — handles EVERYTHING including preflight OPTIONS
app.use(cors({
    origin: [
        'https://ashu-chatbot.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
    }
};

connectDB();

// ✅ Reconnect on each request (for Vercel serverless)
app.use(async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        next();
    } catch (error) {
        console.error('DB middleware error:', error.message);
        next();
    }
});

// ✅ Health check
app.get('/', (req, res) => {
    res.status(200).json({
        message: '🤖 ASHU THE GREAT CHATBOT API is running!',
        status: 'active',
        endpoint: 'POST /bot/v1/message'
    });
});

// ✅ Routes
app.use('/bot/v1/', chatbotRoutes);

// ✅ Local development only
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`🚀 Server listening on port ${port}`);
    });
}

export default app;