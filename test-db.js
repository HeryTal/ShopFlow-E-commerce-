// test-db.js
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Charger les variables d'environnement
dotenv.config();

async function testConnection() {
    try {
        await connectDB();
        console.log('✅ MongoDB connection verified successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
    }
}

testConnection();