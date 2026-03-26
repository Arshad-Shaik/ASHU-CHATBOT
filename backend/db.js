// backend/db.js (CREATE THIS NEW FILE for Vercel Serverless Function...........)
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define MONGO_URI in environment variables');
}

// ✅ Cache the connection to reuse across serverless function calls
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // If connection already exists, reuse it
    if (cached.conn) {
        console.log('Using cached MongoDB connection');
        return cached.conn;
    }

    // If connection is being established, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            family: 4
        };

        cached.promise = mongoose.connect(MONGO_URI, opts)
            .then((mongoose) => {
                console.log('New MongoDB connection established');
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;  // Reset on failure so next call retries
        console.error('MongoDB connection error:', error);
        throw error;
    }

    return cached.conn;
}

export default connectDB;