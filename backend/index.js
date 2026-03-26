// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import chatbotRoutes from './routes/chatbot.route.js';

// const app = express()
// dotenv.config()

// const port = process.env.PORT || 3000

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //Database Connection code
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB')
// }).catch((error) => {
//     console.log("Error connecting to MongoDB:", error)
// })

// //Routes
// app.use("/bot/v1/", chatbotRoutes)

// app.listen(port, () => {
//   console.log(`Backend Server application listening on port ${port}`)
// })














// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import chatbotRoutes from './routes/chatbot.route.js';

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 4002;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((error) => {
//     console.log('Error connecting to MongoDB:', error);
// });

// // Health check route
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: '🤖 ASHU THE GREAT CHATBOT API is running!',
//         status: 'active',
//         endpoint: 'POST /bot/v1/message'
//     });
// });

// // Routes
// app.use('/bot/v1/', chatbotRoutes);

// // Local development only
// if (!process.env.VERCEL) {
//     app.listen(port, () => {
//         console.log(`Backend Server application listening on port ${port}`);
//     });
// }

// export default app;




























// backend/index.js (Update with db.js and below use your frontend url which you deployed in vercel)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(cors({
    origin: [
        'https://ashu-chatbot.vercel.app/',  // ← Your frontend URL
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB BEFORE handling any request (middleware)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        return res.status(500).json({
            success: false,
            error: 'Database connection failed. Please try again.'
        });
    }
});

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: '🤖 ASHU THE GREAT CHATBOT API is running!',
        status: 'active',
        endpoint: 'POST /bot/v1/message'
    });
});

// Routes
app.use('/bot/v1/', chatbotRoutes);

// Local development only
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

export default app;

